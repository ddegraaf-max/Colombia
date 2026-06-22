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
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.json({ limit: '5mb' }));

const PORT = process.env.PORT || 8080;
const MONGO = process.env.MONGODB_URI || process.env.MONGO_URL;
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-this-secret';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@honorcarepoland.eu').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';
const IS_PROD = process.env.NODE_ENV === 'production';
const ENABLE_TEST_DOCS = process.env.ENABLE_TEST_DOCS === 'true' || !IS_PROD;
if (!MONGO) { console.error('MONGODB_URI ontbreekt'); process.exit(1); }

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; " +
    "img-src 'self' data: https://images.unsplash.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "script-src 'self'; " +
    "base-uri 'self'; frame-ancestors 'self'; object-src 'none'");
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: IS_PROD ? '7d' : 0 }));

function esc(x) { return String(x ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
function icon(p) { return `<svg viewBox="0 0 24 24" class="ic" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`; }

function layout(title, body, active = 'home', lang = 'pl') {
  const nav = [
    ['home', '/', 'Strona główna'], ['about', '/about', 'O nas'], ['institutions', '/institutions', 'Dla instytucji'],
    ['candidates', '/candidates-info', 'Dla profesjonalistów'], ['academy', '/academy', 'Akademia'],
    ['housing', '/housing', 'Mieszkania'], ['poland', '/poland', 'Polska'], ['contact', '/contact', 'Kontakt']
  ].map(([k, href, label]) => `<a class="${active === k ? 'active' : ''}" href="${href}">${label}</a>`).join('');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="Honor Care International — rekrutacja, legalizacja, szkolenia i zakwaterowanie specjalistów medycznych dla Polski."><link rel="icon" href="/images/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/css/style.css"></head><body>
<a class="skip" href="#main">Przejdź do treści</a>
<div class="top"><span>Zaufanie. Opieka. Przyszłość.</span><span class="right"><a href="tel:+48221234567">☎ +48 22 123 45 67</a> <i>|</i> <a href="mailto:info@honorcare.pl">✉ info@honorcare.pl</a> <i>|</i> 📍 Warszawa, Polska <i>|</i> 🇵🇱 PL</span></div>
<header class="header"><a class="logo" href="/"><img src="/images/logo.svg" alt="Honor Care International" width="300" height="67"></a>
<input type="checkbox" id="navtoggle" class="navtoggle">
<label for="navtoggle" class="burger" aria-label="Otwórz menu"><span></span><span></span><span></span></label>
<nav class="menu" aria-label="Menu główne">${nav}<a class="portal" href="/login">Portal</a></nav></header>
<main id="main">${body}</main></body></html>`;
}

function footer() {
  const social = ['M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6.3c0-1 .2-1.3 1.2-1.3H18V0h-3.6C10.8 0 9 1.6 9 4.6V8z']
    .map(d => `<a href="#" aria-label="Social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="${d}"/></svg></a>`).join('');
  return `<footer class="footer"><div class="footer-main">
<div class="fcol"><img class="flogo" src="/images/logo.svg" alt="Honor Care International" width="230" height="52"><p>Budujemy mosty między Kolumbią a Polską, łącząc talenty, możliwości i przyszłość.</p><div class="social">${social}<a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM0 8h5v16H0V8zm7.5 0H12v2.2h.1c.6-1.1 2.1-2.3 4.4-2.3 4.7 0 5.5 3 5.5 7V24h-5v-7c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24h-5V8z"/></svg></a><a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.5-.1 4.8c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.5.1-4.8C2.4 4 3.9 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 12 18.6 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 12 7.7a4.3 4.3 0 0 1 0 8.6zm6.8-11.1a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg></a></div></div>
<div class="fcol"><h4>Szybkie linki</h4><ul><li><a href="/">Strona główna</a></li><li><a href="/about">O nas</a></li><li><a href="/institutions">Dla instytucji</a></li><li><a href="/candidates-info">Dla profesjonalistów</a></li><li><a href="/academy">Akademia</a></li><li><a href="/housing">Mieszkania</a></li><li><a href="/poland">Polska</a></li><li><a href="/contact">Kontakt</a></li></ul></div>
<div class="fcol"><h4>Polska – Biuro Główne</h4><p>📍 ul. Prosta 69, 00-838<br>Warszawa, Polska</p><p>☎ <a href="tel:+48221234567">+48 22 123 45 67</a></p><p>✉ <a href="mailto:info@honorcare.pl">info@honorcare.pl</a></p><p>🕘 Pon – Pt: 9:00 – 17:00</p></div>
<div class="fcol"><h4>Kolumbia</h4><p>📍 Carrera 13 # 97-76, Oficina 501<br>Bogotá, Colombia</p><p>☎ <a href="tel:+573201234567">+57 320 123 45 67</a></p><p>✉ <a href="mailto:colombia@honorcareinternational.com">colombia@honorcareinternational.com</a></p><p>🕘 Lun – Vie: 8:00 – 16:00</p></div>
<div class="fcol newsletter"><h4>Newsletter</h4><p>Zapisz się, aby otrzymywać aktualności i oferty.</p><form method="post" action="/newsletter"><div class="nl-row"><input type="email" name="email" placeholder="Twój e-mail" aria-label="Twój e-mail" required><button class="nl-btn" aria-label="Zapisz się">→</button></div></form></div>
</div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Honor Care International. Wszelkie prawa zastrzeżone.</span><span><a href="/poland">Polityka prywatności</a> &nbsp;|&nbsp; <a href="/about">Regulamin</a></span></div></footer>`;
}

mongoose.set('strictQuery', true);
const User = mongoose.model('User', new mongoose.Schema({ email: { type: String, unique: true, lowercase: true }, passwordHash: String, twoFASecret: { type: String, default: null }, createdAt: { type: Date, default: Date.now } }));
const Document = mongoose.model('Document', new mongoose.Schema({ title: String, category: String, language: String, status: String, notes: String, content: String, createdAt: { type: Date, default: Date.now } }));
const Candidate = mongoose.model('Candidate', new mongoose.Schema({ name: String, email: String, profession: String, country: String, status: String, notes: String, createdAt: { type: Date, default: Date.now } }));
const Institution = mongoose.model('Institution', new mongoose.Schema({ name: String, contact: String, email: String, city: String, demand: String, status: String, createdAt: { type: Date, default: Date.now } }));
const Subsidy = mongoose.model('Subsidy', new mongoose.Schema({ title: String, program: String, deadline: String, status: String, notes: String, createdAt: { type: Date, default: Date.now } }));
const Newsletter = mongoose.model('Newsletter', new mongoose.Schema({ email: { type: String, lowercase: true }, createdAt: { type: Date, default: Date.now } }));

app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false, proxy: true, cookie: { httpOnly: true, sameSite: 'lax', secure: IS_PROD, maxAge: 1000 * 60 * 60 * 8 }, store: MongoStore.create({ mongoUrl: MONGO }) }));

