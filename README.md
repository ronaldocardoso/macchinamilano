# Macchina Milano

Portal italiano di veicoli premium. Il progetto è attualmente nella **Fase 0:
audit e bootstrap**; catalogo, database, autenticazione e importazioni
appartengono alle fasi successive.

## Requisiti

- Node.js 24.18.0 LTS (Node.js 22 resta il fallback documentato)
- pnpm 11.9.0

Le versioni Node sono registrate in `.nvmrc`, `.node-version` e `package.json`.

## Avvio locale

```bash
cp .env.example .env.local
pnpm install --frozen-lockfile
pnpm dev
```

Aprire `http://localhost:3000`. Il controllo di salute è disponibile in
`http://localhost:3000/api/health`.

## Verifiche

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Per eseguire l'intera pipeline locale:

```bash
pnpm check
```

Per generare il baseline statico destinato al sito Hostinger esistente:

```bash
pnpm build:static
```

L'artefatto viene scritto in `out/`. La procedura, il backup e il futuro
passaggio alla Web App Node sono descritti in `docs/HOSTINGER-DEPLOY.md`.

## Configurazione

Le variabili usate nella Fase 0 sono validate in `lib/env.ts`. Le variabili
delle fasi future sono già documentate in `.env.example`, ma diventeranno
obbligatorie soltanto quando le relative funzionalità saranno implementate.

Non aggiungere mai file `.env` al controllo versione.

## Documentazione

- Piano master: `MacchinaMilano-Codex-Master-Plan.md`
- Deploy Hostinger: `docs/HOSTINGER-DEPLOY.md`
- Decisioni tecniche: `docs/ARCHITECTURE_DECISIONS.md`
