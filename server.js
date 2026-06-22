const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const path = require('path');
require('dotenv').config();
const { LANGS, LANGMETA, T } = require('./i18n');

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
    "default-src 'self'; img-src 'self' data: https://images.unsplash.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; " +
    "script-src 'self'; base-uri 'self'; frame-ancestors 'self'; object-src 'none'");
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
  const nav = [['home', '/'], ['about', '/about'], ['institutions', '/institutions'], ['candidates', '/candidates-info'], ['academy', '/academy'], ['housing', '/housing'], ['poland', '/poland'], ['contact', '/contact']]
    .map(([k, href]) => `<a class="${active === k ? 'active' : ''}" href="${href}">${tr.nav[k]}</a>`).join('');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="Honor Care International — ${esc(tr.hero.p).slice(0, 140)}"><link rel="icon" href="/images/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/css/style.css"></head><body>
<a class="skip" href="#main">→</a>
<div class="top"><span class="ttag">${tr.topTagline}</span><span class="right"><a href="tel:+48221234567">☎ +48 22 123 45 67</a> <i>|</i> <a href="mailto:info@honorcareinternational.com">✉ info@honorcareinternational.com</a> <i>|</i> 📍 ${tr.location} <i>|</i> ${langSwitcher(lang, curPath)}</span></div>
<header class="header"><a class="logo" href="/"><img src="/images/logo.svg" alt="Honor Care International" width="290" height="65"></a>
<input type="checkbox" id="navtoggle" class="navtoggle">
<label for="navtoggle" class="burger" aria-label="Menu"><span></span><span></span><span></span></label>
<nav class="menu" aria-label="Menu">${nav}<a class="portal" href="/login">${tr.nav.portal}</a></nav></header>
<main id="main">${body}</main></body></html>`;
}

function footer(lang = 'pl') {
  const tr = T[lang], f = tr.footer;
  const links = [['home', '/'], ['about', '/about'], ['institutions', '/institutions'], ['candidates', '/candidates-info'], ['academy', '/academy'], ['housing', '/housing'], ['poland', '/poland'], ['contact', '/contact']]
    .map(([k, href]) => `<li><a href="${href}">${tr.nav[k]}</a></li>`).join('');
  return `<footer class="footer"><div class="footer-main">
