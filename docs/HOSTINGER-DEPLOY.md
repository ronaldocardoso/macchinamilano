# Deploy su Hostinger

Questo documento prepara il deploy dell'applicazione Node.js gestita dalla
Hostinger. Nella Fase 0 il processo viene documentato e verificato localmente;
il rilascio effettivo resta previsto per la Fase 8.

## Impostazioni dell'applicazione

| Campo            | Valore                           |
| ---------------- | -------------------------------- |
| Runtime primario | Node.js 24.x                     |
| Package manager  | pnpm                             |
| Installazione    | `pnpm install --frozen-lockfile` |
| Build Fase 0     | `pnpm build`                     |
| Avvio            | `pnpm start`                     |
| Health check     | `/api/health`                    |

Quando Prisma verrà aggiunto nella Fase 2, generare il client prima della build:

```bash
pnpm prisma generate && pnpm build
```

Eseguire `pnpm prisma migrate deploy` una sola volta in una fase di release
controllata, prima dell'avvio della nuova versione. Non inserire le migrations
in build parallele. La procedura esatta deve essere testata nell'hPanel prima del
primo rilascio con database.

## Variabili della Fase 0

Configurare nell'hPanel:

```dotenv
NODE_ENV="production"
APP_NAME="Macchina Milano"
APP_URL="https://macchinamilano.com"
APP_LOCALE="it-IT"
APP_TIMEZONE="Europe/Rome"
APP_VERSION="0.1.0"
LOG_LEVEL="info"
```

Non caricare `.env`, segreti, `node_modules`, log o backup nel repository.

## Controlli prima del deploy

1. Confermare nell'hPanel che Node.js 24.x sia selezionabile.
2. Confermare il comando di installazione personalizzato e il supporto a pnpm.
3. Confermare come la piattaforma fornisce `PORT`.
4. Eseguire `pnpm check` con Node.js 24.
5. Configurare le variabili in produzione.
6. Verificare `GET /api/health` dopo l'avvio.

## Controlli rimandati alle fasi successive

- motore e versione del database;
- accesso a dump logici e cron job;
- persistenza del filesystem dell'applicazione;
- limite reale di durata e payload delle richieste;
- invio SMTP;
- redirect permanente da `www` al dominio canonico;
- migração futura do canonical e redirects após a ativação do domínio `.it`;
- strategia di rollback e restore.

Questi punti devono essere confermati nell'hPanel prima della Fase 2 o della
funzionalità che ne dipende.
