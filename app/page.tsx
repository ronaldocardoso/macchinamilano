import Image from "next/image";

export default function Home() {
  return (
    <main className="relative isolate mx-auto flex min-h-screen w-full max-w-[90rem] flex-col overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
      <header className="relative flex items-center justify-between border-b border-white/30 pb-6">
        <Image
          src="/brand/logo-horizontal-white.png"
          alt="Macchina Milano"
          width={294}
          height={52}
          className="h-auto w-44 sm:w-56"
          priority
        />
        <span className="rounded-full border border-white/20 bg-[var(--brand-blue)] px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] text-white uppercase shadow-[0_0_2rem_rgb(1_14_128_/_0.28)]">
          Prossimamente
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-px left-0 h-px w-24 bg-white sm:w-36"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-px left-24 h-px w-8 bg-[var(--brand-blue)] sm:left-36 sm:w-12"
        />
      </header>

      <section className="grid flex-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:gap-10">
        <div className="max-w-4xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-white/75 uppercase">
            <span aria-hidden="true" className="h-px w-10 bg-white" />
            <span
              aria-hidden="true"
              className="-ml-2 size-1.5 rounded-full bg-[var(--brand-blue)]"
            />
            Il marketplace italiano delle auto eccezionali
          </p>
          <h1 className="max-w-3xl text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-7xl lg:text-[5rem] xl:text-[5.8rem]">
            Auto
            <br />
            <span className="relative inline-block">
              straordinarie.
              <span
                aria-hidden="true"
                className="absolute right-0 -bottom-3 h-2 w-2/5 bg-[var(--brand-blue)] sm:h-3"
              />
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
            Selezionate per chi non cerca un&apos;auto qualunque. Stiamo
            costruendo una nuova destinazione per scoprire veicoli premium da
            Milano e dalla regione.
          </p>
        </div>

        <div
          aria-label="Donna sorridente"
          className="relative aspect-square w-full max-w-[28rem] justify-self-center overflow-hidden rounded-full border-[0.65rem] border-[var(--brand-blue)] bg-[var(--brand-blue)] shadow-[0_2.5rem_6rem_rgb(78_4_0_/_0.38)] sm:max-w-[32rem] lg:max-w-[36rem] lg:justify-self-end"
          role="img"
        >
          <video
            aria-hidden="true"
            autoPlay
            className="h-full w-full object-cover [object-position:center_38%]"
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/media/smiling-woman-hero.mp4" type="video/mp4" />
          </video>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgb(184_17_4_/_0.16),transparent_55%)]"
          />
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-white/30 pt-6 text-xs tracking-[0.12em] text-white/65 uppercase sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-[var(--brand-blue)]"
          />
          Milano · Italia
        </p>
        <p>Esperienza in preparazione</p>
      </footer>
    </main>
  );
}
