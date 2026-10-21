# HonorCare Working Docs v37

Node.js/Express + MongoDB, Railway (NIXPACKS, `npm start`, poort 8080).

## v37 — juridisch veilig model + Colombia-focus
De site positioneert zich nu als **werving + voorbereiding**, niet als arbeidsbemiddelaar:
- **Herotekst (alle talen) herschreven**: van "wij verbinden specialisten met instellingen"
  (= plaatsing) naar "wij begeleiden Colombiaanse zorgprofessionals; de officiële plaatsing
  verloopt via ons gelicentieerde Poolse partnerbureau".
- **Nieuwe sectie "Hoe het werkt / Cómo funciona"** (3 stappen): 1) Honor Care = werving &
  voorbereiding (taal B1, diploma-erkenning, examen, relocatie), 2) gelicentieerde KRAZ-partner
  = officiële plaatsing, contract & vergunningen, 3) kosteloos voor de kandidaat. Met de
  expliciete noot dat Honor Care niet zelf bemiddelt.
- **Juridische voettekst op elke pagina**: Honor Care doet werving/voorbereiding/begeleiding;
  de officiële plaatsing in Polen gebeurt door de gelicentieerde KRAZ-partner; kosteloos voor
  kandidaten.
- **Geen vacatures/matching** op de publieke site — die gereguleerde handeling hoort bij de
  partner.

## In te stellen
- `PARTNER_KRAZ` — het KRAZ-nummer van je gelicentieerde Poolse partnerbureau (verschijnt in de
  voettekst). Zonder env staat er een placeholder "XXXXX".

## Belangrijk
Dit is een opzet die past bij het besproken sourcing-/voorbereidingsmodel — geen juridische
garantie. Laat de constructie + het samenwerkingscontract met het gelicentieerde bureau
bevestigen door een Poolse advocaat. Vraag candidaten nooit kosten (behalve wettelijk
toegestane werkelijke kosten bij plaatsing in het buitenland).

## Bouwpagina (sinds v64)
De site staat standaard **in opbouw**: bezoekers zien op elk openbaar pad één pagina met een korte
mededeling en de contactgegevens (statuscode 503). `/login`, het beheerportaal en `/healthz` blijven
bereikbaar; een ingelogde beheerder ziet de volledige site.

- Site weer openzetten zonder nieuwe code: zet in Railway `UNDER_CONSTRUCTION=false` (let op: geen
  spatie achter de variabelenaam) en herstart de service.
- Variabele weghalen of op iets anders dan `false` zetten = bouwpagina weer aan.
- Teksten staan in `under-construction.js`, opmaak onder `/* Bouwpagina */` in `public/css/style.css`.

## Variabelen (Railway)
`MONGODB_URI`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `PARTNER_KRAZ`,
`RESEND_API_KEY`, `MAIL_TO`, `RESEND_FROM`, `ANTHROPIC_API_KEY` (+ `ANTHROPIC_MODEL`), `NODE_ENV=production`,
`UNDER_CONSTRUCTION` (standaard aan; `false` opent de site).
