import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { ArrowIcon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contatti">
      <div className="site-footer__top container">
        <div className="site-footer__statement">
          <p className="eyebrow eyebrow--light">Macchina Milano</p>
          <h2>La tua prossima auto non sarà una qualunque.</h2>
          <Link className="text-link text-link--light" href="/veicoli">
            Esplora la selezione <ArrowIcon />
          </Link>
        </div>
        <div className="site-footer__links">
          <div>
            <h3>Esplora</h3>
            <Link href="/veicoli">Tutti i veicoli</Link>
            <Link href="/veicoli">Nuovi arrivi</Link>
            <Link href="/#marche">Marche</Link>
            <Link href="/#selezioni">Collezioni</Link>
          </div>
          <div>
            <h3>Macchina Milano</h3>
            <Link href="/#magazine">Magazine</Link>
            <Link href="/#contatti">Per i concessionari</Link>
            <Link href="/#contatti">Contatti</Link>
          </div>
          <div>
            <h3>Assistenza</h3>
            <Link href="/#contatti">Come funziona</Link>
            <Link href="/#contatti">Concierge</Link>
            <Link href="/#contatti">Privacy</Link>
            <Link href="/#contatti">Termini</Link>
          </div>
        </div>
      </div>
      <div className="newsletter container">
        <div>
          <p className="eyebrow eyebrow--light">The Milano Edit</p>
          <p>Nuovi arrivi, storie e itinerari. Una volta al mese.</p>
        </div>
        <form className="newsletter__form">
          <label className="sr-only" htmlFor="newsletter-email">
            Il tuo indirizzo e-mail
          </label>
          <input
            id="newsletter-email"
            name="email"
            placeholder="Il tuo indirizzo e-mail"
            type="email"
          />
          <button aria-label="Iscriviti" type="submit">
            <ArrowIcon />
          </button>
        </form>
      </div>
      <div className="site-footer__bottom container">
        <div className="site-footer__identity">
          <BrandMark light />
          <span>© 2026</span>
        </div>
        <section className="site-footer__legal" aria-labelledby="legal-title">
          <h2 id="legal-title">Avviso legale</h2>
          <p>
            Macchina Milano opera esclusivamente come portale di pubblicazione e
            aggregazione di annunci di veicoli e non partecipa, in alcun caso,
            alle trattative, ai pagamenti, ai finanziamenti, alle permute, alle
            garanzie, alle consegne o a qualsiasi altra transazione effettuata
            tra acquirenti e venditori.
          </p>
          <p>
            Tutte le informazioni, le immagini, le specifiche tecniche, gli
            optional, i prezzi, le condizioni commerciali e gli altri dati
            contenuti negli annunci sono di esclusiva responsabilità dei
            rivenditori, delle concessionarie, dei commercianti o degli
            inserzionisti responsabili dell’offerta dei veicoli.
          </p>
          <p>
            Macchina Milano non garantisce l’esattezza, la veridicità,
            l’aggiornamento, la disponibilità o la completezza delle
            informazioni pubblicate e non può essere ritenuta responsabile per
            eventuali errori, omissioni, discrepanze nei dati, variazioni di
            prezzo, indisponibilità dei veicoli, informazioni non aggiornate o
            per qualsiasi danno diretto o indiretto derivante dall’utilizzo
            delle informazioni contenute nel presente portale.
          </p>
          <p>
            Gli utenti sono tenuti a verificare direttamente con l’inserzionista
            tutte le informazioni relative al veicolo, alla sua provenienza,
            alla documentazione, alle condizioni commerciali e alla
            disponibilità, prima di avviare qualsiasi trattativa o concludere
            qualsiasi operazione.
          </p>
          <p>
            Parte dei dati, delle immagini e delle informazioni visualizzati nel
            presente portale può provenire da contenuti resi pubblicamente
            disponibili da rivenditori, concessionarie, commercianti e altre
            piattaforme del settore automobilistico. Tali contenuti sono
            utilizzati esclusivamente a fini informativi e di pubblicazione
            degli annunci.
          </p>
          <p>
            Macchina Milano non intrattiene alcun rapporto societario,
            commerciale, di agenzia o di rappresentanza con le aziende, i
            marchi, i rivenditori, le concessionarie o gli inserzionisti
            presenti sul portale, salvo ove espressamente indicato.
          </p>
          <p>
            Utilizzando il presente portale, l’utente dichiara di essere
            consapevole che Macchina Milano opera esclusivamente come mezzo di
            pubblicazione e diffusione di annunci e che non può essere ritenuta
            responsabile per le conseguenze derivanti dai rapporti commerciali
            instaurati tra soggetti terzi.
          </p>
        </section>
      </div>
    </footer>
  );
}
