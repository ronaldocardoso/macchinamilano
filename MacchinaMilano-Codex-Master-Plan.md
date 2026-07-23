# Macchina Milano — Master Plan para Implementação no Codex

**Projeto:** Macchina Milano  
**Domínio principal atual:** `https://macchinamilano.com`  
**Domínio atual com WWW:** `https://www.macchinamilano.com`  
**Domínio futuro aprovado:** `https://macchinamilano.it`  
**Status do domínio `.it`:** aquisição e configuração pendentes  
**IP atual:** `89.117.169.239`  
**Provedor:** Hostinger  
**Servidor:** `server989`  
**Região do servidor:** Europa — França  
**Região dos backups Hostinger:** Lituânia  
**Plano:** Hospedagem Hostinger com suporte a aplicações Node.js  
**Recursos informados:** 2 CPUs, 3.072 MB de RAM, 50 GB de disco e tráfego ilimitado  
**Idioma público:** Italiano (`it-IT`)  
**Versão do documento:** 1.3
**Data de referência:** 23 de julho de 2026  
**Status de execução:** Fase 0 concluída, validada e publicada em produção

---

## 1. Objetivo deste documento

Este arquivo é a especificação mestre para iniciar o desenvolvimento do **Macchina Milano** no Codex.

Este documento, salvo na raiz do repositório como:

```text
MacchinaMilano-Codex-Master-Plan.md
```

é a fonte canônica do plano. Não criar uma segunda cópia com outro nome, para
evitar divergência. O Codex deve ler o arquivo integralmente antes de gerar a
arquitetura ou escrever código.

A aplicação será um portal italiano de veículos premium, especializado inicialmente em anúncios com valor igual ou superior a **€100.000**.

O catálogo inicial estimado é:

```text
Aproximadamente 1.000 veículos
Aproximadamente 700 concessionárias
Mercado principal: Itália
Idioma: italiano
Moeda: euro
```

---

# 2. Instrução principal ao Codex

Você está construindo uma aplicação comercial real chamada **Macchina Milano**.

O produto será inspirado funcionalmente em portais automotivos como o Carro Alphaville e em marketplaces de automóveis, mas todo o código, interface, arquitetura, componentes e identidade visual devem ser implementados do zero.

Não copiar:

- código de temas WordPress;
- componentes proprietários;
- HTML ou CSS de outros portais;
- identidade visual de terceiros;
- imagens sem autorização;
- conteúdo protegido;
- descrições integrais de anúncios sem permissão.

A solução deve priorizar:

- experiência premium;
- velocidade;
- SEO;
- interface responsiva;
- simplicidade operacional;
- importação automatizada;
- segurança;
- facilidade de manutenção;
- compatibilidade com a hospedagem Hostinger informada.

---

# 3. Infraestrutura confirmada

## 3.1 Informações do ambiente

```text
URL canônica atual:
https://macchinamilano.com

URL atual com WWW:
https://www.macchinamilano.com

URL canônica futura, após aquisição, DNS e HTTPS:
https://macchinamilano.it

IP:
89.117.169.239

Servidor:
server989

Localização:
Europa — França

Backups:
Lituânia

Disco:
50 GB

RAM:
3.072 MB

CPU:
2 núcleos

Inodes:
600.000

Máximo de processos:
120

Largura de banda:
Ilimitada

Diretório público:
public_html

Node.js suportado:
24.x
22.x
20.x
18.x

Package managers:
npm
yarn
pnpm
```

Frameworks relevantes oficialmente suportados pelo plano:

```text
Next.js
React
Express
Fastify
NestJS
Hono
Astro
Nuxt
SvelteKit
```

## 3.2 Perfil real da hospedagem

Este ambiente deve ser tratado como uma **hospedagem de aplicações Node.js gerenciada pela Hostinger**, e não como um VPS tradicional.

Portanto, o Codex não deve assumir automaticamente:

- acesso root;
- Docker;
- Docker Compose;
- instalação de pacotes do sistema;
- PostgreSQL local;
- Redis local;
- processos daemon livres;
- portas arbitrárias;
- systemd;
- Nginx customizado;
- execução permanente de workers;
- hospedagem do n8n no mesmo servidor.

A implementação deve funcionar sem depender dessas capacidades.

---

# 4. Decisões técnicas aprovadas

## 4.1 Aplicação principal

