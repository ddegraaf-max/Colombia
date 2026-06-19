const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const path = require('path');
require('dotenv').config();

const app = express();
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080;
const APP_NAME = process.env.APP_NAME || 'Honor Care Poland';
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL;
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-this-session-secret';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@honorcarepoland.eu').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';

if (!MONGODB_URI) { console.error('MONGODB_URI ontbreekt.'); process.exit(1); }

const translations = {
  pl:{nav_home:'Start',nav_foundation:'Fundacja',nav_company:'Spółka',nav_institutions:'Placówki',nav_candidates:'Kandydaci',nav_subsidies:'Dotacje',nav_portal:'Portal',hero_title:'Zaufany most między kolumbijskimi specjalistami a polską ochroną zdrowia',hero_lead:'Kompletny program rekrutacji, języka, integracji, dokumentacji i bezpiecznego zarządzania dla placówek medycznych w Polsce.',cta:'Otwórz portal',secondary:'Zobacz program',login_title:'Bezpieczne logowanie',foundation_title:'Fundacja Honor Care Poland',company_title:'Honor Care Poland Sp. z o.o.'},
  nl:{nav_home:'Home',nav_foundation:'Stichting',nav_company:'Werkmaatschappij',nav_institutions:'Zorginstellingen',nav_candidates:'Kandidaten',nav_subsidies:'Subsidies',nav_portal:'Portal',hero_title:'De professionele brug tussen Colombiaanse zorgtalenten en de Poolse zorg',hero_lead:'Een compleet programma voor recruitment, taal, integratie, documenten en veilig beheer voor zorgorganisaties in Polen.',cta:'Open portal',secondary:'Bekijk programma',login_title:'Beveiligde login',foundation_title:'Stichting Honor Care Poland',company_title:'Honor Care Poland Werkmaatschappij'},
  es:{nav_home:'Inicio',nav_foundation:'Fundación',nav_company:'Empresa',nav_institutions:'Instituciones',nav_candidates:'Candidatos',nav_subsidies:'Subsidios',nav_portal:'Portal',hero_title:'El puente profesional entre talento sanitario colombiano y la salud polaca',hero_lead:'Un programa completo de reclutamiento, idioma, integración, documentación y gestión segura para instituciones sanitarias en Polonia.',cta:'Abrir portal',secondary:'Ver programa',login_title:'Acceso seguro',foundation_title:'Fundación Honor Care Poland',company_title:'Empresa Honor Care Poland'}
};
function currentLang(req){ const lang=req.session?.lang||'pl'; return ['pl','nl','es'].includes(lang)?lang:'pl'; }
function viewData(req, extra={}){ const lang=currentLang(req); return {appName:APP_NAME, lang, t:translations[lang], ...extra}; }

mongoose.set('strictQuery', true);
const User = mongoose.model('User', new mongoose.Schema({email:{type:String,unique:true,required:true,lowercase:true},passwordHash:{type:String,required:true},twoFASecret:{type:String,default:null},role:{type:String,default:'admin'},createdAt:{type:Date,default:Date.now}}));
const Candidate = mongoose.model('Candidate', new mongoose.Schema({name:String,email:String,profession:String,country:{type:String,default:'Colombia'},status:{type:String,default:'screening'},notes:String,createdAt:{type:Date,default:Date.now}}));
const Institution = mongoose.model('Institution', new mongoose.Schema({name:String,contact:String,email:String,city:String,demand:String,status:{type:String,default:'lead'},createdAt:{type:Date,default:Date.now}}));
const Subsidy = mongoose.model('Subsidy', new mongoose.Schema({title:String,program:String,deadline:String,status:{type:String,default:'research'},notes:String,createdAt:{type:Date,default:Date.now}}));
const Document = mongoose.model('Document', new mongoose.Schema({title:String,category:String,language:String,status:{type:String,default:'draft'},notes:String,createdAt:{type:Date,default:Date.now}}));

app.use(session({secret:SESSION_SECRET,resave:false,saveUninitialized:false,proxy:true,cookie:{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:1000*60*60*8},store:MongoStore.create({mongoUrl:MONGODB_URI})}));

