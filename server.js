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
const APP_NAME = process.env.APP_NAME || 'Honor Care International';
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL;
const SESSION_SECRET = process.env.SESSION_SECRET || 'replace-this-secret';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@honorcarepoland.eu').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';

if (!MONGODB_URI) {
  console.error('MONGODB_URI ontbreekt. Zet MongoDB op Railway en gebruik ${{MongoDB.MONGO_URL}}.');
  process.exit(1);
}

const tx = {
  pl: {
    top_city: 'Bogotá, Kolumbia',
    top_city2: 'Warszawa, Polska',
    slogan: 'CAŁA OPIEKA. JEDNO KOMPLETNE ROZWIĄZANIE.',
    nav_home: 'Strona główna',
    nav_about: 'O nas',
    nav_institutions: 'Dla instytucji',
    nav_professionals: 'Dla profesjonalistów',
    nav_academy: 'Academy',
    nav_housing: 'Mieszkania',
    nav_poland: 'Polska',
    nav_contact: 'Kontakt',
    nav_portal: 'Portal',
    hero_title_1: 'Kompletne rozwiązanie',
    hero_title_2: 'w opiece zdrowotnej',
    hero_title_3: 'dla Polski',
    hero_text: 'Honor Care International łączy wysoko wykwalifikowanych profesjonalistów z Kolumbii z placówkami medycznymi i organizacjami opieki w Polsce.',
    bullet_1: 'Rekrutacja międzynarodowa',
    bullet_2: 'Legalizacja dokumentów',
    bullet_3: 'Kursy języka polskiego',
    bullet_4: 'Mieszkania i integracja',
    bullet_5: 'Homologacja zawodowa',
    bullet_6: 'Opieka koordynatora',
    cta_inst: 'Dla instytucji',
    cta_pro: 'Dla profesjonalistów',
    cta_meeting: 'Umów spotkanie',
    specs: ['Lekarze ogólni','Specjaliści','Stomatolodzy','Pielęgniarki','Psycholodzy','Fizjoterapeuci','Farmaceuci','Higienistki stomatologiczne','Opiekunowie medyczni','Więcej specjalizacji'],
    card1_k: 'Dla profesjonalistów', card1_t: 'Pracuj w Polsce z nami', card1_b: 'Zacznij swoją przyszłość',
    card2_k: 'Dla instytucji', card2_t: 'Realne rozwiązania dla braków kadrowych', card2_b: 'Poproś o ofertę',
    card3_k: 'Honor Care Academy', card3_t: 'Szkolenia i rozwój zawodowy', card3_b: 'Przejdź do academy',
    card4_k: 'Mieszkania i wellbeing', card4_t: 'Dużo więcej niż rekrutacja', card4_b: 'Zobacz mieszkania',
    card_li_1: ['Atrakcyjne warunki pracy','Legalna praca i pełne wsparcie','Pomoc w uznaniu kwalifikacji','Zakwaterowanie zorganizowane','Wsparcie dla rodziny'],
    card_li_2: ['Wyselekcjonowani kandydaci','Ocena językowa i zawodowa','Wsparcie w formalnościach','Uznanie kwalifikacji','Stała opieka koordynatora'],
    card_li_3: ['Kursy języka polskiego A1–B2','Terminologia medyczna','Kultura pracy w Polsce','Przygotowanie do pracy','Szkolenia online z Kolumbii'],
    card_li_4: ['Nowoczesne mieszkania','Blisko miejsca pracy','Wsparcie w integracji','Bezpieczne lokalizacje','Dla profesjonalistów i rodzin'],
    why_k: 'Dlaczego Polska?',
    why_t: 'Stabilna przyszłość w sercu Europy',
    why_text: 'Polska oferuje doskonałe możliwości rozwoju zawodowego, bezpieczeństwo i wysoką jakość życia.',
    why_btn: 'Dowiedz się więcej',
    stat1: 'Profesjonalistów w procesie',
    stat2: 'Placówek partnerskich',
    stat3: 'Dyscyplin medycznych',
    stat4: 'Kraje połączone jednym celem',
    partners: 'Nasi partnerzy',
    footer_text: 'Budujemy mosty między Kolumbią i Polską, łącząc talenty, możliwości i przyszłość.',
    links: 'Szybkie linki',
    office_pl: 'Polska – biuro główne',
    office_co: 'Kolumbia',
    newsletter: 'Newsletter',
    newsletter_text: 'Zapisz się, aby otrzymywać aktualności i oferty.',
    login_title: 'Bezpieczne logowanie',
    login_sub: 'Dostęp do kandydatów, instytucji, dotacji i dokumentów.',
    email: 'E-mail',
    password: 'Hasło',
    login: 'Zaloguj',
    dashboard: 'Panel zarządzania',
    welcome: 'Witaj',
    manage: 'Zarządzaj kandydatami, instytucjami, dotacjami i dokumentami.',
    candidates: 'Kandydaci',
    institutions: 'Instytucje',
    subsidies: 'Dotacje',
    documents: 'Dokumenty',
    logout: 'Wyloguj',
    add: 'Dodaj',
    delete: 'Usuń',
    back: 'Powrót do panelu',
    setup2fa: 'Konfiguracja Authenticatora',
    verify2fa: 'Kod Authenticatora',
    codeText: 'Wpisz 6-cyfrowy kod.',
    activate: 'Aktywuj',
    verify: 'Zweryfikuj',
    invalidUser: 'Nie znaleziono użytkownika.',
    invalidPass: 'Nieprawidłowe hasło.',
    invalidCode: 'Nieprawidłowy kod Authenticatora.'
  },
  nl: {
    top_city: 'Bogotá, Colombia',
    top_city2: 'Warschau, Polen',
    slogan: 'ALLE ZORG. ÉÉN COMPLETE OPLOSSING.',
    nav_home: 'Home',
    nav_about: 'Over ons',
    nav_institutions: 'Voor instellingen',
    nav_professionals: 'Voor professionals',
    nav_academy: 'Academy',
    nav_housing: 'Wonen',
    nav_poland: 'Polen',
    nav_contact: 'Contact',
    nav_portal: 'Portal',
    hero_title_1: 'De complete',
    hero_title_2: 'zorgoplossing',
    hero_title_3: 'voor Polen',
    hero_text: 'Honor Care International verbindt hooggekwalificeerde professionals uit Colombia met medische instellingen en zorgorganisaties in Polen.',
    bullet_1: 'Internationale recruitment',
    bullet_2: 'Legalisatie en documenten',
    bullet_3: 'Poolse taalcursussen',
    bullet_4: 'Wonen en integratie',
    bullet_5: 'Beroepserkenning',
    bullet_6: 'Coördinatorbegeleiding',
    cta_inst: 'Voor instellingen',
    cta_pro: 'Voor professionals',
    cta_meeting: 'Plan gesprek',
    specs: ['Huisartsen','Specialisten','Tandartsen','Verpleegkundigen','Psychologen','Fysiotherapeuten','Apothekers','Mondhygiënisten','Zorgassistenten','Meer specialisaties'],
    card1_k: 'Voor professionals', card1_t: 'Werk in Polen met ons', card1_b: 'Start je toekomst',
    card2_k: 'Voor instellingen', card2_t: 'Echte oplossingen voor personeelstekort', card2_b: 'Vraag informatie',
    card3_k: 'Honor Care Academy', card3_t: 'Training en professionele groei', card3_b: 'Naar academy',
    card4_k: 'Wonen en welzijn', card4_t: 'Veel meer dan recruitment', card4_b: 'Bekijk woningen',
    card_li_1: ['Aantrekkelijke arbeidsvoorwaarden','Legaal werk en volledige ondersteuning','Hulp bij erkenning van kwalificaties','Georganiseerde huisvesting','Ondersteuning voor familie'],
    card_li_2: ['Geselecteerde kandidaten','Taal- en beroepsscreening','Hulp bij formaliteiten','Erkenning van kwalificaties','Vaste coördinator'],
    card_li_3: ['Poolse taalcursussen A1–B2','Medische terminologie','Werkcultuur in Polen','Voorbereiding op werk','Online training vanuit Colombia'],
    card_li_4: ['Moderne woningen','Dicht bij werk','Integratieondersteuning','Veilige locaties','Voor professionals en gezinnen'],
    why_k: 'Waarom Polen?',
    why_t: 'Een stabiele toekomst in het hart van Europa',
    why_text: 'Polen biedt uitstekende kansen voor professionele groei, veiligheid en een hoge levenskwaliteit.',
    why_btn: 'Lees meer',
    stat1: 'Professionals in traject',
    stat2: 'Partnerinstellingen',
    stat3: 'Medische disciplines',
    stat4: 'Landen verbonden met één doel',
    partners: 'Onze partners',
    footer_text: 'Wij bouwen bruggen tussen Colombia en Polen en verbinden talent, kansen en toekomst.',
    links: 'Snelle links',
    office_pl: 'Polen – hoofdkantoor',
    office_co: 'Colombia',
    newsletter: 'Newsletter',
    newsletter_text: 'Schrijf je in voor updates en mogelijkheden.',
    login_title: 'Beveiligde login',
    login_sub: 'Toegang tot kandidaten, instellingen, subsidies en documenten.',
    email: 'E-mail',
    password: 'Wachtwoord',
    login: 'Inloggen',
    dashboard: 'Dashboard',
    welcome: 'Welkom',
    manage: 'Beheer kandidaten, instellingen, subsidies en documenten.',
    candidates: 'Kandidaten',
    institutions: 'Instellingen',
    subsidies: 'Subsidies',
    documents: 'Documenten',
    logout: 'Uitloggen',
    add: 'Toevoegen',
    delete: 'Verwijderen',
    back: 'Terug naar dashboard',
    setup2fa: 'Authenticator instellen',
    verify2fa: 'Authenticator-code',
    codeText: 'Vul je 6-cijferige code in.',
    activate: 'Activeren',
    verify: 'Verifiëren',
    invalidUser: 'Gebruiker niet gevonden.',
    invalidPass: 'Wachtwoord onjuist.',
    invalidCode: 'Authenticator-code is onjuist.'
  },
  es: {
    top_city: 'Bogotá, Colombia',
    top_city2: 'Varsovia, Polonia',
    slogan: 'TODO EL CUIDADO. UNA SOLUCIÓN COMPLETA.',
    nav_home: 'Inicio',
    nav_about: 'Sobre nosotros',
    nav_institutions: 'Para instituciones',
    nav_professionals: 'Para profesionales',
    nav_academy: 'Academy',
    nav_housing: 'Vivienda',
    nav_poland: 'Polonia',
    nav_contact: 'Contacto',
    nav_portal: 'Portal',
    hero_title_1: 'La solución',
    hero_title_2: 'completa de salud',
    hero_title_3: 'para Polonia',
    hero_text: 'Honor Care International conecta profesionales altamente calificados de Colombia con instituciones médicas y organizaciones de atención en Polonia.',
    bullet_1: 'Reclutamiento internacional',
    bullet_2: 'Legalización y documentos',
    bullet_3: 'Cursos de idioma polaco',
    bullet_4: 'Vivienda e integración',
    bullet_5: 'Homologación profesional',
    bullet_6: 'Acompañamiento del coordinador',
    cta_inst: 'Para instituciones',
    cta_pro: 'Para profesionales',
    cta_meeting: 'Planear reunión',
    specs: ['Médicos generales','Especialistas','Dentistas','Enfermeros','Psicólogos','Fisioterapeutas','Farmacéuticos','Higienistas dentales','Auxiliares de enfermería','Más disciplinas'],
    card1_k: 'Para profesionales', card1_t: 'Trabaja en Polonia con nosotros', card1_b: 'Comienza tu futuro',
    card2_k: 'Para instituciones', card2_t: 'Soluciones reales para escasez de personal', card2_b: 'Solicitar información',
    card3_k: 'Honor Care Academy', card3_t: 'Formación y crecimiento profesional', card3_b: 'Ir a la academy',
    card4_k: 'Vivienda y bienestar', card4_t: 'Mucho más que reclutamiento', card4_b: 'Ver viviendas',
    card_li_1: ['Condiciones laborales atractivas','Trabajo legal y apoyo completo','Ayuda con homologación profesional','Vivienda organizada','Apoyo para la familia'],
    card_li_2: ['Candidatos seleccionados','Evaluación lingüística y profesional','Apoyo en formalidades','Homologación profesional','Coordinador permanente'],
    card_li_3: ['Cursos de polaco A1–B2','Terminología médica','Cultura laboral en Polonia','Preparación para el trabajo','Formación online desde Colombia'],
    card_li_4: ['Viviendas modernas','Cerca del lugar de trabajo','Apoyo de integración','Ubicaciones seguras','Para profesionales y familias'],
    why_k: '¿Por qué Polonia?',
    why_t: 'Un futuro estable en el corazón de Europa',
    why_text: 'Polonia ofrece excelentes oportunidades de crecimiento profesional, seguridad y una alta calidad de vida.',
    why_btn: 'Conocer más',
    stat1: 'Profesionales en proceso',
    stat2: 'Instituciones asociadas',
    stat3: 'Disciplinas médicas',
    stat4: 'Países conectados con un objetivo',
    partners: 'Nuestros aliados',
    footer_text: 'Construimos puentes entre Colombia y Polonia, conectando talento, oportunidades y futuro.',
    links: 'Enlaces rápidos',
    office_pl: 'Polonia – oficina principal',
    office_co: 'Colombia',
    newsletter: 'Newsletter',
    newsletter_text: 'Suscríbete para recibir noticias y oportunidades.',
    login_title: 'Acceso seguro',
    login_sub: 'Acceso a candidatos, instituciones, subsidios y documentos.',
    email: 'Correo electrónico',
    password: 'Contraseña',
    login: 'Iniciar sesión',
    dashboard: 'Panel de control',
    welcome: 'Bienvenido',
    manage: 'Gestiona candidatos, instituciones, subsidios y documentos.',
    candidates: 'Candidatos',
    institutions: 'Instituciones',
    subsidies: 'Subsidios',
    documents: 'Documentos',
    logout: 'Cerrar sesión',
    add: 'Añadir',
    delete: 'Eliminar',
    back: 'Volver al panel',
    setup2fa: 'Configurar Authenticator',
    verify2fa: 'Código Authenticator',
    codeText: 'Introduce el código de 6 dígitos.',
    activate: 'Activar',
    verify: 'Verificar',
    invalidUser: 'Usuario no encontrado.',
    invalidPass: 'Contraseña incorrecta.',
    invalidCode: 'Código incorrecto.'
  }
};

