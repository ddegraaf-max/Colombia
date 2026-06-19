const express=require('express');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const speakeasy=require('speakeasy');
const QRCode=require('qrcode');
const path=require('path');
require('dotenv').config();

const app=express();
app.set('trust proxy',1);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

const PORT=process.env.PORT||8080;
const APP_NAME=process.env.APP_NAME||'Honor Care International';
const MONGODB_URI=process.env.MONGODB_URI||process.env.MONGO_URL;
const SESSION_SECRET=process.env.SESSION_SECRET||'change-this-secret';
const ADMIN_EMAIL=(process.env.ADMIN_EMAIL||'admin@honorcarepoland.eu').toLowerCase();
const ADMIN_PASSWORD=process.env.ADMIN_PASSWORD||'ChangeThisPassword123!';
if(!MONGODB_URI){console.error('MONGODB_URI ontbreekt');process.exit(1);}

const i18n={
pl:{
top:'Bogotá, Kolumbia  |  Warszawa, Polska',
navHome:'Strona główna',navAbout:'O nas',navInst:'Dla instytucji',navPro:'Dla profesjonalistów',navAcademy:'Akademia',navHousing:'Mieszkania',navPoland:'Polska',navContact:'Kontakt',navPortal:'Portal',
tag:'Opieka z sercem. Przyszłość z nami.',
hero:'Kompleksowe rozwiązania w opiece zdrowotnej dla Polski',
heroText:'Honor Care International łączy wysoko wykwalifikowanych specjalistów z Kolumbii z instytucjami medycznymi i organizacjami opieki w Polsce.',
b1:'Rekrutacja międzynarodowa',b2:'Legalizacja i dokumenty',b3:'Kursy języka polskiego',b4:'Zakwaterowanie',b5:'Integracja i adaptacja',b6:'Opieka koordynatora',
btnInst:'Dla instytucji',btnPro:'Dla profesjonalistów',btnMeet:'Umów spotkanie',
prof1:'Lekarze ogólni',prof2:'Specjaliści',prof3:'Stomatolodzy',prof4:'Pielęgniarki',prof5:'Psycholodzy',prof6:'Fizjoterapeuci',prof7:'Farmaceuci',prof8:'Higienistki stomatologiczne',prof9:'Opiekunowie medyczni',prof10:'I więcej specjalizacji',
cardProTitle:'Pracuj w Polsce z nami',cardProSub:'Dla profesjonalistów',cardProBtn:'Zacznij swoją przyszłość',
cardInstTitle:'Skuteczne rozwiązania dla Twojej placówki',cardInstSub:'Dla instytucji',cardInstBtn:'Poproś o ofertę',
cardAcadTitle:'Szkolenia i rozwój zawodowy',cardAcadSub:'Akademia Honor Care',cardAcadBtn:'Przejdź do akademii',
cardHomeTitle:'Komfort i bezpieczeństwo',cardHomeSub:'Mieszkania',cardHomeBtn:'Zobacz mieszkania',
whyTitle:'Stabilna przyszłość w sercu Europy',whySub:'Dlaczego Polska?',whyText:'Polska oferuje doskonałe możliwości rozwoju zawodowego, bezpieczeństwo i wysoką jakość życia.',
stat1:'Specjalistów w procesie',stat2:'Placówek partnerskich',stat3:'Dyscyplin medycznych',stat4:'Państwa połączone jednym celem',
partners:'Nasi partnerzy',
loginTitle:'Bezpieczne logowanie',loginSub:'Dostęp do kandydatów, dotacji, instytucji i dokumentów.',email:'E-mail',password:'Hasło',login:'Zaloguj',
dashboard:'Panel zarządzania',welcome:'Witaj',manage:'Zarządzaj kandydatami, instytucjami, dotacjami i dokumentami.',candidates:'Kandydaci',institutions:'Instytucje',subsidies:'Dotacje',documents:'Dokumenty',logout:'Wyloguj',add:'Dodaj',delete:'Usuń',back:'Powrót do panelu',setup2fa:'Konfiguracja Authenticatora',verify2fa:'Kod Authenticatora',codeText:'Wpisz 6-cyfrowy kod.',activate:'Aktywuj',verify:'Zweryfikuj',invalidUser:'Nie znaleziono użytkownika.',invalidPass:'Nieprawidłowe hasło.',invalidCode:'Nieprawidłowy kod.'
},
nl:{
top:'Bogotá, Colombia  |  Warschau, Polen',
navHome:'Home',navAbout:'Over ons',navInst:'Voor instellingen',navPro:'Voor professionals',navAcademy:'Academy',navHousing:'Wonen',navPoland:'Polen',navContact:'Contact',navPortal:'Portal',
tag:'Zorg met hart. Toekomst met ons.',
hero:'Complete zorgoplossingen voor de Poolse markt',
heroText:'Honor Care International verbindt hooggekwalificeerde professionals uit Colombia met medische instellingen en zorgorganisaties in Polen.',
b1:'Internationale recruitment',b2:'Legalisation en documenten',b3:'Poolse taalcursussen',b4:'Huisvesting',b5:'Integratie en begeleiding',b6:'Coördinator ondersteuning',
btnInst:'Voor instellingen',btnPro:'Voor professionals',btnMeet:'Plan gesprek',
prof1:'Huisartsen',prof2:'Specialisten',prof3:'Tandartsen',prof4:'Verpleegkundigen',prof5:'Psychologen',prof6:'Fysiotherapeuten',prof7:'Apothekers',prof8:'Mondhygiënisten',prof9:'Zorgassistenten',prof10:'Meer specialisaties',
cardProTitle:'Werk in Polen met ons',cardProSub:'Voor professionals',cardProBtn:'Start je toekomst',
cardInstTitle:'Echte oplossingen voor personeelstekort',cardInstSub:'Voor instellingen',cardInstBtn:'Vraag informatie',
cardAcadTitle:'Training en professionele groei',cardAcadSub:'Honor Care Academy',cardAcadBtn:'Naar academy',
cardHomeTitle:'Comfort en zekerheid',cardHomeSub:'Wonen',cardHomeBtn:'Bekijk woningen',
whyTitle:'Een stabiele toekomst in het hart van Europa',whySub:'Waarom Polen?',whyText:'Polen biedt sterke groeikansen, veiligheid en een hoge levenskwaliteit.',
stat1:'Professionals in traject',stat2:'Partnerinstellingen',stat3:'Medische disciplines',stat4:'Landen verbonden met één doel',
partners:'Onze partners',
loginTitle:'Beveiligde login',loginSub:'Toegang tot kandidaten, subsidies, instellingen en documenten.',email:'E-mail',password:'Wachtwoord',login:'Inloggen',
dashboard:'Dashboard',welcome:'Welkom',manage:'Beheer kandidaten, instellingen, subsidies en documenten.',candidates:'Kandidaten',institutions:'Instellingen',subsidies:'Subsidies',documents:'Documenten',logout:'Uitloggen',add:'Toevoegen',delete:'Verwijderen',back:'Terug naar dashboard',setup2fa:'Authenticator instellen',verify2fa:'Authenticator-code',codeText:'Vul je 6-cijferige code in.',activate:'Activeren',verify:'Verifiëren',invalidUser:'Gebruiker niet gevonden.',invalidPass:'Wachtwoord onjuist.',invalidCode:'Authenticator-code is onjuist.'
},
es:{
top:'Bogotá, Colombia  |  Varsovia, Polonia',
navHome:'Inicio',navAbout:'Sobre nosotros',navInst:'Para instituciones',navPro:'Para profesionales',navAcademy:'Academy',navHousing:'Vivienda',navPoland:'Polonia',navContact:'Contacto',navPortal:'Portal',
tag:'Cuidado con corazón. Futuro con nosotros.',
hero:'La solución completa de salud para Polonia',
heroText:'Honor Care International conecta profesionales altamente calificados de Colombia con instituciones médicas y organizaciones de atención en Polonia.',
b1:'Reclutamiento internacional',b2:'Legalización y documentos',b3:'Cursos de idioma polaco',b4:'Vivienda organizada',b5:'Integración y adaptación',b6:'Acompañamiento permanente',
btnInst:'Para instituciones',btnPro:'Para profesionales',btnMeet:'Planear reunión',
prof1:'Médicos generales',prof2:'Especialistas',prof3:'Dentistas',prof4:'Enfermeros',prof5:'Psicólogos',prof6:'Fisioterapeutas',prof7:'Farmacéuticos',prof8:'Higienistas dentales',prof9:'Auxiliares de enfermería',prof10:'Más disciplinas',
cardProTitle:'Trabaja en Polonia con nosotros',cardProSub:'Para profesionales',cardProBtn:'Comienza tu futuro',
cardInstTitle:'Soluciones reales para escasez de personal',cardInstSub:'Para instituciones',cardInstBtn:'Solicitar información',
cardAcadTitle:'Formación para el éxito',cardAcadSub:'Honor Care Academy',cardAcadBtn:'Ir a la academy',
cardHomeTitle:'Mucho más que reclutamiento',cardHomeSub:'Vivienda y bienestar',cardHomeBtn:'Ver viviendas',
whyTitle:'Una futuro estable en el corazón de Europa',whySub:'¿Por qué Polonia?',whyText:'Polonia ofrece excelentes oportunidades de crecimiento profesional, seguridad y calidad de vida.',
stat1:'Profesionales en proceso',stat2:'Instituciones asociadas',stat3:'Disciplinas médicas',stat4:'Países conectados',
partners:'Nuestros aliados',
loginTitle:'Acceso seguro',loginSub:'Acceso a candidatos, subsidios, instituciones y documentos.',email:'Correo electrónico',password:'Contraseña',login:'Iniciar sesión',
dashboard:'Panel de control',welcome:'Bienvenido',manage:'Gestiona candidatos, instituciones, subsidios y documentos.',candidates:'Candidatos',institutions:'Instituciones',subsidies:'Subsidios',documents:'Documentos',logout:'Cerrar sesión',add:'Añadir',delete:'Eliminar',back:'Volver al panel',setup2fa:'Configurar Authenticator',verify2fa:'Código Authenticator',codeText:'Introduce el código de 6 dígitos.',activate:'Activar',verify:'Verificar',invalidUser:'Usuario no encontrado.',invalidPass:'Contraseña incorrecta.',invalidCode:'Código incorrecto.'
}
};
function lang(req){let l=req.session?.lang||'pl';return ['pl','nl','es'].includes(l)?l:'pl'}
function data(req,extra={}){let l=lang(req);return{appName:APP_NAME,lang:l,t:i18n[l],...extra}}