<div class="fcol"><img class="flogo" src="/images/logo.svg" alt="Honor Care International" width="230" height="52"><p>${f.tagline}</p><div class="social"><a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6.3c0-1 .2-1.3 1.2-1.3H18V0h-3.6C10.8 0 9 1.6 9 4.6V8z"/></svg></a><a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM0 8h5v16H0V8zm7.5 0H12v2.2h.1c.6-1.1 2.1-2.3 4.4-2.3 4.7 0 5.5 3 5.5 7V24h-5v-7c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24h-5V8z"/></svg></a><a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.5-.1 4.8c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.5.1-4.8C2.4 4 3.9 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 12 18.6 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 12 7.7a4.3 4.3 0 0 1 0 8.6zm6.8-11.1a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg></a></div></div>
<div class="fcol"><h4>${f.quick}</h4><ul>${links}</ul></div>
<div class="fcol"><h4>${f.officeNL}</h4><p>📍 ul. Prosta 69, 00-838<br>Warszawa, ${tr.nav.poland}</p><p>☎ <a href="tel:+48221234567">+48 22 123 45 67</a></p><p>✉ <a href="mailto:info@honorcareinternational.com">info@honorcareinternational.com</a></p><p>🕘 ${f.hoursNL}</p></div>
<div class="fcol"><h4>${f.officeCO}</h4><p>📍 Carrera 13 # 97-76, Oficina 501<br>Bogotá, Colombia</p><p>☎ <a href="tel:+573201234567">+57 320 123 45 67</a></p><p>✉ <a href="mailto:info@honorcareinternational.com">info@honorcareinternational.com</a></p><p>🕘 ${f.hoursCO}</p></div>
<div class="fcol newsletter"><h4>${f.newsletter}</h4><p>${f.newsletterText}</p><form method="post" action="/newsletter"><div class="nl-row"><input type="email" name="email" placeholder="${f.newsletterPh}" aria-label="${f.newsletterPh}" required><button class="nl-btn" aria-label="OK">→</button></div></form></div>
</div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Honor Care International. ${f.rights}</span><span><a href="/poland">${f.privacy}</a> &nbsp;|&nbsp; <a href="/about">${f.terms}</a></span></div></footer>`;
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

app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false, proxy: true, cookie: { httpOnly: true, sameSite: 'lax', secure: IS_PROD, maxAge: 1000 * 60 * 60 * 8 }, store: MongoStore.create({ mongoUrl: MONGO }) }));

const requireLogin = (req, res, next) => req.session?.userId ? next() : res.redirect('/login');
const requireAuth = (req, res, next) => {
  if (req.session?.userId && req.session?.totpPassed) return next();
  if (!req.session?.userId) return res.redirect('/login');
  return res.redirect(req.session?.twoFAConfigured ? '/verify-2fa' : '/setup-2fa');
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
  '<path d="M8 4c-1.8 0-3 1.2-3 3.3 0 2.3.5 3.5 1 5.8.4 2.1.4 4.6 1.7 4.6 1.2 0 1.1-2.7 2.3-2.7s1.1 2.7 2.3 2.7c1.3 0 1.3-2.5 1.7-4.6"/><path d="M19 4l.6 1.6L21.2 6.2l-1.6.6L19 8.4l-.6-1.6L16.8 6.2l1.6-.6z"/>',
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
<section class="hero"><div class="hero-inner"><h1>${tr.hero.h1[0]}<br>${tr.hero.h1[1]}<br><strong>${tr.hero.h1[2]}</strong></h1><p>${tr.hero.p}</p><div class="bullets">${tr.hero.bullets.map(x => `<div><b>✓</b>${x}</div>`).join('')}</div><div class="hero-cta"><a class="btn navy" href="/institutions">${tr.hero.btnInst}</a><a class="btn gold" href="/candidates-info">${tr.hero.btnProf}</a><a class="btn light" href="/contact">${tr.hero.btnMeet}</a></div></div><div class="hero-badge">${heart}<span>${tr.hero.badge}</span></div></section>
<section class="specs">${tr.specs.map((label, i) => `<div class="spec"><span class="spec-ic">${icon(SPEC_ICONS[i])}</span><span>${label}</span></div>`).join('')}</section>
<section class="cards-wrap"><div class="cards">${tr.cards.map((c, i) => `<article class="card"><div class="card-img ${CARD_META[i][0]}" role="img" aria-label="${esc(c.h)}"></div><div class="card-body"><span class="tag">${c.tag}</span><h3>${c.h}</h3><ul>${c.items.map(li => `<li>${li}</li>`).join('')}</ul><a class="btn ${CARD_META[i][2]} full" href="${CARD_META[i][1]}">${c.btn}</a></div></article>`).join('')}</div></section>
<section class="why"><div class="why-card"><span class="eyebrow">${icon('<path d="M12 21c4-4 7-7.4 7-11a7 7 0 1 0-14 0c0 3.6 3 7 7 11z"/><circle cx="12" cy="10" r="2.5"/>')} ${tr.why.eyebrow}</span><h2>${tr.why.h2[0]}<br>${tr.why.h2[1]}</h2><p>${tr.why.p}</p><a class="btn gold" href="/poland">${tr.why.btn}</a></div><div class="why-stats">${tr.why.stats.map((s, i) => `<div class="stat"><span class="stat-ic">${icon(STAT_ICONS[i])}</span><b>${s[0]}</b><span class="stat-label">${s[1]}</span></div>`).join('')}</div></section>
${footer(lang)}`;
  res.send(layout('Honor Care International', body, 'home', lang, req.path));
});