function requireLogin(req,res,next){ if(req.session&&req.session.userId)return next(); return res.redirect('/login'); }
function requireAuth(req,res,next){ if(req.session&&req.session.userId&&req.session.totpPassed)return next(); if(req.session&&req.session.userId)return res.redirect('/verify-2fa'); return res.redirect('/login'); }
async function seedAdmin(){ const existing=await User.findOne({email:ADMIN_EMAIL}); if(!existing){ const passwordHash=await bcrypt.hash(ADMIN_PASSWORD,12); await User.create({email:ADMIN_EMAIL,passwordHash,role:'admin'}); console.log(`Admin aangemaakt: ${ADMIN_EMAIL}`);} else console.log(`Admin bestaat al: ${ADMIN_EMAIL}`); }

app.get('/lang/:lang',(req,res)=>{ if(['pl','nl','es'].includes(req.params.lang))req.session.lang=req.params.lang; res.redirect(req.get('Referrer')||'/'); });
app.get('/',(req,res)=>res.render('home',viewData(req)));
const publicPages = [
  ['/stichting','Foundation','foundation_title','Opleiding, integratie en maatschappelijke ondersteuning voor internationale zorgprofessionals.','foundation'],
  ['/werkmaatschappij','Operating company','company_title','Recruitment, matching, compliance en contractbeheer voor de Poolse zorgmarkt.','company'],
  ['/zorginstellingen','Healthcare partners','nav_institutions','Voor ziekenhuizen, klinieken, tandartspraktijken, huisartsen en zorgorganisaties in Polen.','institutions'],
  ['/kandidaten-info','Candidates','nav_candidates','Voor Colombiaanse zorgprofessionals die veilig, professioneel en goed begeleid in Polen willen werken.','candidates'],
  ['/subsidies-info','Funding','nav_subsidies','Subsidieroutes voor arbeidsmarktintegratie, taal, migratie, opleiding en zorgcapaciteit.','funding']
];
publicPages.forEach(([url,eyebrow,key,subtitle,heroClass])=>app.get(url,(req,res)=>res.render('page',viewData(req,{eyebrow,title:translations[currentLang(req)][key],subtitle,heroClass,cards:[['Strategie','Professionele aanpak met duidelijke stappen.'],['Proces','Van intake tot beheer en rapportage.'],['Resultaat','Meetbaar, veilig en schaalbaar.']]}))));
app.get('/contact',(req,res)=>res.render('page',viewData(req,{eyebrow:'Contact',title:'Neem contact op',subtitle:'Warszawa • Bogotá • Nederland',heroClass:'contact',cards:[['Zorginstellingen','Plan een kennismaking.'],['Kandidaten','Start met registratie.'],['Partners','Bespreek samenwerking.']]})));

