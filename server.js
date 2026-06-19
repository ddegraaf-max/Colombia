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

if (!MONGODB_URI) {
  console.error('MONGODB_URI ontbreekt. Zet MongoDB op Railway en gebruik ${{MongoDB.MONGO_URL}}.');
  process.exit(1);
}

const translations = {
  pl: {
    nav_home:'Start', nav_foundation:'Fundacja', nav_company:'Spółka operacyjna', nav_institutions:'Placówki medyczne', nav_candidates:'Kandydaci', nav_subsidies:'Dotacje', nav_portal:'Portal',
    hero_title:'Międzynarodowe rozwiązania kadrowe dla polskiej opieki zdrowotnej',
    hero_lead:'Łączymy wykwalifikowanych specjalistów z Kolumbii z placówkami medycznymi w Polsce. Rekrutacja, język, integracja, dokumenty i bezpieczny portal w jednym systemie.',
    cta:'Otwórz portal', secondary:'Zobacz program',
    foundation_title:'Fundacja Honor Care Poland',
    company_title:'Honor Care Poland Sp. z o.o.',
    login_title:'Bezpieczne logowanie'
  },
  nl: {
    nav_home:'Home', nav_foundation:'Stichting', nav_company:'Werkmaatschappij', nav_institutions:'Zorginstellingen', nav_candidates:'Kandidaten', nav_subsidies:'Subsidies', nav_portal:'Portal',
    hero_title:'Internationale zorgprofessionals voor de Poolse zorgmarkt',
    hero_lead:'Wij verbinden gekwalificeerde zorgprofessionals uit Colombia met zorginstellingen in Polen. Recruitment, taal, integratie, documenten en beveiligd beheer in één platform.',
    cta:'Open portal', secondary:'Bekijk programma',
    foundation_title:'Stichting Honor Care Poland',
    company_title:'Honor Care Poland Werkmaatschappij',
    login_title:'Beveiligde login'
  },
  es: {
    nav_home:'Inicio', nav_foundation:'Fundación', nav_company:'Empresa operativa', nav_institutions:'Instituciones de salud', nav_candidates:'Candidatos', nav_subsidies:'Subsidios', nav_portal:'Portal',
    hero_title:'Profesionales internacionales para el mercado sanitario polaco',
    hero_lead:'Conectamos profesionales sanitarios cualificados de Colombia con instituciones de salud en Polonia. Reclutamiento, idioma, integración, documentos y portal seguro en una sola plataforma.',
    cta:'Abrir portal', secondary:'Ver programa',
    foundation_title:'Fundación Honor Care Poland',
    company_title:'Empresa Honor Care Poland',
    login_title:'Acceso seguro'
  }
};

function currentLang(req) {
  const lang = req.session?.lang || 'pl';
  return ['pl','nl','es'].includes(lang) ? lang : 'pl';
}

function viewData(req, extra = {}) {
  const lang = currentLang(req);
  return { appName: APP_NAME, lang, t: translations[lang], ...extra };
}

mongoose.set('strictQuery', true);

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  passwordHash: { type: String, required: true },
  twoFASecret: { type: String, default: null },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

const candidateSchema = new mongoose.Schema({
  name: String, email: String, profession: String, country: { type: String, default: 'Colombia' },
  status: { type: String, default: 'screening' }, notes: String, createdAt: { type: Date, default: Date.now }
});

const institutionSchema = new mongoose.Schema({
  name: String, contact: String, email: String, city: String, demand: String, status: { type: String, default: 'lead' }, createdAt: { type: Date, default: Date.now }
});

const subsidySchema = new mongoose.Schema({
  title: String, program: String, deadline: String, status: { type: String, default: 'research' }, notes: String, createdAt: { type: Date, default: Date.now }
});

