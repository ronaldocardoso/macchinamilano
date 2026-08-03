import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { CarIcon, MenuIcon } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-announcement" role="note">
        Auto esclusive oltre 100.000 €, selezionate a Milano e in Lombardia.
      </div>
      <div className="site-header__inner container">
        <BrandMark />
        <nav aria-label="Navigazione principale" className="desktop-nav">
          <Link href="/veicoli">Veicoli</Link>
          <Link href="/#contatti">Servizi</Link>
          <Link href="/magazine/">Magazine</Link>
          <Link href="/contatti/">Contatti</Link>
        </nav>
        <div className="site-header__actions">
          <Link
            className="button button--red site-header__publish desktop-only"
            href="/contatti/#modulo"
          >
            <CarIcon />
            Pubblica un veicolo
          </Link>
          <details className="mobile-menu">
            <summary aria-label="Apri menu">
              <MenuIcon />
            </summary>
            <nav aria-label="Navigazione mobile">
              <Link href="/veicoli">Veicoli</Link>
              <Link href="/#contatti">Servizi</Link>
              <Link href="/magazine/">Magazine</Link>
              <Link href="/contatti/#modulo">Pubblica un veicolo</Link>
              <Link href="/contatti/">Contatti</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