app.post('/newsletter', async (req, res) => {
  const email = String(req.body.email || '').toLowerCase().trim();
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    try { await Newsletter.updateOne({ email }, { $setOnInsert: { email, lang: req.lang, createdAt: new Date() } }, { upsert: true }); } catch (e) {}
  }
  res.redirect('/?sub=ok#main');
});

// Subpagina's uit i18n, met fotobanner.
const PAGE_IMG = { about: 'ph-about', institutions: 'ph-institutions', candidates: 'ph-candidates', academy: 'ph-academy', housing: 'ph-housing', poland: 'ph-poland' };
function contentPage(req, res, key) {
  const lang = req.lang, tr = T[lang], pg = tr.pages[key], title = tr.nav[key];
  const body = `<section class="page-hero ${PAGE_IMG[key]}"><div class="page-hero-inner"><h1>${title}</h1><p>${pg.intro}</p></div></section><section class="page has-hero"><div class="grid">${pg.panels.map(p => `<article class="panel"><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('')}</div></section>${footer(lang)}`;
  res.send(layout(title, body, key, lang, req.path));
}
app.get('/about', (req, res) => contentPage(req, res, 'about'));
app.get('/institutions', (req, res) => contentPage(req, res, 'institutions'));
app.get('/candidates-info', (req, res) => contentPage(req, res, 'candidates'));
app.get('/academy', (req, res) => contentPage(req, res, 'academy'));
app.get('/housing', (req, res) => contentPage(req, res, 'housing'));
app.get('/poland', (req, res) => contentPage(req, res, 'poland'));
app.get('/contact', (req, res) => {
  const lang = req.lang, tr = T[lang], f = tr.footer;
  const body = `<section class="page-hero ph-contact"><div class="page-hero-inner"><h1>${tr.nav.contact}</h1><p>${tr.contactIntro}</p></div></section><section class="page has-hero"><div class="grid two">
<article class="panel"><h3>${f.officeNL}</h3><p>ul. Prosta 69, 00-838 Warszawa</p><p><a href="tel:+48221234567">+48 22 123 45 67</a></p><p><a href="mailto:info@honorcareinternational.com">info@honorcareinternational.com</a></p><p>${f.hoursNL}</p></article>
<article class="panel"><h3>${f.officeCO}</h3><p>Carrera 13 # 97-76, Oficina 501, Bogotá</p><p><a href="tel:+573201234567">+57 320 123 45 67</a></p><p><a href="mailto:info@honorcareinternational.com">info@honorcareinternational.com</a></p><p>${f.hoursCO}</p></article>
</div></section>${footer(lang)}`;
  res.send(layout(tr.nav.contact, body, 'contact', lang, req.path));
});

// ---------- Auth (portaal blijft Nederlands) ----------
app.get('/login', (req, res) => {
  const error = req.query.error ? `<div class="error">${esc(req.query.error)}</div>` : '';
  res.send(layout('Login', `<section class="page"><main class="login"><h1>Beveiligde login</h1><p>Toegang tot documenten en portaal.</p>${error}<form method="post" action="/login"><label for="email">E-mail</label><input id="email" name="email" type="email" autocomplete="email" placeholder="E-mail" required><label for="password">Wachtwoord</label><input id="password" name="password" type="password" autocomplete="current-password" placeholder="Wachtwoord" required><button class="btn gold full">Inloggen</button></form></main></section>`, 'home', req.lang, req.path));
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
const PORTAL_LINKS = [['/dashboard', 'Dashboard'], ['/candidates', 'Kandidaten'], ['/institutions-list', 'Instellingen'], ['/placements', 'Plaatsingen'], ['/housing-list', 'Woningen'], ['/documents', 'Documenten'], ['/subsidies', 'Subsidies'], ['/assistant', 'AI-assistent'], ['/backup', 'Back-up']];
function portalNav(active) { return `<nav class="pnav" aria-label="Portaal">${PORTAL_LINKS.map(([h, l]) => `<a href="${h}" class="${active === h ? 'on' : ''}">${l}</a>`).join('')}</nav>`; }
function portalShell(req, res, title, inner, active) {
  const head = `<div class="page-head"><div><h1>${esc(title)}</h1></div><form method="post" action="/logout"><button class="btn navy small">Uitloggen</button></form></div>`;
  res.send(layout(title, `<section class="page portal">${head}${portalNav(active)}<div class="pbody">${inner}</div></section>`, 'home', req.lang, req.path));
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
  const tiles = [['/candidates', 'Kandidaten', cand], ['/institutions-list', 'Instellingen', inst], ['/placements', 'Plaatsingen', plac], ['/housing-list', 'Woningen', hous], ['/documents', 'Documenten', docs], ['/subsidies', 'Subsidies', subs]];
  const cands = await Candidate.find().lean();
  const stages = ['Nieuw', 'Screening', 'Taalopleiding', 'Erkenning', 'Visum', 'Geplaatst'];
  const pc = {}; stages.forEach(s => pc[s] = 0); cands.forEach(c => { if (pc[c.status] != null) pc[c.status]++; });
  const inner = `<p class="welcome">Welkom, ${esc(req.session.email)}. Beheer hier het volledige traject — van werving tot plaatsing.</p>
