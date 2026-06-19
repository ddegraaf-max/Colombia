# Honor Care Poland

Complete website + secure portal for Honor Care Poland.

## Railway variables

Set these in Railway:

```env
NODE_ENV=production
MONGODB_URI=${{MongoDB.MONGO_URL}}
SESSION_SECRET=use-a-long-random-secret
ADMIN_EMAIL=admin@honorcarepoland.eu
ADMIN_PASSWORD=your-strong-password
APP_NAME=Honor Care Poland
```

## Deploy

1. Upload all files to GitHub.
2. Connect GitHub repo to Railway.
3. Add MongoDB service.
4. Add `MONGODB_URI` as variable reference to MongoDB `MONGO_URL`.
5. Redeploy.

## URLs

- `/` website
- `/login` secure login
- `/dashboard` admin dashboard
- `/candidates` candidate management
- `/institutions` institution CRM
- `/subsidies` subsidy management
- `/documents` document vault
