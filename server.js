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
  console.error('MONGODB_URI ontbreekt.');
  process.exit(1);
}

const T = {
  pl: {
    city:'Bogotá, Kolumbia  |  Warszawa, Polska', slogan:'ALL CARE. ONE COMPLETE CARE.',
    home:'Home', about:'O nas', services:'Usługi', institutions:'Dla instytucji', candidates:'Dla kandydatów', colombia:'Kolumbia', news:'Aktualności', contact:'Kontakt', portal:'Portal', meeting:'Umów się na rozmowę',
    hero1:'Kompletne rozwiązanie', hero2:'opieki zdrowotnej', hero3:'między Kolumbią a Polską',
    heroText:'Honor Care International łączy wysoko wykwalifikowanych specjalistów ochrony zdrowia z instytucjami w Polsce. Rekrutacja, szkolenia, wdrożenie i integracja — pełna obsługa.',
    heroItems:['Wszystkie dyscypliny medyczne','Szkolenia i język polski','Legalizacja i dokumenty','Zakwaterowanie','Integracja i opieka','Koordynacja projektu'],
    forInst:'Dla Instytucji', forCandidates:'Dla Kandydatów',
    sideTitle:'Rozpoczynamy w', sideCity:'Warszawie, Polska', side1:'Biuro główne Warszawa', side2:'Centrum rekrutacji Bogotá', side3:'Kraj możliwości, przyszłość talentów',
    disciplineTitle:'Wszystkie specjalizacje pod jednym dachem',
    specs:['Lekarze POZ','Specjaliści','Stomatolodzy','Pielęgniarki','Położne','Psycholodzy','Fizjoterapeuci','Farmaceuci','Opiekunowie','I więcej...'],
    cards:[
      ['Dlaczego Polska?','Stabilny system ochrony zdrowia','Rosnące zapotrzebowanie na specjalistów','Nowoczesne placówki i technologie','Bezpieczny kraj w sercu Europy','Czytaj więcej'],
      ['Dla Instytucji','Selekcja i rekrutacja kandydatów','Weryfikacja kwalifikacji','Szkolenia językowe i zawodowe','Kompleksowa obsługa relokacji','Więcej informacji'],
      ['Dla Kandydatów','Legalna praca w Polsce','Atrakcyjne wynagrodzenie','Wsparcie na każdym etapie','Rozwój kariery zawodowej','Rozpocznij swoją przyszłość'],
      ['Mieszkanie i Integracja','Komfortowe i bezpieczne mieszkania','Wsparcie w formalnościach','Pomoc w adaptacji i integracji','Towarzyszymy Tobie i Twojej rodzinie','Zobacz mieszkania'],
      ['Akademia','Szkolenia językowe A1-B2','Szkolenia zawodowe i specjalistyczne','Przygotowanie do pracy w Polsce','Online i w Kolumbii','Przejdź do Akademii']
    ],
    partners:'Zaufali nam',
    stat1:'Zrekrutowanych specjalistów', stat2:'Placówek medycznych nam zaufało', stat3:'Specjalizacji w naszej sieci', stat4:'Kraje. Jedna misja.',
    footerMotto:'Wszystka opieka. Jedno rozwiązanie. One complete care.',
    pageTitles:{about:'O nas',services:'Usługi',institutions:'Dla instytucji',candidates:'Dla kandydatów',colombia:'Kolumbia',news:'Aktualności',contact:'Kontakt'},
    pageTexts:{
      about:'Honor Care International tworzy profesjonalny most pomiędzy Kolumbią i Polską. Nasz model łączy rekrutację, edukację, legalizację, mieszkania i integrację w jednym przejrzystym procesie.',
      services:'Oferujemy pełną obsługę: selekcję kandydatów, weryfikację dokumentów, szkolenia językowe, wsparcie formalne, zakwaterowanie, integrację i stałą koordynację.',
      institutions:'Pomagamy placówkom medycznym w Polsce zmniejszyć braki kadrowe przez starannie dobranych kandydatów i kompleksową obsługę relokacji.',
      candidates:'Dla profesjonalistów z Kolumbii zapewniamy bezpieczną ścieżkę do legalnej pracy w Polsce: od rekrutacji po mieszkanie, język i wsparcie rodziny.',
      colombia:'Kolumbia jest krajem dużego talentu medycznego, wysokiej motywacji i silnych kompetencji opiekuńczych. Budujemy lokalny proces selekcji i przygotowania.',
      news:'Tutaj publikujemy aktualności o rekrutacji, programach szkoleniowych, partnerstwach, dotacjach i możliwościach pracy w Polsce.',
      contact:'Skontaktuj się z nami, aby porozmawiać o współpracy, rekrutacji, placówkach medycznych lub kandydaturze.'
    },
    blocks:['Rekrutacja i selekcja','Legalizacja i dokumenty','Akademia językowa','Zakwaterowanie','Integracja rodzinna','Stała koordynacja'],
    loginTitle:'Bezpieczne logowanie', loginSub:'Dostęp do dokumentów, kandydatów, instytucji, dotacji i projektu.', email:'E-mail', password:'Hasło', login:'Zaloguj',
    dashboard:'Panel zarządzania', welcome:'Witaj', manage:'Zarządzaj kandydatami, instytucjami, dotacjami, dokumentami i planem projektu.',
    cand:'Kandydaci', inst:'Instytucje', subs:'Dotacje', docs:'Dokumenty', logout:'Wyloguj', add:'Dodaj', delete:'Usuń', back:'Powrót do panelu',
    setup2fa:'Konfiguracja Authenticatora', verify2fa:'Kod Authenticatora', codeText:'Wpisz 6-cyfrowy kod.', activate:'Aktywuj', verify:'Zweryfikuj',
    invalidUser:'Nie znaleziono użytkownika.', invalidPass:'Nieprawidłowe hasło.', invalidCode:'Nieprawidłowy kod.'
  },
  nl: {
    city:'Bogotá, Colombia  |  Warschau, Polen', slogan:'ALLE ZORG. ÉÉN OPLOSSING. ONE COMPLETE CARE.',
    home:'Home', about:'Over ons', services:'Diensten', institutions:'Voor zorginstellingen', candidates:'Voor kandidaten', colombia:'Colombia', news:'Nieuws', contact:'Contact', portal:'Portal', meeting:'Plan een kennismaking',
    hero1:'De complete zorgoplossing', hero2:'tussen Colombia', hero3:'en Polen',
    heroText:'Honor Care International verbindt hoogopgeleide zorgprofessionals met zorginstellingen in Polen. Wij regelen het volledige traject: werving, opleiding, toelating, huisvesting en integratie.',
    heroItems:['Alle zorgdisciplines','Taal & opleiding','Visum & toelating','Huisvesting','Integratie & begeleiding','Projectcoördinatie'],
    forInst:'Voor Zorginstellingen', forCandidates:'Voor Zorgprofessionals',
    sideTitle:'Wij starten in', sideCity:'Warschau, Polen', side1:'Hoofdkantoor Warschau', side2:'Recruitment Center Bogotá', side3:'Land van talent, toekomst en kansen',
    disciplineTitle:'Alle zorgdisciplines onder één dak',
    specs:['Huisartsen','Tandartsen','Specialisten','Verpleegkundigen','Mondhygiënisten','Fysiotherapeuten','Apothekers','Verzorgenden','Psychologen','En meer...'],
    cards:[
      ['Waarom Polen?','Hoogopgeleide zorgprofessionals','Sterke werkethiek en motivatie','Culturele aansluiting','Veilige en groeiende zorgmarkt','Lees meer'],
      ['Voor Zorginstellingen','Oplossing voor personeelstekorten','Geselecteerde en gescreende kandidaten','Totaalontzorging van A tot Z','Flexibele samenwerkingsmodellen','Meer informatie'],
      ['Voor Zorgprofessionals','Werken in Polen','Tot 5x hoger salaris','Wij regelen alles voor jou','Persoonlijke begeleiding','Start jouw toekomst'],
      ['Huisvesting & Welzijn','Comfortabele en veilige woningen','Dichtbij werk en voorzieningen','Ondersteuning bij integratie','Voor jou én je gezin','Bekijk woningen'],
      ['Academy','Nederlandse/Poolse taaltraining','Vaktermen voor de zorg','Voorbereiding op toelatingen','Online en in Colombia','Naar de Academy']
    ],
    partners:'Onze partners',
    stat1:'Zorgprofessionals geplaatst', stat2:'Zorginstellingen vertrouwen op ons', stat3:'Zorgdisciplines', stat4:'Missie: betere zorg voor iedereen',
    footerMotto:'Alle zorg. Één oplossing. One complete care.',
    pageTitles:{about:'Over ons',services:'Diensten',institutions:'Voor zorginstellingen',candidates:'Voor kandidaten',colombia:'Colombia',news:'Nieuws',contact:'Contact'},
    pageTexts:{
      about:'Honor Care International bouwt een professionele brug tussen Colombia en Polen. Wij combineren recruitment, scholing, legalisatie, huisvesting en integratie in één helder proces.',
      services:'Onze diensten bestaan uit kandidaatselectie, documentcontrole, taaltraining, toelatingsondersteuning, huisvesting, integratie en vaste projectcoördinatie.',
      institutions:'Wij helpen zorginstellingen in Polen om personeelstekorten duurzaam op te lossen met zorgvuldig geselecteerde kandidaten en volledige begeleiding.',
      candidates:'Voor professionals uit Colombia bieden wij een veilige route naar legaal werk in Polen, inclusief taal, documenten, huisvesting en familiebegeleiding.',
      colombia:'Colombia is een sterke bron van medisch talent, motivatie en zorgzaamheid. Wij bouwen daar een lokale structuur voor selectie, opleiding en voorbereiding.',
      news:'Hier komen updates over recruitment, academy, samenwerking, subsidies, vacatures en voortgang van Honor Care International.',
      contact:'Neem contact met ons op voor samenwerking, kandidaten, zorginstellingen, subsidies of een kennismaking.'
    },
    blocks:['Recruitment & selectie','Legalisatie & documenten','Taalacademy','Huisvesting','Familie-integratie','Vaste coördinatie'],
    loginTitle:'Beveiligde login', loginSub:'Toegang tot documenten, kandidaten, instellingen, subsidies en projectbeheer.', email:'E-mail', password:'Wachtwoord', login:'Inloggen',
    dashboard:'Dashboard', welcome:'Welkom', manage:'Beheer kandidaten, instellingen, subsidies, documenten en projectplanning.',
    cand:'Kandidaten', inst:'Instellingen', subs:'Subsidies', docs:'Documenten', logout:'Uitloggen', add:'Toevoegen', delete:'Verwijderen', back:'Terug naar dashboard',
    setup2fa:'Authenticator instellen', verify2fa:'Authenticator-code', codeText:'Vul je 6-cijferige code in.', activate:'Activeren', verify:'Verifiëren',
    invalidUser:'Gebruiker niet gevonden.', invalidPass:'Wachtwoord onjuist.', invalidCode:'Authenticator-code is onjuist.'
  },
  es: {
    city:'Bogotá, Colombia  |  Varsovia, Polonia', slogan:'TODO EL CUIDADO. UNA SOLUCIÓN COMPLETA.',
    home:'Inicio', about:'Sobre nosotros', services:'Servicios', institutions:'Para instituciones', candidates:'Para candidatos', colombia:'Colombia', news:'Noticias', contact:'Contacto', portal:'Portal', meeting:'Planear reunión',
    hero1:'La solución completa', hero2:'de salud entre Colombia', hero3:'y Polonia',
    heroText:'Honor Care International conecta profesionales de salud altamente capacitados con instituciones médicas en Polonia. Gestionamos reclutamiento, formación, permisos, vivienda e integración.',
    heroItems:['Todas las disciplinas','Idioma y formación','Visado y permisos','Vivienda','Integración y apoyo','Coordinación del proyecto'],
    forInst:'Para Instituciones', forCandidates:'Para Profesionales',
    sideTitle:'Comenzamos en', sideCity:'Varsovia, Polonia', side1:'Oficina principal Varsovia', side2:'Centro de reclutamiento Bogotá', side3:'País de talento, futuro y oportunidades',
    disciplineTitle:'Todas las disciplinas de salud bajo un mismo techo',
    specs:['Médicos','Dentistas','Especialistas','Enfermeros','Higienistas','Fisioterapeutas','Farmacéuticos','Cuidadores','Psicólogos','Y más...'],
    cards:[
      ['¿Por qué Polonia?','Profesionales altamente formados','Fuerte ética de trabajo','Adaptación cultural','Mercado seguro y en crecimiento','Leer más'],
      ['Para Instituciones','Solución para escasez de personal','Candidatos seleccionados','Servicio integral de A a Z','Modelos flexibles de colaboración','Más información'],
      ['Para Profesionales','Trabaja en Polonia','Salarios más altos','Nos encargamos de todo','Acompañamiento personal','Comienza tu futuro'],
      ['Vivienda y Bienestar','Viviendas cómodas y seguras','Cerca del trabajo','Apoyo de integración','Para ti y tu familia','Ver viviendas'],
      ['Academy','Formación de idioma','Terminología médica','Preparación para permisos','Online y en Colombia','Ir a Academy']
    ],
    partners:'Nuestros aliados',
    stat1:'Profesionales colocados', stat2:'Instituciones asociadas', stat3:'Disciplinas de salud', stat4:'Misión: mejor cuidado para todos',
    footerMotto:'Todo el cuidado. Una solución completa.',
    pageTitles:{about:'Sobre nosotros',services:'Servicios',institutions:'Para instituciones',candidates:'Para candidatos',colombia:'Colombia',news:'Noticias',contact:'Contacto'},
    pageTexts:{
      about:'Honor Care International crea un puente profesional entre Colombia y Polonia. Combinamos reclutamiento, formación, legalización, vivienda e integración.',
      services:'Nuestros servicios incluyen selección de candidatos, revisión de documentos, formación lingüística, permisos, vivienda, integración y coordinación permanente.',
      institutions:'Ayudamos a instituciones de salud en Polonia a resolver la escasez de personal con candidatos seleccionados y acompañamiento completo.',
      candidates:'Para profesionales de Colombia ofrecemos una ruta segura hacia trabajo legal en Polonia, con idioma, documentos, vivienda y apoyo familiar.',
      colombia:'Colombia es una fuente de talento médico, motivación y vocación de cuidado. Organizamos selección, formación y preparación local.',
      news:'Aquí publicamos noticias sobre reclutamiento, academy, colaboración, subsidios, vacantes y avances de Honor Care International.',
      contact:'Contáctanos para colaboración, candidatos, instituciones, subsidios o una reunión de presentación.'
    },
    blocks:['Reclutamiento y selección','Legalización y documentos','Academia de idioma','Vivienda','Integración familiar','Coordinación fija'],
    loginTitle:'Acceso seguro', loginSub:'Acceso a documentos, candidatos, instituciones, subsidios y gestión del proyecto.', email:'Correo electrónico', password:'Contraseña', login:'Iniciar sesión',
    dashboard:'Panel de control', welcome:'Bienvenido', manage:'Gestiona candidatos, instituciones, subsidios, documentos y planificación.',
    cand:'Candidatos', inst:'Instituciones', subs:'Subsidios', docs:'Documentos', logout:'Cerrar sesión', add:'Añadir', delete:'Eliminar', back:'Volver al panel',
    setup2fa:'Configurar Authenticator', verify2fa:'Código Authenticator', codeText:'Introduce el código de 6 dígitos.', activate:'Activar', verify:'Verificar',
    invalidUser:'Usuario no encontrado.', invalidPass:'Contraseña incorrecta.', invalidCode:'Código incorrecto.'
  }
};

