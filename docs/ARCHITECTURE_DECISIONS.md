# Decisioni architetturali — Fase 0

## ADR-001 — Applicazione singola Next.js

**Stato:** approvata

Il progetto parte come singola applicazione Next.js con App Router. Non viene
creato un monorepo e non vengono introdotti servizi separati nella Fase 0.

## ADR-002 — Runtime primario Node.js 24

**Stato:** approvata

La versione primaria è Node.js 24.18.0 LTS. Node.js 22 rimane un fallback
operativo, ma qualsiasi cambio richiederà una build completa e la verifica di
tutte le dipendenze.

## ADR-003 — Tailwind CSS 4

**Stato:** approvata

Tailwind CSS 4 viene configurato tramite il plugin PostCSS ufficiale. I token
iniziali del brand sono esposti come proprietà CSS, pronti per la Fase 1.

## ADR-004 — Validazione progressiva dell'ambiente

**Stato:** approvata

La Fase 0 valida soltanto le variabili che usa. Le chiavi previste dalle fasi
future sono documentate in `.env.example`, ma non bloccano build o avvio prima
dell'implementazione delle relative funzionalità.

## ADR-005 — Health check veritiero

**Stato:** approvata

Fino alla configurazione del database, `/api/health` restituisce
`database: "not_configured"`. Dalla Fase 2 il controllo dovrà eseguire una query
leggera con timeout e restituire uno stato degradato in caso di errore.

## ADR-006 — Deploy inizialmente rimandato

**Stato:** superata da ADR-008

La Fase 0 prepara e documenta il deploy Hostinger, ma non modifica DNS, dominio,
hPanel o ambiente di produzione. Il deploy effettivo appartiene alla Fase 8.

## ADR-007 — Marca `.it` e migração futura do domínio

**Stato:** approvata, rollout pendente

A marca oficial com extensão `.it` será preservada sem alterações. Enquanto o
domínio `.it` não estiver adquirido, com DNS e HTTPS ativos,
`https://macchinamilano.com` continuará sendo o endereço canônico de produção.
Depois da virada aprovada, o `.it` assumirá como canonical e os domínios `.com`
deverão redirecionar para ele, preservando caminho e query string.

## ADR-008 — Baseline statico sul sito Hostinger esistente

**Stato:** approvata e applicata

Il dominio era già provisionato come sito PHP/HTML con SSL e CDN. La pagina
pubblica della Fase 0 viene quindi esportata con `pnpm build:static` e
sincronizzata via SSH nello stesso `public_html`, dopo un backup recuperabile.
GitHub resta la sorgente canonica. Prima di pubblicare funzionalità dinamiche,
il dominio verrà migrato alla Web App Node.js gestita dalla Hostinger.

## ADR-009 — Prototipo pubblico statico con dati dimostrativi

**Stato:** approvata e applicata

La fondazione visuale viene validata attraverso home, catalogo e dettaglio
statici. I dodici veicoli, i concessionari e le relative specifiche sono
interamente fittizi. Questo consente di verificare gerarchia, responsive design
e navigazione senza anticipare database, autenticazione o importazione.

## ADR-010 — Illustrazioni veicolo native

**Stato:** temporanea

Fino alla conferma delle fonti autorizzate e della strategia di storage, le
schede usano illustrazioni SVG originali generate dall'applicazione. Non vengono
copiate fotografie degli annunci di riferimento. Le illustrazioni saranno
sostituite dall'integrazione media della Fase 3.

## ADR-011 — Rotte italiane del prototipo

**Stato:** approvata per il prototipo

Le rotte statiche iniziali sono `/veicoli` e `/veicoli/[slug]`. Prima
dell'introduzione del catalogo dinamico, la Fase 3 dovrà confermare se mantenere
questo schema o migrare alle rotte `/auto` e `/veicolo/[slug]` previste dal
piano originale, includendo redirect permanenti per evitare URL duplicati.

## ADR-012 — Hero fotografico compatto

**Stato:** approvata e applicata

La home usa l'immagine fornita `bg-macchina-milano` come sfondo del hero. Il
PNG originale rimane la fonte di design, mentre il sito serve una derivata WebP
ottimizzata. Il hero desktop è limitato a circa 480 px e il pannello di ricerca
si sovrappone al bordo inferiore, avvicinando veicoli, messaggio e ricerca nella
prima schermata.