<section class="modules">${tiles.map(t => `<a href="${t[0]}"><b>${t[2]}</b><span>${t[1]}</span></a>`).join('')}</section>
<h2>Kandidaten-pijplijn</h2><div class="pipeline">${stages.map(s => `<div class="pstage"><b>${pc[s]}</b><span>${s}</span></div>`).join('')}</div>
<h2>Sneltoegang</h2><div class="quick"><a class="btn gold" href="/assistant">AI-assistent</a> <a class="btn navy" href="/backup">Back-up &amp; herstel</a> <a class="btn light" href="/housing-list">Woningen (Warschau)</a></div>`;
  portalShell(req, res, 'Dashboard', inner, '/dashboard');
});
app.get('/portal', (req, res) => res.redirect('/dashboard'));

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
<script src="/js/assistant.js"></script>`;
  portalShell(req, res, 'AI-assistent', inner, '/assistant');
});
app.post('/assistant/chat', requireAuth, async (req, res) => {
  const raw = Array.isArray(req.body.messages) ? req.body.messages.slice(-20) : [];
  const clean = raw.filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string').map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));
  if (!clean.length) return res.json({ error: 'Geen bericht ontvangen.' });
  res.json(await aiChat(clean));
});

// ---- Back-up & herstel (databescherming) ----
const COLLECTIONS = { documents: Document, candidates: Candidate, institutions: Institution, placements: Placement, housing: Housing, subsidies: Subsidy, newsletter: Newsletter };
app.get('/backup', requireAuth, (req, res) => {
  const inner = `<p>Bescherm je gegevens: download regelmatig een back-up. Zo ben je nooit data kwijt, ook niet bij een herinstallatie of migratie.</p>
<p><a class="btn gold" href="/backup/download">Download volledige back-up (JSON)</a></p>
<h2>Herstellen / importeren</h2><p class="hint">Plak hieronder de inhoud van een back-upbestand. Bestaande records (zelfde id) worden overgeslagen, alleen ontbrekende worden toegevoegd — er wordt niets verwijderd of overschreven.</p>
<form method="post" action="/restore" class="rform"><div class="ff"><label for="json">Back-up-JSON</label><textarea id="json" name="json" rows="6" placeholder='{"candidates":[...],"housing":[...]}'></textarea></div><div class="rform-actions"><button class="btn navy">Importeren</button></div></form>
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
  app.listen(PORT, () => console.log('HonorCare Working Docs v25 draait op poort ' + PORT));
}).catch(e => { console.error(e); process.exit(1); });
