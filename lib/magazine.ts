export type MagazineTone = "red" | "blue" | "paper";

export type MagazineSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: {
    title: string;
    text: string;
  };
};

export type MagazineArticle = {
  slug: string;
  category: string;
  title: string;
  seoTitle: string;
  shortTitle: string;
  description: string;
  introduction: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  tone: MagazineTone;
  keyPoints: string[];
  sections: MagazineSection[];
  sources: {
    label: string;
    url: string;
  }[];
  related: {
    label: string;
    title: string;
    href: string;
  };
};

export const magazineArticles: MagazineArticle[] = [
  {
    slug: "area-b-area-c-milano-guida-auto-premium",
    category: "Guidare a Milano",
    title: "Area B e Area C a Milano: la guida per chi guida un’auto premium",
    seoTitle: "Area B e Area C Milano: guida per auto premium",
    shortTitle: "Area B e Area C: cosa sapere prima di entrare a Milano",
    description:
      "Orari, differenze, ticket e controlli da fare prima di entrare in Area B o Area C a Milano con un’auto premium, sportiva o storica.",
    introduction:
      "Potenza, valore e prestigio non determinano se un’auto può entrare nel centro di Milano. Per Area B e Area C contano soprattutto classe ambientale, alimentazione, targa e, in alcuni casi, registrazione e pagamento. Questa guida mette ordine nelle verifiche da fare prima di partire.",
    publishedAt: "2026-08-03",
    updatedAt: "2026-08-03",
    readingTime: "7 min",
    tone: "red",
    keyPoints: [
      "Area B e Area C sono due zone diverse, con regole e finalità differenti.",
      "Area B non richiede un ticket ai veicoli ammessi; Area C è una ZTL a pagamento salvo esenzioni.",
      "La verifica ufficiale della targa è sempre più affidabile di una valutazione basata solo su modello e anno.",
    ],
    sections: [
      {
        id: "differenza",
        title: "Area B e Area C non sono la stessa cosa",
        paragraphs: [
          "Area B copre gran parte del territorio comunale e limita l’accesso ai veicoli più inquinanti. È attiva dal lunedì al venerdì, dalle 7:30 alle 19:30, esclusi i festivi. Per un veicolo ammesso non è previsto alcun pagamento.",
          "Area C coincide invece con la ZTL Cerchia dei Bastioni, nel centro di Milano. Negli stessi giorni e orari l’ingresso è regolato da varchi elettronici e, per la maggior parte dei veicoli ammessi, richiede l’acquisto e l’attivazione di un ticket.",
          "In pratica, un’auto può essere autorizzata a circolare in Area B ma avere comunque bisogno del ticket per entrare in Area C. Prima di pianificare un appuntamento in centro bisogna verificare entrambe le zone.",
        ],
      },
      {
        id: "auto-premium",
        title: "Perché una supercar recente non è automaticamente esente",
        paragraphs: [
          "Le regole non classificano le automobili in base al prezzo o ai cavalli. Una sportiva recente con classe ambientale compatibile può accedere, mentre un esemplare più anziano può essere soggetto a divieti o deroghe anche se percorre pochi chilometri all’anno.",
          "Per questo motivo non basta sapere che l’auto è benzina, ibrida o diesel. Servono la classe Euro riportata sul documento di circolazione, la data di prima immatricolazione e la verifica della targa nei servizi ufficiali del Comune.",
        ],
        callout: {
          title: "La verifica decisiva",
          text: "Inserisci sempre la targa nei servizi ufficiali Area B e Area C. Le regole cambiano nel tempo e possono dipendere da dati che non compaiono nel titolo di un annuncio.",
        },
      },
      {
        id: "checklist",
        title: "Checklist prima di entrare a Milano",
        paragraphs: [
          "Una procedura di pochi minuti evita ingressi non autorizzati, ticket non attivati e dubbi all’ultimo momento.",
        ],
        bullets: [
          "Controlla sul libretto classe ambientale, alimentazione e prima immatricolazione.",
          "Verifica la targa separatamente sul portale Area B e sul portale Area C.",
          "Consulta giorni e orari di attivazione, compresi eventuali aggiornamenti straordinari.",
          "Se devi entrare in Area C, acquista il ticket corretto e assicurati che sia attivato per la targa interessata.",
          "Se utilizzi un’autorimessa convenzionata, verifica prima condizioni e tariffa agevolata applicabile.",
          "Conserva la conferma dell’attivazione e controlla eventuali comunicazioni nel profilo MyAreaC.",
        ],
      },
      {
        id: "storiche",
        title: "E per un’auto storica? Il CRS conta, ma va registrato",
        paragraphs: [
          "Il Comune prevede una disciplina specifica per i veicoli dotati di Certificato di Rilevanza Storica. Per Area C la targa deve essere registrata e verificata nel sistema prima dell’accesso; per gli esemplari tra venti e quarant’anni sono previste giornate annuali limitate, mentre per quelli con almeno quarant’anni la disciplina è più favorevole.",
          "Il possesso di un’auto da collezione non sostituisce quindi la procedura amministrativa. La registrazione preventiva è parte essenziale della pianificazione, soprattutto per un veicolo utilizzato solo in occasioni speciali.",
        ],
      },
      {
        id: "costo",
        title: "Quanto costa Area C",
        paragraphs: [
          "La tariffa ordinaria indicata dal Comune per il ticket giornaliero è di 7,50 euro. Sono previste condizioni differenti per residenti, veicoli di servizio e soste presso autorimesse convenzionate. Poiché tariffe e agevolazioni possono cambiare, l’importo va sempre confermato sul portale ufficiale prima dell’acquisto.",
          "La regola più semplice è distinguere accesso e parcheggio: il pagamento di un’autorimessa non implica automaticamente che il ticket sia già attivo, a meno che la struttura e l’offerta scelta lo prevedano espressamente.",
        ],
      },
    ],
    sources: [
      {
        label: "Comune di Milano — Area B",
        url: "https://www.comune.milano.it/argomenti/mobilita/area-b",
      },
      {
        label: "Comune di Milano — Area C",
        url: "https://www.comune.milano.it/aree-tematiche/mobilita/area-c",
      },
      {
        label: "Comune di Milano — Mappa dei varchi Area B e Area C",
        url: "https://dati.comune.milano.it/web/portale-del-dato/w/mappa-dei-varchi-di-area-c-e-area-b-a-milano",
      },
      {
        label: "Comune di Milano — Deroghe per veicoli storici",
        url: "https://www.comune.milano.it/servizi/deroghe-veicoli-storici",
      },
    ],
    related: {
      label: "Dalla guida alla ricerca",
      title: "Esplora le auto disponibili a Milano e nella regione",
      href: "/veicoli/",
    },
  },
  {
    slug: "comprare-auto-premium-usata-controlli",
    category: "Guida all’acquisto",
    title: "Comprare un’auto premium usata: 10 controlli prima della firma",
    seoTitle: "Auto premium usata: 10 controlli prima dell’acquisto",
    shortTitle: "Auto premium usata: 10 controlli prima della firma",
    description:
      "Documenti, visura PRA, manutenzione, chilometri e passaggio di proprietà: la checklist essenziale per comprare un’auto premium usata.",
    introduction:
      "Su un’auto ad alte prestazioni una storia incompleta può trasformarsi in un costo importante. La verifica corretta unisce documenti, stato giuridico, manutenzione e controllo tecnico indipendente. Il prezzo viene valutato soltanto dopo.",
    publishedAt: "2026-08-03",
    updatedAt: "2026-08-03",
    readingTime: "9 min",
    tone: "blue",
    keyPoints: [
      "Targa, telaio e Documento Unico devono descrivere la stessa automobile.",
      "La visura PRA serve a verificare intestatario e stato giuridico attuale; l’estratto cronologico ricostruisce la storia registrata.",
      "Il passaggio di proprietà dovrebbe essere contestuale alla vendita presso uno STA.",
    ],
    sections: [
      {
        id: "identita",
        title: "1. Parti dall’identità dell’auto, non dalla carrozzeria",
        paragraphs: [
          "Confronta il numero di telaio punzonato sul veicolo con quello riportato nel Documento Unico e nella documentazione di manutenzione. Verifica anche targa, intestatario, versione, potenza e data di prima immatricolazione.",
          "Su modelli con molte configurazioni è utile richiedere la lista degli optional di fabbrica. Distingue ciò che appartiene all’allestimento originale da accessori aggiunti successivamente e aiuta a valutare correttamente l’esemplare.",
        ],
      },
      {
        id: "pra",
        title: "2. Richiedi la visura PRA e controlla vincoli e gravami",
        paragraphs: [
          "La visura PRA su targa fotografa lo stato giuridico attuale e consente di verificare chi risulta proprietario o utilizzatore. Prima di versare il saldo bisogna chiarire qualsiasi difformità tra venditore, intestatario e documentazione.",
          "ACI mette inoltre a disposizione un servizio per verificare la presenza di vincoli o gravami, come fermi amministrativi, ipoteche, pignoramenti o sequestri. Se emerge un’anomalia, la trattativa deve fermarsi fino a quando natura e stato del provvedimento non siano documentati.",
        ],
      },
      {
        id: "storia",
        title: "3. Ricostruisci proprietari, passaggi e provenienza",
        paragraphs: [
          "Per un esemplare di valore, l’estratto cronologico generale può aggiungere informazioni su proprietari, date e prezzi dichiarati nei passaggi, precedenti targhe e vincoli presenti o passati. Non sostituisce una perizia, ma aiuta a individuare punti che meritano una spiegazione.",
          "Se l’auto proviene dall’estero, chiedi documenti di immatricolazione, fatture e continuità della manutenzione. Una storia lineare e verificabile vale più di una cartella piena di documenti non collegati tra loro.",
        ],
      },
      {
        id: "manutenzione",
        title: "4. Verifica manutenzione e chilometraggio insieme",
        paragraphs: [
          "Il chilometraggio ha senso solo se è coerente con revisioni, fatture, tagliandi e usura reale. Controlla date, percorrenze e officine che hanno eseguito gli interventi; quando possibile, chiedi conferma alla rete ufficiale o allo specialista indicato.",
          "Una lunga inattività non equivale automaticamente a conservazione perfetta. Pneumatici, guarnizioni, fluidi, batteria, impianto frenante e sistemi idraulici possono richiedere interventi anche su un’auto che ha percorso pochissimo.",
        ],
      },
      {
        id: "ispezione",
        title: "5. Fai eseguire un’ispezione pre-acquisto indipendente",
        paragraphs: [
          "Una PPI seria comprende diagnosi elettronica, prova su strada, verifica di perdite, sospensioni, freni, pneumatici e sottoscocca. Su carrozzerie in alluminio o fibra di carbonio servono strumenti e competenze adatti a rilevare riparazioni non evidenti.",
          "Per auto ibride o elettriche chiedi un rapporto sullo stato della batteria di trazione e verifica cavi, sistemi di ricarica e garanzia residua. Per vetture con freni carboceramici, aerodinamica attiva o assetti complessi, una valutazione specialistica è particolarmente importante.",
        ],
        callout: {
          title: "Un segnale da non ignorare",
          text: "Se il venditore non consente una prova o un controllo presso un’officina indipendente, considera con prudenza la prosecuzione della trattativa.",
        },
      },
      {
        id: "contratto",
        title: "6. Metti per iscritto condizioni, dotazione e consegna",
        paragraphs: [
          "Il contratto deve identificare senza ambiguità veicolo, prezzo, regime IVA quando applicabile, chilometraggio dichiarato, accessori compresi, eventuali difetti noti, garanzia proposta e condizioni della caparra.",
          "Inserisci anche ciò che deve avvenire prima della consegna: tagliando, riparazioni concordate, seconda chiave, manuali, mantenitore, cover, cavi o set di ruote. Su una premium, una dotazione mancante può essere costosa da ricostruire.",
        ],
      },
      {
        id: "passaggio",
        title: "7. Concludi con passaggio e pagamento tracciabili",
        paragraphs: [
          "ACI raccomanda di effettuare il passaggio di proprietà contestualmente alla vendita presso uno Sportello Telematico dell’Automobilista. In quella sede vengono autenticata la firma del venditore, registrato il trasferimento al PRA e rilasciato il Documento Unico aggiornato.",
          "Evita di versare l’intero prezzo prima di aver visto l’auto, verificato la situazione PRA e definito la procedura di trasferimento. Pagamento, consegna e passaggio devono far parte di un’unica sequenza documentata.",
        ],
        bullets: [
          "Conferma in anticipo costo e documenti richiesti dallo STA.",
          "Attiva la copertura assicurativa prima di ritirare il veicolo.",
          "Controlla subito i dati del nuovo Documento Unico.",
          "Conserva contratto, ricevute, perizia e corrispondenza della trattativa.",
        ],
      },
    ],
    sources: [
      {
        label: "ACI — Auto usate, guida ai controlli prima dell’acquisto",
        url: "https://www.lautomobile.aci.it/attualita/auto-usate-cosa-controllare-prima-dellacquisto-la-guida-in-7-passi/",
      },
      {
        label: "ACI — Visura ed estratto cronologico PRA",
        url: "https://www.aci.it/servizi/visura-e-estratto-cronologico/",
      },
      {
        label: "ACI — Verifica vincoli e gravami",
        url: "https://www.aci.it/servizi/come-posso-sapere-se-sulla-mia-auto-e-stato-iscritto-o-e-stato-cancellato-un-fermo-amministrativo-o-un-pignoramento/",
      },
      {
        label: "ACI — Passaggio di proprietà e Documento Unico",
        url: "https://www.aci.it/servizi/devo-vendere-la-mia-auto-cosa-devo-fare/",
      },
    ],
    related: {
      label: "Inizia dalla selezione",
      title: "Confronta le auto premium disponibili",
      href: "/veicoli/",
    },
  },
  {
    slug: "bollo-superbollo-auto-lombardia-2026",
    category: "Costi di possesso",
    title: "Bollo e superbollo 2026: cosa sapere in Lombardia",
    seoTitle: "Bollo e superbollo 2026 in Lombardia",
    shortTitle: "Bollo e superbollo 2026 per le auto ad alte prestazioni",
    description:
      "Come funzionano bollo e superbollo per un’auto potente in Lombardia: soglia di 185 kW, riduzioni per anzianità ed esempio di calcolo.",
    introduction:
      "Il prezzo d’acquisto è soltanto una parte del costo di un’auto ad alte prestazioni. In Lombardia il bollo è un tributo regionale; oltre 185 kW si aggiunge il superbollo erariale. Le due voci seguono regole diverse e vanno calcolate separatamente.",
    publishedAt: "2026-08-03",
    updatedAt: "2026-08-03",
    readingTime: "7 min",
    tone: "paper",
    keyPoints: [
      "Il bollo dipende da potenza, classe ambientale e tariffario regionale.",
      "Il superbollo è pari a 20 euro per ogni kW oltre 185 kW prima delle riduzioni per anzianità.",
      "In Lombardia la domiciliazione bancaria del bollo dà diritto a una riduzione del 15% per i soggetti ammessi.",
    ],
    sections: [
      {
        id: "due-imposte",
        title: "Bollo e superbollo sono due calcoli distinti",
        paragraphs: [
          "Il bollo auto è una tassa automobilistica regionale. Per le autovetture, l’importo dipende soprattutto dai kW indicati sul Documento Unico e dalla classe ambientale, secondo il tariffario annuale della Regione Lombardia.",
          "Il superbollo è invece un’addizionale erariale dovuta per autovetture e autoveicoli per trasporto promiscuo con potenza superiore a 185 kW. Non sostituisce il bollo: quando applicabile, si somma alla tassa regionale.",
        ],
      },
      {
        id: "calcolo",
        title: "Come si calcola il superbollo",
        paragraphs: [
          "Per un veicolo nuovo o con meno di cinque anni, l’importo è di 20 euro per ogni kW eccedente la soglia di 185 kW. La formula di partenza è quindi: (potenza in kW − 185) × 20 euro.",
          "Esempio: per un’auto da 450 kW, la potenza eccedente è di 265 kW. Il superbollo teorico pieno è 265 × 20, cioè 5.300 euro all’anno. A questa cifra va aggiunto il bollo regionale calcolato separatamente.",
        ],
        callout: {
          title: "Dove leggere la potenza corretta",
          text: "Per il calcolo fiscale usa i kW riportati sul Documento Unico, non i CV indicati nell’annuncio o nella scheda commerciale.",
        },
      },
      {
        id: "riduzioni",
        title: "Le riduzioni dopo 5, 10, 15 e 20 anni",
        paragraphs: [
          "L’importo del superbollo si riduce con l’anzianità del veicolo. Dopo cinque anni è dovuto il 60% dell’importo pieno; dopo dieci anni il 30%; dopo quindici anni il 15%. Decorsi venti anni dalla data di costruzione non è più dovuto.",
          "I periodi decorrono dal 1° gennaio dell’anno successivo a quello di costruzione. Se la data di costruzione non è disponibile, viene considerata la data più vecchia tra prima immatricolazione estera e immatricolazione italiana.",
        ],
        bullets: [
          "Auto da 450 kW, importo pieno: 5.300 euro.",
          "Dopo 5 anni, al 60%: 3.180 euro.",
          "Dopo 10 anni, al 30%: 1.590 euro.",
          "Dopo 15 anni, al 15%: 795 euro.",
          "Dopo 20 anni: superbollo non dovuto.",
        ],
      },
      {
        id: "pagamento",
        title:
          "Pagamento: scadenza e modello non sono quelli di un normale acquisto online",
        paragraphs: [
          "Il superbollo si versa con modello F24 Versamenti con elementi identificativi, senza possibilità di compensazione, utilizzando il codice tributo 3364 per il pagamento ordinario. La scadenza è collegata a quella del bollo del veicolo.",
          "Per evitare errori su anno di riferimento, decorrenza delle riduzioni o soggetto obbligato, conviene utilizzare i servizi di calcolo ufficiali e verificare la posizione fiscale prima del versamento.",
        ],
      },
      {
        id: "lombardia",
        title: "In Lombardia la domiciliazione riduce il bollo del 15%",
        paragraphs: [
          "Regione Lombardia riconosce una riduzione del 15% sul bollo pagato tramite domiciliazione bancaria. Possono aderire, tra gli altri, cittadini residenti proprietari o locatari nelle condizioni previste e persone giuridiche con non più di cinquanta veicoli.",
          "Lo sconto regionale riguarda il bollo auto. ACI precisa che le agevolazioni previste per il bollo non producono ulteriori riduzioni sul superbollo, che segue la propria disciplina nazionale.",
        ],
      },
      {
        id: "budget",
        title: "Il budget corretto considera il costo annuo completo",
        paragraphs: [
          "Prima di acquistare una vettura ad alte prestazioni, affianca al prezzo una stima annuale di bollo, superbollo, assicurazione, manutenzione programmata, pneumatici, deposito e garanzia. Due esemplari con prezzo simile possono avere costi di possesso molto diversi per potenza, età e complessità tecnica.",
          "Questa guida offre un orientamento generale e non sostituisce una verifica fiscale individuale. Tariffe, agevolazioni e scadenze devono essere confermate sui portali ufficiali in base al veicolo e all’intestatario.",
        ],
      },
    ],
    sources: [
      {
        label: "Regione Lombardia — Tassa automobilistica 2026",
        url: "https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/tassa-automobilistica-bollo-auto",
      },
      {
        label: "Regione Lombardia — Domiciliazione e riduzione del 15%",
        url: "https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/tassa-automobilistica-bollo-auto/perche-conviene-e-chi-puo-aderire",
      },
      {
        label: "ACI — Criteri di calcolo del superbollo",
        url: "https://www.aci.it/servizi/criteri-di-calcolo-e-modalita-di-pagamento-addizionale-erariale-superbollo/",
      },
      {
        label: "Agenzia delle Entrate — Versamento del superbollo",
        url: "https://www1.agenziaentrate.gov.it/servizi/scadenzario/main.php?entroil=01-06-2026&mesesel=06-2026&op=2&tipologia=B&vista=1",
      },
    ],
    related: {
      label: "Confronta prima dell’acquisto",
      title: "Scopri potenza, anno e caratteristiche dei veicoli",
      href: "/veicoli/",
    },
  },
];

export function getMagazineArticle(slug: string) {
  return magazineArticles.find((article) => article.slug === slug);
}

export function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Rome",
  }).format(new Date(`${value}T12:00:00+02:00`));
}
