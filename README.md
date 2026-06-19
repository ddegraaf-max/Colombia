# Honor Care Poland Secure Portal

Beveiligde webomgeving voor documenten, websitebestanden en projectdossier van Honor Care Poland.

## Beveiliging
- Wachtwoord-login
- Authenticator/TOTP via Google Authenticator, Microsoft Authenticator, Authy of 1Password
- Sessies opgeslagen in MongoDB
- Documenten staan niet in de publieke map
- Downloads alleen na login + 2FA

## Lokaal starten
```bash
npm install
cp .env.example .env
npm start
```
Open http://localhost:3000

## Deploy via GitHub + Railway
1. Maak een nieuwe private GitHub repository.
2. Upload alle bestanden uit deze map.
3. Maak in Railway een nieuw project: Deploy from GitHub repo.
4. Voeg een MongoDB database toe via Railway of gebruik MongoDB Atlas.
5. Zet Variables:
   - NODE_ENV=production
   - SESSION_SECRET=een-lange-random-secret
   - ADMIN_EMAIL=jouw@email.nl
   - ADMIN_PASSWORD=een-sterk-wachtwoord
   - MONGODB_URI=de MongoDB connection string
   - APP_NAME=Honor Care Poland Secure Portal
6. Deploy.
7. Log voor de eerste keer in met ADMIN_EMAIL en ADMIN_PASSWORD.
8. Scan de QR-code met je Authenticator app.

## Belangrijk
Wijzig direct na eerste livegang het admin-wachtwoord in Railway Variables en redeploy.
Gebruik een private repository zolang documenten vertrouwelijk zijn.
