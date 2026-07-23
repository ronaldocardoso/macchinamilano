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

## ADR-006 — Deploy non eseguito nella Fase 0

**Stato:** approvata

La Fase 0 prepara e documenta il deploy Hostinger, ma non modifica DNS, dominio,
hPanel o ambiente di produzione. Il deploy effettivo appartiene alla Fase 8.

## ADR-007 — Marca `.it` e migração futura do domínio

**Stato:** approvata, rollout pendente

A marca oficial com extensão `.it` será preservada sem alterações. Enquanto o
domínio `.it` não estiver adquirido, com DNS e HTTPS ativos,
`https://macchinamilano.com` continuará sendo o endereço canônico de produção.
Depois da virada aprovada, o `.it` assumirá como canonical e os domínios `.com`
deverão redirecionar para ele, preservando caminho e query string.