Usar:

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Prisma ORM
Banco SQL
pnpm
```

## 4.2 Node.js

Usar:

```text
Node.js 24.18.0 LTS
```

Registrar a versão exata em `.nvmrc` e `.node-version`. Em `package.json`,
aceitar a linha 24.x e manter a linha 22.x como fallback operacional.

Usar Node.js 22.x somente se a Hostinger não disponibilizar Node.js 24.x ou se
um pacote crítico apresentar incompatibilidade comprovada. Nesse caso, executar
novamente toda a pipeline de validação antes do deploy.

Fallback:

```text
Node.js 22.x
```

Registrar a versão utilizada em:

```text
.nvmrc
.node-version
package.json
```

## 4.3 Banco de dados

O Codex deve começar validando no hPanel quais bancos estão disponíveis.

Ordem de preferência:

```text
1. PostgreSQL gerenciado disponível na conta
2. MySQL/MariaDB fornecido pela Hostinger
3. PostgreSQL externo gerenciado
```

Como o plano informado não confirma PostgreSQL, a implementação inicial deve ser preparada para **MySQL/MariaDB**, que é suficiente para o catálogo previsto.

Usar Prisma para manter o domínio desacoplado.

Default inicial sugerido:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Não usar SQLite em produção.

## 4.4 Redis e BullMQ

Não usar Redis ou BullMQ na primeira versão, porque o ambiente não confirma suporte a processos persistentes ou Redis local.

Substituir por:

- tabela de jobs no banco;
- processamento por lotes;
- cron jobs da Hostinger;
- endpoints internos assinados;
- locks no banco;
- retries controlados;
- status persistido.

A arquitetura deve permitir migrar futuramente para Redis e BullMQ sem reescrever o domínio.

## 4.5 n8n

Não instalar n8n neste plano sem confirmar suporte explícito.

No MVP:

- criar webhooks compatíveis com n8n;
- documentar workflows;
- usar cron jobs Hostinger para agendamento;
- usar e-mail e webhooks internos para notificações.

Em uma etapa posterior, o n8n poderá rodar:

- em um VPS Hostinger separado;
- no n8n Cloud;
- em outro ambiente compatível.

O portal não pode depender do n8n para funcionar.

## 4.6 Scraper

O scraper não deve executar dentro da aplicação web principal.

O scraper deve funcionar como um sistema externo que entrega arquivos ou lotes ao portal.

Formatos aceitos:

```text
JSON
CSV
XML
Webhook
API autorizada
Feed de concessionária
```

A aplicação será responsável por:

- validar;
- normalizar;
- deduplicar;
- cadastrar concessionárias;
- cadastrar veículos;
- atualizar preços;
- atualizar status;
- produzir relatórios de importação.

---

# 5. Limites operacionais do plano

Com 3 GB de RAM e 2 CPUs, evitar:

- processamento simultâneo de centenas de imagens;
- scraping com navegador headless;
- Playwright ou Chromium em produção;
- múltiplos workers permanentes;
- renderização pesada;
- geração de vídeo;
- processamento massivo em uma única request;
- importação de 1.000 veículos em uma única transação;
- armazenamento de imagens originais enormes;
- rebuild completo em cada alteração de anúncio.

## 5.1 Estratégia adequada

Usar lotes pequenos:

```text
25 a 100 veículos por job
1 job ativo por vez
2 jobs simultâneos no máximo, após teste
```

Limites iniciais recomendados:

```text
IMPORT_BATCH_SIZE=50
MEDIA_BATCH_SIZE=10
MAX_IMPORT_CONCURRENCY=1
MAX_MEDIA_CONCURRENCY=2
```

---

# 6. Arquitetura do MVP

```text
External authorized scraper/feed
              │
              ▼
     Signed ingestion endpoint
              │
              ▼
        Next.js application
              │
       ┌──────┴───────┐
       ▼              ▼
 SQL Database      File/Object Storage
       │
       ▼
 Database Job Queue
       │
       ▼
 Hostinger Cron Jobs
```

## 6.1 Responsabilidades da aplicação Next.js

A aplicação será responsável por:

- site público;
- painel administrativo;
- área da concessionária;
- autenticação;
- API;
- importação por lotes;
- processamento de jobs;
- páginas SEO;
- busca;
- captação de leads;
- notificações;
- relatórios.

## 6.2 Processamento assíncrono

Usar uma fila persistida no banco.

Tabela sugerida:

```text
Job
├── id
├── type
├── status
├── payloadJson
├── priority
├── attempts
├── maxAttempts
├── scheduledAt
├── lockedAt
├── lockedBy
├── completedAt
├── failedAt
├── errorMessage
├── createdAt
└── updatedAt
```

Estados:

```text
PENDING
PROCESSING
COMPLETED
FAILED
CANCELLED
```

Um cron job chamará:

```text
POST /api/internal/jobs/process
```

O endpoint deve:

1. validar assinatura;
2. adquirir lock;
3. selecionar um pequeno lote;
4. processar dentro do tempo limite;
5. persistir o resultado;
6. liberar o lock;
7. retornar métricas.

---

# 7. Estrutura do repositório

Usar um único projeto Next.js inicialmente.

```text
macchina-milano/
├── app/
│   ├── (public)/
│   ├── admin/
│   ├── dealer/
│   ├── api/
│   ├── layout.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   └── robots.ts
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── vehicle/
│   ├── dealer/
│   ├── forms/
│   ├── search/
│   └── admin/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── vehicles/
│   ├── dealers/
│   ├── imports/
│   ├── jobs/
│   ├── leads/
│   ├── media/
│   ├── search/
│   ├── editorial/
│   ├── settings/
│   └── audit/
│
├── lib/
│   ├── auth/
│   ├── database/
│   ├── logger/
│   ├── security/
│   ├── validation/
│   ├── formatting/
│   └── integrations/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── messages/
│   └── it.json
│
├── public/
│   ├── brand/
│   ├── images/
│   └── placeholders/
│
├── scripts/
├── docs/
├── tests/
├── .env.example
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

Não criar monorepo na primeira fase.

---

# 8. Stack detalhada

## 8.1 Front-end

```text
Next.js App Router
React
TypeScript strict
Tailwind CSS
shadcn/ui
Radix UI
Lucide Icons
React Hook Form
Zod
next-intl
```

## 8.2 Back-end

```text
Next.js Route Handlers
Server Actions onde apropriado
Prisma ORM
SQL
Zod
Pino
Auth.js
```

## 8.3 Testes

```text
Vitest
Testing Library
Playwright
```

## 8.4 Qualidade

```text
ESLint
Prettier
Husky
lint-staged
TypeScript strict
```

## 8.5 Não adicionar no início

```text
Redux
GraphQL
NestJS separado
Redis
BullMQ
Kafka
Elasticsearch
Kubernetes
Docker obrigatório
microservices
```

---

# 9. Idiomas e convenções

## 9.1 Idioma da interface

Toda a interface pública deve ser em italiano.

Exemplos:

```text
Veicoli
Concessionari
Auto in evidenza
Cerca la tua prossima auto
Contatta il concessionario
Salva nei preferiti
Richiedi informazioni
```