const requireLogin = (req, res, next) => req.session?.userId ? next() : res.redirect('/login');
const requireAuth = (req, res, next) => {
  if (req.session?.userId && req.session?.totpPassed) return next();
  if (!req.session?.userId) return res.redirect('/login');
  return res.redirect(req.session?.twoFAConfigured ? '/verify-2fa' : '/setup-2fa');
};

const DOCS = [
['Volledig Projectdossier Honor Care Poland','Projectdossier','NL','compleet',`<h1>HONOR CARE POLAND</h1><h2>VOLLEDIG PROJECTDOSSIER</h2><h3>DEEL 1 – BUSINESSPLAN</h3><ol><li>Executive Summary</li><li>Marktanalyse Polen</li><li>Tekort aan zorgpersoneel</li><li>Colombia als wervingsmarkt</li><li>Juridische structuur</li><li>Stichting versus werkmaatschappij</li><li>Verdienmodel</li><li>Financieel model 5 jaar</li><li>Risicoanalyse</li><li>Exit- en groeistrategie</li></ol><h3>DEEL 2 – STICHTING</h3><p><strong>Fundacja Honor Care Poland</strong></p><ul><li>Concept statuten</li><li>Doelstellingen</li><li>Bestuursstructuur</li><li>Subsidiestrategie</li><li>Jaarplan</li><li>Begroting</li></ul><h3>DEEL 3 – WERKMAATSCHAPPIJ</h3><p><strong>Honor Care International Sp. z o.o.</strong></p><ul><li>Oprichtingsplan</li><li>Activiteitenomschrijving</li><li>Contractstructuur</li><li>Recruitmentproces</li><li>Huisvestingsmodel</li><li>Payrollmodel</li></ul><h3>DEEL 4 – COLOMBIA</h3><p><strong>Honor Care Colombia SAS</strong></p><ul><li>Lokale structuur</li><li>Samenwerking universiteiten</li><li>Werving verpleegkundigen</li><li>Screeningprocedure</li><li>Diploma verificatie</li><li>Selectieprocedure</li></ul><h3>DEEL 5 – SUBSIDIES</h3><p>AMIF, FERS en ESF+ met voorwaarden, subsidiepercentage, documenten, aanvraagroute en planning.</p><h3>DEEL 6 – WEBSITE STICHTING</h3><p>HonorCareFoundation.eu: Home, Missie, Projecten, Subsidies, Partners, Nieuws en Contact in Nederlands en Spaans.</p><h3>DEEL 7 – WEBSITE BEDRIJF</h3><p>HonorCarePoland.eu: Home, Voor zorginstellingen, Voor kandidaten, Werken in Polen, Recruitment, Huisvesting, Over ons en Contact in Nederlands en Spaans.</p><h3>DEEL 8 – INVESTEERDERSMEMORANDUM</h3><ul><li>Investeringspropositie</li><li>Markt</li><li>Financiële prognose</li><li>Rendement</li><li>Risico's</li><li>Exitstrategie</li></ul><h3>DEEL 9 – CONTRACTEN</h3><ul><li>Zorginstelling overeenkomst</li><li>Recruitment overeenkomst</li><li>Kandidaten overeenkomst</li><li>Huisvestingsovereenkomst</li><li>Privacydocumenten AVG/GDPR</li></ul><h3>DEEL 10 – STAPPENPLAN</h3><p>Week 1-4: stichting en Sp. z o.o. oprichten. Week 5-8: KRAZ registratie en website live. Week 9-12: eerste zorginstellingen. Week 13-20: subsidieaanvragen. Week 20-52: eerste pilot Colombia → Polen.</p>`],
['Businessplan Honor Care Poland','Businessplan','NL','compleet',`<h1>Businessplan Honor Care Poland</h1><h2>Executive Summary</h2><p>Honor Care Poland is een geïntegreerde recruitment- en integratieorganisatie voor zorgprofessionals uit Colombia die in Polen willen werken.</p><h2>Marktanalyse Polen</h2><p>De Poolse zorgmarkt kent structurele personeelstekorten. Honor Care biedt een compleet traject van selectie tot integratie.</p><h2>Verdienmodel</h2><p>Inkomsten komen uit recruitmentfees, partnercontracten, academy-trajecten, huisvestingscoördinatie en projectfinanciering.</p>`],
['Fundacja Honor Care Poland','Stichting','NL/PL','concept',`<h1>Fundacja Honor Care Poland</h1><p>De stichting richt zich op maatschappelijke begeleiding, taal, integratie, familieondersteuning en subsidieprojecten.</p>`],
['Honor Care International Sp. z o.o.','Werkmaatschappij','NL/PL','concept',`<h1>Honor Care International Sp. z o.o.</h1><p>De werkmaatschappij voert recruitment, matching, contractbeheer, CRM, huisvesting en operationele begeleiding uit.</p>`],
['Honor Care Colombia SAS','Colombia','ES/NL','concept',`<h1>Honor Care Colombia SAS</h1><p>Lokale structuur voor werving, screening, diplomaverificatie en voorbereiding van kandidaten in Colombia.</p>`],
['Subsidiedossier AMIF','Subsidies','NL/PL','concept',`<h1>Subsidiedossier AMIF</h1><p>AMIF is relevant voor integratie, begeleiding en maatschappelijke ondersteuning van migranten en internationale professionals.</p>`],
['Subsidiedossier FERS','Subsidies','NL/PL','concept',`<h1>Subsidiedossier FERS</h1><p>FERS richt zich op sociale ontwikkeling, arbeidsmarkt en innovatie.</p>`],
['Subsidiedossier ESF+','Subsidies','NL/PL','concept',`<h1>Subsidiedossier ESF+</h1><p>ESF+ biedt kansen voor arbeidsmarkttoeleiding, scholing, inclusie en professionele ontwikkeling.</p>`],
['Investeerdersmemorandum','Investeerders','NL','concept',`<h1>Investeerdersmemorandum</h1><ul><li>Investeringspropositie</li><li>Markt</li><li>Financiële prognose</li><li>Rendement</li><li>Risico's</li><li>Exitstrategie</li></ul>`],
['Contractenpakket','Contracten','NL/PL/ES','concept',`<h1>Contractenpakket</h1><ul><li>Zorginstelling overeenkomst</li><li>Recruitment overeenkomst</li><li>Kandidaten overeenkomst</li><li>Huisvestingsovereenkomst</li><li>Privacydocumenten AVG/GDPR</li></ul>`],
['Implementatieplan 52 weken','Planning','NL/PL','concept',`<h1>Implementatieplan 52 weken</h1><h2>Week 1-4</h2><ul><li>Stichting oprichten</li><li>Sp. z o.o. oprichten</li></ul><h2>Week 5-8</h2><ul><li>KRAZ registratie</li><li>Website live</li></ul><h2>Week 9-52</h2><p>Eerste instellingen, subsidieaanvragen en pilot Colombia → Polen.</p>`]
];

