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
    langName: 'Polski',
    nav_home: 'Start',
    nav_foundation: 'Fundacja',
    nav_company: 'Spółka',
    nav_institutions: 'Placówki medyczne',
    nav_candidates: 'Kandydaci',
    nav_subsidies: 'Dotacje',
    nav_contact: 'Kontakt',
    nav_portal: 'Bezpieczny portal',
    badge: 'Kolumbia → Polska • Kadry medyczne',
    hero_title: 'Międzynarodowi specjaliści medyczni dla polskiej ochrony zdrowia',
    hero_lead: 'Honor Care Poland łączy starannie wybranych specjalistów z Kolumbii z placówkami medycznymi w Polsce. Organizujemy rekrutację, przygotowanie językowe, integrację, dokumenty, procesy partnerskie i bezpieczne zarządzanie projektem.',
    cta_primary: 'Otwórz portal',
    cta_secondary: 'Zobacz program',
    trust_1: 'Rekrutacja',
    trust_2: 'Weryfikacja',
    trust_3: 'Język',
    trust_4: 'Integracja',
    trust_5: 'Dokumenty',
    section_platform_title: 'Jedna profesjonalna struktura: fundacja, spółka i bezpieczny portal',
    section_platform_text: 'Projekt został podzielony na przejrzyste obszary: działalność społeczna i dotacyjna w fundacji oraz działalność operacyjna w spółce. Wszystkie procesy są wspierane przez bezpieczny portal.',
    foundation_title: 'Fundacja Honor Care Poland',
    foundation_text: 'Fundacja odpowiada za integrację, edukację, projekty społeczne, język i programy dotacyjne.',
    company_title: 'Honor Care Poland Sp. z o.o.',
    company_text: 'Spółka operacyjna obsługuje rekrutację, partnerstwa z placówkami, matching, CRM i kontrakty.',
    portal_title: 'Bezpieczny portal zarządzania',
    portal_text: 'Portal obejmuje logowanie 2FA, kandydatów, placówki, dotacje i dokumenty.',
    workflow_title: 'Od selekcji do stabilnego zatrudnienia',
    workflow_1_title: 'Selekcja w Kolumbii',
    workflow_1_text: 'Profil zawodowy, doświadczenie, motywacja, dokumenty i wstępna ocena.',
    workflow_2_title: 'Przygotowanie do Polski',
    workflow_2_text: 'Język, kultura pracy, dokumentacja i indywidualny plan integracji.',
    workflow_3_title: 'Wdrożenie w placówce',
    workflow_3_text: 'Matching z pracodawcą, onboarding, monitoring i dalsze wsparcie.',
    stats_languages: 'Języki',
    stats_security: 'Bezpieczeństwo',
    stats_modules: 'Moduły',
    stats_routes: 'Ścieżki dotacji',
    login_title: 'Bezpieczne logowanie',
    login_sub: 'Dostęp do kandydatów, dotacji, placówek i dokumentów.',
    email: 'E-mail',
    password: 'Hasło',
    login_button: 'Zaloguj',
    dashboard: 'Panel zarządzania',
    welcome: 'Witaj',
    manage_text: 'Zarządzaj kandydatami, placówkami medycznymi, dotacjami i dokumentami.',
    candidates: 'Kandydaci',
    institutions: 'Placówki medyczne',
    subsidies: 'Dotacje',
    documents: 'Dokumenty',
    logout: 'Wyloguj',
    add: 'Dodaj',
    back_dashboard: 'Powrót do panelu',
    delete: 'Usuń',
    twofa_setup: 'Konfiguracja Authenticatora',
    twofa_verify: 'Kod Authenticatora',
    twofa_setup_text: 'Zeskanuj kod QR w Google Authenticator, Microsoft Authenticator lub 1Password.',
    twofa_verify_text: 'Wpisz 6-cyfrowy kod z aplikacji.',
    activate: 'Aktywuj',
    verify: 'Zweryfikuj',
    invalid_user: 'Nie znaleziono użytkownika.',
    invalid_password: 'Nieprawidłowe hasło.',
    invalid_code: 'Nieprawidłowy kod Authenticatora.',
    login_error: 'Wystąpił błąd podczas logowania.',
    page_not_found: 'Strona nie została znaleziona',
    page_not_found_text: 'Ta strona nie istnieje.'
  },
  nl: {
    langName: 'Nederlands',
    nav_home: 'Home',
    nav_foundation: 'Stichting',
    nav_company: 'Werkmaatschappij',
    nav_institutions: 'Zorginstellingen',
    nav_candidates: 'Kandidaten',
    nav_subsidies: 'Subsidies',
    nav_contact: 'Contact',
    nav_portal: 'Beveiligde portal',
    badge: 'Colombia → Polen • Zorgpersoneel',
    hero_title: 'Internationale zorgprofessionals voor de Poolse zorgmarkt',
    hero_lead: 'Honor Care Poland verbindt zorgvuldig geselecteerde zorgprofessionals uit Colombia met zorginstellingen in Polen. Wij organiseren recruitment, taalvoorbereiding, integratie, documentbeheer, partnerschappen en veilige projectsturing.',
    cta_primary: 'Open portal',
    cta_secondary: 'Bekijk programma',
    trust_1: 'Recruitment',
    trust_2: 'Screening',
    trust_3: 'Taal',
    trust_4: 'Integratie',
    trust_5: 'Documenten',
    section_platform_title: 'Eén professionele structuur: stichting, werkmaatschappij en beveiligde portal',
    section_platform_text: 'Het project is helder gescheiden: maatschappelijke en subsidiegerichte activiteiten via de stichting, commerciële uitvoering via de werkmaatschappij. Alle processen worden ondersteund door een beveiligde portal.',
    foundation_title: 'Stichting Honor Care Poland',
    foundation_text: 'De stichting richt zich op integratie, opleiding, taal, sociale begeleiding en subsidieprojecten.',
    company_title: 'Honor Care Poland Werkmaatschappij',
    company_text: 'De werkmaatschappij beheert recruitment, zorginstellingen, matching, CRM en contracten.',
    portal_title: 'Beveiligde managementportal',
    portal_text: 'De portal bevat 2FA-login, kandidatenbeheer, zorginstellingenbeheer, subsidiebeheer en documentbeheer.',
    workflow_title: 'Van selectie tot duurzame plaatsing',
    workflow_1_title: 'Selectie in Colombia',
    workflow_1_text: 'Beroepsprofiel, ervaring, motivatie, documenten en eerste beoordeling.',
    workflow_2_title: 'Voorbereiding op Polen',
    workflow_2_text: 'Taal, werkcultuur, documentatie en persoonlijk integratieplan.',
    workflow_3_title: 'Start bij zorginstelling',
    workflow_3_text: 'Matching, onboarding, monitoring en doorlopende begeleiding.',
    stats_languages: 'Talen',
    stats_security: 'Beveiliging',
    stats_modules: 'Modules',
    stats_routes: 'Subsidieroutes',
    login_title: 'Beveiligde login',
    login_sub: 'Toegang tot kandidaten, subsidies, zorginstellingen en documenten.',
    email: 'E-mail',
    password: 'Wachtwoord',
    login_button: 'Inloggen',
    dashboard: 'Dashboard',
    welcome: 'Welkom',
    manage_text: 'Beheer kandidaten, zorginstellingen, subsidies en documenten.',
    candidates: 'Kandidaten',
    institutions: 'Zorginstellingen',
    subsidies: 'Subsidies',
    documents: 'Documenten',
    logout: 'Uitloggen',
    add: 'Toevoegen',
    back_dashboard: 'Terug naar dashboard',
    delete: 'Verwijderen',
    twofa_setup: 'Authenticator instellen',
    twofa_verify: 'Authenticator-code',
    twofa_setup_text: 'Scan de QR-code met Google Authenticator, Microsoft Authenticator of 1Password.',
    twofa_verify_text: 'Vul je 6-cijferige code in.',
    activate: 'Activeren',
    verify: 'Verifiëren',
    invalid_user: 'Gebruiker niet gevonden.',
    invalid_password: 'Wachtwoord onjuist.',
    invalid_code: 'Authenticator-code is onjuist.',
    login_error: 'Er ging iets mis bij inloggen.',
    page_not_found: 'Pagina niet gevonden',
    page_not_found_text: 'Deze pagina bestaat niet.'
  },
  es: {
    langName: 'Español',
    nav_home: 'Inicio',
    nav_foundation: 'Fundación',
    nav_company: 'Empresa operativa',
    nav_institutions: 'Instituciones de salud',
    nav_candidates: 'Candidatos',
    nav_subsidies: 'Subsidios',
    nav_contact: 'Contacto',
    nav_portal: 'Portal seguro',
    badge: 'Colombia → Polonia • Talento sanitario',
    hero_title: 'Profesionales sanitarios internacionales para el mercado polaco',
    hero_lead: 'Honor Care Poland conecta profesionales sanitarios cuidadosamente seleccionados de Colombia con instituciones de salud en Polonia. Organizamos reclutamiento, preparación lingüística, integración, documentación, alianzas y gestión segura del proyecto.',
    cta_primary: 'Abrir portal',
    cta_secondary: 'Ver programa',
    trust_1: 'Reclutamiento',
    trust_2: 'Evaluación',
    trust_3: 'Idioma',
    trust_4: 'Integración',
    trust_5: 'Documentos',
    section_platform_title: 'Una estructura profesional: fundación, empresa operativa y portal seguro',
    section_platform_text: 'El proyecto separa claramente las actividades sociales y de subsidios en la fundación, y la ejecución comercial en la empresa operativa. Todos los procesos se gestionan desde un portal seguro.',
    foundation_title: 'Fundación Honor Care Poland',
    foundation_text: 'La fundación se enfoca en integración, educación, idioma, acompañamiento social y proyectos subvencionados.',
    company_title: 'Empresa operativa Honor Care Poland',
    company_text: 'La empresa operativa gestiona reclutamiento, instituciones sanitarias, matching, CRM y contratos.',
    portal_title: 'Portal seguro de gestión',
    portal_text: 'El portal incluye acceso con 2FA, gestión de candidatos, instituciones, subsidios y documentos.',
    workflow_title: 'De la selección a una colocación sostenible',
    workflow_1_title: 'Selección en Colombia',
    workflow_1_text: 'Perfil profesional, experiencia, motivación, documentos y evaluación inicial.',
    workflow_2_title: 'Preparación para Polonia',
    workflow_2_text: 'Idioma, cultura laboral, documentación y plan personal de integración.',
    workflow_3_title: 'Inicio en la institución',
    workflow_3_text: 'Matching, onboarding, seguimiento y acompañamiento continuo.',
    stats_languages: 'Idiomas',
    stats_security: 'Seguridad',
    stats_modules: 'Módulos',
    stats_routes: 'Rutas de subsidio',
    login_title: 'Acceso seguro',
    login_sub: 'Acceso a candidatos, subsidios, instituciones y documentos.',
    email: 'Correo electrónico',
    password: 'Contraseña',
    login_button: 'Iniciar sesión',
    dashboard: 'Panel de control',
    welcome: 'Bienvenido',
    manage_text: 'Gestiona candidatos, instituciones sanitarias, subsidios y documentos.',
    candidates: 'Candidatos',
    institutions: 'Instituciones',
    subsidies: 'Subsidios',
    documents: 'Documentos',
    logout: 'Cerrar sesión',
    add: 'Añadir',
    back_dashboard: 'Volver al panel',
    delete: 'Eliminar',
    twofa_setup: 'Configurar Authenticator',
    twofa_verify: 'Código Authenticator',
    twofa_setup_text: 'Escanea el código QR con Google Authenticator, Microsoft Authenticator o 1Password.',
    twofa_verify_text: 'Introduce el código de 6 dígitos.',
    activate: 'Activar',
    verify: 'Verificar',
    invalid_user: 'Usuario no encontrado.',
    invalid_password: 'Contraseña incorrecta.',
    invalid_code: 'Código Authenticator incorrecto.',
    login_error: 'Se produjo un error al iniciar sesión.',
    page_not_found: 'Página no encontrada',
    page_not_found_text: 'Esta página no existe.'
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

const User = mongoose.model('User', new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  passwordHash: { type: String, required: true },
  twoFASecret: { type: String, default: null },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
}));

