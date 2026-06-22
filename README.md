# HonorCare Working Docs v24

Node.js/Express + MongoDB, deploybaar op Railway (NIXPACKS, `npm start`).

## Nieuw in v24
- **Logo & favicon:** de kleuren van de twee figuren in het hart zijn omgewisseld —
  de volwassene is nu goud (op de blauwe harthelft) en het kind navy (op de gouden helft),
  zodat ze contrasteren en beter opvallen.
- **Hero-foto:** vervangen door een vrij te gebruiken foto van een divers medisch team
  dat naar de camera kijkt (National Cancer Institute, Unsplash). De lichtoverlay is
  iets verlaagd zodat de foto niet meer verbleekt.

> De mooiste naar-voren-kijkende teamportretten op Unsplash bleken Unsplash+ (betaald);
> binnen de gratis foto's is dit de beste teamfoto. Heb je een eigen (Colombiaanse) teamfoto?
> Zet 'm in `public/images/` en pas `.hero{background:url('...')}` in `public/css/style.css`
> aan — of stuur 'm, dan zet ik 'm erin.

## Behouden
Eerlijke waardepunten (geen nepcijfers), geen partnersectie, één e-mailadres
`info@honorcareinternational.com`, volledige plandocumenten in het portaal, foto's op
elke subpagina, meertaligheid PL/EN/NL/ES, Playfair/Poppins, nieuwsbrief, 2FA, security headers.

## Variabelen (Railway)
`MONGODB_URI`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NODE_ENV=production`.
