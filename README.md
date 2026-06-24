# HonorCare Working Docs v31

Node.js/Express + MongoDB, Railway (NIXPACKS, `npm start`, poort 8080).

## Nieuw in v31 — e-mail diagnose
- **/admin/mailtest** (alleen na beheerderslogin, ook via Back-up → "E-mailtest uitvoeren"):
  stuurt een testbericht naar `MAIL_TO` en toont de **exacte Resend-respons** — succes met
  Resend-id, of de precieze fout (bijv. "domain is not verified").

## E-mail komt niet aan? Checklist
1. Open **/admin/mailtest** en lees de melding.
2. Staat er "domain is not verified": het afzenderdomein in `RESEND_FROM`
   (honorcareinternational.com) is nog niet geverifieerd in Resend. Resend weigert dan de
   verzending. → Resend → **Domains → Add Domain** → DNS-records (SPF/DKIM) plaatsen bij je
   registrar → wachten op "Verified".
3. Alleen even testen zonder domeinverificatie: zet tijdelijk
   `RESEND_FROM=onboarding@resend.dev` én `MAIL_TO` = het e-mailadres van je **eigen
   Resend-account**. In testmodus levert Resend namelijk uitsluitend op dat adres.
4. Controleer ook Resend → **Logs/Emails** voor de afleverstatus.

## E-mailfuncties (sinds v30)
Contactformulier, gespreksaanvragen (publiek + account) en nieuwsbrief → melding naar
Honor Care + bevestiging naar de afzender. Reply-to = afzender.

## Variabelen (Railway → Variables)
`MONGODB_URI` (persistent!), `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
`RESEND_API_KEY`, `MAIL_TO`, `RESEND_FROM`, `ANTHROPIC_API_KEY` (+ `ANTHROPIC_MODEL`), `NODE_ENV=production`.