function lang(req){ const l=req.session?.lang || 'pl'; return ['pl','nl','es'].includes(l)?l:'pl'; }
function view(req, extra={}){ const l=lang(req); return {appName:APP_NAME, lang:l, t:T[l], ...extra}; }

mongoose.set('strictQuery', true);

const User = mongoose.model('User', new mongoose.Schema({ email:{type:String,unique:true,lowercase:true}, passwordHash:String, twoFASecret:{type:String,default:null}, role:{type:String,default:'admin'}, createdAt:{type:Date,default:Date.now} }));
const Candidate = mongoose.model('Candidate', new mongoose.Schema({ name:String,email:String,profession:String,country:{type:String,default:'Colombia'},status:{type:String,default:'screening'},notes:String,createdAt:{type:Date,default:Date.now} }));
const Institution = mongoose.model('Institution', new mongoose.Schema({ name:String,contact:String,email:String,city:String,demand:String,status:{type:String,default:'lead'},createdAt:{type:Date,default:Date.now} }));
const Subsidy = mongoose.model('Subsidy', new mongoose.Schema({ title:String,program:String,deadline:String,status:{type:String,default:'research'},notes:String,createdAt:{type:Date,default:Date.now} }));
const Document = mongoose.model('Document', new mongoose.Schema({ title:String,category:String,language:String,status:{type:String,default:'draft'},notes:String,createdAt:{type:Date,default:Date.now} }));

