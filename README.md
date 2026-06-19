# Honor Care Poland - Multilingual website + secure portal

Deze versie bevat taalkeuze voor Pools, Nederlands en Spaans.

## Standaardtaal
De standaardtaal is Pools (`pl`). Bezoekers kunnen wisselen met de knoppen PL / NL / ES rechtsboven. De keuze wordt opgeslagen in de sessie.

## Railway variables
Gebruik minimaal:

```env
APP_NAME=Honor Care Poland
NODE_ENV=production
MONGODB_URI=${{MongoDB.MONGO_URL}}
SESSION_SECRET=een-lange-veilige-code
ADMIN_EMAIL=admin@honorcarepoland.eu
ADMIN_PASSWORD=een-sterk-wachtwoord
```

## Deploy
Upload alle bestanden naar GitHub en redeploy via Railway.
