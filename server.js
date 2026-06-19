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
  console.error('MONGODB_URI ontbreekt. Zet MongoDB op Railway.');
  process.exit(1);
}

const T = {
  pl: {
    meta:'Honor Care International',
    slogan:'OPIEKA Z SERCEM. PRZYSZŁOŚĆ Z NAMI.',
    city1:'Bogotá, Kolumbia', city2:'Warszawa, Polska',
    home:'Strona główna', about:'O nas', inst:'Dla instytucji', pro:'Dla profesjonalistów', academy:'Academy', housing:'Mieszkania', poland:'Polska', contact:'Kontakt', portal:'Portal',
    hero1:'Kompleksowe', hero2:'rozwiązania w opiece', hero3:'zdrowotnej dla Polski',
    heroText:'Honor Care International łączy wykwalifikowanych specjalistów z Kolumbii z placówkami medycznymi i organizacjami opieki w Polsce.',
    b:['Rekrutacja międzynarodowa','Legalizacja i dokumenty','Kursy języka polskiego','Zakwaterowanie','Integracja i adaptacja','Opieka koordynatora'],
    cta1:'Dla instytucji', cta2:'Dla profesjonalistów', cta3:'Umów spotkanie',
    specs:['Lekarze ogólni','Specjaliści','Stomatolodzy','Pielęgniarki','Psycholodzy','Fizjoterapeuci','Farmaceuci','Higienistki','Opiekunowie','Więcej'],
    cardK:['Dla profesjonalistów','Dla instytucji','Honor Care Academy','Mieszkania'],
    cardT:['Pracuj w Polsce z nami','Skuteczne rozwiązania dla placówki','Szkolenia i rozwój zawodowy','Komfort i bezpieczeństwo'],
    cardB:['Zacznij swoją przyszłość','Poproś o ofertę','Przejdź do academy','Zobacz mieszkania'],
    cardLi:[
      ['Atrakcyjne warunki pracy','Legalna praca i pełne wsparcie','Pomoc w uznaniu kwalifikacji','Zakwaterowanie','Wsparcie dla rodziny'],
      ['Wyselekcjonowani kandydaci','Ocena językowa i zawodowa','Wsparcie w formalnościach','Stała opieka koordynatora'],
      ['Kursy A1–B2','Terminologia medyczna','Kultura pracy w Polsce','Szkolenia online'],
      ['Nowoczesne mieszkania','Blisko miejsca pracy','Bezpieczne lokalizacje','Wsparcie integracyjne']
    ],
    whyK:'Dlaczego Polska?', whyT:'Stabilna przyszłość w sercu Europy', whyText:'Polska oferuje świetne możliwości rozwoju zawodowego, bezpieczeństwo i wysoką jakość życia.', whyBtn:'Dowiedz się więcej',
    stats:['Specjalistów w procesie','Placówek partnerskich','Dyscyplin medycznych','Kraje połączone'],
    partners:'Nasi partnerzy',
    footer:'Budujemy mosty między Kolumbią i Polską, łącząc talenty, możliwości i przyszłość.',
    loginTitle:'Bezpieczne logowanie', loginSub:'Dostęp do kandydatów, instytucji, dotacji i dokumentów.', email:'E-mail', password:'Hasło', login:'Zaloguj',
    dashboard:'Panel zarządzania', welcome:'Witaj', manage:'Zarządzaj kandydatami, instytucjami, dotacjami i dokumentami.', candidates:'Kandydaci', institutions:'Instytucje', subsidies:'Dotacje', documents:'Dokumenty',
    logout:'Wyloguj', add:'Dodaj', delete:'Usuń', back:'Powrót do panelu',
    setup2fa:'Konfiguracja Authenticatora', verify2fa:'Kod Authenticatora', codeText:'Wpisz 6-cyfrowy kod.', activate:'Aktywuj', verify:'Zweryfikuj',
    invalidUser:'Nie znaleziono użytkownika.', invalidPass:'Nieprawidłowe hasło.', invalidCode:'Nieprawidłowy kod.'
  },
  nl: {
    meta:'Honor Care International',
    slogan:'ZORG MET HART. TOEKOMST MET ONS.',
    city1:'Bogotá, Colombia', city2:'Warschau, Polen',
    home:'Home', about:'Over ons', inst:'Voor instellingen', pro:'Voor professionals', academy:'Academy', housing:'Wonen', poland:'Polen', contact:'Contact', portal:'Portal',
    hero1:'Complete', hero2:'zorgoplossingen', hero3:'voor Polen',
    heroText:'Honor Care International verbindt gekwalificeerde professionals uit Colombia met medische instellingen en zorgorganisaties in Polen.',
    b:['Internationale recruitment','Legalisatie en documenten','Poolse taalcursussen','Huisvesting','Integratie en begeleiding','Coördinator ondersteuning'],
    cta1:'Voor instellingen', cta2:'Voor professionals', cta3:'Plan gesprek',
    specs:['Huisartsen','Specialisten','Tandartsen','Verpleegkundigen','Psychologen','Fysiotherapeuten','Apothekers','Mondhygiënisten','Zorgassistenten','Meer'],
    cardK:['Voor professionals','Voor instellingen','Honor Care Academy','Wonen'],
    cardT:['Werk in Polen met ons','Echte oplossingen voor personeelstekort','Training en professionele groei','Comfort en zekerheid'],
    cardB:['Start je toekomst','Vraag informatie','Naar academy','Bekijk woningen'],
    cardLi:[
      ['Aantrekkelijke voorwaarden','Legaal werk en volledige steun','Hulp bij erkenning','Huisvesting','Steun voor familie'],
      ['Geselecteerde kandidaten','Taal- en beroepsscreening','Hulp bij formaliteiten','Vaste coördinator'],
      ['Cursussen A1–B2','Medische terminologie','Werkcultuur in Polen','Online training'],
      ['Moderne woningen','Dicht bij werk','Veilige locaties','Integratieondersteuning']
    ],
    whyK:'Waarom Polen?', whyT:'Een stabiele toekomst in het hart van Europa', whyText:'Polen biedt sterke kansen voor professionele groei, veiligheid en een hoge levenskwaliteit.', whyBtn:'Lees meer',
    stats:['Professionals in traject','Partnerinstellingen','Medische disciplines','Landen verbonden'],
    partners:'Onze partners',
    footer:'Wij bouwen bruggen tussen Colombia en Polen en verbinden talent, kansen en toekomst.',
    loginTitle:'Beveiligde login', loginSub:'Toegang tot kandidaten, instellingen, subsidies en documenten.', email:'E-mail', password:'Wachtwoord', login:'Inloggen',
    dashboard:'Dashboard', welcome:'Welkom', manage:'Beheer kandidaten, instellingen, subsidies en documenten.', candidates:'Kandidaten', institutions:'Instellingen', subsidies:'Subsidies', documents:'Documenten',
    logout:'Uitloggen', add:'Toevoegen', delete:'Verwijderen', back:'Terug naar dashboard',
    setup2fa:'Authenticator instellen', verify2fa:'Authenticator-code', codeText:'Vul je 6-cijferige code in.', activate:'Activeren', verify:'Verifiëren',
    invalidUser:'Gebruiker niet gevonden.', invalidPass:'Wachtwoord onjuist.', invalidCode:'Authenticator-code is onjuist.'
  },
  es: {
    meta:'Honor Care International',
    slogan:'CUIDADO CON CORAZÓN. FUTURO CON NOSOTROS.',
    city1:'Bogotá, Colombia', city2:'Varsovia, Polonia',
    home:'Inicio', about:'Sobre nosotros', inst:'Para instituciones', pro:'Para profesionales', academy:'Academy', housing:'Vivienda', poland:'Polonia', contact:'Contacto', portal:'Portal',
    hero1:'Soluciones', hero2:'integrales de salud', hero3:'para Polonia',
    heroText:'Honor Care International conecta profesionales cualificados de Colombia con instituciones médicas y organizaciones de atención en Polonia.',
    b:['Reclutamiento internacional','Legalización y documentos','Cursos de idioma polaco','Vivienda','Integración y adaptación','Acompañamiento permanente'],
    cta1:'Para instituciones', cta2:'Para profesionales', cta3:'Planear reunión',
    specs:['Médicos generales','Especialistas','Dentistas','Enfermeros','Psicólogos','Fisioterapeutas','Farmacéuticos','Higienistas','Auxiliares','Más'],
    cardK:['Para profesionales','Para instituciones','Honor Care Academy','Vivienda'],
    cardT:['Trabaja en Polonia con nosotros','Soluciones reales para instituciones','Formación y crecimiento profesional','Comodidad y seguridad'],
    cardB:['Comienza tu futuro','Solicitar información','Ir a la academy','Ver viviendas'],
    cardLi:[
      ['Condiciones atractivas','Trabajo legal y apoyo total','Ayuda con homologación','Vivienda','Apoyo familiar'],
      ['Candidatos seleccionados','Evaluación lingüística y profesional','Apoyo en formalidades','Coordinador permanente'],
      ['Cursos A1–B2','Terminología médica','Cultura laboral en Polonia','Formación online'],
      ['Viviendas modernas','Cerca del trabajo','Ubicaciones seguras','Apoyo de integración']
    ],
    whyK:'¿Por qué Polonia?', whyT:'Un futuro estable en el corazón de Europa', whyText:'Polonia ofrece oportunidades de crecimiento profesional, seguridad y calidad de vida.', whyBtn:'Conocer más',
    stats:['Profesionales en proceso','Instituciones asociadas','Disciplinas médicas','Países conectados'],
    partners:'Nuestros aliados',
    footer:'Construimos puentes entre Colombia y Polonia, conectando talento, oportunidades y futuro.',
    loginTitle:'Acceso seguro', loginSub:'Acceso a candidatos, instituciones, subsidios y documentos.', email:'Correo electrónico', password:'Contraseña', login:'Iniciar sesión',
    dashboard:'Panel de control', welcome:'Bienvenido', manage:'Gestiona candidatos, instituciones, subsidios y documentos.', candidates:'Candidatos', institutions:'Instituciones', subsidies:'Subsidios', documents:'Documentos',
    logout:'Cerrar sesión', add:'Añadir', delete:'Eliminar', back:'Volver al panel',
    setup2fa:'Configurar Authenticator', verify2fa:'Código Authenticator', codeText:'Introduce el código de 6 dígitos.', activate:'Activar', verify:'Verificar',
    invalidUser:'Usuario no encontrado.', invalidPass:'Contraseña incorrecta.', invalidCode:'Código incorrecto.'
  }
};