async function seed() {
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (!existing) await User.create({ email: ADMIN_EMAIL, passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12) });
  for (const d of DOCS) {
    await Document.updateOne({ title: d[0] }, { $set: { category: d[1], language: d[2], status: d[3], notes: `${d[1]} dossier voor Honor Care Poland`, content: d[4] }, $setOnInsert: { title: d[0], createdAt: new Date() } }, { upsert: true });
  }
  console.log('Admin en documenten gecontroleerd/aangevuld');
}

function docContent(doc) {
  const content = String(doc.content || '').trim();
  if (content.length > 10) return content;
  return `<h1>${esc(doc.title)}</h1><p>${esc(doc.notes || 'Geen inhoud toegevoegd.')}</p>`;
}
function docCard(d) {
  return `<article class="doc"><h3>${esc(d.title)}</h3><p class="meta">${esc(d.category)} • ${esc(d.language)} • ${esc(d.status)}</p><p>${esc(d.notes)}</p><a class="btn navy small" href="/documents/${d._id}">Openen</a></article>`;
}

// ---------- Publieke homepage ----------
const SPECS = [
  ['Lekarze ogólni', '<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M4.5 3h2M13.5 3h2"/><path d="M10 12v3a4 4 0 0 0 7 0v-1"/><circle cx="18.5" cy="11" r="2"/>'],
  ['Specjaliści', '<path d="M12 20S4 15 4 9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 8 2.5C20 15 12 20 12 20z"/><path d="M5 11h3l1.5-3 2 5 1.5-3H19"/>'],
  ['Stomatolodzy', '<path d="M8 3c-2 0-3.5 1.3-3.5 3.6 0 2.5.6 3.8 1.1 6.4.4 2.3.5 5 1.9 5 1.3 0 1.3-3 2.5-3s1.2 3 2.5 3c1.4 0 1.5-2.7 1.9-5 .5-2.6 1.1-3.9 1.1-6.4C19 4.3 17.5 3 15.5 3c-1.3 0-2 .8-3.5.8S9.3 3 8 3z"/>'],
  ['Pielęgniarki', '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'],
  ['Psycholodzy', '<path d="M15.5 6.5A4.5 4.5 0 0 0 7 9c0 1.1.3 1.9.9 2.7.6.8 1.1 1.6 1.1 2.8V17h5v-1.4c0-1.1.5-1.8 1.2-2.6a4.5 4.5 0 0 0 .3-6.5z"/><path d="M9 20h5"/>'],
  ['Fizjoterapeuci', '<circle cx="15" cy="5" r="1.8"/><path d="M14 8l-4 2.5 1.5 4-3 4M14 8l3.5 1.5 2.5 3M14 8L9.5 7 6 9.5"/>'],
  ['Farmaceuci', '<rect x="4" y="8" width="16" height="8" rx="4"/><path d="M12 8v8"/>'],
  ['Higieniści stomatologiczne', '<path d="M8 4c-1.8 0-3 1.2-3 3.3 0 2.3.5 3.5 1 5.8.4 2.1.4 4.6 1.7 4.6 1.2 0 1.1-2.7 2.3-2.7s1.1 2.7 2.3 2.7c1.3 0 1.3-2.5 1.7-4.6"/><path d="M19 4l.6 1.6L21.2 6.2l-1.6.6L19 8.4l-.6-1.6L16.8 6.2l1.6-.6z"/>'],
  ['Opiekunowie medyczni', '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/>'],
  ['I więcej specjalizacji', '<path d="M12 5v14M5 12h14"/>']
];