app.use(session({ secret:SESSION_SECRET, resave:false, saveUninitialized:false, proxy:true, cookie:{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:1000*60*60*8}, store:MongoStore.create({mongoUrl:MONGODB_URI}) }));

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

async function seedDocuments(){
  const count = await Document.countDocuments();
  if(count > 0) return;
  await Document.insertMany([
    {title:'Businessplan Honor Care Poland', category:'Businessplan', language:'NL/PL/ES', status:'concept', notes:'Volledig projectplan voor stichting, werkmaatschappij, Colombia en Polen.'},
    {title:'Subsidie Roadmap EU / Polen', category:'Subsidies', language:'NL', status:'concept', notes:'AMIF, ESF+, FERS, regionale fondsen en aanvraagstappen.'},
    {title:'Stichting Structuur & Statuten checklist', category:'Stichting', language:'NL/PL', status:'checklist', notes:'Te gebruiken voor oprichting en subsidieaanvragen.'},
    {title:'Werkmaatschappij Procesplan', category:'Werkmaatschappij', language:'NL/PL', status:'concept', notes:'Recruitment, CRM, contracten, zorginstellingen en facturatie.'},
    {title:'Kandidaten Intakeformulier', category:'Kandidaten', language:'ES/PL', status:'template', notes:'Voor registratie van Colombiaanse zorgprofessionals.'},
    {title:'Zorginstellingen Partnerformulier', category:'Instellingen', language:'PL/NL', status:'template', notes:'Voor behoefteanalyse en samenwerking met zorginstellingen.'}
  ]);
  console.log('Basisdocumenten aangemaakt');
}

