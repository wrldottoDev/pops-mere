import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-light)] px-4 py-10 sm:px-6">
      <div className="flex w-full max-w-md flex-col items-center rounded-[28px] bg-white px-6 py-10 shadow-lg sm:max-w-lg sm:px-10 sm:py-12">
        <h1 className="text-center font-chau text-4xl leading-none sm:text-5xl md:text-6xl">
          <span className="text-[var(--color-turquoise)]">P</span>
          <span className="text-[var(--color-red)]">O</span>
          <span className="text-[var(--color-blue)]">P</span>
          <span className="text-[var(--color-orange)]">S</span>
          <span className="text-[var(--color-turquoise)]"> -</span>
          <span className="text-[var(--color-red)]"> L</span>
          <span className="text-[var(--color-blue)]">A</span>
          <span className="text-[var(--color-orange)]">B</span>
        </h1>

        <p className="mt-4 max-w-sm text-center font-fredoka text-sm text-[var(--color-turquoise)] sm:text-base md:text-lg">
          Desliza y crea tu helado.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center">
          <a
            href="/menu.pdf"
            download
            className="flex w-full items-center justify-center rounded-full bg-[var(--color-orange)] px-6 py-3 text-center font-fredoka text-sm text-white transition-transform duration-200 hover:scale-[1.02] sm:w-auto sm:min-w-[180px] sm:text-base"
          >
            Descargar PDF
          </a>

          <Link
            href="/builder"
            className="flex w-full items-center justify-center rounded-full bg-[var(--color-blue)] px-6 py-3 text-center font-fredoka text-sm text-white transition-transform duration-200 hover:scale-[1.02] sm:w-auto sm:min-w-[180px] sm:text-base"
          >
            Empezar
          </Link>
        </div>
      </div>
    </main>
  );
}