## 9.2 Idioma técnico

Usar inglês em:

- código;
- tabelas;
- campos;
- services;
- repositories;
- logs;
- testes;
- commits.

## 9.3 Formatação italiana

```text
Preço: 125.000 €
Data: 23 luglio 2026
Quilometragem: 12.500 km
Potência: 456 CV
```

Timezone:

```text
Europe/Rome
```

Locale:

```text
it-IT
```

Moeda:

```text
EUR
```

---

# 10. Domínio e URLs

## 10.1 Domínio canônico

Usar em produção enquanto o domínio `.it` não estiver ativo:

```text
https://macchinamilano.com
```

Redirecionar:

```text
https://www.macchinamilano.com/*
```

para:

```text
https://macchinamilano.com/*
```

Preservar path e query string.

Após confirmar que `macchinamilano.it` está registrado, com DNS e HTTPS
funcionando, alterar o canonical para `.it` e redirecionar todas as variantes
`.com` e `www` para:

```text
https://macchinamilano.it/*
```

## 10.2 DNS informado

Nameservers:

```text
atlas.dns-parking.com
hyperion.dns-parking.com
```

IP:

```text
89.117.169.239
```

## 10.3 Variáveis

```dotenv
NEXT_PUBLIC_APP_URL="https://macchinamilano.com"
AUTH_URL="https://macchinamilano.com"
```

---

# 11. Branding

Arquivo original disponível:

```text
MacchinaMilano-Logo.ai
```

O logo precisa ser convertido para formatos web:

```text
SVG
PNG
WebP
ICO
```

Estrutura:

```text
public/brand/
├── logo-horizontal.svg
├── logo-horizontal-white.svg
├── logo-symbol.svg
├── logo-wordmark.svg
├── favicon.svg
├── favicon.ico
├── apple-touch-icon.png
└── og-default.jpg
```

Não carregar `.ai` no navegador.

## 11.1 Extensão oficial da marca

O logo oficial contém `.it` e deverá ser preservado sem alterações. Não criar
uma versão `.com` da marca. Enquanto o domínio `.it` não estiver adquirido e
configurado, a aplicação será publicada em `macchinamilano.com` usando o lockup
oficial `.it`. A extensão da marca representa a direção futura já aprovada.

---

# 12. Visão de produto

## 12.1 Posicionamento

Sugestão:

> **Macchina Milano — Auto esclusive da tutta Italia**

Alternativa:

> **Il marketplace italiano delle auto oltre €100.000**

## 12.2 Categorias

```text
Supercar
Auto sportive
Luxury SUV
Gran Turismo
Auto da collezione
Edizioni limitate
Cabriolet
Elettriche premium
```

## 12.3 Marcas prioritárias

```text
Ferrari
Porsche
Lamborghini
Maserati
Bentley
Rolls-Royce
Aston Martin
McLaren
Mercedes-AMG
BMW M
Audi Sport
Land Rover
```

---

# 13. Modelagem de dados

## 13.1 Entidades

```text
User
Account
Session
Dealer
DealerLocation
DealerContact
Vehicle
VehicleSource
VehicleMedia
VehicleFeature
Brand
VehicleModel
Lead
LeadEvent
Favorite
SavedSearch
ImportRun
ImportItem
ImportError
Job
FeaturedPlacement
EditorialCollection
Article
SiteSetting
AuditLog
```

## 13.2 UserRole

```text
SUPER_ADMIN
ADMIN
EDITOR
DEALER_OWNER
DEALER_MANAGER
SUPPORT
USER
```

## 13.3 DealerStatus

```text
AUTO_IMPORTED
PENDING_REVIEW
VERIFIED
PARTNER
PREMIUM
SUSPENDED
INACTIVE
```

## 13.4 VehicleStatus

```text
DRAFT
ACTIVE
RESERVED
SOLD
MISSING
STALE
INACTIVE
REJECTED
```

## 13.5 SourceType

```text
OFFICIAL_API
DEALER_FEED
CSV
XML
JSON
MANUAL
AUTHORIZED_SCRAPER
```

---

# 14. Dealer

Campos essenciais:

```text
id
sourceDealerId
companyName
displayName
slug
legalName
vatNumber
taxCode
email
phone
whatsapp
website
description
logoUrl
status
plan
leadDestinationEmail
lastSyncedAt
createdAt
updatedAt
deletedAt
```

Localização:

```text
addressLine1
addressLine2
city
province
region
postalCode
countryCode
latitude
longitude
```

---

# 15. Vehicle

Campos essenciais:

```text
id
publicId
slug
dealerId
brandId
modelId
version
title
subtitle
description
price
currency
vatDeductible
registrationYear
registrationMonth
mileageKm
fuelType
transmission
powerKw
powerHp
displacementCc
bodyType
doors
seats
exteriorColor
interiorColor
condition
city
province
region
countryCode
status
featured
publishedAt
lastSeenAt
createdAt
updatedAt
deletedAt
```

Preço:

```text
Decimal(12,2)
```

Nunca usar `float` para dinheiro.

---

# 16. VehicleSource

Separar o veículo da origem externa.

```text
id
vehicleId
sourceType
sourceName
sourceListingId
sourceDealerId
sourceUrl
sourcePayloadHash
sourceUpdatedAt
firstSeenAt
lastSeenAt
rawPayloadJson
createdAt
updatedAt
```

Constraint:

```text
unique(sourceName, sourceListingId)
```

Isso permite que o mesmo veículo venha futuramente de:

- feed da concessionária;
- cadastro manual;
- API;
- marketplace;
- CSV;
- XML.

---

# 17. Cadastro automático das concessionárias