mongoose.set('strictQuery',true);
const User=mongoose.model('User',new mongoose.Schema({email:{type:String,unique:true,lowercase:true},passwordHash:String,twoFASecret:{type:String,default:null},role:{type:String,default:'admin'},createdAt:{type:Date,default:Date.now}}));
const Candidate=mongoose.model('Candidate',new mongoose.Schema({name:String,email:String,profession:String,country:{type:String,default:'Colombia'},status:{type:String,default:'screening'},notes:String,createdAt:{type:Date,default:Date.now}}));
const Institution=mongoose.model('Institution',new mongoose.Schema({name:String,contact:String,email:String,city:String,demand:String,status:{type:String,default:'lead'},createdAt:{type:Date,default:Date.now}}));
const Subsidy=mongoose.model('Subsidy',new mongoose.Schema({title:String,program:String,deadline:String,status:{type:String,default:'research'},notes:String,createdAt:{type:Date,default:Date.now}}));
const Document=mongoose.model('Document',new mongoose.Schema({title:String,category:String,language:String,status:{type:String,default:'draft'},notes:String,createdAt:{type:Date,default:Date.now}}));

app.use(session({secret:SESSION_SECRET,resave:false,saveUninitialized:false,proxy:true,cookie:{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:28800000},store:MongoStore.create({mongoUrl:MONGODB_URI})}));
const requireLogin=(req,res,next)=>req.session?.userId?next():res.redirect('/login');
const requireAuth=(req,res,next)=>req.session?.userId&&req.session?.totpPassed?next():req.session?.userId?res.redirect('/verify-2fa'):res.redirect('/login');

