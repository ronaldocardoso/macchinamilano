# Deploy su Hostinger

Il dominio è già configurato nella Hostinger come sito PHP/HTML. La Fase 0 usa
un export statico di Next.js sullo stesso `public_html`; la futura applicazione
dinamica passerà alla Web App Node.js gestita prima di pubblicare database,
autenticazione, pannello o catalogo dinamico.

## Baseline statico in produzione

| Campo             | Valore                                     |
| ----------------- | ------------------------------------------ |
| Sorgente canonica | `github.com/ronaldocardoso/macchinamilano` |
| Build             | `pnpm build:static`                        |
| Artefatto         | `out/`                                     |
| Destinazione      | `domains/macchinamilano.com/public_html/`  |
| Trasporto         | SSH, porta 65002                           |
| URL canonico      | `https://macchinamilano.com`               |
| Health check      | `https://macchinamilano.com/api/health`    |
| Rollback iniziale | `deploy-backups/20260723-before-codex/`    |

Prima di ogni sincronizzazione, creare un backup fuori da `public_html`. Non
caricare `.git`, `.env`, `node_modules`, log o backup nella directory pubblica.
Il redirect HTTPS e `www` è definito in `public/.htaccess`.

## Futura Web App Node.js

| Campo            | Valore                           |
| ---------------- | -------------------------------- |
| Runtime primario | Node.js 24.x                     |
| Package manager  | pnpm                             |
| Installazione    | `pnpm install --frozen-lockfile` |
| Build dinamica   | `pnpm build`                     |
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

## Variabili dell'applicazione dinamica

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

## Controlli prima della migrazione a Node

1. Confermare nell'hPanel che Node.js 24.x sia selezionabile.
2. Confermare il comando di installazione personalizzato e il supporto a pnpm.
3. Confermare come la piattaforma fornisce `PORT`.
4. Eseguire `pnpm check` con Node.js 24.
5. Configurare le variabili in produzione.
6. Verificare `GET /api/health` dopo l'avvio.

## Verifiche del baseline concluse il 23 luglio 2026

- home pubblica con HTTP 200;
- certificato HTTPS attivo;
- `/api/health` con HTTP 200 e `application/json`;
- redirect HTTP 301 da `www` al dominio canonico;
- header di sicurezza di base;
- visualizzazione desktop verificata;
- backup della pagina Hostinger sostituita.

## Controlli rimandati alle fasi successive

- motore e versione del database;
- accesso a dump logici e cron job;
- persistenza del filesystem dell'applicazione;
- limite reale di durata e payload delle richieste;
- invio SMTP;
- migração futura do canonical e redirects após a ativação do domínio `.it`;
- restore completo del baseline e rollback della futura Web App Node.

Questi punti devono essere confermati nell'hPanel prima della Fase 2 o della
funzionalità che ne dipende.