function lang(req){ const l=req.session?.lang || 'pl'; return ['pl','nl','es'].includes(l) ? l : 'pl'; }
function view(req, extra={}){ const l=lang(req); return { appName:APP_NAME, lang:l, t:T[l], ...extra }; }

mongoose.set('strictQuery', true);
const User = mongoose.model('User', new mongoose.Schema({ email:{type:String,unique:true,lowercase:true}, passwordHash:String, twoFASecret:{type:String,default:null}, role:{type:String,default:'admin'}, createdAt:{type:Date,default:Date.now} }));
const Candidate = mongoose.model('Candidate', new mongoose.Schema({ name:String,email:String,profession:String,country:{type:String,default:'Colombia'},status:{type:String,default:'screening'},notes:String,createdAt:{type:Date,default:Date.now} }));
const Institution = mongoose.model('Institution', new mongoose.Schema({ name:String,contact:String,email:String,city:String,demand:String,status:{type:String,default:'lead'},createdAt:{type:Date,default:Date.now} }));
const Subsidy = mongoose.model('Subsidy', new mongoose.Schema({ title:String,program:String,deadline:String,status:{type:String,default:'research'},notes:String,createdAt:{type:Date,default:Date.now} }));
const Document = mongoose.model('Document', new mongoose.Schema({ title:String,category:String,language:String,status:{type:String,default:'draft'},notes:String,createdAt:{type:Date,default:Date.now} }));

