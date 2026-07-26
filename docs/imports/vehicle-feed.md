# Importazione veicoli e concessionari

Questo pipeline importa lotti provenienti esclusivamente da feed, esportazioni o
interfacce per cui Macchina Milano dispone di autorizzazione.

Non esegue scraping del sito AutoScout24. Le condizioni pubblicate da
AutoScout24 vietano la consultazione automatizzata tramite software, robot,
spider o strumenti simili e vietano la riproduzione degli annunci senza
autorizzazione scritta.

## Primo lotto

Il profilo predefinito applica:

- centro: Milano (`45.4642, 9.1900`);
- raggio massimo: 25 km;
- prezzo strettamente superiore a 100.000 euro;
- solo concessionari professionali;
- almeno un'immagine autorizzata;
- massimo 100 veicoli accettati.

## Esecuzione

```bash
pnpm import:vehicles --input fixtures/imports/authorized-feed.sample.json
```

Per scegliere il file di report:

```bash
pnpm import:vehicles \
  --input /percorso/feed-autorizzato.json \
  --output var/imports/lotto-001.json \
  --limit 100 \
  --radius 25 \
  --min-price 100000
```

La prima esecuzione deve produrre soltanto il report. Dopo la revisione, lo
stesso lotto può alimentare il catalogo del portale:

```bash
pnpm import:vehicles \
  --input /percorso/feed-autorizzato.json \
  --output var/imports/lotto-001.json \
  --catalog-output data/imported-catalog.json
```

Quando `data/imported-catalog.json` contiene veicoli, il sito utilizza il
catalogo importato al posto dei dati dimostrativi. Per la pubblicazione attuale
statica è necessario ricostruire il sito; nella futura versione Node.js lo
stesso contratto verrà applicato direttamente al database.

Il comando accetta:

- JSON: array di record oppure oggetto con proprietà `records`;
- NDJSON/JSONL: un record JSON per riga.

Il report contiene:

- veicoli normalizzati;
- concessionari normalizzati e deduplicati;
- riepilogo quantitativo;
- righe rifiutate con motivo verificabile.

La directory `var/imports` è locale e ignorata da Git. Nessun lotto reale deve
essere versionato senza una revisione dei dati, dei diritti sulle immagini e
della presenza di dati personali.

## Contratto del record

```json
{
  "source": "nome-del-feed-autorizzato",
  "listingId": "identificativo-stabile",
  "sourceUrl": "https://...",
  "collectedAt": "2026-07-26T12:00:00.000Z",
  "seller": {
    "type": "DEALER",
    "externalId": "dealer-123",
    "name": "Nome concessionaria",
    "vatNumber": "IT01234567890",
    "phone": "+39 ...",
    "email": "info@example.it",
    "website": "https://example.it",
    "address": {
      "street": "Via ...",
      "postalCode": "20121",
      "city": "Milano",
      "province": "MI",
      "country": "IT"
    }
  },
  "vehicle": {
    "brand": "Ferrari",
    "model": "296 GTB",
    "version": "V6 Hybrid",
    "priceEuro": 315000,
    "year": 2025,
    "mileageKm": 900,
    "fuel": "Ibrida",
    "transmission": "Automatico",
    "bodyType": "Coupé",
    "powerCv": 830,
    "powerKw": 610,
    "exteriorColor": "Rosso",
    "interiorColor": "Nero",
    "description": "...",
    "vin": "...",
    "imageUrls": ["https://..."]
  },
  "location": {
    "city": "Milano",
    "province": "MI",
    "postalCode": "20121",
    "latitude": 45.4642,
    "longitude": 9.19,
    "distanceKm": 0
  }
}
```

`distanceKm` è facoltativo quando sono presenti latitudine e longitudine. Se
nessuno dei due metodi è disponibile, il record viene rifiutato perché non è
possibile verificare il raggio.

## Deduplicazione

Un veicolo è univoco per `source + listingId`. Il concessionario viene
riconciliato in questo ordine:

1. partita IVA;
2. ID esterno del feed;
3. dominio del sito;
4. telefono normalizzato;
5. nome, città e CAP.

Ogni veicolo riceve anche un `contentHash`, utile per evitare aggiornamenti
quando il contenuto non è cambiato.

## Passaggio successivo

Il report è indipendente dal database. Il prossimo adapter scriverà lo stesso
contratto normalizzato nelle tabelle `Dealer`, `Vehicle`, `VehicleSource`,
`VehicleMedia`, `ImportRun` e `ImportItem`, con upsert idempotente e revisione
prima della pubblicazione.
