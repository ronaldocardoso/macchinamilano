# Importazione veicoli e concessionari

Questo pipeline importa lotti provenienti esclusivamente da feed, esportazioni o
interfacce per cui Macchina Milano dispone di autorizzazione.

Non esegue scraping diretto del sito AutoScout24. L'adapter
`piloterr-autoscout24` trasforma un export ottenuto tramite l'API Piloterr
nello stesso contratto normalizzato degli altri feed autorizzati.

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

Per un export Piloterr AutoScout24 Search:

```bash
pnpm import:autoscout24 \
  --input var/imports/piloterr/autoscout24-milano.raw.json \
  --output var/imports/piloterr/autoscout24-milano.report.json \
  --catalog-output data/imported-catalog.json \
  --authoritative-snapshot \
  --limit 100 \
  --radius 25 \
  --min-price 100000
```

L'export deve provenire dalla ricerca italiana con centro CAP `20121`, raggio
`25 km`, `pricefrom=100001` e viene comunque ricontrollato dal pipeline per
prezzo, distanza e tipo di venditore.

`--authoritative-snapshot` dichiara che tutte le pagine necessarie a coprire il
limite pubblicato, oppure tutte le pagine disponibili quando la fonte si
esaurisce prima, sono state raccolte e validate. Solo in questa modalità il
catalogo pubblico può essere sostituito: gli annunci esplicitamente venduti o
non disponibili vengono rifiutati e quelli presenti nel catalogo precedente
ma assenti dal nuovo snapshot completo del perimetro pubblicato vengono
considerati venduti e rimossi. Un lotto parziale o una raccolta interrotta non
deve mai essere usato con questo flag.

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

La directory `var/imports` è locale e ignorata da Git. Il file grezzo e il
report non vengono versionati. Solo il catalogo normalizzato e revisionato può
entrare in `data/imported-catalog.json`.

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
    "phoneUri": "+3902...",
    "logoUrl": "https://...",
    "profileUrl": "https://...",
    "phones": [
      {
        "type": "Office",
        "formatted": "+39 02 ...",
        "callTo": "+3902..."
      }
    ],
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

`year` e `mileageKm` possono essere omessi per veicoli nuovi quando la fonte
mostra rispettivamente `- (Anno)` e `- km`. Il portale li rende come `Nuovo` e
`— km`, senza introdurre valori stimati.

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
