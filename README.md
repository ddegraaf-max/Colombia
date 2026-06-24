# HonorCare Working Docs v34

Node.js/Express + MongoDB, Railway (NIXPACKS, `npm start`, poort 8080).

## v34 — e-mail werkt nu ongeacht de variabelenaam + mooier contactformulier

### Resend: robuuste detectie
De app vond de sleutel niet omdat de variabelenaam in Railway nét anders was. Dat is nu
opgelost: de app **herkent de Resend-sleutel op zijn waarde** — elke omgevingsvariabele
waarvan de waarde met `re_` begint wordt als sleutel gebruikt, ongeacht hoe die variabele
heet. Ook een per ongeluk meegeplakt `NAAM=` ervoor wordt weggehaald. `MAIL_TO` wordt
herkend via een losse naam-match (MAILTO, Mail_To, met spatie, enz.).

### Diagnose in de logs
Bij het opstarten logt de app nu:
```
[env] RESEND/MAIL-variabelen die Railway doorgeeft: <namen>
[mail] Resend-sleutel gedetecteerd: JA ✓ (lengte 36) | MAIL_TO: ... | FROM: ...
```
- "JA ✓" → sleutel gevonden, e-mail kan verzonden worden.
- "NEE ✗" → er staat nergens een waarde die met `re_` begint → de waarde is leeg of niet
  opgeslagen (niet alleen de naam fout). Open dan /admin/mailtest voor details.

### Mooier contactformulier
Volledig nieuw ontwerp: één elegante "split card" — links een donkerblauw paneel met
contactgegevens en gouden icoon-accenten, rechts een rustig wit formulier met gouden focus
en een knop op volle breedte. Responsief (panelen stapelen op mobiel).

## Daarna nog (domeinverificatie)
Zodra de sleutel "JA ✓" is en e-mail naar externe mensen moet: verifieer
honorcareinternational.com in Resend (Domains → Add Domain → DNS). Anders levert Resend met
een onbekend domein alleen af op je eigen Resend-accountmail.

## Variabelen (Railway)
`MONGODB_URI`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `RESEND_API_KEY`,
`MAIL_TO`, `RESEND_FROM`, `ANTHROPIC_API_KEY` (+ `ANTHROPIC_MODEL`), `NODE_ENV=production`.