function lang(req) {
  const l = req.session?.lang || 'pl';
  return ['pl','nl','es'].includes(l) ? l : 'pl';
}
function data(req, extra = {}) {
  const l = lang(req);
  return { appName: APP_NAME, lang: l, t: tx[l], ...extra };
}

mongoose.set('strictQuery', true);

const User = mongoose.model('User', new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  passwordHash: String,
  twoFASecret: { type: String, default: null },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
}));
const Candidate = mongoose.model('Candidate', new mongoose.Schema({ name:String,email:String,profession:String,country:{type:String,default:'Colombia'},status:{type:String,default:'screening'},notes:String,createdAt:{type:Date,default:Date.now} }));
const Institution = mongoose.model('Institution', new mongoose.Schema({ name:String,contact:String,email:String,city:String,demand:String,status:{type:String,default:'lead'},createdAt:{type:Date,default:Date.now} }));
const Subsidy = mongoose.model('Subsidy', new mongoose.Schema({ title:String,program:String,deadline:String,status:{type:String,default:'research'},notes:String,createdAt:{type:Date,default:Date.now} }));
const Document = mongoose.model('Document', new mongoose.Schema({ title:String,category:String,language:String,status:{type:String,default:'draft'},notes:String,createdAt:{type:Date,default:Date.now} }));

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 1000 * 60 * 60 * 8 },
  store: MongoStore.create({ mongoUrl: MONGODB_URI })
}));