async function seedAdmin(){let ex=await User.findOne({email:ADMIN_EMAIL});if(!ex){await User.create({email:ADMIN_EMAIL,passwordHash:await bcrypt.hash(ADMIN_PASSWORD,12)});console.log('Admin aangemaakt: '+ADMIN_EMAIL)}else console.log('Admin bestaat al: '+ADMIN_EMAIL)}
app.get('/lang/:lang',(req,res)=>{if(['pl','nl','es'].includes(req.params.lang))req.session.lang=req.params.lang;res.redirect(req.get('Referrer')||'/')});
app.get('/',(req,res)=>res.render('home',data(req)));
['about','institutions-page','professionals','academy','housing','poland','contact'].forEach(p=>app.get('/'+p,(req,res)=>res.render('page',data(req,{page:p}))));
app.get('/login',(req,res)=>res.render('login',data(req,{error:null})));
app.post('/login',async(req,res)=>{let l=lang(req);let user=await User.findOne({email:String(req.body.email||'').toLowerCase().trim()});if(!user)return res.status(401).render('login',data(req,{error:i18n[l].invalidUser}));let ok=await bcrypt.compare(String(req.body.password||''),user.passwordHash);if(!ok)return res.status(401).render('login',data(req,{error:i18n[l].invalidPass}));req.session.userId=user._id.toString();req.session.email=user.email;req.session.totpPassed=false;if(!user.twoFASecret)return res.redirect('/setup-2fa');res.redirect('/verify-2fa')});
app.get('/setup-2fa',requireLogin,async(req,res)=>{let user=await User.findById(req.session.userId);let secret=speakeasy.generateSecret({name:`${APP_NAME} (${user.email})`});req.session.pendingTwoFASecret=secret.base32;res.render('setup-2fa',data(req,{qr:await QRCode.toDataURL(secret.otpauth_url),secret:secret.base32,error:null}))});
app.post('/setup-2fa',requireLogin,async(req,res)=>{let l=lang(req),secret=req.session.pendingTwoFASecret,token=String(req.body.token||'').replace(/\s/g,'');let ok=speakeasy.totp.verify({secret,encoding:'base32',token,window:1});if(!ok)return res.status(401).render('setup-2fa',data(req,{qr:await QRCode.toDataURL(speakeasy.otpauthURL({secret,label:APP_NAME,encoding:'base32'})),secret,error:i18n[l].invalidCode}));await User.findByIdAndUpdate(req.session.userId,{twoFASecret:secret});delete req.session.pendingTwoFASecret;req.session.totpPassed=true;res.redirect('/dashboard')});
app.get('/verify-2fa',requireLogin,(req,res)=>res.render('verify-2fa',data(req,{error:null})));
app.post('/verify-2fa',requireLogin,async(req,res)=>{let l=lang(req),user=await User.findById(req.session.userId),token=String(req.body.token||'').replace(/\s/g,'');let ok=speakeasy.totp.verify({secret:user.twoFASecret,encoding:'base32',token,window:1});if(!ok)return res.status(401).render('verify-2fa',data(req,{error:i18n[l].invalidCode}));req.session.totpPassed=true;res.redirect('/dashboard')});
app.post('/logout',(req,res)=>req.session.destroy(()=>res.redirect('/')));
app.get('/dashboard',requireAuth,async(req,res)=>{let counts={candidates:await Candidate.countDocuments(),institutions:await Institution.countDocuments(),subsidies:await Subsidy.countDocuments(),documents:await Document.countDocuments()};res.render('dashboard',data(req,{email:req.session.email,counts}))});
app.get('/portal',(req,res)=>res.redirect('/dashboard'));
function crud(url,Model,key,type,fields){app.get(url,requireAuth,async(req,res)=>res.render('list',data(req,{title:i18n[lang(req)][key],type,fields,items:await Model.find().sort({createdAt:-1}).lean()})));app.post(url,requireAuth,async(req,res)=>{await Model.create(req.body);res.redirect(url)})}
crud('/candidates',Candidate,'candidates','candidates',['name','email','profession','country','status','notes']);
crud('/institutions',Institution,'institutions','institutions',['name','contact','email','city','demand','status']);
crud('/subsidies',Subsidy,'subsidies','subsidies',['title','program','deadline','status','notes']);
crud('/documents',Document,'documents','documents',['title','category','language','status','notes']);
app.post('/delete/:type/:id',requireAuth,async(req,res)=>{let m={candidates:Candidate,institutions:Institution,subsidies:Subsidy,documents:Document}[req.params.type];if(m)await m.findByIdAndDelete(req.params.id);res.redirect('/'+req.params.type)});
mongoose.connect(MONGODB_URI).then(async()=>{console.log('MongoDB verbonden');await seedAdmin();app.listen(PORT,()=>console.log(`${APP_NAME} draait op poort ${PORT}`))}).catch(e=>{console.error(e);process.exit(1)});