const documentSchema = new mongoose.Schema({
  title: String, category: String, language: String, status: { type: String, default: 'draft' }, notes: String, createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Candidate = mongoose.model('Candidate', candidateSchema);
const Institution = mongoose.model('Institution', institutionSchema);
const Subsidy = mongoose.model('Subsidy', subsidySchema);
const Document = mongoose.model('Document', documentSchema);

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

function requireLogin(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.redirect('/login');
}

function requireAuth(req, res, next) {
  if (req.session && req.session.userId && req.session.totpPassed) return next();
  if (req.session && req.session.userId) return res.redirect('/verify-2fa');
  return res.redirect('/login');
}

async function seedAdmin() {
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (!existing) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({ email: ADMIN_EMAIL, passwordHash, role: 'admin' });
    console.log(`Admin aangemaakt: ${ADMIN_EMAIL}`);
  } else {
    console.log(`Admin bestaat al: ${ADMIN_EMAIL}`);
  }
}

app.get('/lang/:lang', (req, res) => {
  const lang = req.params.lang;
  if (['pl', 'nl', 'es'].includes(lang)) req.session.lang = lang;
  res.redirect(req.get('Referrer') || '/');
});

app.get('/', (req, res) => res.render('home', viewData(req)));
app.get('/stichting', (req, res) => res.render('page', viewData(req, {
  title: translations[currentLang(req)].foundation_title,
  subtitle: 'Opleiding, integratie en maatschappelijke ondersteuning.',
  cards: ['Taalopleiding', 'Integratie', 'Subsidieprojecten', 'Maatschappelijke begeleiding']
})));
app.get('/werkmaatschappij', (req, res) => res.render('page', viewData(req, {
  title: translations[currentLang(req)].company_title,
  subtitle: 'Recruitment, matching, compliance en plaatsing.',
  cards: ['Recruitment Colombia', 'Screening', 'Zorginstellingen CRM', 'Contractbeheer']
})));
app.get('/zorginstellingen', (req, res) => res.render('page', viewData(req, {
  title: translations[currentLang(req)].nav_institutions,
  subtitle: 'Voor ziekenhuizen, klinieken, tandartspraktijken, huisartsen en zorgorganisaties.',
  cards: ['Personeelsvraag', 'Matching', 'Documentcontrole', 'Integratieplan']
})));
app.get('/kandidaten-info', (req, res) => res.render('page', viewData(req, {
  title: translations[currentLang(req)].nav_candidates,
  subtitle: 'Voor zorgprofessionals uit Colombia die in Polen willen werken.',
  cards: ['Registratie', 'Taaltraject', 'Diploma check', 'Begeleiding']
})));
app.get('/subsidies-info', (req, res) => res.render('page', viewData(req, {
  title: translations[currentLang(req)].nav_subsidies,
  subtitle: 'Subsidieroutes voor integratie, taal, arbeidsmarkt en zorgcapaciteit.',
  cards: ['AMIF', 'ESF+', 'FERS', 'Regionale fondsen']
})));
app.get('/contact', (req, res) => res.render('page', viewData(req, {
  title: 'Contact',
  subtitle: 'Warszawa • Bogotá • Nederland',
  cards: ['info@honorcarepoland.eu', 'Partnergesprekken', 'Zorginstellingen', 'Kandidaten']
})));

app.get('/login', (req, res) => {
  if (req.session?.userId && req.session?.totpPassed) return res.redirect('/dashboard');
  res.render('login', viewData(req, { error: null }));
});

app.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    const user = await User.findOne({ email });
    if (!user) return res.status(401).render('login', viewData(req, { error: 'Gebruiker niet gevonden.' }));

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).render('login', viewData(req, { error: 'Wachtwoord onjuist.' }));

    req.session.userId = user._id.toString();
    req.session.email = user.email;
    req.session.totpPassed = false;

    if (!user.twoFASecret) return res.redirect('/setup-2fa');
    return res.redirect('/verify-2fa');
  } catch (err) {
    console.error(err);
    return res.status(500).render('login', viewData(req, { error: 'Er ging iets mis bij inloggen.' }));
  }
});

app.get('/setup-2fa', requireLogin, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user) return res.redirect('/login');

  const secret = speakeasy.generateSecret({ name: `${APP_NAME} (${user.email})` });
  req.session.pendingTwoFASecret = secret.base32;
  const qr = await QRCode.toDataURL(secret.otpauth_url);

  res.render('setup-2fa', viewData(req, { qr, secret: secret.base32, error: null }));
});