const requireLogin = (req,res,next) => req.session?.userId ? next() : res.redirect('/login');
const requireAuth = (req,res,next) => req.session?.userId && req.session?.totpPassed ? next() : req.session?.userId ? res.redirect('/verify-2fa') : res.redirect('/login');

async function seedAdmin() {
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (!existing) {
    await User.create({ email: ADMIN_EMAIL, passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12), role: 'admin' });
    console.log('Admin aangemaakt: ' + ADMIN_EMAIL);
  } else {
    console.log('Admin bestaat al: ' + ADMIN_EMAIL);
  }
}

app.get('/lang/:lang', (req,res) => {
  if (['pl','nl','es'].includes(req.params.lang)) req.session.lang = req.params.lang;
  res.redirect(req.get('Referrer') || '/');
});

app.get('/', (req,res) => res.render('home', data(req)));
['about','institutions-page','professionals','academy','housing','poland','contact'].forEach(page => {
  app.get('/' + page, (req,res) => res.render('page', data(req, { page })));
});

app.get('/login', (req,res) => {
  if (req.session?.userId && req.session?.totpPassed) return res.redirect('/dashboard');
  res.render('login', data(req, { error: null }));
});

app.post('/login', async (req,res) => {
  const l = lang(req);
  const user = await User.findOne({ email: String(req.body.email || '').toLowerCase().trim() });
  if (!user) return res.status(401).render('login', data(req, { error: tx[l].invalidUser }));
  const ok = await bcrypt.compare(String(req.body.password || ''), user.passwordHash);
  if (!ok) return res.status(401).render('login', data(req, { error: tx[l].invalidPass }));
  req.session.userId = user._id.toString();
  req.session.email = user.email;
  req.session.totpPassed = false;
  if (!user.twoFASecret) return res.redirect('/setup-2fa');
  res.redirect('/verify-2fa');
});

