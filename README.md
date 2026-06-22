# HonorCare Working Docs v25

Node.js/Express + MongoDB, deploybaar op Railway (NIXPACKS, `npm start`, poort 8080).

## Nieuw in v25 — volwaardig portaal + AI + databescherming

### Uitgebreid portaal (achter login + 2FA)
Compleet werkbaar systeem met een vaste navigatiebalk en per module: lijst, detail,
bewerken, verwijderen en statusbadges.
- **Kandidaten** — beroep, specialisatie, taalniveau Pools, statuspijplijn
  (Nieuw → Screening → Taalopleiding → Erkenning → Visum → Geplaatst).
- **Instellingen** — type, contact, behoefte, klantstatus.
- **Plaatsingen (matching)** — koppel kandidaat aan instelling met functie/startdatum/status.
- **Woningen** — zie hieronder.
- **Documenten** — volledige plandocumenten, met toevoegen/verwijderen.
- **Subsidies** — AMIF/FERS/ESF+ met status.
- **Dashboard** — telkaarten per module + kandidaten-pijplijn + sneltoegang.

### Woningen (regio Warschau)
Beheermodule met **8 voorbeeldwoningen** in Warschau-wijken (Mokotów, Wola, Ochota,
Ursynów, Praga-Południe/Północ, Białołęka, Wilanów), met richtprijzen op basis van
**actuele Otodom-marktdata** (mediaan ± 3.500 zł/mnd; 2-kamer 4.500–5.500). Elke woning
heeft een Otodom-link, en bovenaan staat een knop naar de live Otodom-zoekopdracht.
> Live aanbod automatisch overnemen uit Otodom is bewust **niet** ingebouwd: dat is in
> strijd met hun voorwaarden, wordt geblokkeerd door anti-bot, en zou snel verouderen.
> Je voegt echte advertenties toe via "Nieuw toevoegen" + de Otodom-link per woning.

### AI-assistent
Chat-assistent in het portaal die helpt met werving, planning, subsidies en het opstellen
van e-mails/teksten. Vereist een API-sleutel:
- `ANTHROPIC_API_KEY` (verplicht om de assistent te activeren)
- `ANTHROPIC_MODEL` (optioneel, standaard `claude-sonnet-4-6`)
Zonder sleutel toont de assistent een nette uitleg i.p.v. een foutmelding.

### Databescherming (geen data meer kwijt)
- **Back-up & herstel** in het portaal: download alle data als één JSON-bestand, en
  importeer later additief (bestaande records worden nooit overschreven of verwijderd).
- **Niet-destructieve seed**: bestaande documenten/woningen worden bij een nieuwe deploy
  nooit overschreven; voorbeelden worden alleen aangevuld als de collectie leeg is.
- **Belangrijk voor Railway**: gebruik een persistente database (bijv. MongoDB Atlas) en
  zet die connectiestring in `MONGODB_URI`. Dan blijft alle data behouden bij elke deploy.

## Variabelen (Railway → Variables)
`MONGODB_URI` (persistent!), `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
`ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` (optioneel), `NODE_ENV=production`.

## Behouden uit eerdere versies
Eerlijke waardepunten (geen nepcijfers), geen partnersectie, één e-mailadres
`info@honorcareinternational.com`, omgewisselde logokleuren, diverse-team hero-foto,
meertalige publieke site PL/EN/NL/ES.