app.use(session({
  secret:SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  proxy:true,
  cookie:{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:1000*60*60*8},
  store:MongoStore.create({mongoUrl:MONGODB_URI})
}));

const requireLogin = (req,res,next) => req.session?.userId ? next() : res.redirect('/login');
const requireAuth = (req,res,next) => req.session?.userId && req.session?.totpPassed ? next() : req.session?.userId ? res.redirect('/verify-2fa') : res.redirect('/login');

async function seedAdmin(){
  const existing = await User.findOne({email:ADMIN_EMAIL});
  if(!existing){
    await User.create({email:ADMIN_EMAIL,passwordHash:await bcrypt.hash(ADMIN_PASSWORD,12),role:'admin'});
    console.log('Admin aangemaakt: '+ADMIN_EMAIL);
  } else {
    console.log('Admin bestaat al: '+ADMIN_EMAIL);
  }
}

app.get('/lang/:lang',(req,res)=>{ if(['pl','nl','es'].includes(req.params.lang)) req.session.lang=req.params.lang; res.redirect(req.get('Referrer')||'/'); });
app.get('/', (req,res)=>res.render('home', view(req)));
['about','institutions-page','professionals','academy','housing','poland','contact'].forEach(p=>app.get('/'+p,(req,res)=>res.render('page',view(req,{page:p}))));

