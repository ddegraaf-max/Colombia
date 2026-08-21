const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();
const { LANGS, LANGMETA, T } = require('./i18n');
const { EUROUTE, renderEuRoute } = require('./eu-route');
const CP = require('./candidate-profile');
const ZS = require('./zorgscan-panel');
const { renderNetherlands } = require('./netherlands');
const { renderExtras } = require('./page-extras');
const { renderLegal, legalTitle } = require('./legal');
const { renderJourney } = require('./journey');
const { renderChangelog, UI: CL_UI } = require('./changelog');
const WA_NUMBER = '31646150160'; // WhatsApp: zelfde nummer als telefoon
const WA_LINK = 'https://wa.me/' + WA_NUMBER;
const waIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.5-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.4 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4 0-.1-.2-.2-.5-.3z"/><path d="M12 2A10 10 0 0 0 3.5 17.2L2 22l4.9-1.5A10 10 0 1 0 12 2zm0 18.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-2.9.9.9-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1z"/></svg>';
// Klokken: het tijdsverschil met Colombia is voor kandidaten en planning relevant.
function clocksBlock(labelNL, labelCO) {
  return `<div class="clocks" data-clocks><div class="clock"><span class="clock-city">${esc(labelNL)}</span><b data-clock="Europe/Amsterdam">--:--</b></div><div class="clock"><span class="clock-city">${esc(labelCO)}</span><b data-clock="America/Bogota">--:--</b></div></div>`;
}

const app = express();
const PKG = require('./package.json');
const STARTED_AT = new Date();
// Versielabel voor het beheerportaal: welke build draait er nu echt?
function versionLine() {
  const t = STARTED_AT.toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  return 'Honor Care Portaal v' + PKG.version + ' · actief sinds ' + t;
}
const ASSET_V = Date.now(); // cache-busting: nieuwe waarde bij elke (her)start/deploy
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
    "default-src 'self'; img-src 'self' data: https://images.unsplash.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; " +
    "script-src 'self' https://challenges.cloudflare.com; frame-src 'self' https://challenges.cloudflare.com; " +
    "connect-src 'self' https://challenges.cloudflare.com; base-uri 'self'; frame-ancestors 'self'; object-src 'none'");
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: IS_PROD ? '7d' : 0 }));

// Taaldetectie via cookie (default pl).
app.use((req, res, next) => {
  const m = /(?:^|;\s*)lang=([a-z]{2})/.exec(req.headers.cookie || '');
  req.lang = (m && LANGS.includes(m[1])) ? m[1] : 'pl';
  next();
});
app.get('/setlang/:lang', (req, res) => {
  const lang = LANGS.includes(req.params.lang) ? req.params.lang : 'pl';
  res.setHeader('Set-Cookie', `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`);
  const back = (typeof req.query.r === 'string' && req.query.r.startsWith('/') && !req.query.r.startsWith('//')) ? req.query.r : '/';
  res.redirect(back);
});

