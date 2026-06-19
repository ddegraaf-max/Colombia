
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
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const APP_NAME = process.env.APP_NAME || 'Honor Care Poland';
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL;
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-me-local';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@honorcarepoland.eu';
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
  proxy: true,
  cookie: { httpOnly:true, sameSite:'lax', secure: process.env.NODE_ENV === 'production', maxAge: 1000*60*60*8 },
  store: MONGODB_URI ? MongoStore.create({ mongoUrl: MONGODB_URI }) : undefined
}));

const translations = {
  nl: {
    langName:'Nederlands', foundation:'Stichting', company:'Werkmaatschappij', institutions:'Zorginstellingen', candidates:'Kandidaten', subsidies:'Subsidies', portal:'Portal', contact:'Contact',
    homeEyebrow:'Colombia → Polen • Zorgpersoneel • Integratie', homeTitle:'Internationale zorgprofessionals voor de Poolse zorgmarkt.', homeLead:'Honor Care Poland combineert recruitment, taalopleiding, diplomabegeleiding, huisvesting en integratie in één professioneel programma voor zorginstellingen en internationale kandidaten.', homeBtn1:'Voor zorginstellingen', homeBtn2:'Voor kandidaten', pilot:'Pilotprogramma', pilotN:'50', pilotText:'Colombiaanse zorgprofessionals', pilotDesc:'Met Fundacja Honor Care Poland voor subsidies en Honor Care International Sp. z o.o. voor commerciële uitvoering.', recruitment:'Recruitment', recruitmentText:'Screening, referenties, diploma-check en selectie vanuit Bogotá.', education:'Opleiding', educationText:'Poolse taal, medische vaktaal, cultuur en zorgprotocollen.', placement:'Plaatsing', placementText:'Begeleide plaatsing bij ouderenzorg, thuiszorg, klinieken en zorginstellingen.', structureTitle:'Eén structuur, twee doelen', structureText:'De stichting richt zich op maatschappelijke impact, subsidies en integratie. De werkmaatschappij verzorgt contracten, recruitment, servicefees en operationele uitvoering.',
    foundationTitle:'Fundacja Honor Care Poland', foundationLead:'De stichting is gericht op subsidieprojecten, opleiding, integratie en maatschappelijke begeleiding van internationale zorgprofessionals in Polen.', foundationItems:['AMIF / ESF+ / FERS subsidieaanvragen','Poolse taal- en integratieprogramma’s','Samenwerking met scholen, NGO’s en zorgpartners'],
    companyTitle:'Honor Care International Sp. z o.o.', companyLead:'De werkmaatschappij verzorgt de commerciële uitvoering: recruitment, contracten, huisvesting, plaatsing en servicecontracten met zorginstellingen.', companyItems:['Recruitment en selectie in Colombia','Contractbeheer en plaatsingsfees','Huisvesting, begeleiding en accountmanagement'],
    institutionsTitle:'Voor Poolse zorginstellingen', institutionsLead:'Wij helpen zorgorganisaties met een gestructureerde, gecontroleerde en begeleide instroom van internationale zorgprofessionals.', institutionsItems:['Voorselectie en compliance','Taal- en cultuurvoorbereiding','Begeleiding na aankomst in Polen'],
    candidatesTitle:'Voor kandidaten uit Colombia', candidatesLead:'Een veilige route naar werken en wonen in Polen, met taalopleiding, begeleiding, documentcontrole en ondersteuning bij integratie.', candidatesItems:['Poolse taal en medische vaktaal','Diploma- en documentenbegeleiding','Huisvesting en introductie in Polen'],
    subsidiesTitle:'Subsidies en maatschappelijke impact', subsidiesLead:'Het programma is ontworpen voor subsidieerbare doelen zoals integratie van derdelanders, arbeidsmarkttoeleiding, zorgcapaciteit en scholing.', subsidiesItems:['AMIF voor migratie en integratie','ESF+ / FERS voor scholing en arbeidsmarkt','Regionale programma’s in Polen'],
    contactTitle:'Contact', contactLead:'Neem contact op voor samenwerking, zorginstellingen, subsidies of Colombiaanse partners.', footer:'Warsaw / Bogotá'
  },
  pl: {
    langName:'Polski', foundation:'Fundacja', company:'Spółka operacyjna', institutions:'Placówki medyczne', candidates:'Kandydaci', subsidies:'Dotacje', portal:'Portal', contact:'Kontakt',
    homeEyebrow:'Kolumbia → Polska • Kadry medyczne • Integracja', homeTitle:'Międzynarodowi pracownicy ochrony zdrowia dla polskiego rynku opieki.', homeLead:'Honor Care Poland łączy rekrutację, naukę języka, wsparcie w uznawaniu kwalifikacji, zakwaterowanie i integrację w jednym profesjonalnym programie.', homeBtn1:'Dla placówek', homeBtn2:'Dla kandydatów', pilot:'Program pilotażowy', pilotN:'50', pilotText:'kolumbijskich profesjonalistów opieki', pilotDesc:'Fundacja odpowiada za dotacje i integrację, a spółka operacyjna za realizację komercyjną.', recruitment:'Rekrutacja', recruitmentText:'Screening, referencje, weryfikacja dyplomów i selekcja w Bogocie.', education:'Szkolenie', educationText:'Język polski, język medyczny, kultura pracy i procedury opieki.', placement:'Zatrudnienie', placementText:'Wspierane wdrożenie w domach opieki, opiece domowej, klinikach i placówkach zdrowia.', structureTitle:'Jedna struktura, dwa cele', structureText:'Fundacja koncentruje się na wpływie społecznym, dotacjach i integracji. Spółka prowadzi umowy, rekrutację i obsługę operacyjną.',
    foundationTitle:'Fundacja Honor Care Poland', foundationLead:'Fundacja prowadzi projekty dotacyjne, szkolenia, integrację i wsparcie społeczne dla międzynarodowych pracowników ochrony zdrowia w Polsce.', foundationItems:['Wnioski dotacyjne AMIF / ESF+ / FERS','Programy języka polskiego i integracji','Współpraca ze szkołami, NGO i partnerami medycznymi'],
    companyTitle:'Honor Care International Sp. z o.o.', companyLead:'Spółka realizuje działania komercyjne: rekrutację, umowy, zakwaterowanie, wdrożenie i obsługę placówek medycznych.', companyItems:['Rekrutacja i selekcja w Kolumbii','Obsługa umów i opłaty za placement','Zakwaterowanie, wsparcie i account management'],
    institutionsTitle:'Dla polskich placówek medycznych', institutionsLead:'Pomagamy organizacjom opieki zdrowotnej w kontrolowanym i wspieranym pozyskiwaniu międzynarodowych pracowników.', institutionsItems:['Selekcja i compliance','Przygotowanie językowe i kulturowe','Wsparcie po przyjeździe do Polski'],
    candidatesTitle:'Dla kandydatów z Kolumbii', candidatesLead:'Bezpieczna ścieżka do pracy i życia w Polsce, obejmująca naukę języka, dokumenty, zakwaterowanie i integrację.', candidatesItems:['Język polski i medyczny','Wsparcie dyplomów i dokumentów','Zakwaterowanie i wdrożenie w Polsce'],
    subsidiesTitle:'Dotacje i wpływ społeczny', subsidiesLead:'Program został zaprojektowany pod cele dotacyjne: integracja obywateli państw trzecich, rynek pracy, kadry medyczne i szkolenia.', subsidiesItems:['AMIF: migracja i integracja','ESF+ / FERS: szkolenia i rynek pracy','Programy regionalne w Polsce'],
    contactTitle:'Kontakt', contactLead:'Skontaktuj się w sprawie współpracy, placówek medycznych, dotacji lub partnerów w Kolumbii.', footer:'Warszawa / Bogota'
  },
  es: {
    langName:'Español', foundation:'Fundación', company:'Empresa operativa', institutions:'Instituciones sanitarias', candidates:'Candidatos', subsidies:'Subsidios', portal:'Portal', contact:'Contacto',
    homeEyebrow:'Colombia → Polonia • Personal sanitario • Integración', homeTitle:'Profesionales sanitarios internacionales para el mercado de salud en Polonia.', homeLead:'Honor Care Poland combina reclutamiento, formación lingüística, apoyo documental, alojamiento e integración en un programa profesional.', homeBtn1:'Para instituciones', homeBtn2:'Para candidatos', pilot:'Programa piloto', pilotN:'50', pilotText:'profesionales sanitarios colombianos', pilotDesc:'Con la fundación para subsidios e integración y la empresa operativa para la ejecución comercial.', recruitment:'Reclutamiento', recruitmentText:'Evaluación, referencias, verificación de diplomas y selección desde Bogotá.', education:'Formación', educationText:'Idioma polaco, lenguaje médico, cultura laboral y protocolos de salud.', placement:'Colocación', placementText:'Incorporación acompañada en residencias, atención domiciliaria, clínicas e instituciones sanitarias.', structureTitle:'Una estructura, dos objetivos', structureText:'La fundación se enfoca en impacto social, subsidios e integración. La empresa gestiona contratos, reclutamiento y operación.',
    foundationTitle:'Fundacja Honor Care Poland', foundationLead:'La fundación desarrolla proyectos de subsidios, formación, integración y acompañamiento social de profesionales sanitarios internacionales en Polonia.', foundationItems:['Solicitudes AMIF / ESF+ / FERS','Programas de idioma polaco e integración','Cooperación con escuelas, ONG y socios sanitarios'],
    companyTitle:'Honor Care International Sp. z o.o.', companyLead:'La empresa operativa ejecuta las actividades comerciales: reclutamiento, contratos, alojamiento, colocación y servicio a instituciones sanitarias.', companyItems:['Reclutamiento y selección en Colombia','Gestión de contratos y fees de colocación','Alojamiento, acompañamiento y account management'],
    institutionsTitle:'Para instituciones sanitarias en Polonia', institutionsLead:'Ayudamos a organizaciones de salud con una incorporación estructurada, controlada y acompañada de profesionales internacionales.', institutionsItems:['Preselección y cumplimiento','Preparación lingüística y cultural','Acompañamiento tras la llegada a Polonia'],
    candidatesTitle:'Para candidatos de Colombia', candidatesLead:'Una ruta segura para trabajar y vivir en Polonia, con formación, revisión documental, alojamiento y apoyo de integración.', candidatesItems:['Idioma polaco y lenguaje médico','Apoyo con diplomas y documentos','Alojamiento e introducción en Polonia'],
    subsidiesTitle:'Subsidios e impacto social', subsidiesLead:'El programa está diseñado para objetivos subvencionables: integración de terceros países, empleo, capacidad sanitaria y formación.', subsidiesItems:['AMIF para migración e integración','ESF+ / FERS para formación y empleo','Programas regionales en Polonia'],
    contactTitle:'Contacto', contactLead:'Contáctenos para cooperación, instituciones sanitarias, subsidios o socios en Colombia.', footer:'Varsovia / Bogotá'
  }
};
const allowedLangs = ['pl','nl','es'];

