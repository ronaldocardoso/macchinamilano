import Image from "next/image";

export default function Home() {
  return (
    <main className="relative isolate mx-auto flex min-h-screen w-full max-w-[90rem] flex-col overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-40 -z-10 size-[32rem] -translate-y-1/2 rounded-full border-[7rem] border-[var(--brand-blue)] opacity-20 sm:-right-28 sm:size-[42rem] sm:border-[9rem] lg:-right-16 lg:size-[52rem] lg:border-[11rem]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-10 -z-10 text-[clamp(9rem,24vw,24rem)] leading-none font-black tracking-[-0.08em] text-white/[0.045] select-none"
      >
        MM
      </span>

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

      <section className="flex flex-1 items-center py-16 sm:py-24">
        <div className="max-w-4xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-white/75 uppercase">
            <span aria-hidden="true" className="h-px w-10 bg-white" />
            <span
              aria-hidden="true"
              className="-ml-2 size-1.5 rounded-full bg-[var(--brand-blue)]"
            />
            Il marketplace italiano delle auto eccezionali
          </p>
          <h1 className="max-w-3xl text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-7xl lg:text-[6.5rem]">
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
            tutta Italia.
          </p>
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