const Candidate = mongoose.model('Candidate', new mongoose.Schema({
  name: String, email: String, profession: String, country: { type: String, default: 'Colombia' },
  status: { type: String, default: 'screening' }, notes: String, createdAt: { type: Date, default: Date.now }
}));

const Institution = mongoose.model('Institution', new mongoose.Schema({
  name: String, contact: String, email: String, city: String, demand: String,
  status: { type: String, default: 'lead' }, createdAt: { type: Date, default: Date.now }
}));

const Subsidy = mongoose.model('Subsidy', new mongoose.Schema({
  title: String, program: String, deadline: String, status: { type: String, default: 'research' },
  notes: String, createdAt: { type: Date, default: Date.now }
}));

const Document = mongoose.model('Document', new mongoose.Schema({
  title: String, category: String, language: String, status: { type: String, default: 'draft' },
  notes: String, createdAt: { type: Date, default: Date.now }
}));

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 1000 * 60 * 60 * 8 },
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
  if (['pl','nl','es'].includes(req.params.lang)) req.session.lang = req.params.lang;
  res.redirect(req.get('Referrer') || '/');
});

app.get('/', (req, res) => res.render('home', viewData(req)));

app.get('/stichting', (req, res) => res.render('page', viewData(req, {
  pageKey: 'foundation',
  title: translations[currentLang(req)].foundation_title,
  text: translations[currentLang(req)].foundation_text
})));