app.post('/setup-2fa', requireLogin, async (req, res) => {
  try {
    const token = String(req.body.token || '').replace(/\s/g, '');
    const secret = req.session.pendingTwoFASecret;
    if (!secret) return res.redirect('/setup-2fa');

    const verified = speakeasy.totp.verify({ secret, encoding: 'base32', token, window: 1 });
    if (!verified) {
      const qr = await QRCode.toDataURL(speakeasy.otpauthURL({ secret, label: APP_NAME, encoding: 'base32' }));
      return res.status(401).render('setup-2fa', viewData(req, { qr, secret, error: 'Authenticator-code is onjuist.' }));
    }

    await User.findByIdAndUpdate(req.session.userId, { twoFASecret: secret });
    delete req.session.pendingTwoFASecret;
    req.session.totpPassed = true;
    return res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    return res.redirect('/setup-2fa');
  }
});

app.get('/verify-2fa', requireLogin, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user || !user.twoFASecret) return res.redirect('/setup-2fa');
  res.render('verify-2fa', viewData(req, { error: null }));
});

app.post('/verify-2fa', requireLogin, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user || !user.twoFASecret) return res.redirect('/setup-2fa');

  const token = String(req.body.token || '').replace(/\s/g, '');
  const verified = speakeasy.totp.verify({ secret: user.twoFASecret, encoding: 'base32', token, window: 1 });

  if (!verified) return res.status(401).render('verify-2fa', viewData(req, { error: 'Authenticator-code is onjuist.' }));

  req.session.totpPassed = true;
  return res.redirect('/dashboard');
});

app.post('/logout', (req, res) => req.session.destroy(() => res.redirect('/')));

app.get('/dashboard', requireAuth, async (req, res) => {
  const [candidates, institutions, subsidies, documents] = await Promise.all([
    Candidate.countDocuments(), Institution.countDocuments(), Subsidy.countDocuments(), Document.countDocuments()
  ]);
  res.render('dashboard', viewData(req, { email: req.session.email, counts: { candidates, institutions, subsidies, documents } }));
});

app.get('/portal', (req, res) => res.redirect('/dashboard'));

app.get('/candidates', requireAuth, async (req, res) => {
  const items = await Candidate.find().sort({ createdAt: -1 }).lean();
  res.render('list', viewData(req, {
    title: 'Kandidatenbeheer',
    type: 'candidates',
    items,
    fields: ['name','email','profession','country','status','notes']
  }));
});

app.post('/candidates', requireAuth, async (req, res) => {
  await Candidate.create(req.body);
  res.redirect('/candidates');
});

app.get('/institutions', requireAuth, async (req, res) => {
  const items = await Institution.find().sort({ createdAt: -1 }).lean();
  res.render('list', viewData(req, {
    title: 'Zorginstellingenbeheer',
    type: 'institutions',
    items,
    fields: ['name','contact','email','city','demand','status']
  }));
});

app.post('/institutions', requireAuth, async (req, res) => {
  await Institution.create(req.body);
  res.redirect('/institutions');
});

app.get('/subsidies', requireAuth, async (req, res) => {
  const items = await Subsidy.find().sort({ createdAt: -1 }).lean();
  res.render('list', viewData(req, {
    title: 'Subsidiebeheer',
    type: 'subsidies',
    items,
    fields: ['title','program','deadline','status','notes']
  }));
});

app.post('/subsidies', requireAuth, async (req, res) => {
  await Subsidy.create(req.body);
  res.redirect('/subsidies');
});

app.get('/documents', requireAuth, async (req, res) => {
  const items = await Document.find().sort({ createdAt: -1 }).lean();
  res.render('list', viewData(req, {
    title: 'Documentbeheer',
    type: 'documents',
    items,
    fields: ['title','category','language','status','notes']
  }));
});

app.post('/documents', requireAuth, async (req, res) => {
  await Document.create(req.body);
  res.redirect('/documents');
});

app.post('/delete/:type/:id', requireAuth, async (req, res) => {
  const map = { candidates: Candidate, institutions: Institution, subsidies: Subsidy, documents: Document };
  const Model = map[req.params.type];
  if (Model) await Model.findByIdAndDelete(req.params.id);
  res.redirect('/' + req.params.type);
});

app.use((req, res) => res.status(404).render('page', viewData(req, {
  title: 'Pagina niet gevonden',
  subtitle: 'Deze pagina bestaat niet.',
  cards: ['Ga terug naar Home', 'Open Portal']
})));

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('MongoDB verbonden');
    await seedAdmin();
    app.listen(PORT, () => console.log(`${APP_NAME} draait op poort ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB fout:', err);
    process.exit(1);
  });
