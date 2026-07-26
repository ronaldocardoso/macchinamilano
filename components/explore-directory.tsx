import Image from "next/image";
import Link from "next/link";

import {
  bodyStyles,
  exploreBrands,
  type ExploreOption,
} from "@/lib/explore-options";

type ExploreGroupProps = {
  accent: string;
  allHref: string;
  allLabel: string;
  id: string;
  options: ExploreOption[];
  queryKey: "marca" | "carrozzeria";
  title: string;
};

function ExploreGroup({
  accent,
  allHref,
  allLabel,
  id,
  options,
  queryKey,
  title,
}: ExploreGroupProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="explore-group" id={id}>
      <header className="explore-group__header">
        <h2 id={`${id}-title`}>
          {title} <span>{accent}</span>
        </h2>
        <Link href={allHref}>{allLabel}</Link>
      </header>
      <div className="explore-options">
        {options.map((option) => (
          <Link
            href={{
              pathname: "/veicoli",
              query: { [queryKey]: option.value },
            }}
            key={option.value}
          >
            <span className="explore-options__media">
              <Image
                alt={option.label}
                height={120}
                src={option.image}
                width={250}
              />
            </span>
            <strong>{option.label}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ExploreDirectory() {
  return (
    <section
      aria-label="Esplora veicoli per marca o carrozzeria"
      className="explore-directory"
    >
      <div className="explore-directory__grid container">
        <ExploreGroup
          accent="marca"
          allHref="/veicoli"
          allLabel="Tutte le marche"
          id="marche"
          options={exploreBrands}
          queryKey="marca"
          title="Esplora per"
        />
        <ExploreGroup
          accent="carrozzeria"
          allHref="/veicoli"
          allLabel="Tutte le carrozzerie"
          id="carrozzerie"
          options={bodyStyles}
          queryKey="carrozzeria"
          title="Esplora per"
        />
      </div>
    </section>
  );
}