app.get('/setup-2fa', requireLogin, async (req,res) => {
  const user = await User.findById(req.session.userId);
  const secret = speakeasy.generateSecret({ name: `${APP_NAME} (${user.email})` });
  req.session.pendingTwoFASecret = secret.base32;
  res.render('setup-2fa', data(req, { qr: await QRCode.toDataURL(secret.otpauth_url), secret: secret.base32, error: null }));
});

app.post('/setup-2fa', requireLogin, async (req,res) => {
  const l = lang(req);
  const secret = req.session.pendingTwoFASecret;
  const token = String(req.body.token || '').replace(/\s/g,'');
  const ok = speakeasy.totp.verify({ secret, encoding:'base32', token, window:1 });
  if (!ok) {
    const qr = await QRCode.toDataURL(speakeasy.otpauthURL({ secret, label: APP_NAME, encoding:'base32' }));
    return res.status(401).render('setup-2fa', data(req, { qr, secret, error: tx[l].invalidCode }));
  }
  await User.findByIdAndUpdate(req.session.userId, { twoFASecret: secret });
  delete req.session.pendingTwoFASecret;
  req.session.totpPassed = true;
  res.redirect('/dashboard');
});

app.get('/verify-2fa', requireLogin, (req,res) => res.render('verify-2fa', data(req, { error: null })));