const CARDS = [
  ['img1', 'DLA PROFESJONALISTÓW', 'Pracuj w Polsce z nami', ['Atrakcyjne zarobki', 'Legalna praca i pełne wsparcie', 'Pomoc w uznaniu kwalifikacji', 'Organizacja zakwaterowania', 'Wsparcie dla Ciebie i Twojej rodziny'], 'ZACZNIJ SWOJĄ PRZYSZŁOŚĆ', '/candidates-info', 'navy'],
  ['img2', 'DLA INSTYTUCJI', 'Skuteczne rozwiązania dla Twojej placówki', ['Selekcja wykwalifikowanych kandydatów', 'Szkolenia językowe i kulturowe', 'Wsparcie w formalnościach', 'Uznanie kwalifikacji', 'Stała opieka koordynatora'], 'POPROŚ O OFERTĘ', '/institutions', 'gold'],
  ['img3', 'AKADEMIA HONOR CARE', 'Szkolenia i rozwój zawodowy', ['Kursy języka polskiego (A1–B2)', 'Terminy i skróty medyczne', 'Kultura i system pracy w Polsce', 'Przygotowanie do pracy', 'Szkolenia online z Kolumbii'], 'PRZEJDŹ DO AKADEMII', '/academy', 'navy'],
  ['img4', 'MIESZKANIA', 'Komfort i bezpieczeństwo', ['Nowoczesne i w pełni wyposażone', 'Blisko miejsc pracy', 'Wsparcie w integracji', 'Bezpieczne i sprawdzone', 'Dla rodzin i osób indywidualnych'], 'ZOBACZ MIESZKANIA', '/housing', 'gold']
];

const STATS = [
  ['<circle cx="9" cy="8" r="3"/><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5"/><circle cx="17.5" cy="9" r="2.2"/><path d="M16 14.2c2.8.2 5 1.9 5 4.8"/>', '1000+', 'Specjalistów już pracuje w Polsce'],
  ['<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M9 20v-4h6v4M12 7v4M10 9h4M8.5 13h7"/>', '200+', 'Placówek medycznych współpracuje z nami'],
  ['<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/>', '10+', 'Lat doświadczenia w rekrutacji międzynarodowej'],
  ['<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>', '2', 'Kraje połączone jednym celem']
];

const PARTNERS = [
  ['NFZ', 'Narodowy Fundusz Zdrowia'], ['PZWL', 'Wydawnictwo Lekarskie'], ['NIPiP', 'Naczelna Izba Pielęgniarek i Położnych'],
  ['PARPA', 'Państwowa Agencja'], ['OZZL', 'Ogólnopolski Związek Zawodowy Lekarzy'], ['Medicover', 'Szpitale']
];