app.get('/login',(req,res)=>{ if(req.session?.userId&&req.session?.totpPassed)return res.redirect('/dashboard'); res.render('login',viewData(req,{error:null})); });
app.post('/login',async(req,res)=>{ try{ const email=String(req.body.email||'').trim().toLowerCase(); const password=String(req.body.password||''); const user=await User.findOne({email}); if(!user)return res.status(401).render('login',viewData(req,{error:'Gebruiker niet gevonden.'})); const ok=await bcrypt.compare(password,user.passwordHash); if(!ok)return res.status(401).render('login',viewData(req,{error:'Wachtwoord onjuist.'})); req.session.userId=user._id.toString(); req.session.email=user.email; req.session.totpPassed=false; if(!user.twoFASecret)return res.redirect('/setup-2fa'); return res.redirect('/verify-2fa'); }catch(err){console.error(err); return res.status(500).render('login',viewData(req,{error:'Er ging iets mis bij inloggen.'}));}});
app.get('/setup-2fa',requireLogin,async(req,res)=>{ const user=await User.findById(req.session.userId); if(!user)return res.redirect('/login'); const secret=speakeasy.generateSecret({name:`${APP_NAME} (${user.email})`}); req.session.pendingTwoFASecret=secret.base32; const qr=await QRCode.toDataURL(secret.otpauth_url); res.render('setup-2fa',viewData(req,{qr,secret:secret.base32,error:null}));});
app.post('/setup-2fa',requireLogin,async(req,res)=>{ const token=String(req.body.token||'').replace(/\s/g,''); const secret=req.session.pendingTwoFASecret; if(!secret)return res.redirect('/setup-2fa'); const verified=speakeasy.totp.verify({secret,encoding:'base32',token,window:1}); if(!verified){const qr=await QRCode.toDataURL(speakeasy.otpauthURL({secret,label:APP_NAME,encoding:'base32'})); return res.status(401).render('setup-2fa',viewData(req,{qr,secret,error:'Authenticator-code is onjuist.'}));} await User.findByIdAndUpdate(req.session.userId,{twoFASecret:secret}); delete req.session.pendingTwoFASecret; req.session.totpPassed=true; return res.redirect('/dashboard');});
app.get('/verify-2fa',requireLogin,async(req,res)=>{ const user=await User.findById(req.session.userId); if(!user||!user.twoFASecret)return res.redirect('/setup-2fa'); res.render('verify-2fa',viewData(req,{error:null}));});
app.post('/verify-2fa',requireLogin,async(req,res)=>{ const user=await User.findById(req.session.userId); if(!user||!user.twoFASecret)return res.redirect('/setup-2fa'); const token=String(req.body.token||'').replace(/\s/g,''); const verified=speakeasy.totp.verify({secret:user.twoFASecret,encoding:'base32',token,window:1}); if(!verified)return res.status(401).render('verify-2fa',viewData(req,{error:'Authenticator-code is onjuist.'})); req.session.totpPassed=true; return res.redirect('/dashboard');});
app.post('/logout',(req,res)=>req.session.destroy(()=>res.redirect('/')));

app.get('/dashboard',requireAuth,async(req,res)=>{ const [candidates,institutions,subsidies,documents]=await Promise.all([Candidate.countDocuments(),Institution.countDocuments(),Subsidy.countDocuments(),Document.countDocuments()]); res.render('dashboard',viewData(req,{email:req.session.email,counts:{candidates,institutions,subsidies,documents}}));});
app.get('/portal',(req,res)=>res.redirect('/dashboard'));
async function listRoute(url, Model, title, type, fields){ app.get(url,requireAuth,async(req,res)=>{ const items=await Model.find().sort({createdAt:-1}).lean(); res.render('list',viewData(req,{title,type,items,fields}));}); app.post(url,requireAuth,async(req,res)=>{ await Model.create(req.body); res.redirect(url);}); }
listRoute('/candidates',Candidate,'Kandidatenbeheer','candidates',['name','email','profession','country','status','notes']);
listRoute('/institutions',Institution,'Zorginstellingenbeheer','institutions',['name','contact','email','city','demand','status']);
listRoute('/subsidies',Subsidy,'Subsidiebeheer','subsidies',['title','program','deadline','status','notes']);
listRoute('/documents',Document,'Documentbeheer','documents',['title','category','language','status','notes']);
app.post('/delete/:type/:id',requireAuth,async(req,res)=>{ const map={candidates:Candidate,institutions:Institution,subsidies:Subsidy,documents:Document}; const Model=map[req.params.type]; if(Model)await Model.findByIdAndDelete(req.params.id); res.redirect('/'+req.params.type);});
app.use((req,res)=>res.status(404).render('page',viewData(req,{eyebrow:'404',title:'Pagina niet gevonden',subtitle:'Deze pagina bestaat niet.',heroClass:'contact',cards:[['Home','Ga terug naar de homepage.'],['Portal','Open de beveiligde omgeving.']]})));

mongoose.connect(MONGODB_URI).then(async()=>{ console.log('MongoDB verbonden'); await seedAdmin(); app.listen(PORT,()=>console.log(`${APP_NAME} draait op poort ${PORT}`));}).catch(err=>{console.error('MongoDB fout:',err);process.exit(1);});
