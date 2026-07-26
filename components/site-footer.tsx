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
        <BrandMark light />
        <p>
          Anteprima con contenuti dimostrativi. Verifica sempre disponibilità,
          prezzo e condizioni con il concessionario.
        </p>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