Não cadastrar 700 concessionárias manualmente.

## 17.1 Matching

Procurar dealer nesta ordem:

1. ID externo;
2. Partita IVA;
3. website;
4. telefone normalizado;
5. nome + endereço + CAP;
6. fuzzy matching apenas como sugestão.

## 17.2 Criação automática

Quando não houver correspondência:

```text
status = AUTO_IMPORTED
```

Criar perfil mínimo.

## 17.3 Painel de revisão

Permitir:

- aprovar;
- editar;
- detectar duplicidade;
- mesclar;
- adicionar contatos;
- configurar destino dos leads;
- atribuir proprietário;
- mudar plano;
- suspender.

## 17.4 Merge

A operação deve:

- transferir veículos;
- transferir leads;
- transferir contatos;
- preservar histórico;
- registrar audit log;
- desativar o registro duplicado.

---

# 18. Importação

## 18.1 Adapter

Criar interface:

```ts
export interface VehicleSourceAdapter {
  name: string;
  type: SourceType;

  parse(input: unknown): Promise<NormalizedVehicle[]>;
  validate(input: NormalizedVehicle): ValidationResult;
}
```

Adapters:

```text
JsonVehicleAdapter
CsvVehicleAdapter
XmlVehicleAdapter
ManualVehicleAdapter
AuthorizedMarketplaceAdapter
```

## 18.2 AutoScout24

Toda integração deve estar isolada:

```text
lib/integrations/autoscout24/
```

Regras:

- desativada por padrão;
- ativada por feature flag;
- sem bypass de proteção;
- sem CAPTCHA bypass;
- sem proxy rotation;
- sem fingerprint spoofing;
- sem execução de navegador headless na Hostinger;
- sem dependência estrutural do HTML;
- sem armazenamento não autorizado;
- substituível por feed oficial.

Variável:

```dotenv
AUTOSCOUT_ADAPTER_ENABLED=false
```

## 18.3 Estratégia recomendada

O scraper externo deve exportar:

```text
JSON ou CSV
```

O portal recebe o arquivo ou lote em:

```text
POST /api/internal/imports/upload
POST /api/internal/imports/batch
```

## 18.4 Tamanho do lote

```text
50 veículos por lote
```

O Codex deve permitir configuração.

## 18.5 Pipeline

```text
Receber lote
→ Validar assinatura
→ Validar schema
→ Criar ImportRun
→ Normalizar registros
→ Criar jobs no banco
→ Processar lotes
→ Resolver concessionárias
→ Resolver marca/modelo
→ Calcular hash
→ Criar ou atualizar veículo
→ Atualizar mídia
→ Atualizar status
→ Finalizar relatório
```

## 18.6 Hash

Campos:

```text
price
mileage
title
description
status
dealer
specifications
media URLs
location
```

Não incluir timestamps internos.

## 18.7 Ausência

```text
1ª ausência → MISSING
2ª ausência → STALE
3ª ausência → INACTIVE
```

Se reaparecer:

```text
ACTIVE
```

---

# 19. Jobs no banco

## 19.1 Tipos

```text
IMPORT_VEHICLE
PROCESS_MEDIA
MARK_MISSING
SEND_LEAD
GENERATE_REPORT
REVALIDATE_PAGE
```

## 19.2 Lock

O processor deve usar lock transacional.

Campos:

```text
lockedAt
lockedBy
lockExpiresAt
```

Um job abandonado poderá ser recuperado após o lock expirar.

## 19.3 Retry

```text
maxAttempts = 3
```

Backoff:

```text
1 minuto
5 minutos
30 minutos
```

## 19.4 Cron

Criar endpoints:

```text
POST /api/internal/jobs/process
POST /api/internal/jobs/recover
POST /api/internal/vehicles/expire
POST /api/internal/reports/daily
```

Todos protegidos por token ou assinatura HMAC.

---

# 20. Mídia

## 20.1 Estratégia inicial

Não processar imagens pesadas durante a request do usuário.

Opções:

```text
1. Manter URL remota autorizada
2. Armazenar versão otimizada localmente
3. Usar object storage externo
```

## 20.2 Limite de disco

O plano possui 50 GB.

Reservar inicialmente:

```text
Aplicação e logs: 5 GB
Banco e backups locais: 10 GB
Imagens: máximo 25 GB
Margem operacional: 10 GB
```

Não usar todo o disco.

## 20.3 Otimização

Quando autorizada:

- WebP;
- AVIF;
- dimensões responsivas;
- compressão;
- remoção de metadata;
- checksum;
- deduplicação;
- cover image;
- lazy loading.

Tamanhos:

```text
320
640
960
1280
1600
```

## 20.4 Lote de mídia

```text
10 imagens por execução
```

---

# 21. Busca e filtros

## 21.1 Busca inicial

Usar SQL.

Para aproximadamente 1.000 veículos, não é necessário Elasticsearch.

## 21.2 Filtros

```text
Marca
Modello
Versione
Prezzo minimo
Prezzo massimo
Anno
Chilometraggio
Carburante
Cambio
Potenza
Carrozzeria
Colore
Regione
Provincia
Città
Concessionario
Condizione
IVA esposta
```

## 21.3 Ordenação

```text
Più recenti
Prezzo crescente
Prezzo decrescente
Anno più recente
Chilometraggio crescente
In evidenza
```

## 21.4 Query URL

```text
/auto?marca=ferrari&prezzo-min=100000&regione=lombardia
```

Não indexar todas as combinações.

---

# 22. Rotas públicas

