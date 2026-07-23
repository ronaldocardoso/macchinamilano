import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[90rem] flex-col px-6 py-8 sm:px-10 lg:px-16">
      <header className="flex items-center justify-between border-b border-white/15 pb-6">
        <Image
          src="/brand/logo-horizontal-white.png"
          alt="Macchina Milano"
          width={294}
          height={52}
          className="h-auto w-44 sm:w-56"
          priority
        />
        <span className="rounded-full border border-white/20 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] text-white/70 uppercase">
          Prossimamente
        </span>
      </header>

      <section className="flex flex-1 items-center py-16 sm:py-24">
        <div className="max-w-4xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-white/60 uppercase">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[var(--brand-red)]"
            />
            Il marketplace italiano delle auto eccezionali
          </p>
          <h1 className="max-w-3xl text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-7xl lg:text-[6.5rem]">
            Auto straordinarie.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/66 sm:text-xl">
            Selezionate per chi non cerca un&apos;auto qualunque. Stiamo
            costruendo una nuova destinazione per scoprire veicoli premium da
            tutta Italia.
          </p>
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-white/15 pt-6 text-xs tracking-[0.12em] text-white/45 uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>Milano · Italia</p>
        <p>Esperienza in preparazione</p>
      </footer>
    </main>
  );
}