app.get('/', (req, res) => {
  const sub = req.query.sub === 'ok' ? '<div class="toast">Dziękujemy! Zapisano do newslettera.</div>' : '';
  const bullets = ['Rekrutacja międzynarodowa', 'Legalizacja i dokumenty', 'Kursy języka polskiego', 'Wsparcie po przyjeździe', 'Zakwaterowanie', 'Integracja i adaptacja', 'Opieka koordynatora', 'Dla profesjonalistów i rodzin'];
  const heart = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/></svg>';
  const body = `${sub}
<section class="hero"><div class="hero-inner"><h1>Kompleksowe<br>rozwiązania w opiece zdrowotnej<br><strong>dla Polski</strong></h1><p>Łączymy wykwalifikowanych specjalistów z instytucjami medycznymi w całej Polsce. Rekrutacja, legalizacja, zakwaterowanie i wsparcie — wszystko w jednym miejscu.</p><div class="bullets">${bullets.map(x => `<div><b>✓</b>${x}</div>`).join('')}</div><div class="hero-cta"><a class="btn navy" href="/institutions">Dla instytucji</a><a class="btn gold" href="/candidates-info">Dla profesjonalistów</a><a class="btn light" href="/contact">▣ Umów spotkanie</a></div></div><div class="hero-badge">${heart}<span>Z miłości do ludzi,<br>z myślą o przyszłości</span></div></section>
<section class="specs">${SPECS.map(s => `<div class="spec"><span class="spec-ic">${icon(s[1])}</span><span>${s[0]}</span></div>`).join('')}</section>
<section class="cards-wrap"><div class="cards">${CARDS.map(c => `<article class="card"><div class="card-img ${c[0]}" role="img" aria-label="${esc(c[2])}"></div><div class="card-body"><span class="tag">${c[1]}</span><h3>${c[2]}</h3><ul>${c[3].map(li => `<li>${li}</li>`).join('')}</ul><a class="btn ${c[6]} full" href="${c[5]}">${c[4]}</a></div></article>`).join('')}</div></section>
<section class="why"><div class="why-card"><span class="eyebrow">${icon('<path d="M12 21c4-4 7-7.4 7-11a7 7 0 1 0-14 0c0 3.6 3 7 7 11z"/><circle cx="12" cy="10" r="2.5"/>')} DLACZEGO POLSKA?</span><h2>Stabilna przyszłość<br>w sercu Europy</h2><p>Polska oferuje doskonałe możliwości rozwoju zawodowego, bezpieczeństwo i wysoką jakość życia.</p><a class="btn gold" href="/poland">DOWIEDZ SIĘ WIĘCEJ</a></div><div class="why-stats">${STATS.map(s => `<div class="stat"><span class="stat-ic">${icon(s[0])}</span><b>${s[1]}</b><span class="stat-label">${s[2]}</span></div>`).join('')}</div></section>
<section class="partners"><h4>NASI PARTNERZY</h4><div class="partner-row">${PARTNERS.map(p => `<div class="partner"><span class="pmark">${p[0]}</span><span class="psub">${p[1]}</span></div>`).join('')}</div></section>
${footer()}`;
  res.send(layout('Honor Care International', body, 'home'));
});

app.post('/newsletter', async (req, res) => {
  const email = String(req.body.email || '').toLowerCase().trim();
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    try { await Newsletter.updateOne({ email }, { $setOnInsert: { email, createdAt: new Date() } }, { upsert: true }); } catch (e) {}
  }
  res.redirect('/?sub=ok#main');
});

