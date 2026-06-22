# HonorCare Working Docs v28

Node.js/Express + MongoDB, deploybaar op Railway (NIXPACKS, `npm start`, poort 8080).

## Nieuw in v28

### Eigen foto's verwerkt
Acht gelicentieerde Shutterstock-foto's zijn webgeoptimaliseerd (van ~100 MB naar < 1 MB
totaal) en op passende plekken geplaatst:
- **Hero**: divers zorgteam (corridor) · **Over ons**: teamhanden ·
- **Voor instellingen**: Szpital-gevel · **Academie**: hersen-MRI / OK ·
- **Kaarten**: verpleegkundige, MRI-scanner, OK · **Contact**: ziekenhuisgang.

### "Plan een gesprek" → echte agenda
- **Publieke planpagina** (`/plan`, meertalig): bezoekers kiezen datum + tijdslot en sturen
  een aanvraag — geen account nodig. De hero-knop "Plan een gesprek" leidt hierheen.
- **Gekoppeld aan account**: ingelogde gebruikers plannen vanuit "Mijn account"; hun
  afspraken zijn aan hun account gekoppeld en zichtbaar in hun overzicht.
- **Beheer-agenda** (`/agenda`): maandkalender met alle afspraken per dag + komende-lijst,
  plus volledig afsprakenbeheer (`/appointments`: bevestigen, bewerken, verwijderen).

### 2FA direct verplicht voor gebruikers
Na registratie wordt **tweestapsverificatie meteen afgedwongen**: een gebruiker komt pas in
"Mijn account" nadat 2FA is ingesteld (authenticator-app). Geldt ook voor bestaande accounts
zonder 2FA bij de eerstvolgende login. Beheerders houden hun eigen verplichte 2FA.

## Behouden
Gescheiden toegang (gebruikersportaal vooraan, beheer discreet in de footer), gehashte
wachtwoorden, inlogbegrenzing, volledig beheerportaal met modules, AI-assistent
(`ANTHROPIC_API_KEY`), back-up/herstel (incl. afspraken & gebruikers), Warschau-woningen,
meertalige site PL/EN/NL/ES, zandkleurige navigatie.

## Variabelen (Railway → Variables)
`MONGODB_URI` (persistent!), `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
`ANTHROPIC_API_KEY` (+ optioneel `ANTHROPIC_MODEL`), `NODE_ENV=production`.