app.get('/werkmaatschappij', (req, res) => res.render('page', viewData(req, {
  pageKey: 'company',
  title: translations[currentLang(req)].company_title,
  text: translations[currentLang(req)].company_text
})));

app.get('/zorginstellingen', (req, res) => res.render('page', viewData(req, {
  pageKey: 'institutions',
  title: translations[currentLang(req)].nav_institutions,
  text: translations[currentLang(req)].section_platform_text
})));

app.get('/kandidaten-info', (req, res) => res.render('page', viewData(req, {
  pageKey: 'candidates',
  title: translations[currentLang(req)].nav_candidates,
  text: translations[currentLang(req)].workflow_1_text
})));

app.get('/subsidies-info', (req, res) => res.render('page', viewData(req, {
  pageKey: 'subsidies',
  title: translations[currentLang(req)].nav_subsidies,
  text: translations[currentLang(req)].section_platform_text
})));

app.get('/contact', (req, res) => res.render('page', viewData(req, {
  pageKey: 'contact',
  title: translations[currentLang(req)].nav_contact,
  text: 'Warszawa • Bogotá • Nederland'
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
    if (!user) return res.status(401).render('login', viewData(req, { error: translations[currentLang(req)].invalid_user }));
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).render('login', viewData(req, { error: translations[currentLang(req)].invalid_password }));
    req.session.userId = user._id.toString();
    req.session.email = user.email;
    req.session.totpPassed = false;
    if (!user.twoFASecret) return res.redirect('/setup-2fa');
    return res.redirect('/verify-2fa');
  } catch (err) {
    console.error(err);
    return res.status(500).render('login', viewData(req, { error: translations[currentLang(req)].login_error }));
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
  const token = String(req.body.token || '').replace(/\s/g, '');
  const secret = req.session.pendingTwoFASecret;
  if (!secret) return res.redirect('/setup-2fa');
  const verified = speakeasy.totp.verify({ secret, encoding: 'base32', token, window: 1 });
  if (!verified) {
    const qr = await QRCode.toDataURL(speakeasy.otpauthURL({ secret, label: APP_NAME, encoding: 'base32' }));
    return res.status(401).render('setup-2fa', viewData(req, { qr, secret, error: translations[currentLang(req)].invalid_code }));
  }
  await User.findByIdAndUpdate(req.session.userId, { twoFASecret: secret });
  delete req.session.pendingTwoFASecret;
  req.session.totpPassed = true;
  res.redirect('/dashboard');
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
  if (!verified) return res.status(401).render('verify-2fa', viewData(req, { error: translations[currentLang(req)].invalid_code }));
  req.session.totpPassed = true;
  res.redirect('/dashboard');
});

app.post('/logout', (req, res) => req.session.destroy(() => res.redirect('/')));

app.get('/dashboard', requireAuth, async (req, res) => {
  const [candidates, institutions, subsidies, documents] = await Promise.all([
    Candidate.countDocuments(), Institution.countDocuments(), Subsidy.countDocuments(), Document.countDocuments()
  ]);
  res.render('dashboard', viewData(req, { email: req.session.email, counts: { candidates, institutions, subsidies, documents } }));
});

app.get('/portal', (req, res) => res.redirect('/dashboard'));

function listRoute(url, Model, titleKey, type, fields) {
  app.get(url, requireAuth, async (req, res) => {
    const items = await Model.find().sort({ createdAt: -1 }).lean();
    res.render('list', viewData(req, { title: translations[currentLang(req)][titleKey], type, items, fields }));
  });
  app.post(url, requireAuth, async (req, res) => {
    await Model.create(req.body);
    res.redirect(url);
  });
}

listRoute('/candidates', Candidate, 'candidates', 'candidates', ['name','email','profession','country','status','notes']);
listRoute('/institutions', Institution, 'institutions', 'institutions', ['name','contact','email','city','demand','status']);
listRoute('/subsidies', Subsidy, 'subsidies', 'subsidies', ['title','program','deadline','status','notes']);
listRoute('/documents', Document, 'documents', 'documents', ['title','category','language','status','notes']);

app.post('/delete/:type/:id', requireAuth, async (req, res) => {
  const map = { candidates: Candidate, institutions: Institution, subsidies: Subsidy, documents: Document };
  const Model = map[req.params.type];
  if (Model) await Model.findByIdAndDelete(req.params.id);
  res.redirect('/' + req.params.type);
});

app.use((req, res) => res.status(404).render('page', viewData(req, {
  pageKey: '404',
  title: translations[currentLang(req)].page_not_found,
  text: translations[currentLang(req)].page_not_found_text
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