app.get('/login',(req,res)=>res.render('login',view(req,{error:null})));
app.post('/login',async(req,res)=>{
  const l=lang(req);
  const user=await User.findOne({email:String(req.body.email||'').toLowerCase().trim()});
  if(!user) return res.status(401).render('login',view(req,{error:T[l].invalidUser}));
  const ok=await bcrypt.compare(String(req.body.password||''),user.passwordHash);
  if(!ok) return res.status(401).render('login',view(req,{error:T[l].invalidPass}));
  req.session.userId=user._id.toString();
  req.session.email=user.email;
  req.session.totpPassed=false;
  if(!user.twoFASecret) return res.redirect('/setup-2fa');
  res.redirect('/verify-2fa');
});
app.get('/setup-2fa',requireLogin,async(req,res)=>{
  const user=await User.findById(req.session.userId);
  const secret=speakeasy.generateSecret({name:`${APP_NAME} (${user.email})`});
  req.session.pendingTwoFASecret=secret.base32;
  res.render('setup-2fa',view(req,{qr:await QRCode.toDataURL(secret.otpauth_url),secret:secret.base32,error:null}));
});
app.post('/setup-2fa',requireLogin,async(req,res)=>{
  const l=lang(req), secret=req.session.pendingTwoFASecret, token=String(req.body.token||'').replace(/\s/g,'');
  const ok=speakeasy.totp.verify({secret,encoding:'base32',token,window:1});
  if(!ok){
    const qr=await QRCode.toDataURL(speakeasy.otpauthURL({secret,label:APP_NAME,encoding:'base32'}));
    return res.status(401).render('setup-2fa',view(req,{qr,secret,error:T[l].invalidCode}));
  }
  await User.findByIdAndUpdate(req.session.userId,{twoFASecret:secret});
  delete req.session.pendingTwoFASecret;
  req.session.totpPassed=true;
  res.redirect('/dashboard');
});
app.get('/verify-2fa',requireLogin,(req,res)=>res.render('verify-2fa',view(req,{error:null})));
app.post('/verify-2fa',requireLogin,async(req,res)=>{
  const l=lang(req), user=await User.findById(req.session.userId), token=String(req.body.token||'').replace(/\s/g,'');
  const ok=speakeasy.totp.verify({secret:user.twoFASecret,encoding:'base32',token,window:1});
  if(!ok) return res.status(401).render('verify-2fa',view(req,{error:T[l].invalidCode}));
  req.session.totpPassed=true;
  res.redirect('/dashboard');
});
app.post('/logout',(req,res)=>req.session.destroy(()=>res.redirect('/')));

app.get('/dashboard',requireAuth,async(req,res)=>{
  const counts={candidates:await Candidate.countDocuments(),institutions:await Institution.countDocuments(),subsidies:await Subsidy.countDocuments(),documents:await Document.countDocuments()};
  res.render('dashboard',view(req,{email:req.session.email,counts}));
});
app.get('/portal',(req,res)=>res.redirect('/dashboard'));

function crud(url, Model, titleKey, type, fields){
  app.get(url,requireAuth,async(req,res)=>res.render('list',view(req,{title:T[lang(req)][titleKey],type,fields,items:await Model.find().sort({createdAt:-1}).lean()})));
  app.post(url,requireAuth,async(req,res)=>{await Model.create(req.body);res.redirect(url);});
}
crud('/candidates',Candidate,'candidates','candidates',['name','email','profession','country','status','notes']);
crud('/institutions',Institution,'institutions','institutions',['name','contact','email','city','demand','status']);
crud('/subsidies',Subsidy,'subsidies','subsidies',['title','program','deadline','status','notes']);
crud('/documents',Document,'documents','documents',['title','category','language','status','notes']);

app.post('/delete/:type/:id',requireAuth,async(req,res)=>{
  const map={candidates:Candidate,institutions:Institution,subsidies:Subsidy,documents:Document};
  const Model=map[req.params.type];
  if(Model) await Model.findByIdAndDelete(req.params.id);
  res.redirect('/'+req.params.type);
});

mongoose.connect(MONGODB_URI).then(async()=>{
  console.log('MongoDB verbonden');
  await seedAdmin();
  app.listen(PORT,()=>console.log(`${APP_NAME} draait op poort ${PORT}`));
}).catch(err=>{console.error(err);process.exit(1);});
