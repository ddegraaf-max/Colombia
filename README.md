# HonorCare Working Docs v23

Node.js/Express + MongoDB, deploybaar op Railway (NIXPACKS, `npm start`).

## Nieuw in v23 — eerlijke presentatie van een nieuw concept
- **Geen verzonnen cijfers meer.** De statistieken "1000+ / 200+ / 10+" zijn vervangen
  door eerlijke waardepunten over de aanpak (volledige begeleiding, ethische werving,
  één partner voor instellingen, twee landen één doel) — in alle vier de talen.
- **Partnersectie verwijderd.** Er worden geen partners meer getoond, omdat er nog
  geen partners zijn (logisch bij een nieuw concept). Bekende namen tonen zou onterecht zijn.
- **Eén consistent e-mailadres** overal op de publieke site: `info@honorcareinternational.com`
  (top bar, footer, contactpagina — beide kantoren). Het afwijkende Colombia-adres is verwijderd.

> Het admin-login-adres (standaard `admin@honorcarepoland.eu`) staat los van het publieke
> contactadres en stel je in via de Railway-variabele `ADMIN_EMAIL`.

## Behouden
Volledige plandocumenten in het portaal (`documents.js`), mooie foto's door de hele site,
meertaligheid PL/EN/NL/ES (`i18n.js`), logo + favicon, Playfair/Poppins, werkende
nieuwsbrief, security headers, toegankelijkheid, mobiel menu, 2FA, `/healthz`, 404.

## Variabelen (Railway)
`MONGODB_URI`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NODE_ENV=production`.