// Subpagina's met eigen content.
function contentPage(active, title, intro, panels) {
  const body = `<section class="page"><h1>${title}</h1><p class="lead">${intro}</p><div class="grid">${panels.map(p => `<article class="panel"><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('')}</div></section>${footer()}`;
  return layout(title, body, active);
}
app.get('/about', (req, res) => res.send(contentPage('about','O nas','Honor Care International łączy Kolumbię i Polskę poprzez profesjonalną rekrutację, edukację i opiekę koordynacyjną.',[
['Nasza misja','Tworzymy bezpieczne i godne ścieżki kariery dla specjalistów medycznych, odpowiadając na realne potrzeby polskiego systemu opieki zdrowotnej.'],
['Dwa kraje, jeden cel','Działamy w Kolumbii i w Polsce, łącząc rekrutację u źródła z pełnym wsparciem na miejscu.'],
['Pełna ścieżka','Od selekcji i weryfikacji dyplomów, przez naukę języka, aż po zakwaterowanie i integrację — prowadzimy kandydata na każdym etapie.'],
['Wartości','Zaufanie, transparentność i szacunek dla człowieka są fundamentem każdej współpracy.'],
['Zgodność prawna','Pracujemy zgodnie z polskim prawem pracy, przepisami o legalizacji pobytu oraz RODO.'],
['Dlaczego my','Jeden partner odpowiedzialny za cały proces — bez pośredników i bez niespodzianek.']
])));
app.get('/institutions', (req, res) => res.send(contentPage('institutions','Dla instytucji','Pomagamy placówkom medycznym w Polsce skutecznie rozwiązać braki kadrowe.',[
['Analiza potrzeb','Określamy profil poszukiwanych specjalistów, liczebność i harmonogram wdrożenia.'],
['Selekcja kandydatów','Prezentujemy wyłącznie zweryfikowanych kandydatów z potwierdzonymi kwalifikacjami.'],
['Legalizacja i dokumenty','Przejmujemy formalności wizowe, pobytowe i związane z uznaniem kwalifikacji.'],
['Szkolenia językowe','Kandydaci uczą się języka polskiego i terminologii medycznej jeszcze przed przyjazdem.'],
['Zakwaterowanie','Organizujemy komfortowe mieszkania blisko miejsca pracy.'],
['Stała opieka koordynatora','Dedykowany koordynator wspiera placówkę i pracownika przez cały okres współpracy.']
])));
app.get('/candidates-info', (req, res) => res.send(contentPage('candidates','Dla profesjonalistów','Tworzymy bezpieczną drogę do pracy w Polsce dla profesjonalistów medycznych z Kolumbii.',[
['Proces rekrutacji','Przejrzysta selekcja i jasne warunki współpracy od pierwszego kontaktu.'],
['Uznanie kwalifikacji','Pomagamy w nostryfikacji dyplomu i potwierdzeniu uprawnień zawodowych.'],
['Nauka języka','Kursy polskiego od poziomu A1 do B2 wraz z terminologią medyczną.'],
['Przyjazd i adaptacja','Wsparcie przy przeprowadzce, formalnościach i pierwszych krokach w Polsce.'],
['Zakwaterowanie','Gotowe, umeblowane mieszkania w bezpiecznych lokalizacjach.'],
['Wsparcie rodziny','Pomoc w integracji rodziny, szkole dla dzieci i codziennych sprawach.']
])));
app.get('/academy', (req, res) => res.send(contentPage('academy','Akademia','Akademia Honor Care przygotowuje kandydatów językowo, zawodowo i kulturowo.',[
['Kurs A1–A2','Podstawy języka polskiego w mowie i piśmie, gotowe na codzienne sytuacje.'],
['Kurs B1–B2','Zaawansowana komunikacja niezbędna w pracy z pacjentem i zespołem.'],
['Terminologia medyczna','Specjalistyczne słownictwo dla pielęgniarek, lekarzy i opiekunów.'],
['Szkolenia online','Elastyczna nauka zdalna jeszcze przed przyjazdem do Polski.'],
['Egzaminy i certyfikaty','Przygotowanie do egzaminów językowych i uznanych certyfikatów.'],
['Mentoring','Indywidualne wsparcie mentora przez cały okres nauki.']
])));
app.get('/housing', (req, res) => res.send(contentPage('housing','Mieszkania','Organizujemy komfortowe mieszkania i wsparcie integracyjne.',[
['Nowoczesne mieszkania','Wygodne, w pełni wyposażone lokale gotowe na przyjazd.'],
['Lokalizacja','Blisko miejsc pracy i komunikacji miejskiej.'],
['Dla rodzin','Mieszkania dostosowane do potrzeb rodzin z dziećmi.'],
['Umeblowanie','Pełne umeblowanie i wyposażenie od pierwszego dnia.'],
['Wsparcie administracyjne','Pomoc przy umowach, mediach i meldunku.'],
['Bezpieczeństwo','Sprawdzone, bezpieczne dzielnice i rzetelni wynajmujący.']
])));
app.get('/poland', (req, res) => res.send(contentPage('poland','Polska','Polska oferuje stabilność, rozwój zawodowy i wysoką jakość życia.',[
['Stabilna gospodarka','Jeden z najszybciej rozwijających się rynków pracy w Europie.'],
['System opieki zdrowotnej','Rosnące zapotrzebowanie na wykwalifikowany personel medyczny.'],
['Jakość życia','Bezpieczeństwo, dobra infrastruktura i przystępne koszty życia.'],
['Kultura','Bogata historia, otwartość i serdeczność mieszkańców.'],
['Rozwój zawodowy','Realne ścieżki awansu i stałego doskonalenia.'],
['Centrum Europy','Dogodna lokalizacja i łatwy dostęp do całego kontynentu.']
])));
app.get('/contact', (req, res) => {
  const body = `<section class="page"><h1>Kontakt</h1><p class="lead">Skontaktuj się z nami w sprawie współpracy lub rekrutacji.</p><div class="grid two">
