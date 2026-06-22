# HonorCare Working Docs v29

Node.js/Express + MongoDB, deploybaar op Railway (NIXPACKS, `npm start`, poort 8080).

## Nieuw in v29 — volledig mobiel geoptimaliseerd
Alle onderdelen (ook de nieuwe) zijn nagelopen voor telefoon/tablet:
- **Topbalk**: locatie klapt weg op smal scherm, e-mail breekt netjes af, alles gecentreerd.
- **Hero**: knoppen worden vol breed en goed aantikbaar; foto met leesbare overlay.
- **Dashboardtegels**: 4 → 3 → 2 → 1 kolom naar schermbreedte.
- **Portalnavigatie**: één horizontaal scrollbare balk i.p.v. een hoge wikkel.
- **Agenda-kalender**: op kleine schermen tonen dagen een gekleurde stip; de lijst
  "Komende afspraken" eronder geeft de details — zo blijft de maandweergave bruikbaar.
- **Tabellen** (kandidaten, afspraken, woningen): horizontaal scrollbaar met touch.
- **Formulieren & gebruikersomgeving**: één kolom, ruimere velden, compacte marges.
- **Pijplijn, kaarten, specs, footer**: stapelen netjes op smalle schermen.

## Eerder toegevoegd (behouden)
Eigen Shutterstock-foto's (webgeoptimaliseerd) op hero, banners en kaarten; "Plan een
gesprek" als echte agenda (publieke planpagina + accountkoppeling + beheer-maandkalender);
2FA direct verplicht na registratie; gescheiden gebruikers-/beheerderstoegang; gehashte
wachtwoorden + inlogbegrenzing; beheerportaal met modules; AI-assistent (`ANTHROPIC_API_KEY`);
back-up/herstel; Warschau-woningen; meertalige site PL/EN/NL/ES.

## Variabelen (Railway → Variables)
`MONGODB_URI` (persistent!), `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
`ANTHROPIC_API_KEY` (+ optioneel `ANTHROPIC_MODEL`), `NODE_ENV=production`.
