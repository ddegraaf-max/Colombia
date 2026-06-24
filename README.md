# HonorCare Working Docs v30

Node.js/Express + MongoDB, Railway (NIXPACKS, `npm start`, poort 8080).

## Nieuw in v30 — e-mail via Resend
- **Contactformulier** toegevoegd op /contact (meertalig). Inzendingen worden opgeslagen
  (module "Berichten" in het portaal) én gemaild.
- **E-mail via Resend** op drie plekken:
  - Contactformulier → melding naar Honor Care + bevestiging naar de afzender.
  - Gespreksaanvraag (publiek /plan én vanuit "Mijn account") → melding + bevestiging.
  - Nieuwsbrief-inschrijving → melding naar Honor Care.
- Meldingen hebben **reply-to = afzender**, zodat je direct kunt antwoorden.

## Variabelen voor e-mail (Railway → Variables)
- `RESEND_API_KEY` — **verplicht** (jouw Resend-sleutel).
- `MAIL_TO` — waar meldingen heen gaan (standaard `info@honorcareinternational.com`).
- `RESEND_FROM` — afzenderadres, bv. `Honor Care International <noreply@honorcareinternational.com>`.

> **Belangrijk over de afzender:** zolang je domein niet in Resend is geverifieerd, valt het
> systeem terug op `onboarding@resend.dev`. Daarmee levert Resend alleen af op het e-mailadres
> van je eigen Resend-account — dus interne meldingen werken meteen, maar bevestigingen naar
> externe mensen (kandidaten) komen pas aan nadat je **honorcareinternational.com in Resend
> verifieert** (Domains → Add Domain → DNS-records plaatsen) en `RESEND_FROM` op dat domein zet.
> Zonder API-sleutel verstuurt de site niets en blijft alles gewoon werken (alleen opslag).

## Behouden
Mobiel geoptimaliseerd; eigen foto's; agenda + 2FA-verplichting; gescheiden toegang;
beheerportaal met modules (incl. Berichten); AI-assistent; back-up/herstel; Warschau-woningen;
meertalige site PL/EN/NL/ES.

## Alle variabelen
`MONGODB_URI` (persistent!), `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
`RESEND_API_KEY`, `MAIL_TO`, `RESEND_FROM`, `ANTHROPIC_API_KEY` (+ `ANTHROPIC_MODEL`), `NODE_ENV=production`.