<article class="panel"><h3>Polska – Biuro Główne</h3><p>ul. Prosta 69, 00-838 Warszawa</p><p><a href="tel:+48221234567">+48 22 123 45 67</a></p><p><a href="mailto:info@honorcare.pl">info@honorcare.pl</a></p><p>Pon – Pt: 9:00 – 17:00</p></article>
<article class="panel"><h3>Kolumbia</h3><p>Carrera 13 # 97-76, Oficina 501, Bogotá</p><p><a href="tel:+573201234567">+57 320 123 45 67</a></p><p><a href="mailto:colombia@honorcareinternational.com">colombia@honorcareinternational.com</a></p><p>Lun – Vie: 8:00 – 16:00</p></article>
</div></section>${footer()}`;
  res.send(layout('Kontakt', body, 'contact'));
});

// ---------- Auth ----------
app.get('/login', (req, res) => {
  const error = req.query.error ? `<div class="error">${esc(req.query.error)}</div>` : '';
  res.send(layout('Login', `<section class="page"><main class="login"><h1>Beveiligde login</h1><p>Toegang tot documenten en portaal.</p>${error}<form method="post" action="/login"><label for="email">E-mail</label><input id="email" name="email" type="email" autocomplete="email" placeholder="E-mail" required><label for="password">Wachtwoord</label><input id="password" name="password" type="password" autocomplete="current-password" placeholder="Wachtwoord" required><button class="btn gold full">Inloggen</button></form></main></section>`, 'home', 'nl'));
});
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: String(req.body.email || '').toLowerCase().trim() });
  if (!user) return res.redirect('/login?error=Gebruiker niet gevonden');
  if (!await bcrypt.compare(String(req.body.password || ''), user.passwordHash)) return res.redirect('/login?error=Wachtwoord onjuist');
  req.session.userId = user._id.toString();
  req.session.email = user.email;
  req.session.totpPassed = false;
  req.session.twoFAConfigured = !!user.twoFASecret;
  if (!user.twoFASecret) return res.redirect('/setup-2fa');
  res.redirect('/verify-2fa');
});
app.get('/setup-2fa', requireLogin, async (req, res) => {
  const user = await User.findById(req.session.userId);
  const secret = speakeasy.generateSecret({ name: `Honor Care (${user.email})` });
  req.session.pendingTwoFASecret = secret.base32;
  const qr = await QRCode.toDataURL(secret.otpauth_url);
  res.send(layout('2FA', `<section class="page"><main class="login"><h1>Authenticator instellen</h1><img style="max-width:240px" src="${qr}" alt="QR-code voor authenticator"><p class="mono">${esc(secret.base32)}</p><form method="post" action="/setup-2fa"><label for="token">Code</label><input id="token" name="token" inputmode="numeric" autocomplete="one-time-code" placeholder="000000" required><button class="btn gold full">Activeren</button></form></main></section>`, 'home', 'nl'));
});
app.post('/setup-2fa', requireLogin, async (req, res) => {
  const secret = req.session.pendingTwoFASecret, token = String(req.body.token || '').replace(/\s/g, '');
  if (!secret || !speakeasy.totp.verify({ secret, encoding: 'base32', token, window: 1 })) return res.redirect('/setup-2fa');
  await User.findByIdAndUpdate(req.session.userId, { twoFASecret: secret });
  req.session.totpPassed = true;
  req.session.twoFAConfigured = true;
  res.redirect('/dashboard');
});
app.get('/verify-2fa', requireLogin, (req, res) => res.send(layout('2FA', `<section class="page"><main class="login"><h1>Authenticator-code</h1><form method="post" action="/verify-2fa"><label for="token">Code</label><input id="token" name="token" inputmode="numeric" autocomplete="one-time-code" placeholder="000000" required><button class="btn gold full">Verifiëren</button></form></main></section>`, 'home', 'nl')));
app.post('/verify-2fa', requireLogin, async (req, res) => {
  const user = await User.findById(req.session.userId), token = String(req.body.token || '').replace(/\s/g, '');
  if (!user.twoFASecret) return res.redirect('/setup-2fa');
  if (!speakeasy.totp.verify({ secret: user.twoFASecret, encoding: 'base32', token, window: 1 })) return res.redirect('/verify-2fa');
  req.session.totpPassed = true;
  res.redirect('/dashboard');
});
app.post('/logout', (req, res) => req.session.destroy(() => res.redirect('/')));

// ---------- Portaal (Nederlands) ----------
app.get('/dashboard', requireAuth, async (req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 }).limit(12).lean();
  const counts = { docs: await Document.countDocuments(), candidates: await Candidate.countDocuments(), institutions: await Institution.countDocuments(), subsidies: await Subsidy.countDocuments() };
  res.send(layout('Dashboard', `<section class="page"><div class="page-head"><div><h1>Dashboard</h1><p>Welkom, ${esc(req.session.email)}.</p></div><form method="post" action="/logout"><button class="btn navy">Uitloggen</button></form></div><section class="modules"><a href="/documents"><b>${counts.docs}</b><span>Documenten</span></a><a href="/candidates"><b>${counts.candidates}</b><span>Kandidaten</span></a><a href="/institutions-list"><b>${counts.institutions}</b><span>Instellingen</span></a><a href="/subsidies"><b>${counts.subsidies}</b><span>Subsidies</span></a></section><h2>Documenten</h2><div class="grid">${docs.map(docCard).join('')}</div></section>`, 'home', 'nl'));
});
app.get('/portal', (req, res) => res.redirect('/dashboard'));

app.get('/documents', requireAuth, async (req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 }).lean();
  res.send(layout('Documenten', `<section class="page"><h1>Documenten</h1><form class="formgrid" method="post" action="/documents"><input name="title" placeholder="Titel" aria-label="Titel"><input name="category" placeholder="Categorie" aria-label="Categorie"><input name="language" placeholder="Taal" aria-label="Taal"><input name="status" placeholder="Status" aria-label="Status"><textarea name="notes" placeholder="Notities" aria-label="Notities"></textarea><textarea name="content" placeholder="Documentinhoud" aria-label="Documentinhoud"></textarea><button class="btn gold">Toevoegen</button></form><div class="grid">${docs.map(docCard).join('')}</div><p><a class="btn navy" href="/dashboard">Terug</a></p></section>`, 'home', 'nl'));
});

if (ENABLE_TEST_DOCS) {
  app.get('/test-documents', async (req, res) => {
    const docs = await Document.find().sort({ createdAt: -1 }).lean();
    res.send(layout('Test documenten', `<section class="page"><h1>Test documenten zonder login</h1><p>Als je deze ziet, staan documenten correct in MongoDB. (Alleen actief buiten productie of met ENABLE_TEST_DOCS=true.)</p><div class="grid">${docs.map(d => `<article class="doc"><h3>${esc(d.title)}</h3><p class="meta">${esc(d.category)} • ${esc(d.language)} • ${esc(d.status)}</p><a class="btn navy small" href="/test-documents/${d._id}">Open test</a></article>`).join('')}</div></section>`, 'home', 'nl'));
  });
  app.get('/test-documents/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.redirect('/test-documents');
    const doc = await Document.findById(req.params.id).lean();
    if (!doc) return res.redirect('/test-documents');
    res.send(layout(doc.title, `<section class="page"><a class="btn navy" href="/test-documents">Terug</a><article class="doc-content"><p class="meta">${esc(doc.category)} • ${esc(doc.language)} • ${esc(doc.status)}</p>${docContent(doc)}</article></section>`, 'home', 'nl'));
  });
}

app.get('/documents/:id', requireAuth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.redirect('/documents');
  const doc = await Document.findById(req.params.id).lean();
  if (!doc) return res.redirect('/documents');
  res.send(layout(doc.title, `<section class="page"><a class="btn navy" href="/documents">Terug</a><article class="doc-content"><p class="meta">${esc(doc.category)} • ${esc(doc.language)} • ${esc(doc.status)}</p>${docContent(doc)}</article></section>`, 'home', 'nl'));
});
app.post('/documents', requireAuth, async (req, res) => {
  const title = req.body.title || 'Nieuw document';
  await Document.create({ title, category: req.body.category, language: req.body.language, status: req.body.status, notes: req.body.notes, content: req.body.content || `<h1>${esc(title)}</h1><p>${esc(req.body.notes || '')}</p>` });
  res.redirect('/documents');
});

function crud(url, Model, title, fields) {
  app.get(url, requireAuth, async (req, res) => {
    const items = await Model.find().sort({ createdAt: -1 }).lean();
    const form = `<form class="formgrid" method="post" action="${url}">${fields.map(f => `<input name="${f}" placeholder="${f}" aria-label="${f}">`).join('')}<button class="btn gold">Toevoegen</button></form>`;
    const list = `<div class="grid">${items.map(i => `<article class="doc"><h3>${esc(i.name || i.title || i.email || 'Item')}</h3>${fields.map(f => `<p><b>${f}:</b> ${esc(i[f] || '')}</p>`).join('')}</article>`).join('')}</div>`;
    res.send(layout(title, `<section class="page"><h1>${title}</h1>${form}${list}<p><a class="btn navy" href="/dashboard">Terug</a></p></section>`, 'home', 'nl'));
  });
  app.post(url, requireAuth, async (req, res) => {
    const data = {};
    for (const f of fields) data[f] = req.body[f];
    await Model.create(data);
    res.redirect(url);
  });
}
crud('/candidates', Candidate, 'Kandidaten', ['name', 'email', 'profession', 'country', 'status', 'notes']);
crud('/institutions-list', Institution, 'Instellingen', ['name', 'contact', 'email', 'city', 'demand', 'status']);
crud('/subsidies', Subsidy, 'Subsidies', ['title', 'program', 'deadline', 'status', 'notes']);

app.get('/healthz', (req, res) => res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use((req, res) => res.status(404).send(layout('404', `<section class="page"><h1>404</h1><p>Strona nie została znaleziona.</p><p><a class="btn navy" href="/">Strona główna</a></p></section>${footer()}`)));

mongoose.connect(MONGO).then(async () => {
  console.log('MongoDB verbonden');
  await seed();
  app.listen(PORT, () => console.log('HonorCare Working Docs v18 draait op poort ' + PORT));
}).catch(e => { console.error(e); process.exit(1); });
