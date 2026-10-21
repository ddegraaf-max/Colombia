// Bouwpagina. Zolang de site in opbouw staat (zie UNDER_CONSTRUCTION in server.js)
// krijgt elke bezoeker deze ene pagina te zien: korte mededeling, contactgegevens
// en een taalkeuze. Geen menu, geen formulieren, geen inline script (CSP).
const { LANGS, LANGMETA } = require('./i18n');

const UC = {
  pl: {
    title: 'Strona w budowie', eyebrow: 'Chwila cierpliwości', h1: 'Pracujemy nad nową formułą',
    p: 'Honor Care International przygotowuje nową wersję strony internetowej i swoich usług. Dlatego strona jest tymczasowo niedostępna. Masz pytanie? Skontaktuj się z nami.',
    call: 'Zadzwoń', wa: 'WhatsApp', mail: 'Napisz e-mail', langs: 'Język', admin: 'Panel'
  },
  en: {
    title: 'Website under construction', eyebrow: 'Please bear with us', h1: 'We are working on a new approach',
    p: 'Honor Care International is working on a new version of its website and services. The site is therefore temporarily unavailable. Do you have a question? Feel free to get in touch.',
    call: 'Call us', wa: 'WhatsApp', mail: 'E-mail us', langs: 'Language', admin: 'Admin'
  },
  nl: {
    title: 'Website in opbouw', eyebrow: 'Even geduld', h1: 'Wij werken aan een nieuwe opzet',
    p: 'Honor Care International werkt aan een nieuwe versie van de website en de dienstverlening. Daarom is de site tijdelijk niet beschikbaar. Heeft u een vraag? Neem gerust contact met ons op.',
    call: 'Bellen', wa: 'WhatsApp', mail: 'E-mailen', langs: 'Taal', admin: 'Beheer'
  },
  es: {
    title: 'Sitio web en construcción', eyebrow: 'Un momento, por favor', h1: 'Estamos trabajando en un nuevo enfoque',
    p: 'Honor Care International está preparando una nueva versión de su sitio web y de sus servicios. Por eso la web no está disponible temporalmente. ¿Tiene alguna pregunta? No dude en ponerse en contacto con nosotros.',
    call: 'Llámenos', wa: 'WhatsApp', mail: 'Escríbanos', langs: 'Idioma', admin: 'Gestión'
  }
};

function renderUnderConstruction({ lang, path, esc, waLink, waIcon, assetV, version }) {
  const t = UC[lang] || UC.pl;
  const r = encodeURIComponent(path && path.startsWith('/') ? path : '/');
  const langs = LANGS.map(l => `<a href="/setlang/${l}?r=${r}"${l === lang ? ' class="cur"' : ''} lang="${l}">${LANGMETA[l].flag} ${LANGMETA[l].name}</a>`).join('');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(t.title)} — Honor Care International</title><link rel="icon" href="/images/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/css/style.css?v=${assetV}"></head><body class="uc">
<!-- Honor Care v${esc(version)} -->
<main class="uc-main"><section class="uc-card">
<img src="/images/logo.svg" alt="Honor Care International" width="290" height="65">
<span class="eyebrow">${esc(t.eyebrow)}</span>
<h1>${esc(t.h1)}</h1>
<p>${esc(t.p)}</p>
<div class="uc-actions"><a class="btn navy" href="tel:+31646150160">☎ ${esc(t.call)}</a><a class="btn gold" href="${waLink}" target="_blank" rel="noopener">${waIcon} ${esc(t.wa)}</a><a class="btn light" href="mailto:info@honorcareinternational.com">✉ ${esc(t.mail)}</a></div>
<nav class="uc-langs" aria-label="${esc(t.langs)}">${langs}</nav>
</section></main>
<footer class="uc-foot">© ${new Date().getFullYear()} Honor Care International — handelsnaam van Creditline B.V. · KvK 59683198 · <a href="tel:+31646150160">+31 6 46 15 01 60</a> · <a href="mailto:info@honorcareinternational.com">info@honorcareinternational.com</a> · <a href="/login">${esc(t.admin)}</a></footer>
</body></html>`;
}

module.exports = { UC, renderUnderConstruction };