```text
/
 /auto
 /auto/[brand]
 /auto/[brand]/[model]
 /veicolo/[slug]
 /concessionari
 /concessionari/[slug]
 /collezioni
 /collezioni/[slug]
 /magazine
 /magazine/[slug]
 /preferiti
 /ricerche-salvate
 /vendi-la-tua-auto
 /concierge
 /chi-siamo
 /contatti
 /privacy
 /cookie
 /termini
```

---

# 23. Painel administrativo

```text
/admin
/admin/veicoli
/admin/concessionari
/admin/importazioni
/admin/jobs
/admin/lead
/admin/collezioni
/admin/articoli
/admin/utenti
/admin/impostazioni
/admin/audit
```

## 23.1 Dashboard

Mostrar:

- veículos ativos;
- veículos novos;
- veículos atualizados;
- dealers;
- leads;
- última importação;
- falhas;
- jobs pendentes;
- uso estimado de mídia;
- anúncios abaixo do preço mínimo;
- dealers duplicados.

---

# 24. Área da concessionária

```text
/dealer
/dealer/veicoli
/dealer/lead
/dealer/profilo
/dealer/statistiche
/dealer/abbonamento
```

RBAC obrigatório no servidor.

Um dealer só acessa dados da própria concessionária.

---

# 25. Página inicial

Seções:

1. header;
2. hero premium;
3. busca;
4. veículos em destaque;
5. marcas;
6. coleções;
7. últimos veículos;
8. concessionárias verificadas;
9. concierge;
10. chamada para concessionárias;
11. magazine;
12. newsletter;
13. footer.

## 25.1 Copy inicial

```text
Auto straordinarie.
Selezionate per chi non cerca un'auto qualunque.
```

CTA:

```text
Scopri le auto
```

---

# 26. Página do veículo

Incluir:

- breadcrumbs;
- galeria;
- título;
- preço;
- ficha técnica;
- descrição;
- equipamentos;
- concessionária;
- localização;
- formulário;
- contatos;
- veículos similares;
- compartilhamento;
- status;
- data de atualização;
- disclaimer.

## 26.1 Lead form

Campos:

```text
Nome
E-mail
Telefono
Messaggio
Metodo di contatto preferito
Consenso privacy
Consenso marketing opzionale
```

Segurança:

- honeypot;
- rate limit;
- validação server-side;
- sanitização;
- audit trail;
- proteção de spam.

---

# 27. Design system

## 27.1 Direção visual

A experiência deve transmitir:

- luxo;
- exclusividade;
- precisão;
- automobilismo;
- editorial contemporâneo;
- tecnologia;
- confiança.

Evitar:

- aparência de template;
- excesso de sombras;
- glassmorphism indiscriminado;
- animações pesadas;
- gradientes genéricos;
- cards sobrecarregados.

## 27.2 Tokens iniciais

Ajustar depois de extrair a paleta oficial do logo.

```css
--brand-red: #c5160d;
--brand-blue: #111a82;
--ink-950: #0d0f12;
--ink-800: #24272c;
--stone-100: #f3f3f1;
--paper: #ffffff;
--success: #19733d;
--warning: #a66700;
--danger: #b42318;
```

## 27.3 Componentes

```text
Button
IconButton
Badge
VehicleCard
DealerCard
SearchBar
FilterPanel
PriceDisplay
SpecificationGrid
Gallery
LeadForm
FavoriteButton
Pagination
Breadcrumbs
Modal
Drawer
Tabs
Toast
Skeleton
EmptyState
ErrorState
DataTable
StatusBadge
AdminSidebar
```

---

# 28. SEO

## 28.1 Canonical

```text
https://macchinamilano.com
```

Nunca usar `www` nas canonical tags.

## 28.2 Indexar

- veículos ativos;
- marcas;
- modelos com estoque;
- concessionárias públicas;
- coleções;
- artigos.

## 28.3 Noindex

- admin;
- login;
- dealer portal;
- favoritos;
- pesquisas salvas;
- filtros sem valor editorial;
- URLs vazias;
- tracking URLs.

## 28.4 Sitemaps

```text
/sitemap.xml
/sitemaps/vehicles.xml
/sitemaps/dealers.xml
/sitemaps/brands.xml
/sitemaps/editorial.xml
```

## 28.5 Structured data

Aplicar apenas quando válido:

```text
Organization
WebSite
BreadcrumbList
ItemList
Product
Vehicle
Article
AutoDealer
```

Não inventar avaliações.

---

# 29. Autenticação

Usar Auth.js para sessões, cookies seguros, providers e integração com o
adapter de persistência.

Recursos:

- login;
- sessões;
- verificação de e-mail para admins;
- RBAC;
- cookies seguros.

Se o produto adotar login com senha, recuperação e redefinição de senha deverão
ser implementadas como fluxo próprio, com tokens de uso único, expiração,
hashing e e-mail transacional. Auth.js não deve ser tratado como fornecedor
automático desse fluxo. A decisão entre magic link, OAuth e credenciais deve ser
fechada antes da Fase 2.

Comando de bootstrap:

```text
pnpm admin:create
```

Não criar usuário default.

---

# 30. Segurança

## 30.1 Aplicação

- validação Zod;
- CSRF;
- rate limiting;
- HMAC em endpoints internos;
- cookies HttpOnly;
- cookies Secure;
- SameSite;
- CSP;
- HSTS após estabilização;
- sanitização;
- logs sem senha/token;
- proteção contra enumeração;
- upload seguro;
- limite de payload.

## 30.2 GDPR

Implementar:

- privacy policy;
- cookie policy;
- registro de consentimento;
- minimização;
- retenção de leads;
- anonimização;
- exportação futura;
- exclusão;
- banner de cookies;
- bloqueio de trackers até consentimento.

---

# 31. Variáveis de ambiente

Criar `.env.example`.