app.use((req,res,next)=>{
  const q = req.query.lang;
  if(q && allowedLangs.includes(q)){ req.session.lang = q; }
  const lang = req.session.lang || 'pl';
  res.locals.lang = lang;
  res.locals.t = translations[lang];
  res.locals.appName = APP_NAME;
  next();
});
app.get('/lang/:lang',(req,res)=>{ if(allowedLangs.includes(req.params.lang)) req.session.lang=req.params.lang; res.redirect(req.get('referer') || '/'); });

function requireAuth(req,res,next){ if(req.session && req.session.userId && req.session.twoFAVerified) return next(); return res.redirect('/login'); }

const pages = {
  '/': 'home', '/stichting':'foundation', '/werkmaatschappij':'company', '/zorginstellingen':'institutions',
  '/kandidaten':'candidates', '/subsidies':'subsidies', '/contact':'contact'
};
Object.entries(pages).forEach(([route, view]) => app.get(route, (req,res)=>res.render(view)));

app.get('/login', (req,res)=>res.render('login',{error:null}));
app.post('/login', async (req,res)=>{
  const email = String(req.body.email||'').toLowerCase().trim();
  const password = String(req.body.password||'');
  const user = await User.findOne({email});
  if(!user) return res.render('login',{error:'Gebruiker niet gevonden.'});
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.render('login',{error:'Wachtwoord onjuist.'});
  req.session.userId = String(user._id);
  req.session.email = user.email;
  if(!user.twoFAEnabled) return res.redirect('/setup-2fa');
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
