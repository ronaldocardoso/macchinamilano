import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { CarIcon, HeartIcon, MenuIcon } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <BrandMark />
        <nav aria-label="Navigazione principale" className="desktop-nav">
          <Link href="/veicoli">Veicoli</Link>
          <Link href="/#marche">Marche</Link>
          <Link href="/#selezioni">Selezioni</Link>
          <Link href="/#magazine">Magazine</Link>
        </nav>
        <div className="site-header__actions">
          <Link
            aria-label="Veicoli salvati"
            className="icon-button desktop-only"
            href="/veicoli"
          >
            <HeartIcon />
          </Link>
          <Link className="button button--blue desktop-only" href="/#contatti">
            <CarIcon />
            Pubblica un veicolo
          </Link>
          <details className="mobile-menu">
            <summary aria-label="Apri menu">
              <MenuIcon />
            </summary>
            <nav aria-label="Navigazione mobile">
              <Link href="/veicoli">Veicoli</Link>
              <Link href="/#marche">Marche</Link>
              <Link href="/#selezioni">Selezioni</Link>
              <Link href="/#magazine">Magazine</Link>
              <Link href="/#contatti">Pubblica un veicolo</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