```dotenv
NODE_ENV="development"

APP_NAME="Macchina Milano"
APP_URL="https://macchinamilano.com"
APP_LOCALE="it-IT"
APP_TIMEZONE="Europe/Rome"

DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"

AUTH_SECRET="CHANGE_ME"
AUTH_URL="https://macchinamilano.com"

INTERNAL_API_TOKEN="CHANGE_ME"
WEBHOOK_SIGNING_SECRET="CHANGE_ME"
CRON_SECRET="CHANGE_ME"

MIN_VEHICLE_PRICE_EUR=100000

IMPORT_BATCH_SIZE=50
MEDIA_BATCH_SIZE=10
MAX_IMPORT_CONCURRENCY=1
MAX_MEDIA_CONCURRENCY=2

MISSING_THRESHOLD=1
STALE_THRESHOLD=2
INACTIVE_THRESHOLD=3

AUTOSCOUT_ADAPTER_ENABLED=false

MEDIA_STORAGE_DRIVER="remote"
MEDIA_LOCAL_PATH=""
MEDIA_PUBLIC_BASE_URL=""

SMTP_HOST=""
SMTP_PORT=587
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_FROM="Macchina Milano <noreply@macchinamilano.com>"

SENTRY_DSN=""
LOG_LEVEL="info"
```

Nunca versionar `.env`.

---

# 32. Logs e observabilidade

Usar Pino.

Campos:

```text
timestamp
level
service
environment
requestId
correlationId
userId
importRunId
jobId
message
error
```

Criar:

```text
GET /api/health
```

Resposta durante a Fase 0, antes da configuração do banco:

```json
{
  "status": "ok",
  "database": "not_configured",
  "version": "0.1.0",
  "timestamp": "ISO_DATE"
}
```

Depois da Fase 2, o endpoint deverá realizar uma consulta leve com timeout e
usar:

```text
database = ok
status = ok
```

ou, em falha:

```text
database = degraded
status = degraded
```

Não retornar segredos.

---

# 33. Backups

Os backups automáticos da Hostinger não substituem o backup lógico do banco.

Criar estes scripts somente depois de confirmar no hPanel a disponibilidade do
cliente do banco, permissões, diretórios persistentes e destino remoto:

```text
scripts/backup-database.sh
scripts/backup-media.sh
docs/BACKUP-RESTORE.md
```

Política:

```text
7 backups diários
4 backups semanais
1 backup mensal opcional
```

Manter cópia fora do diretório público.

Testar restore. Um backup sem teste de restauração não satisfaz o critério de
aceite.

---

# 34. Deploy na Hostinger

## 34.1 Estratégia por estágio

### Baseline público da Fase 0

O domínio já está provisionado na Hostinger como site PHP/HTML. Enquanto a
aplicação pública for totalmente estática, usar:

```text
GitHub como fonte canônica
pnpm build:static
deploy do diretório out/ por SSH para public_html
backup recuperável antes de cada sincronização
```

Esse caminho reutiliza o site, o SSL e a CDN existentes e evita criar uma
segunda propriedade para o mesmo domínio.

### Aplicação dinâmica

Antes de banco, autenticação, painel ou catálogo dinâmico entrarem em produção,
migrar o domínio para o recurso de aplicação Node.js/Web App da Hostinger.

Preferência:

```text
GitHub repository
Build command
Start command
Environment variables
```

## 34.2 Comandos

Instalação:

```bash
pnpm install --frozen-lockfile
```

Build da Fase 0:

```bash
pnpm build:static
```

Build da aplicação dinâmica:

```bash
pnpm build
```

Depois da introdução do Prisma, gerar o client antes do build dinâmico. Executar
`pnpm prisma migrate deploy` como uma etapa controlada e única de release, nunca
em processos de build paralelos. Se a Hostinger não oferecer um release hook, a
Fase 2 deverá documentar e testar o procedimento operacional equivalente antes
do primeiro deploy com banco.

Start:

```bash
pnpm start
```

## 34.3 package.json

