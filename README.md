# HonorCare Working Docs v20

Node.js/Express + MongoDB, deploybaar op Railway (NIXPACKS, `npm start`).

## Nieuw in v20 — mooie, vrij te gebruiken foto's door de hele site
Alle beelden komen van **Unsplash** (Unsplash-licentie: gratis voor commercieel
gebruik, geen naamsvermelding vereist).
- **Hero**: echte foto van een medisch team (i.p.v. de generieke close-up).
- **"Dlaczego Polska?"**: skyline van Warschau bij avond.
- **Elke subpagina** (O nas, Dla instytucji, Dla profesjonalistów, Akademia,
  Mieszkania, Polska, Kontakt) heeft nu een eigen **fotobanner** met passend beeld
  en de paginatitel eroverheen — zo is de hele site beeldrijk en samenhangend.
- De vier homepage-kaarten houden hun passende foto's (arts, instelling, opleiding, woning).

### Foto's wisselen
Alle foto-URL's staan in `public/css/style.css`:
- Hero: `.hero { background: url('...') }`
- Skyline: `.why-card { background: url('...') }`
- Subpagina-banners: de klassen `.ph-about`, `.ph-institutions`, `.ph-candidates`,
  `.ph-academy`, `.ph-housing`, `.ph-poland`, `.ph-contact`
- Kaarten: `.img1` t/m `.img4`
Vervang de Unsplash-URL door een andere `https://images.unsplash.com/...`-URL
(of je eigen foto in `public/images/`) om een beeld te wisselen.

## Behouden
Meertaligheid PL/EN/NL/ES met taalkiezer (`i18n.js`), nieuw logo + favicon (SVG),
Playfair Display + Poppins, specialisatiebalk, statistieksectie, partners,
uitgebreide footer met werkende nieuwsbrief, security headers (CSP staat
`images.unsplash.com` + Google Fonts toe), toegankelijkheid, mobiel menu,
`/healthz`, 404, 2FA-fix. Admin-portaal blijft Nederlands.

## Variabelen (Railway)
`MONGODB_URI`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NODE_ENV=production`.