function esc(x) { return String(x ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
function icon(p) { return `<svg viewBox="0 0 24 24" class="ic" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`; }

function langSwitcher(lang, curPath) {
  const r = encodeURIComponent(curPath || '/');
  const opts = LANGS.map(l => `<a href="/setlang/${l}?r=${r}"${l === lang ? ' class="cur"' : ''}>${LANGMETA[l].flag} ${LANGMETA[l].name}</a>`).join('');
  return `<details class="langsel"><summary>${LANGMETA[lang].flag} ${LANGMETA[lang].label} ▾</summary><div class="langmenu">${opts}</div></details>`;
}

function layout(title, body, active = 'home', lang = 'pl', curPath = '/') {
  const tr = T[lang];
  const nav = [['home', '/'], ['about', '/about'], ['institutions', '/institutions'], ['candidates', '/candidates-info'], ['academy', '/academy'], ['housing', '/housing'], ['poland', '/poland'], ['euroute', '/eu-route'], ['contact', '/contact']]
    .map(([k, href]) => `<a class="${active === k ? 'active' : ''}" href="${href}">${k === 'euroute' ? esc(EUROUTE[lang].navLabel) : tr.nav[k]}</a>`).join('');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="Honor Care International — ${esc(tr.hero.p).slice(0, 140)}"><link rel="icon" href="/images/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/css/style.css?v=${ASSET_V}"></head><body>
<a class="skip" href="#main">→</a>
<div class="top"><span class="ttag">${tr.topTagline}</span><span class="right"><a href="tel:+31646150160">☎ +31 6 46 15 01 60</a> <i class="t-loc">|</i> <a class="t-wa" href="${WA_LINK}" target="_blank" rel="noopener">${waIcon} WhatsApp</a> <i class="t-loc">|</i> <a class="t-mail" href="mailto:info@honorcareinternational.com">✉ info@honorcareinternational.com</a> <i class="t-loc">|</i> <span class="t-loc">📍 ${tr.location}</span> <i>|</i> ${langSwitcher(lang, curPath)}</span></div>
<header class="header"><a class="logo" href="/"><img src="/images/logo.svg" alt="Honor Care International" width="290" height="65"></a>
<input type="checkbox" id="navtoggle" class="navtoggle">
<label for="navtoggle" class="burger" aria-label="Menu"><span></span><span></span><span></span></label>
<nav class="menu" aria-label="Menu">${nav}<a class="portal" href="/portal">${tr.nav.portal}</a></nav></header>
<main id="main">${body}</main>
<a class="wa-float" href="${WA_LINK}" target="_blank" rel="noopener" aria-label="WhatsApp">${waIcon}</a>
<script src="/js/site.js?v=${ASSET_V}"></script></body></html>`;
}

const PARTNER_NAME = process.env.PARTNER_NAME || '';
const PARTNER_REG = process.env.PARTNER_REG || '';
const PARTNER_DEFAULT = { pl: 'nasz licencjonowany partner', en: 'our licensed partner', nl: 'onze gelicentieerde partner', es: 'nuestro socio autorizado' };
const LEGAL = {
  pl: 'Honor Care International zajmuje się rekrutacją, przygotowaniem i wsparciem profesjonalistów medycznych z Hiszpanii, innych krajów UE i Kolumbii. Oficjalne pośrednictwo pracy, udostępnianie pracowników i/lub zatrudnienie realizuje {partner}, zarejestrowana agencja zatrudnienia{reg}. Dla kandydatów nasze usługi są bezpłatne.',
  en: 'Honor Care International provides recruitment, preparation and support for healthcare professionals from Spain, other EU countries and Colombia. The official job placement, staffing and/or employment is handled by {partner}, a registered staffing and recruitment agency{reg}. Our services are free of charge for candidates.',
  nl: 'Honor Care International verzorgt werving, voorbereiding en begeleiding van zorgprofessionals uit Spanje, andere EU-landen en Colombia. De officiële arbeidsbemiddeling, terbeschikkingstelling en/of het dienstverband worden verzorgd door {partner}, een geregistreerd uitzend- en bemiddelingsbureau{reg}. Voor kandidaten zijn onze diensten kosteloos.',
  es: 'Honor Care International se encarga de la captación, preparación y acompañamiento de profesionales sanitarios de España, otros países de la UE y Colombia. La intermediación laboral, la cesión de personal y/o el empleo los gestiona {partner}, una agencia de empleo y selección registrada{reg}. Para los candidatos, nuestros servicios son gratuitos.'
};
function legalText(lang) {
  const partner = PARTNER_NAME || PARTNER_DEFAULT[lang] || PARTNER_DEFAULT.pl;
  const reg = PARTNER_REG ? ` (${PARTNER_REG})` : '';
  return (LEGAL[lang] || LEGAL.pl).replace('{partner}', partner).replace('{reg}', reg);
}
const HOWIT = {
  pl: { eyebrow: 'JAK TO DZIAŁA', h2: 'Z Kolumbii i Hiszpanii do holenderskiej ochrony zdrowia — krok po kroku', note: 'Honor Care nie prowadzi pośrednictwa samodzielnie; oficjalne zatrudnienie realizuje nasze zarejestrowane biuro partnerskie.', steps: [['Rekrutacja i przygotowanie', 'Znajdujemy i wspieramy profesjonalistów w Kolumbii i Hiszpanii: język niderlandzki (B1–B2, NT2), pomoc w uznaniu dyplomu i rejestracji BIG, przygotowanie i relokacja.'], ['Oficjalne zatrudnienie', 'Pośrednictwo, umowę i pozwolenia realizuje nasze zarejestrowane biuro partnerskie — uprawniony pośrednik/pracodawca.'], ['Wsparcie aż do Holandii', 'Towarzyszymy kandydatowi aż do przyjazdu i integracji. Dla kandydata bezpłatnie.']] },
  en: { eyebrow: 'HOW IT WORKS', h2: 'From Colombia and Spain to Dutch healthcare, step by step', note: 'Honor Care does not place workers itself; the official placement and employment are handled by our registered partner agency.', steps: [['Sourcing & preparation', 'We find and guide professionals in Colombia and Spain: Dutch to B1–B2 (NT2), help with diploma recognition and BIG registration, preparation and relocation.'], ['Official placement', 'Placement, the contract and permits are handled by our registered partner agency — the authorised intermediary/employer.'], ['Support all the way to the Netherlands', 'We support the candidate through arrival and integration. Free of charge for the candidate.']] },
  nl: { eyebrow: 'HOE HET WERKT', h2: 'Van Colombia en Spanje naar de Nederlandse zorg — stap voor stap', note: 'Honor Care bemiddelt niet zelf; de officiële plaatsing en het dienstverband lopen via ons geregistreerde partnerbureau.', steps: [['Werving & voorbereiding', 'Wij vinden en begeleiden professionals in Colombia en Spanje: Nederlands tot B1–B2 (NT2), hulp bij diploma-erkenning en BIG-registratie, voorbereiding en relocatie.'], ['Officiële plaatsing', 'De bemiddeling, het contract en de vergunningen lopen via ons geregistreerde partnerbureau — de erkende bemiddelaar/werkgever.'], ['Begeleiding tot in Nederland', 'Wij ondersteunen de kandidaat tot en met aankomst en integratie. Voor de kandidaat kosteloos.']] },
  es: { eyebrow: 'CÓMO FUNCIONA', h2: 'De Colombia y España a la sanidad neerlandesa, paso a paso', note: 'Honor Care no realiza la intermediación; la colocación oficial y el empleo los gestiona nuestra agencia asociada registrada.', steps: [['Captación y preparación', 'Encontramos y acompañamos a profesionales en Colombia y España: neerlandés hasta B1–B2 (NT2), ayuda con la homologación del título y el registro BIG, preparación y reubicación.'], ['Colocación oficial', 'La intermediación, el contrato y los permisos los gestiona nuestra agencia asociada registrada: el intermediario autorizado.'], ['Acompañamiento hasta los Países Bajos', 'Apoyamos al candidato hasta la llegada y la integración. Gratis para el candidato.']] }
};
function footer(lang = 'pl') {
  const tr = T[lang], f = tr.footer;
  const links = [['home', '/'], ['about', '/about'], ['institutions', '/institutions'], ['candidates', '/candidates-info'], ['academy', '/academy'], ['housing', '/housing'], ['poland', '/poland'], ['euroute', '/eu-route'], ['contact', '/contact']]
    .map(([k, href]) => `<li><a href="${href}">${k === 'euroute' ? esc(EUROUTE[lang].navLabel) : tr.nav[k]}</a></li>`).join('');
  return `<footer class="footer"><div class="footer-main">
<div class="fcol"><img class="flogo" src="/images/logo.svg" alt="Honor Care International" width="230" height="52"><p>${f.tagline}</p><div class="social"><a class="wa" href="${WA_LINK}" target="_blank" rel="noopener" aria-label="WhatsApp">${waIcon}</a><a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6.3c0-1 .2-1.3 1.2-1.3H18V0h-3.6C10.8 0 9 1.6 9 4.6V8z"/></svg></a><a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM0 8h5v16H0V8zm7.5 0H12v2.2h.1c.6-1.1 2.1-2.3 4.4-2.3 4.7 0 5.5 3 5.5 7V24h-5v-7c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24h-5V8z"/></svg></a><a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.5-.1 4.8c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.5.1-4.8C2.4 4 3.9 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 12 18.6 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 12 7.7a4.3 4.3 0 0 1 0 8.6zm6.8-11.1a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg></a></div></div>
<div class="fcol"><h4>${f.quick}</h4><ul>${links}</ul></div>
<div class="fcol"><h4>${f.officeNL}</h4><p>📍 Torenlaan 5A, 1402 BN<br>Bussum, ${tr.nav.poland}</p><p>☎ <a href="tel:+31646150160">+31 6 46 15 01 60</a></p><p>✉ <a href="mailto:info@honorcareinternational.com">info@honorcareinternational.com</a></p><p>🕘 ${f.hoursNL}</p>${clocksBlock('Nederland', 'Colombia')}</div>
<div class="fcol"><h4>${f.officePL}</h4><p>📍 Białka 15, 09-550<br>Szczawin Kościelny</p><p>☎ <a href="tel:+48452823838">+48 45 282 38 38</a></p><p>✉ <a href="mailto:info@honorcareinternational.com">info@honorcareinternational.com</a></p><p>🕘 ${f.hoursPL}</p></div>
<div class="fcol newsletter"><h4>${f.newsletter}</h4><p>${f.newsletterText}</p><form method="post" action="/newsletter"><div class="nl-row"><input type="email" name="email" placeholder="${f.newsletterPh}" aria-label="${f.newsletterPh}" required><button class="nl-btn" aria-label="OK">→</button></div></form></div>
</div><div class="footer-legal">${legalText(lang)}</div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Honor Care International. ${f.rights}</span><span><a href="/privacy">${f.privacy}</a> &nbsp;|&nbsp; <a href="/voorwaarden">${f.terms}</a> &nbsp;|&nbsp; <a href="/login" class="adminlink">Beheer</a></span></div></footer>`;
}

mongoose.set('strictQuery', true);
const User = mongoose.model('User', new mongoose.Schema({ email: { type: String, unique: true, lowercase: true }, passwordHash: String, twoFASecret: { type: String, default: null }, createdAt: { type: Date, default: Date.now } }));
const Document = mongoose.model('Document', new mongoose.Schema({ title: String, category: String, language: String, status: String, notes: String, content: String, createdAt: { type: Date, default: Date.now } }));
const Candidate = mongoose.model('Candidate', new mongoose.Schema({ name: String, email: String, phone: String, profession: String, specialty: String, country: { type: String, default: 'Kolumbia' }, city: String, language: String, status: { type: String, default: 'Nieuw' }, notes: String, createdAt: { type: Date, default: Date.now } }));
const Institution = mongoose.model('Institution', new mongoose.Schema({ name: String, contact: String, email: String, phone: String, city: String, type: String, demand: String, status: { type: String, default: 'Prospect' }, notes: String, createdAt: { type: Date, default: Date.now } }));
const Placement = mongoose.model('Placement', new mongoose.Schema({ candidate: String, institution: String, role: String, startDate: String, status: { type: String, default: 'Voorgesteld' }, notes: String, createdAt: { type: Date, default: Date.now } }));
const Housing = mongoose.model('Housing', new mongoose.Schema({ title: String, district: String, address: String, rooms: String, area: String, price: String, furnished: { type: Boolean, default: true }, status: { type: String, default: 'Beschikbaar' }, otodomUrl: String, assignedTo: String, notes: String, createdAt: { type: Date, default: Date.now } }));
const Subsidy = mongoose.model('Subsidy', new mongoose.Schema({ title: String, program: String, deadline: String, status: { type: String, default: 'Concept' }, notes: String, createdAt: { type: Date, default: Date.now } }));
const Newsletter = mongoose.model('Newsletter', new mongoose.Schema({ email: { type: String, lowercase: true }, lang: String, createdAt: { type: Date, default: Date.now } }));
const PortalUser = mongoose.model('PortalUser', new mongoose.Schema({ name: String, email: { type: String, unique: true, lowercase: true }, passwordHash: String, role: { type: String, default: 'Zorgprofessional' }, language: { type: String, default: 'pl' }, twoFASecret: { type: String, default: null }, twoFAEnabled: { type: Boolean, default: false }, profession: String, specialty: String, country: String, city: String, phone: String, experienceYears: Number, dutchLevel: String, englishLevel: String, bigStatus: String, availableFrom: String, euNational: { type: Boolean, default: false }, motivation: String, profileUpdatedAt: Date, adminStatus: { type: String, default: 'Nieuw' }, adminNotes: String, createdAt: { type: Date, default: Date.now }, lastLogin: Date }));
const Appointment = mongoose.model('Appointment', new mongoose.Schema({ name: String, email: String, portalUserId: { type: String, default: null }, date: String, time: String, topic: String, channel: { type: String, default: 'Videogesprek' }, status: { type: String, default: 'Aangevraagd' }, notes: String, createdAt: { type: Date, default: Date.now } }));
const ContactMessage = mongoose.model('ContactMessage', new mongoose.Schema({ name: String, email: String, subject: String, message: String, lang: String, status: { type: String, default: 'Nieuw' }, createdAt: { type: Date, default: Date.now } }));

app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false, proxy: true, cookie: { httpOnly: true, sameSite: 'lax', secure: IS_PROD, maxAge: 1000 * 60 * 60 * 8 }, store: MongoStore.create({ mongoUrl: MONGO }) }));

const requireLogin = (req, res, next) => req.session?.userId ? next() : res.redirect('/login');
const requireAuth = (req, res, next) => {
  if (req.session?.userId && req.session?.totpPassed) return next();
  if (!req.session?.userId) return res.redirect('/login');
  return res.redirect(req.session?.twoFAConfigured ? '/verify-2fa' : '/setup-2fa');
};

// Extra beveiliging: inlogbegrenzing tegen brute force (in-memory, per IP + soort).
const loginAttempts = new Map();
function throttleKey(req, scope) { return scope + ':' + (req.ip || (req.headers['x-forwarded-for'] || '').split(',')[0] || 'x'); }
function isLocked(key) { const a = loginAttempts.get(key); return !!(a && a.until && a.until > Date.now()); }
function recordFail(key) { const a = loginAttempts.get(key) || { count: 0, until: 0 }; a.count++; if (a.count >= 5) { a.until = Date.now() + 15 * 60 * 1000; a.count = 0; } loginAttempts.set(key, a); }
function clearFails(key) { loginAttempts.delete(key); }
function setLangCookie(res, lang) { res.setHeader('Set-Cookie', `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`); }

// Antyspam formularzy publicznych: podpisany token czasowy (odrzuca boty POST-ujące
// wprost, bez pobrania strony, oraz zgłoszenia szybsze niż 3 s) + limit zgłoszeń na IP.
function formToken() { const t = Date.now().toString(36); return t + '.' + crypto.createHmac('sha256', SESSION_SECRET).update('ft:' + t).digest('hex').slice(0, 20); }
function checkFormToken(tok) {
  const [t, sig] = String(tok || '').split('.');
  if (!t || !sig) return false;
  const exp = crypto.createHmac('sha256', SESSION_SECRET).update('ft:' + t).digest('hex').slice(0, 20);
  if (sig.length !== exp.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(exp))) return false;
  const age = Date.now() - parseInt(t, 36);
  return age >= 3000 && age <= 6 * 60 * 60 * 1000;
}
const formHits = new Map();
function tooMany(req, scope, max = 5) {
  const key = scope + ':' + (req.ip || (req.headers['x-forwarded-for'] || '').split(',')[0] || 'x');
  const now = Date.now();
  const arr = (formHits.get(key) || []).filter(ts => now - ts < 60 * 60 * 1000);
  arr.push(now); formHits.set(key, arr);
  if (formHits.size > 5000) { for (const [k, v] of formHits) { if (!v.some(ts => now - ts < 60 * 60 * 1000)) formHits.delete(k); } }
  return arr.length > max;
}

// Gebruikers-toegang (los van admin): pas door als ingelogd én 2FA (indien aan) voltooid.
// Basistoegang tot het portaal: ingelogd, en als 2FA aanstaat ook geverifieerd.
// Kandidaten kunnen hun profiel dus direct invullen; 2FA is een aanrader, geen drempel.
const requireUser = (req, res, next) => {
  if (!req.session?.portalUserId) return res.redirect('/portal');
  if (req.session?.userPending2FA) return res.redirect('/portal/2fa');
  return next();
};
// Voor gevoelige handelingen (documenten, persoonsgegevens, 2FA uitzetten):
// hier is tweestapsverificatie wél verplicht.
const requireUser2FA = (req, res, next) => {
  if (!req.session?.portalUserId) return res.redirect('/portal');
  if (req.session?.userPending2FA) return res.redirect('/portal/2fa');
  if (!req.session?.user2FAEnabled) return res.redirect('/portal/security/2fa-setup');
  return next();
};

// Meertalige teksten voor de gebruikersomgeving.
const ACC = {
  pl: { title: 'Portal', sub: 'Załóż konto i uzupełnij profil. Gdy pojawi się odpowiednie stanowisko, odezwiemy się do Ciebie. Masz już konto? Zaloguj się.', login: 'Logowanie', register: 'Rejestracja', name: 'Imię i nazwisko', email: 'E-mail', password: 'Hasło', type: 'Jestem', prof: 'Pracownik medyczny', inst: 'Placówka medyczna', lang: 'Preferowany język', btnLogin: 'Zaloguj się', btnRegister: 'Załóż konto', account: 'Moje konto', hello: 'Witaj', logout: 'Wyloguj', profile: 'Profil', save: 'Zapisz', security: 'Bezpieczeństwo', twofaOn: 'Weryfikacja dwuetapowa jest włączona.', twofaOff: 'Weryfikacja dwuetapowa jest wyłączona. Zalecamy włączenie.', enable2fa: 'Włącz 2FA', disable2fa: 'Wyłącz 2FA', scan: 'Zeskanuj w aplikacji authenticator i wpisz kod.', code: 'Kod', verify: 'Zweryfikuj', twoFAtitle: 'Weryfikacja dwuetapowa', badCred: 'Nieprawidłowy e-mail lub hasło.', weak: 'Hasło musi mieć co najmniej 8 znaków.', exists: 'Konto z tym adresem e-mail już istnieje.', locked: 'Zbyt wiele prób. Spróbuj ponownie za 15 minut.', secNote: 'Twoje dane są szyfrowane i chronione.' },
  en: { title: 'Portal', sub: 'Create an account and complete your profile. As soon as a suitable position comes up, we will approach you. Already have an account? Log in.', login: 'Log in', register: 'Register', name: 'Full name', email: 'Email', password: 'Password', type: 'I am a', prof: 'Healthcare professional', inst: 'Healthcare institution', lang: 'Preferred language', btnLogin: 'Log in', btnRegister: 'Create account', account: 'My account', hello: 'Welcome', logout: 'Log out', profile: 'Profile', save: 'Save', security: 'Security', twofaOn: 'Two-factor authentication is enabled.', twofaOff: 'Two-factor authentication is disabled. Strongly recommended.', enable2fa: 'Enable 2FA', disable2fa: 'Disable 2FA', scan: 'Scan with your authenticator app and enter the code.', code: 'Code', verify: 'Verify', twoFAtitle: 'Two-factor authentication', badCred: 'Incorrect email or password.', weak: 'Password must be at least 8 characters.', exists: 'An account with this email already exists.', locked: 'Too many attempts. Try again in 15 minutes.', secNote: 'Your data is stored encrypted and protected.' },
  nl: { title: 'Portaal', sub: 'Maak een account aan en vul je profiel in. Zodra er een passende functie is, benaderen wij je. Heb je al een account? Log dan in.', login: 'Inloggen', register: 'Registreren', name: 'Naam', email: 'E-mail', password: 'Wachtwoord', type: 'Ik ben', prof: 'Zorgprofessional', inst: 'Zorginstelling', lang: 'Voorkeurstaal', btnLogin: 'Inloggen', btnRegister: 'Account aanmaken', account: 'Mijn account', hello: 'Welkom', logout: 'Uitloggen', profile: 'Profiel', save: 'Opslaan', security: 'Beveiliging', twofaOn: 'Tweestapsverificatie is ingeschakeld.', twofaOff: 'Tweestapsverificatie staat uit. Sterk aangeraden.', enable2fa: '2FA inschakelen', disable2fa: '2FA uitschakelen', scan: 'Scan met je authenticator-app en voer de code in.', code: 'Code', verify: 'Verifiëren', twoFAtitle: 'Tweestapsverificatie', badCred: 'E-mail of wachtwoord onjuist.', weak: 'Wachtwoord moet minstens 8 tekens bevatten.', exists: 'Er bestaat al een account met dit e-mailadres.', locked: 'Te veel pogingen. Probeer het over 15 minuten opnieuw.', secNote: 'Je gegevens worden versleuteld opgeslagen en beschermd.' },
  es: { title: 'Portal', sub: 'Crea una cuenta y completa tu perfil. En cuanto surja un puesto adecuado, te contactaremos. ¿Ya tienes cuenta? Inicia sesión.', login: 'Iniciar sesión', register: 'Registrarse', name: 'Nombre completo', email: 'Correo', password: 'Contraseña', type: 'Soy', prof: 'Profesional sanitario', inst: 'Institución sanitaria', lang: 'Idioma preferido', btnLogin: 'Iniciar sesión', btnRegister: 'Crear cuenta', account: 'Mi cuenta', hello: 'Bienvenido', logout: 'Cerrar sesión', profile: 'Perfil', save: 'Guardar', security: 'Seguridad', twofaOn: 'La verificación en dos pasos está activada.', twofaOff: 'La verificación en dos pasos está desactivada. Muy recomendada.', enable2fa: 'Activar 2FA', disable2fa: 'Desactivar 2FA', scan: 'Escanea con tu app de autenticación e introduce el código.', code: 'Código', verify: 'Verificar', twoFAtitle: 'Verificación en dos pasos', badCred: 'Correo o contraseña incorrectos.', weak: 'La contraseña debe tener al menos 8 caracteres.', exists: 'Ya existe una cuenta con este correo.', locked: 'Demasiados intentos. Inténtalo de nuevo en 15 minutos.', secNote: 'Tus datos se guardan cifrados y protegidos.' }
};
function acc(req) { return ACC[req.lang] || ACC.pl; }

// Planning / agenda
const BOOK = {
  pl: { title: 'Umów rozmowę', sub: 'Wybierz dogodny termin — odezwiemy się, aby potwierdzić.', date: 'Data', time: 'Godzina', name: 'Imię i nazwisko', email: 'E-mail', topic: 'Temat', channel: 'Forma', video: 'Wideorozmowa', phone: 'Telefon', onsite: 'Na miejscu', send: 'Wyślij prośbę', thanks: 'Dziękujemy! Twoja prośba została wysłana. Skontaktujemy się, aby potwierdzić termin.', back: 'Strona główna' },
  en: { title: 'Schedule a call', sub: 'Pick a time that suits you — we will confirm shortly.', date: 'Date', time: 'Time', name: 'Full name', email: 'Email', topic: 'Topic', channel: 'Format', video: 'Video call', phone: 'Phone', onsite: 'On site', send: 'Send request', thanks: 'Thank you! Your request has been sent. We will contact you to confirm.', back: 'Home' },
  nl: { title: 'Plan een gesprek', sub: 'Kies een moment dat jou uitkomt — we bevestigen zo snel mogelijk.', date: 'Datum', time: 'Tijd', name: 'Naam', email: 'E-mail', topic: 'Onderwerp', channel: 'Vorm', video: 'Videogesprek', phone: 'Telefoon', onsite: 'Op locatie', send: 'Aanvraag versturen', thanks: 'Bedankt! Je gespreksaanvraag is verstuurd. We nemen contact op om te bevestigen.', back: 'Home' },
  es: { title: 'Agenda una charla', sub: 'Elige el momento que mejor te venga — confirmaremos en breve.', date: 'Fecha', time: 'Hora', name: 'Nombre completo', email: 'Correo', topic: 'Tema', channel: 'Formato', video: 'Videollamada', phone: 'Teléfono', onsite: 'Presencial', send: 'Enviar solicitud', thanks: '¡Gracias! Tu solicitud se ha enviado. Te contactaremos para confirmar.', back: 'Inicio' }
};
function book(req) { return BOOK[req.lang] || BOOK.pl; }

// ---- E-mail via Resend ----
function stripPrefix(v) { return String(v || '').replace(/^\s*[A-Za-z0-9_]+\s*=\s*/, '').trim(); }
function detectResendKey() {
  const ex = v => { const m = String(v || '').match(/re_[A-Za-z0-9_]{8,}/); return m ? m[0] : ''; };
  let k = ex(process.env.RESEND_API_KEY); if (k) return k;
  for (const v of Object.values(process.env)) { k = ex(v); if (k) return k; } // vind de sleutel ongeacht de variabelenaam
  return '';
}
function detectMailTo() {
  let v = stripPrefix(process.env.MAIL_TO); if (v.includes('@')) return v;
  for (const [k, val] of Object.entries(process.env)) { if (/mail.?to/i.test(k)) { const e = stripPrefix(val); if (e.includes('@')) return e; } }
  return 'info@honorcareinternational.com';
}
const RESEND_KEY = detectResendKey();
const MAIL_TO = detectMailTo();
const MAIL_FROM = stripPrefix(process.env.RESEND_FROM) || 'Honor Care International <onboarding@resend.dev>';

// ---- Cloudflare Turnstile (antyspam) — aktywuje się, gdy w env są klucze ----
const TURNSTILE_SITE_KEY = stripPrefix(process.env.TURNSTILE_SITE_KEY || '');
const TURNSTILE_SECRET_KEY = stripPrefix(process.env.TURNSTILE_SECRET_KEY || '');
function turnstileWidget(lang) { return TURNSTILE_SITE_KEY ? `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script><div class="cf-turnstile" data-sitekey="${esc(TURNSTILE_SITE_KEY)}" data-language="${esc(LANGS.includes(lang) ? lang : 'auto')}" style="margin:2px 0"></div>` : ''; }
async function verifyTurnstile(req) {
  if (!TURNSTILE_SECRET_KEY) return true; // wyłączone, dopóki nie ma kluczy
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: String(req.body['cf-turnstile-response'] || ''), remoteip: req.ip || '' }).toString() });
    const j = await r.json();
    return !!j.success;
  } catch (e) { console.error('[turnstile] weryfikacja niedostępna:', e.message); return true; } // awaria Cloudflare nie może blokować ludzi
}
async function sendEmail({ to, subject, html, replyTo }) {
  const key = RESEND_KEY;
  if (!key) { console.warn('[mail] geen Resend-sleutel gevonden — niet verzonden:', subject); return { skipped: true }; }
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: MAIL_FROM, to: Array.isArray(to) ? to : [to], subject, html, ...(replyTo ? { reply_to: replyTo } : {}) })
    });
    if (!r.ok) { const t = await r.text().catch(() => ''); console.error('[mail] Resend-fout', r.status, t.slice(0, 300)); return { error: r.status, detail: t }; }
    return await r.json();
  } catch (e) { console.error('[mail] uitzondering', e.message); return { error: 'network' }; }
}
const MT = require('./mail-template');
// Zelfde aanroep als voorheen; opts is optioneel (intro, note, cta, lang, preheader).
function mailWrap(title, rows, opts) { return MT.mailWrap(title, rows, opts, esc); }
// Begeleidende teksten per taal voor de bevestigingsmail aan de afzender.
const MAILTXT = {
  nl: { intro: 'Bedankt voor je bericht. We hebben het in goede orde ontvangen en reageren meestal binnen één werkdag. Hieronder vind je wat je ons stuurde.', note: 'Let op: wij vragen kandidaten nooit om geld voor bemiddeling of plaatsing. Onze dienstverlening is voor jou kosteloos.', cta: 'BEKIJK DE EU-ROUTE', sub: 'We hebben je bericht ontvangen' },
  en: { intro: 'Thank you for your message. We have received it and usually reply within one business day. Below is what you sent us.', note: 'Please note: we never ask candidates for money in exchange for placement. Our services are free of charge for you.', cta: 'SEE THE EU ROUTE', sub: 'We have received your message' },
  es: { intro: 'Gracias por tu mensaje. Lo hemos recibido correctamente y solemos responder en un día laborable. Abajo tienes lo que nos enviaste.', note: 'Ten en cuenta: nunca pedimos dinero a los candidatos a cambio de una colocación. Nuestros servicios son gratuitos para ti.', cta: 'VER LA RUTA UE', sub: 'Hemos recibido tu mensaje' },
  pl: { intro: 'Dziękujemy za wiadomość. Otrzymaliśmy ją i zwykle odpowiadamy w ciągu jednego dnia roboczego. Poniżej znajdziesz treść, którą nam przesłałeś.', note: 'Uwaga: nigdy nie pobieramy od kandydatów opłat za pośrednictwo ani zatrudnienie. Nasze usługi są dla Ciebie bezpłatne.', cta: 'ZOBACZ ŚCIEŻKĘ UE', sub: 'Otrzymaliśmy Twoją wiadomość' }
};
function mailtxt(lang) { return MAILTXT[lang] || MAILTXT.nl; }
const CONTACT = {
  pl: { title: 'Skontaktuj się', sub: 'Masz pytanie? Napisz do nas — zwykle odpowiadamy w ciągu jednego dnia roboczego.', note: 'Odpowiadamy w ciągu 24 godzin.', name: 'Imię i nazwisko', email: 'E-mail', subject: 'Temat', message: 'Wiadomość', send: 'Wyślij wiadomość', thanks: 'Dziękujemy! Twoja wiadomość została wysłana.', hours: 'Godziny otwarcia', emailLabel: 'E-mail' },
  en: { title: 'Contact us', sub: 'Have a question? Send us a message — we usually reply within one business day.', note: 'We reply within 24 hours.', name: 'Full name', email: 'Email', subject: 'Subject', message: 'Message', send: 'Send message', thanks: 'Thank you! Your message has been sent.', hours: 'Opening hours', emailLabel: 'Email' },
  nl: { title: 'Neem contact op', sub: 'Een vraag? Stuur ons een bericht — we reageren meestal binnen één werkdag.', note: 'We reageren binnen 24 uur.', name: 'Naam', email: 'E-mail', subject: 'Onderwerp', message: 'Bericht', send: 'Bericht versturen', thanks: 'Bedankt! Je bericht is verstuurd.', hours: 'Openingstijden', emailLabel: 'E-mail' },
  es: { title: 'Contáctanos', sub: '¿Tienes una pregunta? Escríbenos — solemos responder en un día laborable.', note: 'Respondemos en 24 horas.', name: 'Nombre completo', email: 'Correo', subject: 'Asunto', message: 'Mensaje', send: 'Enviar mensaje', thanks: '¡Gracias! Tu mensaje ha sido enviado.', hours: 'Horario', emailLabel: 'Correo' }
};
function contactT(req) { return CONTACT[req.lang] || CONTACT.pl; }
const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
const DMONTHS = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
function shiftMonth(ym, delta) { let [Y, M] = ym.split('-').map(Number); M += delta; while (M < 1) { M += 12; Y--; } while (M > 12) { M -= 12; Y++; } return `${Y}-${String(M).padStart(2, '0')}`; }
function monthCalendar(ym, appts) {
  const [Y, M] = ym.split('-').map(Number);
  const startWd = (new Date(Y, M - 1, 1).getDay() + 6) % 7;
  const days = new Date(Y, M, 0).getDate();
  const byDay = {}; appts.forEach(a => { if (a.date && a.date.startsWith(ym)) { const d = Number(a.date.slice(8, 10)); (byDay[d] = byDay[d] || []).push(a); } });
  const t = new Date(); const today = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
  let cells = ''; for (let i = 0; i < startWd; i++) cells += '<div class="cal-cell empty"></div>';
  for (let d = 1; d <= days; d++) { const ds = `${ym}-${String(d).padStart(2, '0')}`; const ev = (byDay[d] || []).sort((a, b) => (a.time || '').localeCompare(b.time || '')).map(a => `<a class="cal-ev" href="/appointments/${a._id}" title="${esc(a.name || '')}">${esc(a.time || '')} ${esc((a.name || '').split(' ')[0])}</a>`).join(''); cells += `<div class="cal-cell${ds === today ? ' today' : ''}"><span class="cal-d">${d}</span>${ev}</div>`; }
  const wd = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
  return `<div class="cal-head"><a class="btn navy small" href="/agenda?m=${shiftMonth(ym, -1)}">←</a><h2>${DMONTHS[M - 1]} ${Y}</h2><a class="btn navy small" href="/agenda?m=${shiftMonth(ym, 1)}">→</a></div><div class="cal-grid">${wd.map(w => `<div class="cal-wd">${w}</div>`).join('')}${cells}</div>`;
}

// Twee routes naar de Nederlandse zorg: EU (Spanje) versus buiten de EU (Colombia).
const ROUTES = {
  pl: { eyebrow: 'DWIE ŚCIEŻKI', h2: 'Dwie drogi do holenderskiej ochrony zdrowia', sub: 'Kraj pochodzenia wyznacza ścieżkę. Prowadzimy oba procesy — od pierwszej rozmowy do pierwszego dnia pracy.', cards: [
    { cls: 'eu', flag: '🇪🇸', h: 'Hiszpania i UE', badge: 'Najszybsza ścieżka', items: ['Bez wizy i zezwolenia na pracę — swobodny przepływ pracowników w UE', 'Uznanie dyplomu z UE przez rejestr BIG — dla części dyplomów drogą skróconą', 'Prowadzimy przez rejestrację BIG w CIBG', 'Język niderlandzki (NT2) to najważniejszy krok — szkolimy u nas', 'Szybsze wejście do pracy'], time: 'Czas trwania: zależy przede wszystkim od poziomu językowego.', btn: 'ZOBACZ ŚCIEŻKĘ' },
    { cls: 'world', flag: '🇨🇴', h: 'Kolumbia i kraje spoza UE', badge: 'Pełne wsparcie', items: ['Wiza i pobyt — przez nasze zarejestrowane biuro partnerskie', 'Uznanie dyplomu i egzamin kwalifikacyjny', 'Niderlandzki od A1 do B2 (NT2) z terminologią medyczną', 'Zakwaterowanie, integracja i wsparcie rodziny', 'Jeden koordynator od początku do końca'], time: 'Czas trwania: dłuższa ścieżka — towarzyszymy na każdym etapie.', btn: 'ZOBACZ ŚCIEŻKĘ' }] },
  en: { eyebrow: 'TWO ROUTES', h2: 'Two routes into Dutch healthcare', sub: 'The country of origin determines the route. We handle both journeys in full — from the first conversation to the first working day.', cards: [
    { cls: 'eu', flag: '🇪🇸', h: 'Spain & the EU', badge: 'Fastest route', items: ['No visa or work permit — free movement of workers within the EU', 'Recognition of your EU diploma through the BIG register — for some diplomas via a shortened route', 'We guide you through BIG registration with the CIBG', 'Dutch (NT2) is the key step — and we provide that training', 'Ready to start on the ward sooner'], time: 'Timeline: mainly determined by your Dutch language level.', btn: 'SEE THE ROUTE' },
    { cls: 'world', flag: '🇨🇴', h: 'Colombia & beyond', badge: 'Fully guided', items: ['Visa and residence permit — arranged via our registered partner agency', 'Diploma recognition and the professional competence assessment', 'Dutch from A1 to B2 (NT2), including medical terminology', 'Housing, integration and support for the family', 'One dedicated coordinator from start to finish'], time: 'Timeline: a longer journey — we guide every step.', btn: 'SEE THE ROUTE' }] },
  nl: { eyebrow: 'TWEE ROUTES', h2: 'Twee wegen naar de Nederlandse zorg', sub: 'Het land van herkomst bepaalt de route. Wij regelen beide trajecten volledig — van het eerste gesprek tot de eerste werkdag.', cards: [
    { cls: 'eu', flag: '🇪🇸', h: 'Spanje & EU', badge: 'Snelste route', items: ['Geen visum of tewerkstellingsvergunning — vrij verkeer van werknemers in de EU', 'Erkenning van je EU-diploma via het BIG-register — voor een deel van de diploma’s via een verkorte route', 'Wij begeleiden de BIG-registratie bij het CIBG', 'Nederlands (NT2) is de belangrijkste stap — die opleiding verzorgen wij', 'Sneller inzetbaar op de werkvloer'], time: 'Doorlooptijd: vooral afhankelijk van het taalniveau.', btn: 'BEKIJK DE ROUTE' },
    { cls: 'world', flag: '🇨🇴', h: 'Colombia & daarbuiten', badge: 'Volledig begeleid', items: ['Visum en verblijfsvergunning — via ons geregistreerde partnerbureau', 'Diploma-erkenning en vakbekwaamheidstoets', 'Nederlands van A1 tot B2 (NT2), inclusief medische terminologie', 'Huisvesting, integratie en begeleiding van het gezin', 'Eén vaste coördinator van begin tot eind'], time: 'Doorlooptijd: een langer traject — wij begeleiden elke stap.', btn: 'BEKIJK DE ROUTE' }] },
  es: { eyebrow: 'DOS RUTAS', h2: 'Dos caminos hacia la sanidad neerlandesa', sub: 'El país de origen determina la ruta. Gestionamos ambos procesos por completo, desde la primera conversación hasta el primer día de trabajo.', cards: [
    { cls: 'eu', flag: '🇪🇸', h: 'España y la UE', badge: 'La ruta más rápida', items: ['Sin visado ni permiso de trabajo: libre circulación de trabajadores en la UE', 'Homologación de tu título de la UE mediante el registro BIG; para algunos títulos por una vía abreviada', 'Te acompañamos en el registro BIG ante el CIBG', 'El neerlandés (NT2) es el paso clave, y esa formación la damos nosotros', 'Incorporación más rápida al puesto'], time: 'Duración: depende sobre todo de tu nivel de neerlandés.', btn: 'VER LA RUTA' },
    { cls: 'world', flag: '🇨🇴', h: 'Colombia y otros países', badge: 'Acompañamiento total', items: ['Visado y residencia, gestionados por nuestra agencia asociada registrada', 'Homologación del título y prueba de competencia profesional', 'Neerlandés de A1 a B2 (NT2), con terminología médica', 'Alojamiento, integración y apoyo a la familia', 'Un coordinador dedicado de principio a fin'], time: 'Duración: un recorrido más largo; acompañamos cada paso.', btn: 'VER LA RUTA' }] }
};

const DOCS = require('./documents'); // [title,category,language,status,content,notes]

async function seed() {
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (!existing) await User.create({ email: ADMIN_EMAIL, passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12) });
  // Niet-destructief: bestaande documenten (incl. handmatige aanpassingen) worden NIET overschreven.
  for (const d of DOCS) {
    await Document.updateOne(
      { title: d[0] },
      { $setOnInsert: { title: d[0], category: d[1], language: d[2], status: d[3], notes: d[5] || (d[1] + ' — Honor Care Poland'), content: d[4], createdAt: new Date() } },
      { upsert: true }
    );
  }
  await seedHousing();
  console.log('Admin, documenten en woningen gecontroleerd (niet-destructief)');
}

// Voorbeeldwoningen regio Warschau (gebaseerd op actuele Otodom-marktdata; richtbedragen).
const HOUSING_SEED = [
  ['Kawalerka — Praga-Południe (Gocławek)', 'Praga-Południe', '1 kamer', '28 m²', '± 2.900 zł/mnd', 'Compacte studio, dicht bij tram/metro. Voorbeeld o.b.v. Otodom-marktdata.'],
  ['2 kamers — Wola', 'Wola', '2 kamers', '42 m²', '± 4.500 zł/mnd', 'Modern appartement nabij Rondo Daszyńskiego. Voorbeeld.'],
  ['2 kamers — Mokotów', 'Mokotów', '2 kamers', '48 m²', '± 5.200 zł/mnd', 'Geliefde wijk met veel werkgelegenheid. Voorbeeld.'],
  ['Kawalerka — Ochota', 'Ochota', '1 kamer', '30 m²', '± 3.500 zł/mnd', 'Goede verbinding met het centrum. Voorbeeld.'],
  ['3 kamers — Ursynów (gezin)', 'Ursynów', '3 kamers', '60 m²', '± 5.800 zł/mnd', 'Rustige, groene wijk, geschikt voor gezinnen. Voorbeeld.'],
  ['2 kamers — Białołęka (Nowodwory)', 'Białołęka', '2 kamers', '45 m²', '± 3.400 zł/mnd', 'Voordeliger, nieuwbouw. Voorbeeld.'],
  ['3 kamers — Praga-Północ', 'Praga-Północ', '3 kamers', '58 m²', '± 4.800 zł/mnd', 'Opkomende wijk, goede prijs-kwaliteit. Voorbeeld.'],
  ['Studio — Wilanów', 'Wilanów', '1 kamer', '33 m²', '± 3.800 zł/mnd', 'Nieuwe bouw, populair bij expats. Voorbeeld.']
];
async function seedHousing() {
  if (await Housing.countDocuments() > 0) return; // alleen seeden als leeg; gebruikersdata blijft intact
  const otodom = 'https://www.otodom.pl/pl/wyniki/wynajem/mieszkanie/mazowieckie/warszawa';
  for (const h of HOUSING_SEED) {
    await Housing.create({ title: h[0], district: h[1], rooms: h[2], area: h[3], price: h[4], notes: h[5], furnished: true, status: 'Beschikbaar', otodomUrl: otodom });
  }
}

function docContent(doc) {
  const content = String(doc.content || '').trim();
  if (content.length > 10) return content;
  return `<h1>${esc(doc.title)}</h1><p>${esc(doc.notes || 'Geen inhoud toegevoegd.')}</p>`;
}
function docCard(d) {
  return `<article class="doc"><h3>${esc(d.title)}</h3><p class="meta">${esc(d.category)} • ${esc(d.language)} • ${esc(d.status)}</p><p>${esc(d.notes)}</p><a class="btn navy small" href="/documents/${d._id}">Openen</a></article>`;
}

// Statische metadata (taal-onafhankelijk): iconen, afbeeldingen, links, cijfers.
const SPEC_ICONS = [
  '<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M4.5 3h2M13.5 3h2"/><path d="M10 12v3a4 4 0 0 0 7 0v-1"/><circle cx="18.5" cy="11" r="2"/>',
  '<path d="M12 20S4 15 4 9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 8 2.5C20 15 12 20 12 20z"/><path d="M5 11h3l1.5-3 2 5 1.5-3H19"/>',
  '<path d="M8 3c-2 0-3.5 1.3-3.5 3.6 0 2.5.6 3.8 1.1 6.4.4 2.3.5 5 1.9 5 1.3 0 1.3-3 2.5-3s1.2 3 2.5 3c1.4 0 1.5-2.7 1.9-5 .5-2.6 1.1-3.9 1.1-6.4C19 4.3 17.5 3 15.5 3c-1.3 0-2 .8-3.5.8S9.3 3 8 3z"/>',
  '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  '<path d="M15.5 6.5A4.5 4.5 0 0 0 7 9c0 1.1.3 1.9.9 2.7.6.8 1.1 1.6 1.1 2.8V17h5v-1.4c0-1.1.5-1.8 1.2-2.6a4.5 4.5 0 0 0 .3-6.5z"/><path d="M9 20h5"/>',
  '<circle cx="15" cy="5" r="1.8"/><path d="M14 8l-4 2.5 1.5 4-3 4M14 8l3.5 1.5 2.5 3M14 8L9.5 7 6 9.5"/>',
  '<rect x="4" y="8" width="16" height="8" rx="4"/><path d="M12 8v8"/>',
  '<path d="M2 16V8.8a1.3 1.3 0 0 1 1.3-1.3H13V16"/><path d="M13 10h4.2l2.8 3v3h-2.3"/><circle cx="7.2" cy="16.9" r="1.7"/><circle cx="16.3" cy="16.9" r="1.7"/><path d="M2 16h3.4M9 16h5.5"/><path d="M7.5 9.3v4.2M5.4 11.4h4.2"/>',
  '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/>',
  '<path d="M12 5v14M5 12h14"/>'
];
const CARD_META = [['img1', '/candidates-info', 'navy'], ['img2', '/institutions', 'gold'], ['img3', '/academy', 'navy'], ['img4', '/housing', 'gold']];
const STAT_ICONS = [
  '<circle cx="9" cy="8" r="3"/><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5"/><circle cx="17.5" cy="9" r="2.2"/><path d="M16 14.2c2.8.2 5 1.9 5 4.8"/>',
  '<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M9 20v-4h6v4M12 7v4M10 9h4M8.5 13h7"/>',
  '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/>',
  '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'
];

app.get('/', (req, res) => {
  const lang = req.lang, tr = T[lang];
  const toast = req.query.sub === 'ok' ? `<div class="toast">${tr.toast}</div>` : '';
  const heart = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/></svg>';
  const body = `${toast}
<section class="hero"><div class="hero-inner"><h1>${tr.hero.h1[0]}<br>${tr.hero.h1[1]}<br><strong>${tr.hero.h1[2]}</strong></h1><p>${tr.hero.p}</p><div class="bullets">${tr.hero.bullets.map(x => `<div><b>✓</b>${x}</div>`).join('')}</div><div class="hero-cta"><a class="btn navy" href="/institutions">${tr.hero.btnInst}</a><a class="btn gold" href="/candidates-info">${tr.hero.btnProf}</a><a class="btn light" href="/plan">${tr.hero.btnMeet}</a></div></div><div class="hero-badge">${heart}<span>${tr.hero.badge}</span></div></section>
<section class="specs">${tr.specs.map((label, i) => `<div class="spec"><span class="spec-ic">${icon(SPEC_ICONS[i])}</span><span>${label}</span></div>`).join('')}</section>
<section class="cards-wrap"><div class="cards">${tr.cards.map((c, i) => `<article class="card"><div class="card-img ${CARD_META[i][0]}" role="img" aria-label="${esc(c.h)}"></div><div class="card-body"><span class="tag">${c.tag}</span><h3>${c.h}</h3><ul>${c.items.map(li => `<li>${li}</li>`).join('')}</ul><a class="btn ${CARD_META[i][2]} full" href="${CARD_META[i][1]}">${c.btn}</a></div></article>`).join('')}</div></section>
<section class="howit"><div class="howit-head"><span class="eyebrow">${HOWIT[lang].eyebrow}</span><h2>${HOWIT[lang].h2}</h2></div><div class="howit-steps">${HOWIT[lang].steps.map((s, i) => `<div class="howit-step"><span class="howit-n">${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div><p class="howit-note">${HOWIT[lang].note}</p></section>
<section class="routes"><div class="routes-head"><span class="eyebrow">${ROUTES[lang].eyebrow}</span><h2>${ROUTES[lang].h2}</h2><p>${ROUTES[lang].sub}</p></div><div class="routes-grid">${ROUTES[lang].cards.map(c => `<article class="route-card ${c.cls}"><div class="route-top"><span class="route-flag">${c.flag}</span><div><h3>${c.h}</h3><span class="route-badge">${c.badge}</span></div></div><ul>${c.items.map(i => `<li>${i}</li>`).join('')}</ul><p class="route-time">${c.time}</p><a class="btn ${c.cls === 'eu' ? 'navy' : 'gold'} full" href="/candidates-info">${c.btn}</a></article>`).join('')}</div></section>
<section class="why"><div class="why-card"><span class="eyebrow">${icon('<path d="M12 21c4-4 7-7.4 7-11a7 7 0 1 0-14 0c0 3.6 3 7 7 11z"/><circle cx="12" cy="10" r="2.5"/>')} ${tr.why.eyebrow}</span><h2>${tr.why.h2[0]}<br>${tr.why.h2[1]}</h2><p>${tr.why.p}</p><a class="btn gold" href="/poland">${tr.why.btn}</a></div><div class="why-stats">${tr.why.stats.map((s, i) => `<div class="stat"><span class="stat-ic">${icon(STAT_ICONS[i])}</span><b>${s[0]}</b><span class="stat-label">${s[1]}</span></div>`).join('')}</div></section>
${footer(lang)}`;
  res.send(layout('Honor Care International', body, 'home', lang, req.path));
});

app.post('/newsletter', async (req, res) => {
  if (tooMany(req, 'newsletter', 3)) { console.log('[antyspam] odrzucono zapis do newslettera'); return res.redirect('/?sub=ok#main'); }
  const email = String(req.body.email || '').toLowerCase().trim();
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    try { await Newsletter.updateOne({ email }, { $setOnInsert: { email, lang: req.lang, createdAt: new Date() } }, { upsert: true }); } catch (e) {}
    sendEmail({ to: MAIL_TO, subject: `Nieuwe nieuwsbrief-inschrijving`, html: mailWrap('Nieuwe nieuwsbrief-inschrijving', [['E-mail', email], ['Taal', req.lang]]) });
  }
  res.redirect('/?sub=ok#main');
});

// Subpagina's uit i18n, met fotobanner.
const PAGE_IMG = { about: 'ph-about', institutions: 'ph-institutions', candidates: 'ph-candidates', academy: 'ph-academy', housing: 'ph-housing', poland: 'ph-poland' };
function contentPage(req, res, key) {
  const lang = req.lang, tr = T[lang], pg = tr.pages[key], title = tr.nav[key];
  const body = `<section class="page-hero ${PAGE_IMG[key]}"><div class="page-hero-inner"><h1>${title}</h1><p>${pg.intro}</p></div></section><section class="page has-hero"><div class="grid">${pg.panels.map(p => `<article class="panel"><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('')}</div>${renderExtras(key, lang, esc)}</section>${footer(lang)}`;
  res.send(layout(title, body, key, lang, req.path));
}
app.get('/about', (req, res) => contentPage(req, res, 'about'));
app.get('/institutions', (req, res) => contentPage(req, res, 'institutions'));
app.get('/candidates-info', (req, res) => contentPage(req, res, 'candidates'));
app.get('/academy', (req, res) => contentPage(req, res, 'academy'));
app.get('/housing', (req, res) => contentPage(req, res, 'housing'));
app.get('/poland', (req, res) => {
  const lang = req.lang, tr = T[lang], pg = tr.pages.poland;
  const body = `<section class="page-hero ph-poland"><div class="page-hero-inner"><h1>${tr.nav.poland}</h1><p>${pg.intro}</p></div></section>` +
    renderNetherlands(lang, { esc }) + footer(lang);
  res.send(layout(tr.nav.poland, body, 'poland', lang, req.path));
});
app.get('/eu-route', (req, res) => {
  const lang = req.lang, e = EUROUTE[lang] || EUROUTE.nl;
  const body = renderEuRoute(lang, { esc, icon }) + footer(lang);
  res.send(layout(e.title, body, 'euroute', lang, req.path));
});
function legalPage(req, res, kind) {
  const lang = req.lang, titel = legalTitle(kind, lang);
  const body = `<section class="page-hero ph-legal"><div class="page-hero-inner"><h1>${esc(titel)}</h1></div></section>` +
    renderLegal(kind, lang, esc) + footer(lang);
  res.send(layout(titel, body, 'home', lang, req.path));
}
app.get('/privacy', (req, res) => legalPage(req, res, 'privacy'));
app.get('/voorwaarden', (req, res) => legalPage(req, res, 'terms'));
app.get('/contact', (req, res) => {
  const lang = req.lang, tr = T[lang], f = tr.footer, c = contactT(req);
  const locIc = '<path d="M12 21c4-4 7-7.4 7-11a7 7 0 1 0-14 0c0 3.6 3 7 7 11z"/><circle cx="12" cy="10" r="2.5"/>';
  const mailIc = '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>';
  const a = acc(req);
  const done = req.query.ok ? `<div class="contact-ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l2.7 2.7L16 9.5"/></svg><span>${esc(c.thanks)}</span></div>` : '';
  const body = `<section class="page-hero ph-contact"><div class="page-hero-inner"><h1>${tr.nav.contact}</h1><p>${tr.contactIntro}</p></div></section>
<section class="page has-hero">
<p class="contact-lead">${esc(c.sub)}</p>
<div class="contact-grid" id="kontakt">
<div class="contact-form-card">
${done}
<div class="cf-head"><span class="cf-ic">${icon(mailIc)}</span><div><h2>${esc(c.title)}</h2><p>${esc(c.note)}</p></div></div>
<form class="cform" method="post" action="/contact#kontakt">
<div class="cf-row">
<label>${esc(c.name)} *<input name="name" autocomplete="name" maxlength="120" required></label>
<label>${esc(c.email)} *<input type="email" name="email" autocomplete="email" maxlength="160" required></label>
</div>
<label>${esc(c.subject)}<input name="subject" autocomplete="off" maxlength="160"></label>
<label>${esc(c.message)} *<textarea name="message" rows="7" maxlength="5000" required></textarea></label>
<input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
<input type="hidden" name="ft" value="${formToken()}">
${turnstileWidget(lang)}
<button class="btn gold full">${esc(c.send)} →</button>
<p class="cf-privacy">🔒 ${esc(a.secNote)}</p>
</form>
</div>
<aside class="contact-aside">
<article class="ci-card"><span class="ci-ic">${icon(locIc)}</span><h3>${f.officeNL}</h3><p>Torenlaan 5A, 1402 BN Bussum</p><p><a href="tel:+31646150160">+31 6 46 15 01 60</a></p><p class="ci-h">${f.hoursNL}</p></article>
<article class="ci-card"><span class="ci-ic">${icon(mailIc)}</span><h3>${esc(c.emailLabel)}</h3><p><a href="mailto:info@honorcareinternational.com">info@honorcareinternational.com</a></p><p class="ci-h">${esc(c.note)}</p></article>
<article class="ci-card"><span class="ci-ic">${icon(locIc)}</span><h3>${f.officePL}</h3><p>Białka 15, 09-550 Szczawin Kościelny</p><p><a href="tel:+48452823838">+48 45 282 38 38</a></p><p class="ci-h">${f.hoursPL}</p></article>
</aside>
</div>
</section>${footer(lang)}`;
  res.send(layout(tr.nav.contact, body, 'contact', lang, req.path));
});
app.post('/contact', async (req, res) => {
  if (String(req.body.website || '').trim()) return res.redirect('/contact?ok=1#kontakt'); // honeypot: bots vullen dit verborgen veld in
  if (!checkFormToken(req.body.ft) || tooMany(req, 'contact') || !(await verifyTurnstile(req))) { console.log('[antyspam] odrzucono zgłoszenie z formularza kontaktowego'); return res.redirect('/contact?ok=1#kontakt'); }
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').toLowerCase().trim();
  const subject = String(req.body.subject || '').trim();
  const message = String(req.body.message || '').trim();
  const c = contactT(req);
  if (name && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && message) {
    try { await ContactMessage.create({ name, email, subject, message, lang: req.lang }); } catch (e) {}
    // melding naar Honor Care
    sendEmail({ to: MAIL_TO, replyTo: email, subject: `Nieuw contactbericht — ${name}`, html: mailWrap('Nieuw contactbericht', [['Naam', name], ['E-mail', email], ['Taal', req.lang.toUpperCase()], ['Onderwerp', subject || '—'], ['Bericht', message]], { lang: 'nl', intro: 'Er is een nieuw bericht binnengekomen via het contactformulier. Je kunt rechtstreeks op deze e-mail antwoorden; het antwoord gaat naar de afzender.', preheader: name + ' — ' + (subject || 'bericht via het contactformulier') }) });
    // bevestiging naar afzender (werkt zodra je domein in Resend geverifieerd is)
    const mt = mailtxt(req.lang);
    sendEmail({ to: email, subject: mt.sub, html: mailWrap(c.thanks, [['Naam', name], ['Onderwerp', subject || '—'], ['Bericht', message]], { lang: req.lang, intro: mt.intro, note: mt.note, cta: { label: mt.cta, url: MT.SITE + '/eu-route' }, preheader: mt.intro.slice(0, 90) }) });
  }
  res.redirect('/contact?ok=1#kontakt');
});

// ---------- Plan een gesprek (publiek) ----------
app.get('/plan', (req, res) => {
  const b = book(req), a = acc(req);
  const done = req.query.ok ? `<div class="ok">${esc(b.thanks)}</div>` : '';
  const today = new Date().toISOString().slice(0, 10);
  const inner = `<section class="page"><main class="authwrap">
<h1>${esc(b.title)}</h1><p class="authsub">${esc(b.sub)}</p>${done}
<form class="authform" method="post" action="/plan">
<label>${esc(b.name)}<input name="name" autocomplete="name" required></label>
<label>${esc(b.email)}<input type="email" name="email" autocomplete="email" required></label>
<label>${esc(b.date)}<input type="date" name="date" min="${today}" required></label>
<label>${esc(b.time)}<select name="time">${TIMES.map(x => `<option>${x}</option>`).join('')}</select></label>
<label>${esc(b.channel)}<select name="channel"><option value="Videogesprek">${esc(b.video)}</option><option value="Telefoon">${esc(b.phone)}</option><option value="Op locatie">${esc(b.onsite)}</option></select></label>
<label>${esc(b.topic)}<input name="topic"></label>
<input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
<input type="hidden" name="ft" value="${formToken()}">
${turnstileWidget(req.lang)}
<button class="btn gold full">${esc(b.send)}</button>
</form>
<p class="authnote">🔒 ${esc(a.secNote)}</p>
</main></section>${footer(req.lang)}`;
  res.send(layout(b.title, inner, 'home', req.lang, req.path));
});
app.post('/plan', async (req, res) => {
  if (String(req.body.website || '').trim()) return res.redirect('/plan?ok=1');
  if (!checkFormToken(req.body.ft) || tooMany(req, 'plan') || !(await verifyTurnstile(req))) { console.log('[antyspam] odrzucono prośbę o rozmowę'); return res.redirect('/plan?ok=1'); }
  const name = String(req.body.name || '').trim(), email = String(req.body.email || '').toLowerCase().trim();
  const date = String(req.body.date || ''), time = String(req.body.time || '');
  const topic = String(req.body.topic || ''), channel = String(req.body.channel || 'Videogesprek');
  if (name && email && date) {
    try { await Appointment.create({ name, email, date, time, topic, channel, status: 'Aangevraagd' }); } catch (e) {}
    sendEmail({ to: MAIL_TO, replyTo: email, subject: `Nieuwe gespreksaanvraag — ${name}`, html: mailWrap('Nieuwe gespreksaanvraag', [['Naam', name], ['E-mail', email], ['Datum', date], ['Tijd', time], ['Kanaal', channel], ['Onderwerp', topic || '—']]) });
    sendEmail({ to: email, subject: book(req).thanks, html: mailWrap(book(req).title, [['Datum', date], ['Tijd', time], ['Kanaal', channel]]) });
  }
  res.redirect('/plan?ok=1');
});

// ---------- Auth (portaal blijft Nederlands) ----------
app.get('/login', (req, res) => {
  const error = req.query.error ? `<div class="error">${esc(req.query.error)}</div>` : '';
  res.send(layout('Beheer', `<section class="page"><main class="login"><h1>Beheerderslogin</h1><p>Alleen voor beheerders. Gebruikers gaan naar het <a href="/portal">portaal</a>.</p>${error}<form method="post" action="/login"><label for="email">E-mail</label><input id="email" name="email" type="email" autocomplete="email" placeholder="E-mail" required><label for="password">Wachtwoord</label><input id="password" name="password" type="password" autocomplete="current-password" placeholder="Wachtwoord" required><button class="btn gold full">Inloggen</button></form></main></section>`, 'home', req.lang, req.path));
});
app.post('/login', async (req, res) => {
  const key = throttleKey(req, 'admin');
  if (isLocked(key)) return res.redirect('/login?error=Te veel pogingen. Probeer het over 15 minuten opnieuw.');
  const user = await User.findOne({ email: String(req.body.email || '').toLowerCase().trim() });
  if (!user || !await bcrypt.compare(String(req.body.password || ''), user.passwordHash || '')) { recordFail(key); return res.redirect('/login?error=E-mail of wachtwoord onjuist'); }
  clearFails(key);
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
  res.send(layout('2FA', `<section class="page"><main class="login"><h1>Authenticator instellen</h1><img style="max-width:240px" src="${qr}" alt="QR-code"><p class="mono">${esc(secret.base32)}</p><form method="post" action="/setup-2fa"><label for="token">Code</label><input id="token" name="token" inputmode="numeric" autocomplete="one-time-code" placeholder="000000" required><button class="btn gold full">Activeren</button></form></main></section>`, 'home', req.lang, req.path));
});
app.post('/setup-2fa', requireLogin, async (req, res) => {
  const secret = req.session.pendingTwoFASecret, token = String(req.body.token || '').replace(/\s/g, '');
  if (!secret || !speakeasy.totp.verify({ secret, encoding: 'base32', token, window: 1 })) return res.redirect('/setup-2fa');
  await User.findByIdAndUpdate(req.session.userId, { twoFASecret: secret });
  req.session.totpPassed = true; req.session.twoFAConfigured = true;
  res.redirect('/dashboard');
});
app.get('/verify-2fa', requireLogin, (req, res) => res.send(layout('2FA', `<section class="page"><main class="login"><h1>Authenticator-code</h1><form method="post" action="/verify-2fa"><label for="token">Code</label><input id="token" name="token" inputmode="numeric" autocomplete="one-time-code" placeholder="000000" required><button class="btn gold full">Verifiëren</button></form></main></section>`, 'home', req.lang, req.path)));
app.post('/verify-2fa', requireLogin, async (req, res) => {
  const user = await User.findById(req.session.userId), token = String(req.body.token || '').replace(/\s/g, '');
  if (!user.twoFASecret) return res.redirect('/setup-2fa');
  if (!speakeasy.totp.verify({ secret: user.twoFASecret, encoding: 'base32', token, window: 1 })) return res.redirect('/verify-2fa');
  req.session.totpPassed = true;
  res.redirect('/dashboard');
});
app.post('/logout', (req, res) => req.session.destroy(() => res.redirect('/')));

// ---------- Portaal ----------
const PORTAL_LINKS = [['/dashboard', 'Dashboard'], ['/agenda', 'Agenda'], ['/candidates', 'Kandidaten'], ['/talentpool', 'Kandidatenbank'], ['/zorgscan', 'Zorgscan'], ['/versies', 'Versies'], ['/institutions-list', 'Instellingen'], ['/placements', 'Plaatsingen'], ['/housing-list', 'Woningen'], ['/messages', 'Berichten'], ['/documents', 'Documenten'], ['/subsidies', 'Subsidies'], ['/assistant', 'AI-assistent'], ['/backup', 'Back-up']];
function portalNav(active) { return `<nav class="pnav" aria-label="Portaal">${PORTAL_LINKS.map(([h, l]) => `<a href="${h}" class="${active === h ? 'on' : ''}">${l}</a>`).join('')}</nav>`; }
function portalShell(req, res, title, inner, active) {
  const head = `<div class="page-head"><div><h1>${esc(title)}</h1></div><form method="post" action="/logout"><button class="btn navy small">Uitloggen</button></form></div>`;
  res.send(layout(title, `<section class="page portal">${head}${portalNav(active)}<div class="pbody">${inner}</div><p class="portal-version"><a href="/versies">${esc(versionLine())}</a></p></section>`, 'home', req.lang, req.path));
}
function badge(status) {
  if (!status) return '';
  const s = String(status).toLowerCase(); let cls = 'b-grey';
  if (/nieuw|voorgesteld|beschikbaar|prospect|open|concept/.test(s)) cls = 'b-blue';
  else if (/screening|taal|erken|visum|behandeling|geaccepteerd|toegewezen|ingediend|gesprek|voorbereiding|gereserveerd/.test(s)) cls = 'b-gold';
  else if (/geplaatst|gestart|afgerond|bezet|actief|toegekend|klant|compleet/.test(s)) cls = 'b-green';
  else if (/afgewezen|geannuleerd|vervallen|gestopt|hold/.test(s)) cls = 'b-red';
  return `<span class="badge ${cls}">${esc(status)}</span>`;
}

app.get('/dashboard', requireAuth, async (req, res) => {
  const [docs, cand, inst, plac, hous, subs] = await Promise.all([
    Document.countDocuments(), Candidate.countDocuments(), Institution.countDocuments(),
    Placement.countDocuments(), Housing.countDocuments(), Subsidy.countDocuments()]);
  const appt = await Appointment.countDocuments();
  const msgs = await ContactMessage.countDocuments();
  const pool = await PortalUser.countDocuments({ role: { $ne: 'Zorginstelling' } });
  const tiles = [['/agenda', 'Agenda', appt], ['/messages', 'Berichten', msgs], ['/talentpool', 'Kandidatenbank', pool], ['/candidates', 'Kandidaten', cand], ['/institutions-list', 'Instellingen', inst], ['/placements', 'Plaatsingen', plac], ['/housing-list', 'Woningen', hous], ['/documents', 'Documenten', docs], ['/subsidies', 'Subsidies', subs]];
  const cands = await Candidate.find().lean();
  const stages = ['Nieuw', 'Screening', 'Taalopleiding', 'Erkenning', 'Visum', 'Geplaatst'];
  const pc = {}; stages.forEach(s => pc[s] = 0); cands.forEach(c => { if (pc[c.status] != null) pc[c.status]++; });
  const inner = `<p class="welcome">Welkom, ${esc(req.session.email)}. Beheer hier het volledige traject — van werving tot plaatsing.</p>
<section class="modules">${tiles.map(t => `<a href="${t[0]}"><b>${t[2]}</b><span>${t[1]}</span></a>`).join('')}</section>
<h2>Kandidaten-pijplijn</h2><div class="pipeline">${stages.map(s => `<div class="pstage"><b>${pc[s]}</b><span>${s}</span></div>`).join('')}</div>
<h2>Sneltoegang</h2><div class="quick"><a class="btn gold" href="/assistant">AI-assistent</a> <a class="btn navy" href="/backup">Back-up &amp; herstel</a> <a class="btn light" href="/housing-list">Woningen (Warschau)</a></div>`;
  portalShell(req, res, 'Dashboard', inner, '/dashboard');
});
// ---------- Gebruikersomgeving (/portal) ----------
function portalAuthPage(req, res, opts = {}) {
  const a = acc(req);
  const err = opts.error ? `<div class="error">${esc(opts.error)}</div>` : '';
  const info = opts.info ? `<div class="ok">${esc(opts.info)}</div>` : '';
  const chips = LANGS.map(l => `<a href="/setlang/${l}?r=%2Fportal" class="lchip ${l === req.lang ? 'on' : ''}">${LANGMETA[l].flag} ${LANGMETA[l].name}</a>`).join('');
  const langOpts = LANGS.map(l => `<option value="${l}" ${l === req.lang ? 'selected' : ''}>${LANGMETA[l].name}</option>`).join('');
  const reg = opts.tab === 'register';
  const inner = `<section class="page"><main class="authwrap">
<h1>${esc(a.title)}</h1><p class="authsub">${esc(a.sub)}</p>
<div class="langpick">${chips}</div>${err}${info}
<div class="authtabs">
<input type="radio" name="atab" id="tab-login" ${reg ? '' : 'checked'}><label for="tab-login">${esc(a.login)}</label>
<input type="radio" name="atab" id="tab-register" ${reg ? 'checked' : ''}><label for="tab-register">${esc(a.register)}</label>
<div class="tabpane pane-login"><form method="post" action="/portal/login" class="authform">
<label>${esc(a.email)}<input type="email" name="email" autocomplete="email" required></label>
<label>${esc(a.password)}<input type="password" name="password" autocomplete="current-password" required></label>
<button class="btn gold full">${esc(a.btnLogin)}</button></form></div>
<div class="tabpane pane-register"><form method="post" action="/portal/register" class="authform">
<label>${esc(a.name)}<input name="name" autocomplete="name" required></label>
<label>${esc(a.email)}<input type="email" name="email" autocomplete="email" required></label>
<label>${esc(a.password)}<input type="password" name="password" autocomplete="new-password" minlength="8" required></label>
<label>${esc(a.type)}<select name="role"><option value="prof">${esc(a.prof)}</option><option value="inst">${esc(a.inst)}</option></select></label>
<label>${esc(a.lang)}<select name="language">${langOpts}</select></label>
<button class="btn gold full">${esc(a.btnRegister)}</button></form></div>
</div>
<p class="authnote">🔒 ${esc(a.secNote)}</p>
</main></section>`;
  res.send(layout(a.title, inner, 'home', req.lang, req.path));
}
app.get('/portal', (req, res) => {
  if (req.session?.portalUserId && !req.session?.userPending2FA) return res.redirect('/portal/account');
  if (req.session?.portalUserId && req.session?.userPending2FA) return res.redirect('/portal/2fa');
  portalAuthPage(req, res, { tab: req.query.tab === 'register' ? 'register' : 'login' });
});
app.post('/portal/register', async (req, res) => {
  const a = acc(req);
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').toLowerCase().trim();
  const pw = String(req.body.password || '');
  const role = req.body.role === 'inst' ? 'Zorginstelling' : 'Zorgprofessional';
  const language = LANGS.includes(req.body.language) ? req.body.language : req.lang;
  if (!name || !email) return portalAuthPage(req, res, { tab: 'register', error: a.badCred });
  if (pw.length < 8) return portalAuthPage(req, res, { tab: 'register', error: a.weak });
  if (await PortalUser.findOne({ email })) return portalAuthPage(req, res, { tab: 'register', error: a.exists });
  let u; try { u = await PortalUser.create({ name, email, passwordHash: await bcrypt.hash(pw, 12), role, language }); } catch (e) { return portalAuthPage(req, res, { tab: 'register', error: a.exists }); }
  req.session.portalUserId = u._id.toString(); req.session.portalEmail = email; req.session.userPending2FA = false; req.session.user2FAEnabled = false;
  setLangCookie(res, language);
  res.redirect('/portal/account');
});
app.post('/portal/login', async (req, res) => {
  const a = acc(req);
  const key = throttleKey(req, 'user');
  if (isLocked(key)) return portalAuthPage(req, res, { tab: 'login', error: a.locked });
  const email = String(req.body.email || '').toLowerCase().trim();
  const u = await PortalUser.findOne({ email });
  if (!u || !await bcrypt.compare(String(req.body.password || ''), u.passwordHash || '')) { recordFail(key); return portalAuthPage(req, res, { tab: 'login', error: a.badCred }); }
  clearFails(key);
  req.session.portalUserId = u._id.toString(); req.session.portalEmail = email;
  if (u.twoFAEnabled && u.twoFASecret) { req.session.userPending2FA = true; return res.redirect('/portal/2fa'); }
  req.session.userPending2FA = false; req.session.user2FAEnabled = false;
  await PortalUser.findByIdAndUpdate(u._id, { lastLogin: new Date() });
  if (u.language) setLangCookie(res, u.language);
  res.redirect('/portal/account');
});
app.get('/portal/2fa', (req, res) => {
  if (!req.session?.portalUserId || !req.session?.userPending2FA) return res.redirect('/portal');
  const a = acc(req);
  res.send(layout(a.twoFAtitle, `<section class="page"><main class="login"><h1>${esc(a.twoFAtitle)}</h1><form method="post" action="/portal/2fa"><label for="token">${esc(a.code)}</label><input id="token" name="token" inputmode="numeric" autocomplete="one-time-code" placeholder="000000" required><button class="btn gold full">${esc(a.verify)}</button></form></main></section>`, 'home', req.lang, req.path));
});
app.post('/portal/2fa', async (req, res) => {
  if (!req.session?.portalUserId || !req.session?.userPending2FA) return res.redirect('/portal');
  const u = await PortalUser.findById(req.session.portalUserId);
  const token = String(req.body.token || '').replace(/\s/g, '');
  if (!u || !u.twoFASecret || !speakeasy.totp.verify({ secret: u.twoFASecret, encoding: 'base32', token, window: 1 })) return res.redirect('/portal/2fa');
  req.session.userPending2FA = false; req.session.user2FAEnabled = true;
  await PortalUser.findByIdAndUpdate(u._id, { lastLogin: new Date() });
  if (u.language) setLangCookie(res, u.language);
  res.redirect('/portal/account');
});
app.get('/portal/account', requireUser, async (req, res) => {
  const a = acc(req), b = book(req);
  const u = await PortalUser.findById(req.session.portalUserId).lean();
  if (!u) return res.redirect('/portal');
  const langOpts = LANGS.map(l => `<option value="${l}" ${l === u.language ? 'selected' : ''}>${LANGMETA[l].name}</option>`).join('');
  const roleOpts = `<option value="prof" ${u.role !== 'Zorginstelling' ? 'selected' : ''}>${esc(a.prof)}</option><option value="inst" ${u.role === 'Zorginstelling' ? 'selected' : ''}>${esc(a.inst)}</option>`;
  const today = new Date().toISOString().slice(0, 10);
  const mine = (await Appointment.find().lean()).filter(x => String(x.portalUserId) === String(u._id)).sort((x, y) => ((x.date || '') + (x.time || '')).localeCompare((y.date || '') + (y.time || '')));
  const myList = mine.length ? `<div class="tablewrap" style="margin-top:14px"><table class="rtable"><thead><tr><th>${esc(b.date)}</th><th>${esc(b.time)}</th><th>${esc(b.topic)}</th><th>Status</th></tr></thead><tbody>${mine.map(m => `<tr><td>${esc(m.date || '')}</td><td>${esc(m.time || '')}</td><td>${esc(m.topic || '')}</td><td>${badge(m.status)}</td></tr>`).join('')}</tbody></table></div>` : '';
  const profileCard = u.role !== 'Zorginstelling' ? CP.renderProfileForm(u, req.lang, esc) : '';
  const journeyCard = u.role !== 'Zorginstelling' ? renderJourney(u.adminStatus, req.lang, esc) : '';
  const secCard = u.twoFAEnabled
    ? `<div class="rcard"><h2>${esc(a.security)}</h2><p class="ok">✓ ${esc(a.twofaOn)}</p><form method="post" action="/portal/security/2fa-disable"><button class="btn navy small">${esc(a.disable2fa)}</button></form><p class="hint">🔒 ${esc(a.secNote)}</p></div>`
    : `<div class="rcard"><h2>${esc(a.security)}</h2><p class="warn">${esc(a.twofaOff)}</p><p><a class="btn gold small" href="/portal/security/2fa-setup">${esc(a.enable2fa)}</a></p><p class="hint">🔒 ${esc(a.secNote)}</p></div>`;
  const inner = `<section class="page portal"><div class="page-head"><div><h1>${esc(a.account)}</h1><p>${esc(a.hello)}, ${esc(u.name)} · ${esc(u.role)}</p></div><form method="post" action="/portal/logout"><button class="btn navy small">${esc(a.logout)}</button></form></div>
<div class="rcard"><h2>${esc(a.profile)}</h2><form class="rform" method="post" action="/portal/account"><div class="ff"><label>${esc(a.name)}</label><input name="name" value="${esc(u.name)}"></div><div class="ff"><label>${esc(a.type)}</label><select name="role">${roleOpts}</select></div><div class="ff"><label>${esc(a.lang)}</label><select name="language">${langOpts}</select></div><div class="rform-actions"><button class="btn gold">${esc(a.save)}</button></div></form></div>
${journeyCard}${profileCard}<div class="rcard"><h2>${esc(b.title)}</h2><form class="rform" method="post" action="/portal/appointment"><div class="ff"><label>${esc(b.date)}</label><input type="date" name="date" min="${today}" required></div><div class="ff"><label>${esc(b.time)}</label><select name="time">${TIMES.map(x => `<option>${x}</option>`).join('')}</select></div><div class="ff"><label>${esc(b.channel)}</label><select name="channel"><option value="Videogesprek">${esc(b.video)}</option><option value="Telefoon">${esc(b.phone)}</option><option value="Op locatie">${esc(b.onsite)}</option></select></div><div class="ff"><label>${esc(b.topic)}</label><input name="topic"></div><div class="rform-actions"><button class="btn gold">${esc(b.send)}</button></div></form>${myList}</div>
${secCard}
</section>`;
  res.send(layout(a.account, inner, 'home', req.lang, req.path));
});
app.post('/portal/appointment', requireUser, async (req, res) => {
  const u = await PortalUser.findById(req.session.portalUserId).lean();
  const date = String(req.body.date || ''), time = String(req.body.time || '');
  const topic = String(req.body.topic || ''), channel = String(req.body.channel || 'Videogesprek');
  if (u && date) {
    try { await Appointment.create({ name: u.name, email: u.email, portalUserId: String(u._id), date, time, topic, channel, status: 'Aangevraagd' }); } catch (e) {}
    sendEmail({ to: MAIL_TO, replyTo: u.email, subject: `Gespreksaanvraag (portaal) — ${u.name}`, html: mailWrap('Gespreksaanvraag via portaal', [['Naam', u.name], ['E-mail', u.email], ['Datum', date], ['Tijd', time], ['Kanaal', channel], ['Onderwerp', topic || '—']]) });
    sendEmail({ to: u.email, subject: book(req).thanks, html: mailWrap(book(req).title, [['Datum', date], ['Tijd', time], ['Kanaal', channel]]) });
  }
  res.redirect('/portal/account');
});
app.post('/portal/profile', requireUser, async (req, res) => {
  try { await PortalUser.findByIdAndUpdate(req.session.portalUserId, CP.coerceProfile(req.body)); } catch (e) {}
  res.redirect('/portal/account');
});
app.post('/portal/account', requireUser, async (req, res) => {
  const role = req.body.role === 'inst' ? 'Zorginstelling' : 'Zorgprofessional';
  const language = LANGS.includes(req.body.language) ? req.body.language : null;
  const upd = { name: String(req.body.name || '').trim(), role };
  if (language) upd.language = language;
  await PortalUser.findByIdAndUpdate(req.session.portalUserId, upd);
  if (language) setLangCookie(res, language);
  res.redirect('/portal/account');
});
app.get('/portal/security/2fa-setup', requireUser, async (req, res) => {
  const a = acc(req);
  const u = await PortalUser.findById(req.session.portalUserId);
  const secret = speakeasy.generateSecret({ name: `Honor Care Portal (${u.email})` });
  req.session.userPending2FASecret = secret.base32;
  const qr = await QRCode.toDataURL(secret.otpauth_url);
  res.send(layout(a.twoFAtitle, `<section class="page"><main class="login"><h1>${esc(a.twoFAtitle)}</h1><p>${esc(a.scan)}</p><img style="max-width:240px" src="${qr}" alt="QR"><p class="mono">${esc(secret.base32)}</p><form method="post" action="/portal/security/2fa-setup"><label for="token">${esc(a.code)}</label><input id="token" name="token" inputmode="numeric" autocomplete="one-time-code" placeholder="000000" required><button class="btn gold full">${esc(a.verify)}</button></form></main></section>`, 'home', req.lang, req.path));
});
app.post('/portal/security/2fa-setup', requireUser, async (req, res) => {
  const secret = req.session.userPending2FASecret;
  const token = String(req.body.token || '').replace(/\s/g, '');
  if (secret && speakeasy.totp.verify({ secret, encoding: 'base32', token, window: 1 })) {
    await PortalUser.findByIdAndUpdate(req.session.portalUserId, { twoFASecret: secret, twoFAEnabled: true });
    req.session.userPending2FASecret = null; req.session.user2FAEnabled = true;
  }
  res.redirect('/portal/account');
});
app.post('/portal/security/2fa-disable', requireUser2FA, async (req, res) => {
  await PortalUser.findByIdAndUpdate(req.session.portalUserId, { twoFASecret: null, twoFAEnabled: false });
  res.redirect('/portal/account');
});
app.post('/portal/logout', (req, res) => { req.session.portalUserId = null; req.session.userPending2FA = null; req.session.portalEmail = null; req.session.userPending2FASecret = null; res.redirect('/portal'); });

app.get('/documents', requireAuth, async (req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 }).lean();
  const addForm = `<details class="addbox"><summary>+ Nieuw document</summary><form class="rform" method="post" action="/documents"><div class="ff"><label>Titel</label><input name="title"></div><div class="ff"><label>Categorie</label><input name="category"></div><div class="ff"><label>Taal</label><input name="language"></div><div class="ff"><label>Status</label><input name="status"></div><div class="ff"><label>Notities</label><textarea name="notes" rows="2"></textarea></div><div class="ff"><label>Inhoud (HTML)</label><textarea name="content" rows="4"></textarea></div><div class="rform-actions"><button class="btn gold">Toevoegen</button></div></form></details>`;
  const rows = docs.map(d => `<tr><td class="tname"><a href="/documents/${d._id}">${esc(d.title)}</a></td><td>${esc(d.category || '')}</td><td>${esc(d.language || '')}</td><td>${badge(d.status)}</td><td class="tact"><a class="btn navy small" href="/documents/${d._id}">Open</a></td></tr>`).join('');
  const inner = `${addForm}<div class="tablewrap"><table class="rtable"><thead><tr><th>Titel</th><th>Categorie</th><th>Taal</th><th>Status</th><th></th></tr></thead><tbody>${rows || '<tr><td colspan="5" class="empty">Nog geen documenten.</td></tr>'}</tbody></table></div>`;
  portalShell(req, res, 'Documenten', inner, '/documents');
});

if (ENABLE_TEST_DOCS) {
  app.get('/test-documents', async (req, res) => {
    const docs = await Document.find().sort({ createdAt: -1 }).lean();
    res.send(layout('Test documenten', `<section class="page"><h1>Test documenten zonder login</h1><p>Alleen actief buiten productie of met ENABLE_TEST_DOCS=true.</p><div class="grid">${docs.map(d => `<article class="doc"><h3>${esc(d.title)}</h3><p class="meta">${esc(d.category)} • ${esc(d.language)} • ${esc(d.status)}</p><a class="btn navy small" href="/test-documents/${d._id}">Open test</a></article>`).join('')}</div></section>`, 'home', req.lang, req.path));
  });
  app.get('/test-documents/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.redirect('/test-documents');
    const doc = await Document.findById(req.params.id).lean();
    if (!doc) return res.redirect('/test-documents');
    res.send(layout(doc.title, `<section class="page"><a class="btn navy" href="/test-documents">Terug</a><article class="doc-content"><p class="meta">${esc(doc.category)} • ${esc(doc.language)} • ${esc(doc.status)}</p>${docContent(doc)}</article></section>`, 'home', req.lang, req.path));
  });
}

app.get('/documents/:id', requireAuth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.redirect('/documents');
  const doc = await Document.findById(req.params.id).lean();
  if (!doc) return res.redirect('/documents');
  const inner = `<p><a class="btn navy small" href="/documents">← Terug</a></p><article class="doc-content"><p class="meta">${esc(doc.category)} • ${esc(doc.language)} • ${esc(doc.status)}</p>${docContent(doc)}</article><form method="post" action="/documents/${doc._id}/delete" class="delform"><button class="btn danger small">Verwijderen</button></form>`;
  portalShell(req, res, doc.title, inner, '/documents');
});
app.post('/documents/:id/delete', requireAuth, async (req, res) => { if (mongoose.Types.ObjectId.isValid(req.params.id)) { try { await Document.findByIdAndDelete(req.params.id); } catch (e) {} } res.redirect('/documents'); });
app.post('/documents', requireAuth, async (req, res) => {
  const title = req.body.title || 'Nieuw document';
  await Document.create({ title, category: req.body.category, language: req.body.language, status: req.body.status, notes: req.body.notes, content: req.body.content || `<h1>${esc(title)}</h1><p>${esc(req.body.notes || '')}</p>` });
  res.redirect('/documents');
});

// ---- Generiek modulesysteem (lijst + detail/bewerken/verwijderen) ----
function resource(opts) {
  const { path: url, Model, title, fields, titleField = 'name', columns = [], statusField, intro = '' } = opts;
  const fmap = Object.fromEntries(fields.map(f => [f.name, f]));
  async function fieldInput(f, val) {
    val = (val == null) ? '' : val;
    const lab = `<label for="f_${f.name}">${esc(f.label)}</label>`;
    if (f.type === 'textarea') return `<div class="ff">${lab}<textarea id="f_${f.name}" name="${f.name}" rows="3">${esc(val)}</textarea></div>`;
    if (f.type === 'checkbox') return `<div class="ff chkff"><label class="chk"><input type="checkbox" name="${f.name}" value="1" ${val ? 'checked' : ''}> ${esc(f.label)}</label></div>`;
    if (f.type === 'select') {
      let o = f.options || []; if (f.optionsFrom) { try { o = await f.optionsFrom(); } catch (e) { o = []; } }
      const n = o.map(x => typeof x === 'string' ? { value: x, label: x } : x);
      return `<div class="ff">${lab}<select id="f_${f.name}" name="${f.name}"><option value="">—</option>${n.map(x => `<option value="${esc(x.value)}" ${String(val) === String(x.value) ? 'selected' : ''}>${esc(x.label)}</option>`).join('')}</select></div>`;
    }
    return `<div class="ff">${lab}<input id="f_${f.name}" name="${f.name}" type="${f.type || 'text'}" value="${esc(val)}"></div>`;
  }
  async function buildForm(action, item, submitLabel) {
    const ps = []; for (const f of fields) ps.push(await fieldInput(f, item ? item[f.name] : ''));
    return `<form class="rform" method="post" action="${action}">${ps.join('')}<div class="rform-actions"><button class="btn gold">${submitLabel}</button></div></form>`;
  }
  function coerce(body) { const d = {}; for (const f of fields) { d[f.name] = (f.type === 'checkbox') ? !!body[f.name] : (body[f.name] != null ? String(body[f.name]) : ''); } return d; }
  app.get(url, requireAuth, async (req, res) => {
    const items = await Model.find().sort({ createdAt: -1 }).lean();
    const th = `<th>${esc(fmap[titleField] ? fmap[titleField].label : 'Naam')}</th>` + columns.map(c => `<th>${esc(fmap[c] ? fmap[c].label : c)}</th>`).join('') + (statusField ? '<th>Status</th>' : '') + '<th></th>';
    const rows = items.map(it => {
      const tds = columns.map(c => { const f = fmap[c]; let v = it[c]; if (f && f.type === 'checkbox') v = v ? 'Ja' : 'Nee'; if (f && f.type === 'url' && v) return `<td><a href="${esc(v)}" target="_blank" rel="noopener">↗</a></td>`; return `<td>${esc(v == null ? '' : v)}</td>`; }).join('');
      return `<tr><td class="tname"><a href="${url}/${it._id}">${esc(it[titleField] || '(zonder naam)')}</a></td>${tds}${statusField ? `<td>${badge(it[statusField])}</td>` : ''}<td class="tact"><a class="btn navy small" href="${url}/${it._id}">Open</a></td></tr>`;
    }).join('');
    const colspan = columns.length + (statusField ? 3 : 2);
    const inner = `${intro}<details class="addbox"><summary>+ Nieuw toevoegen</summary>${await buildForm(url, null, 'Toevoegen')}</details>
<div class="tablewrap"><table class="rtable"><thead><tr>${th}</tr></thead><tbody>${rows || `<tr><td colspan="${colspan}" class="empty">Nog geen items. Voeg er een toe.</td></tr>`}</tbody></table></div>`;
    portalShell(req, res, title, inner, url);
  });
  app.post(url, requireAuth, async (req, res) => { try { await Model.create(coerce(req.body)); } catch (e) {} res.redirect(url); });
  app.get(url + '/:id', requireAuth, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.redirect(url);
    const item = await Model.findById(req.params.id).lean(); if (!item) return res.redirect(url);
    const inner = `<p><a class="btn navy small" href="${url}">← Terug</a></p><div class="rcard">${await buildForm(url + '/' + item._id, item, 'Opslaan')}</div>
<form method="post" action="${url}/${item._id}/delete" class="delform"><button class="btn danger small">Verwijderen</button></form>`;
    portalShell(req, res, item[titleField] || title, inner, url);
  });
  app.post(url + '/:id', requireAuth, async (req, res) => { if (mongoose.Types.ObjectId.isValid(req.params.id)) { try { await Model.findByIdAndUpdate(req.params.id, coerce(req.body)); } catch (e) {} } res.redirect(url + '/' + req.params.id); });
  app.post(url + '/:id/delete', requireAuth, async (req, res) => { if (mongoose.Types.ObjectId.isValid(req.params.id)) { try { await Model.findByIdAndDelete(req.params.id); } catch (e) {} } res.redirect(url); });
}

const OTODOM_URL = 'https://www.otodom.pl/pl/wyniki/wynajem/mieszkanie/mazowieckie/warszawa';
resource({ path: '/candidates', Model: Candidate, title: 'Kandidaten', titleField: 'name', statusField: 'status', columns: ['profession', 'city', 'language'],
  fields: [{ name: 'name', label: 'Naam' }, { name: 'email', label: 'E-mail', type: 'email' }, { name: 'phone', label: 'Telefoon', type: 'tel' }, { name: 'profession', label: 'Beroep' }, { name: 'specialty', label: 'Specialisatie' }, { name: 'country', label: 'Land' }, { name: 'city', label: 'Stad' }, { name: 'language', label: 'Taalniveau Pools', type: 'select', options: ['Geen', 'A1', 'A2', 'B1', 'B2', 'C1'] }, { name: 'status', label: 'Status', type: 'select', options: ['Nieuw', 'Screening', 'Taalopleiding', 'Erkenning', 'Visum', 'Geplaatst', 'Afgewezen'] }, { name: 'notes', label: 'Notities', type: 'textarea' }] });
resource({ path: '/institutions-list', Model: Institution, title: 'Instellingen', titleField: 'name', statusField: 'status', columns: ['city', 'type', 'demand'],
  fields: [{ name: 'name', label: 'Naam' }, { name: 'contact', label: 'Contactpersoon' }, { name: 'email', label: 'E-mail', type: 'email' }, { name: 'phone', label: 'Telefoon', type: 'tel' }, { name: 'city', label: 'Stad' }, { name: 'type', label: 'Type', type: 'select', options: ['Ziekenhuis', 'Kliniek', 'Verpleeghuis', 'Thuiszorg', 'Anders'] }, { name: 'demand', label: 'Behoefte (profiel/aantal)' }, { name: 'status', label: 'Status', type: 'select', options: ['Prospect', 'In gesprek', 'Klant', 'On hold', 'Gestopt'] }, { name: 'notes', label: 'Notities', type: 'textarea' }] });
resource({ path: '/placements', Model: Placement, title: 'Plaatsingen', titleField: 'candidate', statusField: 'status', columns: ['institution', 'role', 'startDate'],
  fields: [{ name: 'candidate', label: 'Kandidaat', type: 'select', optionsFrom: async () => (await Candidate.find().lean()).map(c => c.name).filter(Boolean) }, { name: 'institution', label: 'Instelling', type: 'select', optionsFrom: async () => (await Institution.find().lean()).map(i => i.name).filter(Boolean) }, { name: 'role', label: 'Functie' }, { name: 'startDate', label: 'Startdatum', type: 'date' }, { name: 'status', label: 'Status', type: 'select', options: ['Voorgesteld', 'Geaccepteerd', 'Gestart', 'Afgerond', 'Geannuleerd'] }, { name: 'notes', label: 'Notities', type: 'textarea' }] });
resource({ path: '/housing-list', Model: Housing, title: 'Woningen', titleField: 'title', statusField: 'status', columns: ['district', 'rooms', 'area', 'price', 'otodomUrl'],
  intro: `<p class="otodom"><a class="btn gold small" href="${OTODOM_URL}" target="_blank" rel="noopener">Zoek live op Otodom (Warschau, huur) ↗</a></p><p class="hint">De woningen hieronder zijn voorbeelden op basis van actuele Otodom-marktdata. Live aanbod mag niet automatisch worden overgenomen (voorwaarden + veroudering); voeg echte advertenties toe via "Nieuw toevoegen" en plak de Otodom-link per woning.</p>`,
  fields: [{ name: 'title', label: 'Titel' }, { name: 'district', label: 'Wijk (Warschau)' }, { name: 'address', label: 'Adres' }, { name: 'rooms', label: 'Kamers' }, { name: 'area', label: 'Oppervlakte' }, { name: 'price', label: 'Prijs per maand' }, { name: 'furnished', label: 'Gemeubileerd', type: 'checkbox' }, { name: 'status', label: 'Status', type: 'select', options: ['Beschikbaar', 'Gereserveerd', 'Toegewezen', 'Bezet'] }, { name: 'assignedTo', label: 'Toegewezen aan (kandidaat)', type: 'select', optionsFrom: async () => (await Candidate.find().lean()).map(c => c.name).filter(Boolean) }, { name: 'otodomUrl', label: 'Otodom-link', type: 'url' }, { name: 'notes', label: 'Notities', type: 'textarea' }] });
resource({ path: '/subsidies', Model: Subsidy, title: 'Subsidies', titleField: 'title', statusField: 'status', columns: ['program', 'deadline'],
  fields: [{ name: 'title', label: 'Titel' }, { name: 'program', label: 'Programma', type: 'select', options: ['AMIF', 'FERS', 'ESF+', 'Anders'] }, { name: 'deadline', label: 'Deadline' }, { name: 'status', label: 'Status', type: 'select', options: ['Concept', 'In voorbereiding', 'Ingediend', 'Toegekend', 'Afgewezen'] }, { name: 'notes', label: 'Notities', type: 'textarea' }] });

// ---- Agenda (afspraken) ----
app.get('/agenda', requireAuth, async (req, res) => {
  const ym = /^\d{4}-\d{2}$/.test(req.query.m || '') ? req.query.m : new Date().toISOString().slice(0, 7);
  const appts = await Appointment.find().lean();
  const cal = monthCalendar(ym, appts);
  const upcoming = appts.filter(a => a.date).sort((a, b) => ((a.date || '') + (a.time || '')).localeCompare((b.date || '') + (b.time || ''))).slice(0, 40);
  const rows = upcoming.map(a => `<tr><td>${esc(a.date || '')} ${esc(a.time || '')}</td><td class="tname"><a href="/appointments/${a._id}">${esc(a.name || '')}</a></td><td>${esc(a.topic || '')}</td><td>${esc(a.channel || '')}</td><td>${badge(a.status)}</td></tr>`).join('');
  const inner = `<p class="otodom"><a class="btn navy small" href="/appointments">Alle afspraken (tabel) →</a></p>${cal}
<h2>Komende afspraken</h2><div class="tablewrap"><table class="rtable"><thead><tr><th>Wanneer</th><th>Naam</th><th>Onderwerp</th><th>Kanaal</th><th>Status</th></tr></thead><tbody>${rows || '<tr><td colspan="5" class="empty">Nog geen afspraken.</td></tr>'}</tbody></table></div>`;
  portalShell(req, res, 'Agenda', inner, '/agenda');
});
resource({
  path: '/appointments', Model: Appointment, title: 'Afspraken', titleField: 'name', statusField: 'status', columns: ['date', 'time', 'topic', 'channel'],
  fields: [{ name: 'name', label: 'Naam' }, { name: 'email', label: 'E-mail', type: 'email' }, { name: 'date', label: 'Datum', type: 'date' }, { name: 'time', label: 'Tijd', type: 'select', options: TIMES }, { name: 'topic', label: 'Onderwerp' }, { name: 'channel', label: 'Kanaal', type: 'select', options: ['Videogesprek', 'Telefoon', 'Op locatie'] }, { name: 'status', label: 'Status', type: 'select', options: ['Aangevraagd', 'Bevestigd', 'Afgerond', 'Geannuleerd'] }, { name: 'notes', label: 'Notities', type: 'textarea' }]
});

resource({
  path: '/messages', Model: ContactMessage, title: 'Berichten', titleField: 'name', statusField: 'status', columns: ['email', 'subject'],
  fields: [{ name: 'name', label: 'Naam' }, { name: 'email', label: 'E-mail', type: 'email' }, { name: 'subject', label: 'Onderwerp' }, { name: 'message', label: 'Bericht', type: 'textarea' }, { name: 'status', label: 'Status', type: 'select', options: ['Nieuw', 'Beantwoord', 'Gearchiveerd'] }]
});

// ---- AI-assistent ----
async function aiChat(messages) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { error: 'AI-assistent is nog niet geconfigureerd. Stel de variabele ANTHROPIC_API_KEY in (Railway → Variables) en herstart.' };
  const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';
  const system = 'Je bent de interne AI-assistent van Honor Care International, een organisatie die zorgprofessionals uit Colombia werft, opleidt, legaliseert, huisvest en plaatst in Poolse zorginstellingen. Help het team praktisch: beantwoord vragen, vat samen, stel e-mails of teksten op, en denk mee over werving, planning, subsidies (AMIF/FERS/ESF+) en het Poolse erkennings- en verblijfsproces. Antwoord standaard in het Nederlands, beknopt en concreet. Geef bij juridische, fiscale of medische zaken aan dat verificatie met een gekwalificeerd adviseur nodig is.';
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' }, body: JSON.stringify({ model, max_tokens: 1024, system, messages }) });
    if (!r.ok) { const t = await r.text().catch(() => ''); console.error('AI-fout', r.status, t.slice(0, 200)); return { error: 'De AI gaf een fout (' + r.status + '). Controleer de API-sleutel en het model.' }; }
    const data = await r.json();
    const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
    return { reply: text || '(geen antwoord ontvangen)' };
  } catch (e) { console.error(e); return { error: 'Kon de AI-dienst niet bereiken.' }; }
}
app.get('/assistant', requireAuth, (req, res) => {
  const warn = process.env.ANTHROPIC_API_KEY ? '' : '<p class="hint">Let op: stel eerst <code>ANTHROPIC_API_KEY</code> in (Railway → Variables) om de assistent te activeren. Optioneel: <code>ANTHROPIC_MODEL</code>.</p>';
  const inner = `<p>Stel vragen over werving, planning of subsidies, of laat de assistent een e-mail of tekst opstellen.</p>${warn}
<div id="chat" class="chat" aria-live="polite"></div>
<form id="chatform" class="chatform"><input id="msg" type="text" placeholder="Typ je bericht…" autocomplete="off" aria-label="Bericht"><button class="btn gold" type="submit">Stuur</button></form>
<script src="/js/assistant.js?v=${ASSET_V}"></script>`;
  portalShell(req, res, 'AI-assistent', inner, '/assistant');
});
app.post('/assistant/chat', requireAuth, async (req, res) => {
  const raw = Array.isArray(req.body.messages) ? req.body.messages.slice(-20) : [];
  const clean = raw.filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string').map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));
  if (!clean.length) return res.json({ error: 'Geen bericht ontvangen.' });
  res.json(await aiChat(clean));
});

// ---- Back-up & herstel (databescherming) ----
const COLLECTIONS = { documents: Document, candidates: Candidate, institutions: Institution, placements: Placement, housing: Housing, subsidies: Subsidy, appointments: Appointment, messages: ContactMessage, newsletter: Newsletter, portalusers: PortalUser };
app.get('/admin/mailtest', requireAuth, async (req, res) => {
  const r = await sendEmail({ to: MAIL_TO, subject: 'Testbericht — Honor Care', html: mailWrap('Testbericht', [['Resultaat', 'Als je dit ziet, werkt Resend correct.'], ['Verzonden naar', MAIL_TO]]) });
  let cls = 'ok', msg;
  if (r.skipped) { cls = 'error'; msg = 'RESEND_API_KEY ontbreekt of is leeg.'; }
  else if (r.error) { cls = 'error'; msg = `FOUT ${r.error}: ${(r.detail || '').slice(0, 500)}`; }
  else { msg = `Verstuurd ✓ (Resend-id: ${r.id || '?'}). Controleer de inbox van ${MAIL_TO}.`; }
  const inner = `<div class="rcard">
<p><b>Afzender (RESEND_FROM):</b> ${esc(MAIL_FROM)}</p>
<p><b>Ontvanger (MAIL_TO):</b> ${esc(MAIL_TO)}</p>
<p><b>API-sleutel aanwezig:</b> ${RESEND_KEY ? ('ja, lengte ' + RESEND_KEY.length) : 'NEE'}</p>
<p><b>Door Railway doorgegeven RESEND/MAIL-variabelen:</b> ${esc(Object.keys(process.env).filter(k => /resend|mail/i.test(k)).join(', ') || '(geen)')}</p>
<p class="${cls}" style="margin-top:10px">${esc(msg)}</p>
<p class="hint">Staat hier "domain is not verified"? Verifieer dan <b>honorcareinternational.com</b> in Resend (Domains → Add Domain → DNS-records plaatsen). Wil je eerst alleen testen? Zet <code>RESEND_FROM=onboarding@resend.dev</code> en <code>MAIL_TO</code> op het e-mailadres van je eigen Resend-account; dan komt deze test binnen.</p>
<p><a class="btn navy small" href="/admin/mailtest">Opnieuw testen</a> <a class="btn gold small" href="/dashboard">Dashboard</a></p></div>`;
  portalShell(req, res, 'E-mailtest', inner, '/backup');
});
function talentQuery(req) {
  const q = { role: { $ne: 'Zorginstelling' } };
  const f = { country: String(req.query.country || ''), profession: String(req.query.profession || ''), dutch: String(req.query.dutch || ''), q: String(req.query.q || '').trim() };
  if (CP.COUNTRIES.includes(f.country)) q.country = f.country;
  if (CP.PROFESSIONS.includes(f.profession)) q.profession = f.profession;
  if (CP.LEVELS.includes(f.dutch)) q.dutchLevel = f.dutch;
  if (f.q) { const rx = new RegExp(f.q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'); q.$or = [{ name: rx }, { email: rx }, { city: rx }]; }
  const params = new URLSearchParams();
  for (const k of ['country', 'profession', 'dutch', 'q']) if (f[k]) params.set(k, f[k]);
  f.qs = params.toString();
  return { q, f };
}
app.get('/talentpool', requireAuth, async (req, res) => {
  const { q, f } = talentQuery(req);
  const items = await PortalUser.find(q).sort({ profileUpdatedAt: -1, createdAt: -1 }).lean();
  portalShell(req, res, 'Kandidatenbank', CP.renderTalentPool(items, f, { esc, badge }), '/talentpool');
});
app.get('/talentpool.csv', requireAuth, async (req, res) => {
  const { q } = talentQuery(req);
  const items = await PortalUser.find(q).sort({ createdAt: -1 }).lean();
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="kandidaten-' + new Date().toISOString().slice(0, 10) + '.csv"');
  res.send(CP.toCSV(items));
});
app.get('/talentpool/:id', requireAuth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.redirect('/talentpool');
  const u = await PortalUser.findById(req.params.id).lean();
  if (!u) return res.redirect('/talentpool');
  portalShell(req, res, u.name || 'Kandidaat', CP.renderTalentDetail(u, { esc }), '/talentpool');
});
app.post('/talentpool/:id', requireAuth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.redirect('/talentpool');
  const st = String(req.body.adminStatus || '');
  const upd = { adminNotes: String(req.body.adminNotes || '').slice(0, 4000) };
  if (CP.ADMIN_STATUS.includes(st)) upd.adminStatus = st;
  try { await PortalUser.findByIdAndUpdate(req.params.id, upd); } catch (e) {}
  res.redirect('/talentpool/' + req.params.id);
});
app.get('/zorgscan', requireAuth, async (req, res) => {
  const f = {
    profession: ZS.PROFESSIONS.includes(String(req.query.profession || '')) ? String(req.query.profession) : '',
    province: ZS.PROVINCES.includes(String(req.query.province || '')) ? String(req.query.province) : '',
    hc_min: /^\d{1,3}$/.test(String(req.query.hc_min || '')) ? String(req.query.hc_min) : '',
    q: String(req.query.q || '').trim().slice(0, 80)
  };
  const qs = new URLSearchParams({ limit: '40', sort: 'nieuw' });
  for (const k of ['profession', 'province', 'hc_min', 'q']) if (f[k]) qs.set(k, f[k]);
  const [stats, vac] = await Promise.all([ZS.zsFetch('/api/stats'), ZS.zsFetch('/api/vacatures?' + qs.toString())]);
  portalShell(req, res, 'Zorgscan', ZS.renderPanel(stats, vac, f, { esc }), '/zorgscan');
});
app.get('/versies', requireAuth, (req, res) => {
  portalShell(req, res, CL_UI.h, renderChangelog(PKG.version, esc), '/versies');
});
app.get('/backup', requireAuth, (req, res) => {
  const inner = `<p>Bescherm je gegevens: download regelmatig een back-up. Zo ben je nooit data kwijt, ook niet bij een herinstallatie of migratie.</p>
<p><a class="btn gold" href="/backup/download">Download volledige back-up (JSON)</a></p>
<h2>Herstellen / importeren</h2><p class="hint">Plak hieronder de inhoud van een back-upbestand. Bestaande records (zelfde id) worden overgeslagen, alleen ontbrekende worden toegevoegd — er wordt niets verwijderd of overschreven.</p>
<form method="post" action="/restore" class="rform"><div class="ff"><label for="json">Back-up-JSON</label><textarea id="json" name="json" rows="6" placeholder='{"candidates":[...],"housing":[...]}'></textarea></div><div class="rform-actions"><button class="btn navy">Importeren</button></div></form>
<h2>E-mail (Resend)</h2><p><a class="btn navy" href="/admin/mailtest">E-mailtest uitvoeren</a></p><p class="hint">Stuurt een testbericht naar MAIL_TO en toont de exacte Resend-respons (handig om te zien of je domein geverifieerd is).</p>
<h2>Gegevens behouden bij Railway</h2><p class="hint">Gebruik een <b>persistente</b> database (bijv. MongoDB Atlas) en zet die connectiestring in <code>MONGODB_URI</code>. Dan blijft alle data bewaard bij elke nieuwe deploy. De seed is niet-destructief: bestaande documenten en woningen worden nooit overschreven.</p>`;
  portalShell(req, res, 'Back-up & herstel', inner, '/backup');
});
app.get('/backup/download', requireAuth, async (req, res) => {
  const out = { exportedAt: new Date().toISOString(), app: 'Honor Care Working Docs' };
  for (const [k, M] of Object.entries(COLLECTIONS)) { try { out[k] = await M.find().lean(); } catch (e) { out[k] = []; } }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="honorcare-backup-${new Date().toISOString().slice(0, 10)}.json"`);
  res.send(JSON.stringify(out, null, 2));
});
app.post('/restore', requireAuth, async (req, res) => {
  let data; try { data = JSON.parse(req.body.json || '{}'); } catch (e) { return portalShell(req, res, 'Back-up & herstel', '<p class="error">Ongeldige JSON. Controleer het bestand en probeer opnieuw.</p><p><a class="btn navy" href="/backup">Terug</a></p>', '/backup'); }
  let added = 0, skipped = 0;
  for (const [k, M] of Object.entries(COLLECTIONS)) {
    if (!Array.isArray(data[k])) continue;
    for (const rec of data[k]) {
      try {
        const copy = { ...rec }; delete copy.__v;
        if (copy._id) { const ex = await M.findById(copy._id).lean().catch(() => null); if (ex) { skipped++; continue; } }
        await M.create(copy); added++;
      } catch (e) { skipped++; }
    }
  }
  portalShell(req, res, 'Back-up & herstel', `<p class="ok">Import voltooid: ${added} toegevoegd, ${skipped} overgeslagen (bestonden al).</p><p><a class="btn navy" href="/backup">Terug</a> <a class="btn gold" href="/dashboard">Dashboard</a></p>`, '/backup');
});

app.get('/healthz', (req, res) => res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use((req, res) => { const tr = T[req.lang]; res.status(404).send(layout('404', `<section class="page"><h1>404</h1><p>${tr.notFound}</p><p><a class="btn navy" href="/">${tr.nav.home}</a></p></section>${footer(req.lang)}`, 'home', req.lang, '/')); });

mongoose.connect(MONGO).then(async () => {
  console.log('MongoDB verbonden');
  await seed();
  app.listen(PORT, () => {
    console.log('HonorCare Working Docs v' + PKG.version + ' draait op poort ' + PORT);
    const found = Object.keys(process.env).filter(k => /resend|mail/i.test(k));
    console.log('[env] RESEND/MAIL-variabelen die Railway doorgeeft: ' + (found.length ? found.join(', ') : '(GEEN)'));
    console.log('[mail] Resend-sleutel gedetecteerd: ' + (RESEND_KEY ? ('JA ✓ (lengte ' + RESEND_KEY.length + ')') : 'NEE ✗') + ' | MAIL_TO: ' + MAIL_TO + ' | FROM: ' + MAIL_FROM);
  });
}).catch(e => { console.error(e); process.exit(1); });