Scripts mínimos:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:deploy": "prisma migrate deploy",
    "db:seed": "tsx prisma/seed.ts",
    "admin:create": "tsx scripts/create-admin.ts",
    "check": "pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build"
  }
}
```

Nota: o comando `next lint` não existe no Next.js 16. O lint deve usar a CLI do
ESLint.

## 34.4 FTP

FTP pode ser usado apenas para:

- assets;
- diagnóstico;
- emergência.

Não usar FTP como processo principal de deploy. O baseline estático usa SSH com
sincronização reproduzível e backup; a aplicação dinâmica usará o deploy
GitHub/Web App gerenciado.

Não enviar:

```text
node_modules
.env
.git
logs
backups
```

---

# 35. Performance

Metas:

```text
LCP < 2,5 s
CLS < 0,1
INP < 200 ms
```

Técnicas:

- Server Components;
- cache;
- revalidation;
- imagens responsivas;
- lazy loading;
- paginação;
- consultas indexadas;
- evitar N+1;
- bundles pequenos;
- compressão;
- carregamento de fontes otimizado.

Não usar vídeo pesado no hero inicialmente.

---

# 36. Testes

## 36.1 Unitários

- normalização;
- preço mínimo;
- hash;
- matching de dealer;
- status;
- permissions;
- schemas;
- formatters;
- queue lock.

## 36.2 Integração

- Prisma;
- import upsert;
- idempotência;
- dealer merge;
- lead;
- jobs;
- cron endpoints.

## 36.3 E2E

1. home;
2. busca;
3. filtro;
4. veículo;
5. lead;
6. login admin;
7. importação;
8. revisão de dealer;
9. edição de veículo.

---

# 37. Seed

Criar:

```bash
pnpm db:seed
```

Dados fictícios:

```text
8 marcas
20 modelos
5 concessionárias
30 veículos
3 coleções
3 artigos
```

Não copiar anúncios reais.

---

# 38. Fases de implementação

## Fase 0 — Auditoria e bootstrap

Entregas:

- repositório;
- Next.js;
- TypeScript;
- Tailwind;
- lint;
- format;
- `.env.example`;
- health endpoint;
- documentação da Hostinger;
- teste de build.

Critério de aceite:

```text
Aplicação sobe localmente
Build passa com Node.js 24.18.0
Página inicial temporária abre
Health endpoint funciona e informa database=not_configured
Lint, typecheck e testes passam
```

## Fase 1 — Design foundation

Entregas:

- tokens;
- tipografia;
- header;
- footer;
- layout;
- componentes base;
- assets;
- favicon.

Critério:

```text
Interface responsiva
Italiano
Acessível
Sem dependência de WordPress
```

## Fase 2 — Banco e autenticação

Entregas:

- Prisma;
- schema;
- migrations;
- seed;
- Auth.js;
- RBAC;
- primeiro admin.

## Fase 3 — Catálogo

Entregas:

- veículos;
- marcas;
- modelos;
- concessionárias;
- mídia;
- CRUD admin.

## Fase 4 — Site público

Entregas:

- home;
- listagem;
- filtros;
- detalhes;
- dealer;
- favoritos.

## Fase 5 — Importação

Entregas:

- ImportRun;
- adapters;
- upload JSON/CSV;
- jobs;
- cron;
- logs;
- deduplicação;
- atualização.

## Fase 6 — Leads

Entregas:

- formulário;
- routing;
- e-mail;
- painel;
- spam protection;
- GDPR.

## Fase 7 — SEO

Entregas:

- metadata;
- canonical;
- sitemap;
- robots;
- JSON-LD;
- páginas de marca;
- páginas de modelo;
- noindex rules.

## Fase 8 — Deploy

Entregas:

- build Hostinger;
- variáveis;
- banco;
- domínio;
- WWW redirect;
- HTTPS;
- healthcheck;
- smoke test.

---

# 39. Primeira tarefa para o Codex

Executar apenas a Fase 0.

## Prompt inicial

```text
Leia integralmente o arquivo MacchinaMilano-Codex-Master-Plan.md antes de
alterar qualquer arquivo.

Implemente somente a Fase 0 — Auditoria e bootstrap.

Crie uma aplicação Next.js moderna usando App Router, TypeScript strict,
Tailwind CSS e pnpm.

Configure:

- estrutura inicial de diretórios;
- ESLint;
- Prettier;
- TypeScript strict;
- variáveis de ambiente validadas com Zod;
- endpoint GET /api/health;
- página inicial temporária em italiano;
- layout base;
- metadata do domínio https://macchinamilano.com;
- README com instalação local;
- docs/HOSTINGER-DEPLOY.md;
- .env.example;
- scripts de lint, typecheck, test e build.

Use Node.js 24.18.0 LTS, mas deixe a mudança para 22.x simples caso seja
necessária.

Não configure Docker.
Não instale Redis.
Não instale BullMQ.
Não instale n8n.
Não implemente scraping.
Não implemente ainda o banco de produção.
Não crie todas as telas.
Não avance para a Fase 1.

Ao final:

1. execute o format check;
2. execute o lint;
3. execute o typecheck;
4. execute os testes;
5. execute o build;
6. apresente os arquivos criados;
7. descreva decisões;
8. liste pendências;
9. não esconda erros.
```

---

# 40. Definition of Done do MVP

O MVP estará pronto quando:

- domínio sem WWW funciona;
- WWW redireciona corretamente;
- HTTPS funciona;
- catálogo está em italiano;
- veículos acima do limite são publicados;
- concessionárias são criadas automaticamente;
- filtros funcionam;
- página do veículo funciona;
- leads são armazenados e enviados;
- admin gerencia catálogo;
- importações são idempotentes;
- jobs processam em lotes;
- cron jobs funcionam;
- erros são registrados;
- backups existem;
- SEO básico está implementado;
- consentimento e políticas existem;
- aplicação não excede os limites do plano em operação normal;
- build e deploy na Hostinger são reproduzíveis.

---

# 41. Princípios finais

1. A Hostinger é a infraestrutura oficial do MVP.
2. Não presumir recursos de VPS.
3. Não usar Docker como requisito.
4. Não executar scraping pesado na hospedagem.
5. Não processar 1.000 veículos em uma única request.
6. Não criar 700 automações.
7. Não cadastrar 700 dealers manualmente.
8. Manter origem dos dados separada do domínio.
9. Manter importações idempotentes.
10. Usar lotes e cron jobs.
11. Preservar desempenho e memória.
12. Priorizar segurança, SEO e operação.
13. Evitar complexidade prematura.
14. Preparar evolução sem comprometer o MVP.
15. Documentar todas as decisões relevantes.

---

# 42. Revisão 1.3 e estado da implementação

## 42.1 Resultado da auditoria inicial

O diretório inicial continha apenas este plano e os arquivos de marca. Não havia
aplicação, gerenciador de dependências, repositório Git ou configuração de
hosting. Portanto, a Fase 0 foi executada como bootstrap limpo.

Correções incorporadas nesta revisão:

1. arquivo canônico do plano alinhado ao nome real;
2. Node.js fixado em 24.18.0 LTS;
3. `next lint` substituído por `eslint .`, conforme Next.js 16;
4. health check da Fase 0 impedido de declarar um banco inexistente como
   saudável;
5. migrações separadas de builds potencialmente paralelos;
6. responsabilidade de recuperação de senha esclarecida;
7. scripts de backup condicionados às capacidades reais da hospedagem;
8. gates de infraestrutura adicionados antes das fases dependentes.
9. lockup oficial `.it` aprovado e preservado sem alterações;
10. `.com` mantido como canonical de produção até a ativação futura do `.it`.
11. site Hostinger existente reutilizado para o baseline estático da Fase 0;
12. deploy reproduzível com `pnpm build:static`, SSH, backup e rollback;
13. HTTPS e redirect permanente de `www` para o domínio canônico validados;
14. migração para Web App Node adiada até a primeira funcionalidade dinâmica.

## 42.2 Fase 0 — concluída

Entregas implementadas:

- repositório Git inicializado;
- Next.js 16 com App Router;
- React 19;
- TypeScript strict;
- Tailwind CSS 4;
- ESLint e Prettier;
- pnpm com lockfile;
- Node.js 24.18.0 registrado;
- variáveis ativas validadas com Zod;
- página inicial temporária em italiano;
- layout e metadata canônica;
- assets de marca para uso web;
- `GET /api/health`;
- teste unitário do payload de saúde;
- README;
- documentação de deploy Hostinger;
- registro de decisões arquiteturais.
- build estático condicional para a hospedagem existente;
- baseline de produção publicado em `https://macchinamilano.com`;
- redirect `www` para o domínio canônico;
- backup recuperável da página padrão substituída.

