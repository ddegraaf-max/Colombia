# HonorCare Working Docs v17

Node.js/Express + MongoDB, deploybaar op Railway (NIXPACKS, `npm start`).

## Wat is er verbeterd t.o.v. v16
- **favicon.svg** is nu een echt vierkant hart-icoon (was een kopie van het volledige logo).
- **/test-documents** (toont alle documenten zonder login) staat standaard UIT in productie.
  Buiten productie automatisch aan, of forceer met `ENABLE_TEST_DOCS=true`.
- **2FA-routing** opgelost: ingelogde gebruiker zonder 2FA gaat naar `/setup-2fa` i.p.v. een loop op `/verify-2fa`.
- **Mass assignment** voorkomen: CRUD slaat alleen toegestane velden op.
- **Security headers** toegevoegd (CSP, X-Frame-Options, nosniff, Referrer-Policy) — geen extra dependency.
- **Subpagina's** hebben nu elk eigen titel, intro en panelen (i.p.v. 6 identieke blokken).
- **Toegankelijkheid**: alt-teksten, form labels, skip-link, focus states.
- **Mobiel hamburgermenu** (pure CSS, geen JS).
- **`lang`** klopt per pagina: publieke site `pl`, portaal/login `nl`.
- **/healthz** endpoint en nette **404**-pagina.

## Routes
- Publieke site (Pools): `/`, `/about`, `/institutions`, `/candidates-info`, `/academy`, `/housing`, `/poland`, `/contact`
- Portaal (Nederlands, na login + 2FA): `/dashboard`, `/documents`, `/documents/:id`, `/candidates`, `/institutions-list`, `/subsidies`
- `/healthz` voor Railway health checks

## Let op
- De telefoonnummers (`+48 22 123 45 67`, `+57 320 123 45 67`) zijn placeholders — vervang door echte nummers.
- Stel `SESSION_SECRET`, `ADMIN_EMAIL` en `ADMIN_PASSWORD` in via Railway Variables.
