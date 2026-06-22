# HonorCare Working Docs v18

Node.js/Express + MongoDB, deploybaar op Railway (NIXPACKS, `npm start`).

## Nieuw in v18 — volledige redesign van de voorkant
- **Nieuw logo + favicon** (twee-kleurig hart met volwassene + kind), als SVG.
- **Lettertypes**: Playfair Display (koppen) + Poppins (tekst) via Google Fonts.
- **Hero** met full-width foto + lichte overlay, opsommingen en goud "Z miłości do ludzi"-badge.
- **Specjalizacje medyczne**: balk met 10 specialisaties en goud-lijn iconen.
- **4 kaarten** (Profesjonaliści / Instytucje / Akademia / Mieszkania) met foto, lijst en knop.
- **"Dlaczego Polska?"** sectie met 4 statistieken (1000+, 200+, 10+, 2).
- **Partners** (NFZ, PZWL, NIPiP, PARPA, OZZL, Medicover) als nette tekstbadges.
- **Uitgebreide footer**: 5 kolommen, social, contact NL + Kolumbia, en een **werkende nieuwsbrief** (slaat e-mails op in de `Newsletter`-collectie).

## Behouden uit v17
Security headers (CSP incl. Google Fonts), toegankelijkheid (alt, labels, skip-link, focus),
mobiel hamburgermenu, juiste `lang` per pagina, `/healthz`, 404-pagina, 2FA-fix,
mass-assignment-fix, en `/test-documents` dat standaard UIT staat in productie.

## Eigen assets / foto's vervangen
- **Logo/favicon**: heb je de officiële bestanden? Zet ze als `public/images/logo.svg` en
  `public/images/favicon.svg` (of pas de `<img src>` in de header aan); de rest werkt direct.
- **Hero-foto**: nu een betrouwbare medische foto. Voor de teamfoto uit de mockup:
  pas de URL aan bij `.hero{background:url('...')}` in `public/css/style.css`.
- **Partnerlogo's**: nu tekstbadges (de echte org-logo's zijn auteursrechtelijk beschermd);
  vervang door officiële logo's als je daar licentie/toestemming voor hebt.

## Let op
- Telefoonnummers zijn placeholders — vervang door echte nummers.
- Stel `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` in via Railway Variables.