app.get('/lang/:lang',(req,res)=>{ if(['pl','nl','es'].includes(req.params.lang)) req.session.lang=req.params.lang; res.redirect(req.get('Referrer') || '/'); });

app.get('/', (req,res)=>res.render('home', view(req)));
app.get('/about',(req,res)=>res.render('page',view(req,{key:'about'})));
app.get('/services',(req,res)=>res.render('page',view(req,{key:'services'})));
app.get('/institutions',(req,res)=>res.render('page',view(req,{key:'institutions'})));
app.get('/institutions-page',(req,res)=>res.redirect('/institutions'));
app.get('/candidates-info',(req,res)=>res.render('page',view(req,{key:'candidates'})));
app.get('/professionals',(req,res)=>res.redirect('/candidates-info'));
app.get('/colombia',(req,res)=>res.render('page',view(req,{key:'colombia'})));
app.get('/news',(req,res)=>res.render('page',view(req,{key:'news'})));
app.get('/contact',(req,res)=>res.render('page',view(req,{key:'contact'})));
app.get('/academy',(req,res)=>res.render('page',view(req,{key:'services'})));
app.get('/housing',(req,res)=>res.render('page',view(req,{key:'services'})));
app.get('/poland',(req,res)=>res.render('page',view(req,{key:'institutions'})));

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
  const recentDocs=await Document.find().sort({createdAt:-1}).limit(6).lean();
  res.render('dashboard',view(req,{email:req.session.email,counts,recentDocs}));
});
app.get('/portal',(req,res)=>res.redirect('/dashboard'));