app.post('/verify-2fa', requireLogin, async (req,res) => {
  const l = lang(req);
  const user = await User.findById(req.session.userId);
  const token = String(req.body.token || '').replace(/\s/g,'');
  const ok = speakeasy.totp.verify({ secret: user.twoFASecret, encoding:'base32', token, window:1 });
  if (!ok) return res.status(401).render('verify-2fa', data(req, { error: tx[l].invalidCode }));
  req.session.totpPassed = true;
  res.redirect('/dashboard');
});

app.post('/logout', (req,res) => req.session.destroy(() => res.redirect('/')));

app.get('/dashboard', requireAuth, async (req,res) => {
  const counts = {
    candidates: await Candidate.countDocuments(),
    institutions: await Institution.countDocuments(),
    subsidies: await Subsidy.countDocuments(),
    documents: await Document.countDocuments()
  };
  res.render('dashboard', data(req, { email: req.session.email, counts }));
});
app.get('/portal', (req,res) => res.redirect('/dashboard'));

function crud(url, Model, titleKey, type, fields) {
  app.get(url, requireAuth, async (req,res) => {
    res.render('list', data(req, { title: tx[lang(req)][titleKey], type, fields, items: await Model.find().sort({ createdAt:-1 }).lean() }));
  });
  app.post(url, requireAuth, async (req,res) => {
    await Model.create(req.body);
    res.redirect(url);
  });
}
crud('/candidates', Candidate, 'candidates', 'candidates', ['name','email','profession','country','status','notes']);
crud('/institutions', Institution, 'institutions', 'institutions', ['name','contact','email','city','demand','status']);
crud('/subsidies', Subsidy, 'subsidies', 'subsidies', ['title','program','deadline','status','notes']);
crud('/documents', Document, 'documents', 'documents', ['title','category','language','status','notes']);

app.post('/delete/:type/:id', requireAuth, async (req,res) => {
  const map = { candidates: Candidate, institutions: Institution, subsidies: Subsidy, documents: Document };
  const Model = map[req.params.type];
  if (Model) await Model.findByIdAndDelete(req.params.id);
  res.redirect('/' + req.params.type);
});

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('MongoDB verbonden');
    await seedAdmin();
    app.listen(PORT, () => console.log(`${APP_NAME} draait op poort ${PORT}`));
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
