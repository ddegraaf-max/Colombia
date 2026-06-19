
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'Honor Care Poland Secure Portal';
const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-me';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@honorcarepoland.eu').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, default: 'admin' },
  twoFASecret: String,
  twoFAEnabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

async function connectDB(){
  if(!MONGODB_URI){ console.error('MONGODB_URI ontbreekt.'); return; }
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB verbonden');
  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if(!existing){
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({ email: ADMIN_EMAIL.toLowerCase(), passwordHash, role:'admin' });
    console.log('Admin aangemaakt:', ADMIN_EMAIL.toLowerCase());
  }
}
connectDB().catch(err => console.error(err.message));

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 1000 * 60 * 60 * 8 },
  store: MongoStore.create({ mongoUrl: MONGODB_URI || 'mongodb://127.0.0.1:27017/honorcare' })
}));

function requireAuth(req, res, next) {
  if (req.session && req.session.userId && req.session.totpPassed) return next();
  return res.redirect('/login');
}
function listFiles(dir, base='') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const rel = path.join(base, e.name);
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(listFiles(abs, rel));
    else files.push({ name: e.name, path: rel.replace(/\\/g, '/'), size: fs.statSync(abs).size });
  }
  return files;
}

app.get('/', (req, res) => res.redirect('/dashboard'));
app.get('/login', (req, res) => res.render('login', { error: null, appName: APP_NAME }));
app.post('/login', async (req, res) => {
  const email = String(req.body.email || '').toLowerCase().trim();
  const password = String(req.body.password || '');
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).render('login', { error: 'Ongeldige login.', appName: APP_NAME });
  }
  req.session.userId = user._id.toString();
  req.session.totpPassed = false;
  if (!user.totpEnabled) return res.redirect('/setup-2fa');
  return res.redirect('/verify-2fa');
});

app.get('/setup-2fa', async (req,res)=>{
  if(!req.session.userId) return res.redirect('/login');
  const user = await User.findById(req.session.userId);
  const secret = speakeasy.generateSecret({ name: `Honor Care Poland (${user.email})` });
  user.twoFASecret = secret.base32; await user.save();
  const qr = await QRCode.toDataURL(secret.otpauth_url);
  res.render('setup-2fa',{qr, secret:secret.base32, error:null});
});
app.post('/setup-2fa', async(req,res)=>{
  const user = await User.findById(req.session.userId);
  const verified = speakeasy.totp.verify({secret:user.twoFASecret, encoding:'base32', token:req.body.token, window:1});
  if(!verified){ const qr = await QRCode.toDataURL(speakeasy.otpauthURL({secret:user.twoFASecret,label:user.email,issuer:'Honor Care Poland',encoding:'base32'})); return res.render('setup-2fa',{qr,secret:user.twoFASecret,error:'Code is ongeldig.'}); }
  user.twoFAEnabled = true; await user.save(); req.session.twoFAVerified = true; res.redirect('/portal');
});
app.get('/verify-2fa',(req,res)=>{ if(!req.session.userId) return res.redirect('/login'); res.render('verify-2fa',{error:null}); });
app.post('/verify-2fa', async(req,res)=>{ const user=await User.findById(req.session.userId); const ok=speakeasy.totp.verify({secret:user.twoFASecret,encoding:'base32',token:req.body.token,window:1}); if(!ok) return res.render('verify-2fa',{error:'Code is ongeldig.'}); req.session.twoFAVerified=true; res.redirect('/portal'); });
app.get('/portal', requireAuth, (req,res)=>res.render('portal',{email:req.session.email}));
app.post('/logout',(req,res)=>req.session.destroy(()=>res.redirect('/')));

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>console.log(`Honor Care Poland draait op poort ${PORT}`));
