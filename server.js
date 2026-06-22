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
const Candidate = mongoose.model('Candidate', new mongoose.Schema({ name: String, email: String, profession: String, country: String, status: String, notes: String, createdAt: { type: Date, default: Date.now } }));
const Institution = mongoose.model('Institution', new mongoose.Schema({ name: String, contact: String, email: String, city: String, demand: String, status: String, createdAt: { type: Date, default: Date.now } }));
const Subsidy = mongoose.model('Subsidy', new mongoose.Schema({ title: String, program: String, deadline: String, status: String, notes: String, createdAt: { type: Date, default: Date.now } }));
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
  for (const d of DOCS) {
    await Document.updateOne({ title: d[0] }, { $set: { category: d[1], language: d[2], status: d[3], notes: d[5] || (d[1] + ' — Honor Care Poland'), content: d[4] }, $setOnInsert: { title: d[0], createdAt: new Date() } }, { upsert: true });
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
app.get('/dashboard', requireAuth, async (req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 }).limit(12).lean();
  const counts = { docs: await Document.countDocuments(), candidates: await Candidate.countDocuments(), institutions: await Institution.countDocuments(), subsidies: await Subsidy.countDocuments() };
  res.send(layout('Dashboard', `<section class="page"><div class="page-head"><div><h1>Dashboard</h1><p>Welkom, ${esc(req.session.email)}.</p></div><form method="post" action="/logout"><button class="btn navy">Uitloggen</button></form></div><section class="modules"><a href="/documents"><b>${counts.docs}</b><span>Documenten</span></a><a href="/candidates"><b>${counts.candidates}</b><span>Kandidaten</span></a><a href="/institutions-list"><b>${counts.institutions}</b><span>Instellingen</span></a><a href="/subsidies"><b>${counts.subsidies}</b><span>Subsidies</span></a></section><h2>Documenten</h2><div class="grid">${docs.map(docCard).join('')}</div></section>`, 'home', req.lang, req.path));
});
app.get('/portal', (req, res) => res.redirect('/dashboard'));

app.get('/documents', requireAuth, async (req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 }).lean();
  res.send(layout('Documenten', `<section class="page"><h1>Documenten</h1><form class="formgrid" method="post" action="/documents"><input name="title" placeholder="Titel" aria-label="Titel"><input name="category" placeholder="Categorie" aria-label="Categorie"><input name="language" placeholder="Taal" aria-label="Taal"><input name="status" placeholder="Status" aria-label="Status"><textarea name="notes" placeholder="Notities" aria-label="Notities"></textarea><textarea name="content" placeholder="Documentinhoud" aria-label="Documentinhoud"></textarea><button class="btn gold">Toevoegen</button></form><div class="grid">${docs.map(docCard).join('')}</div><p><a class="btn navy" href="/dashboard">Terug</a></p></section>`, 'home', req.lang, req.path));
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
  res.send(layout(doc.title, `<section class="page"><a class="btn navy" href="/documents">Terug</a><article class="doc-content"><p class="meta">${esc(doc.category)} • ${esc(doc.language)} • ${esc(doc.status)}</p>${docContent(doc)}</article></section>`, 'home', req.lang, req.path));
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
    res.send(layout(title, `<section class="page"><h1>${title}</h1>${form}${list}<p><a class="btn navy" href="/dashboard">Terug</a></p></section>`, 'home', req.lang, req.path));
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
app.use((req, res) => { const tr = T[req.lang]; res.status(404).send(layout('404', `<section class="page"><h1>404</h1><p>${tr.notFound}</p><p><a class="btn navy" href="/">${tr.nav.home}</a></p></section>${footer(req.lang)}`, 'home', req.lang, '/')); });

mongoose.connect(MONGO).then(async () => {
  console.log('MongoDB verbonden');
  await seed();
  app.listen(PORT, () => console.log('HonorCare Working Docs v23 draait op poort ' + PORT));
}).catch(e => { console.error(e); process.exit(1); });