function crud(url, Model, titleKey, type, fields){
  app.get(url,requireAuth,async(req,res)=>res.render('list',view(req,{title:T[lang(req)][titleKey],type,fields,items:await Model.find().sort({createdAt:-1}).lean()})));
  app.post(url,requireAuth,async(req,res)=>{await Model.create(req.body);res.redirect(url);});
}
crud('/candidates',Candidate,'cand','candidates',['name','email','profession','country','status','notes']);
crud('/institutions-list',Institution,'inst','institutions-list',['name','contact','email','city','demand','status']);
crud('/subsidies',Subsidy,'subs','subsidies',['title','program','deadline','status','notes']);
crud('/documents',Document,'docs','documents',['title','category','language','status','notes']);

app.post('/delete/:type/:id',requireAuth,async(req,res)=>{
  const map={'candidates':Candidate,'institutions-list':Institution,'subsidies':Subsidy,'documents':Document};
  const Model=map[req.params.type];
  if(Model) await Model.findByIdAndDelete(req.params.id);
  res.redirect('/'+req.params.type);
});

mongoose.connect(MONGODB_URI).then(async()=>{
  console.log('MongoDB verbonden');
  await seedAdmin();
  await seedDocuments();
  app.listen(PORT,()=>console.log(`${APP_NAME} draait op poort ${PORT}`));
}).catch(err=>{console.error(err);process.exit(1);});