Validações concluídas com Node.js 24.18.0:

```text
pnpm format:check → aprovado
pnpm lint         → aprovado
pnpm typecheck    → aprovado
pnpm test         → 1 teste aprovado
pnpm build        → aprovado
smoke test        → home e /api/health aprovados
produção          → home, JSON health, HTTPS e redirect www aprovados
```

Não foram implementados banco, autenticação, catálogo, scraping, jobs ou painel,
em conformidade com o limite funcional da Fase 0.

## 42.3 Gates obrigatórios antes das próximas fases

### Gate A — antes da Fase 1

- aprovar direção visual, tipografia e paleta extraída do logo;
- usar a marca oficial completa com `.it`;
- preservar os arquivos de marca sem redesenhar a extensão;
- definir fonte e licença das imagens editoriais e automotivas.

### Gate B — antes da Fase 2

- confirmar no hPanel o motor e a versão exata do banco;
- confirmar SSL, limite de conexões e política de backup do banco;
- escolher magic link, OAuth ou credenciais;
- escolher provedor de e-mail transacional;
- definir política de sessão e recuperação de conta;
- testar a estratégia de migrations e rollback na Hostinger.

Sem essas respostas, não criar migrations de produção. Prisma desacopla o
domínio, mas migrations continuam específicas do provider SQL.

### Gate C — antes da Fase 3

- aprovar a taxonomia de combustível, câmbio, carroceria e condição;
- definir identificador público e política de geração de slugs;
- definir campos obrigatórios por origem;
- definir autorização e termos de uso de mídia remota;
- confirmar se o filesystem Hostinger é persistente entre deploys.

### Gate D — antes da Fase 5

- confirmar versão e semântica de lock do MySQL/MariaDB selecionado;
- medir timeout máximo de requests e cron jobs;
- escolher assinatura HMAC com timestamp e proteção contra replay;
- definir tamanho máximo de arquivo e payload;
- fornecer um feed autorizado de exemplo e contrato de dados;
- definir política de idempotência, reprocessamento e quarentena.

### Gate E — antes da Fase 6

- validar textos e bases legais com assessoria jurídica italiana;
- aprovar períodos de retenção, exclusão e anonimização;
- configurar domínio e entregabilidade de e-mail;
- escolher rate limiting compatível com múltiplas instâncias, sem depender de
  memória local;
- definir SLA e destino de cada lead.

### Gate F — antes da Fase 8

- confirmar aquisição, DNS e HTTPS de `macchinamilano.it`;
- migrar o domínio da hospedagem estática para a Web App Node antes da primeira
  funcionalidade dinâmica em produção;
- confirmar comandos suportados no deploy Node.js da Hostinger;
- configurar produção e staging separadamente;
- validar domínio canônico, redirect de `www`, HTTPS e headers;
- testar backup, restore e rollback;
- executar smoke test e observabilidade em produção;
- registrar owner operacional e procedimento de incidente.

## 42.4 Decisões ainda abertas

As seguintes escolhas não devem ser inferidas pelo código:

| Tema             | Decisão necessária                             | Prazo           |
| ---------------- | ---------------------------------------------- | --------------- |
| Domínio `.it`    | compra, DNS, HTTPS e data de virada            | antes da Fase 8 |
| Banco            | MySQL, MariaDB ou PostgreSQL e versão          | antes da Fase 2 |
| Login            | magic link, OAuth ou credenciais               | antes da Fase 2 |
| E-mail           | provedor SMTP/transacional                     | antes da Fase 2 |
| Mídia            | remota, local persistente ou object storage    | antes da Fase 3 |
| Imagens externas | domínios autorizados e direitos de uso         | antes da Fase 3 |
| Busca            | collation e regras de normalização italiana    | antes da Fase 3 |
| Jobs             | mecanismo SQL compatível com o banco escolhido | antes da Fase 5 |
| Rate limit       | armazenamento compartilhado ou tabela SQL      | antes da Fase 6 |
| Analytics        | fornecedor e consent mode                      | antes da Fase 7 |
| Jurídico         | políticas, consentimentos e retenção           | antes da Fase 6 |

## 42.5 Regra de avanço

Cada fase deve:

1. fechar seus gates;
2. registrar decisões em `docs/ARCHITECTURE_DECISIONS.md`;
3. implementar somente o escopo aprovado;
4. executar `pnpm check`;
5. atualizar este documento com estado, pendências e evidências;
6. não avançar automaticamente para a fase seguinte.
