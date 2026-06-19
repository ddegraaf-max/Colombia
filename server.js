require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'Honor Care Poland Secure Portal';
const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-me';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@honorcarepoland.eu').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

if (!MONGODB_URI) console.warn('MONGODB_URI ontbreekt. Zet MongoDB op Railway of MongoDB Atlas.');

mongoose.connect(MONGODB_URI || 'mongodb://127.0.0.1:27017/honorcare').catch(err => console.error(err.message));

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  totpSecret: { type: String },
  totpEnabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

async function ensureAdmin() {
  const exists = await User.findOne({ email: ADMIN_EMAIL });
  if (!exists) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({ email: ADMIN_EMAIL, passwordHash });
    console.log(`Admin aangemaakt: ${ADMIN_EMAIL}`);
  }
}
mongoose.connection.once('open', ensureAdmin);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 8
  },
  store: MongoStore.create({ mongoUrl: MONGODB_URI })
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

app.get('/setup-2fa', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const user = await User.findById(req.session.userId);
  if (!user) return res.redirect('/login');
  let secret = user.totpSecret;
  if (!secret) {
    const s = speakeasy.generateSecret({ name: `${APP_NAME} (${user.email})`, issuer: 'Honor Care Poland' });
    secret = s.base32; user.totpSecret = secret; await user.save();
  }
  const otpauth = speakeasy.otpauthURL({ secret, label: user.email, issuer: 'Honor Care Poland', encoding: 'base32' });
  const qr = await QRCode.toDataURL(otpauth);
  res.render('setup2fa', { qr, secret, error: null, appName: APP_NAME });
});
app.post('/setup-2fa', async (req, res) => {
  const user = await User.findById(req.session.userId);
  const token = String(req.body.token || '').replace(/\s/g, '');
  const ok = speakeasy.totp.verify({ secret: user.totpSecret, encoding: 'base32', token, window: 1 });
  if (!ok) {
    const otpauth = speakeasy.otpauthURL({ secret: user.totpSecret, label: user.email, issuer: 'Honor Care Poland', encoding: 'base32' });
    const qr = await QRCode.toDataURL(otpauth);
    return res.status(401).render('setup2fa', { qr, secret: user.totpSecret, error: 'Code klopt niet.', appName: APP_NAME });
  }
  user.totpEnabled = true; await user.save(); req.session.totpPassed = true; res.redirect('/dashboard');
});
app.get('/verify-2fa', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.render('verify2fa', { error: null, appName: APP_NAME });
});
app.post('/verify-2fa', async (req, res) => {
  const user = await User.findById(req.session.userId);
  const token = String(req.body.token || '').replace(/\s/g, '');
  const ok = speakeasy.totp.verify({ secret: user.totpSecret, encoding: 'base32', token, window: 1 });
  if (!ok) return res.status(401).render('verify2fa', { error: 'Authenticator-code klopt niet.', appName: APP_NAME });
  req.session.totpPassed = true; res.redirect('/dashboard');
});
app.get('/dashboard', requireAuth, (req, res) => {
  const docsDir = path.join(__dirname, 'protected_docs');
  const files = listFiles(docsDir).filter(f => !f.path.includes('node_modules'));
  res.render('dashboard', { files, appName: APP_NAME });
});
app.get('/download/*', requireAuth, (req, res) => {
  const docsDir = path.join(__dirname, 'protected_docs');
  const requested = req.params[0];
  const filePath = path.normalize(path.join(docsDir, requested));
  if (!filePath.startsWith(docsDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return res.status(404).send('Niet gevonden');
  res.download(filePath);
});
app.post('/logout', (req, res) => req.session.destroy(() => res.redirect('/login')));

app.listen(PORT, () => console.log(`${APP_NAME} draait op poort ${PORT}`));
