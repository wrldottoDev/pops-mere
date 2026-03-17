import Image from "next/image";
import Link from "next/link";
import { characters } from "@/data/characters";
import { icecreams, type ConeType } from "@/data/icecreams";

type Category = "hombre" | "mujer" | "otro";

type SummaryPageProps = {
  searchParams: Promise<{
    name?: string;
    category?: string;
    characterIndex?: string;
    coneType?: string;
    flavor?: string;
  }>;
};

function formatFlavorName(flavor: string) {
  return flavor.charAt(0).toUpperCase() + flavor.slice(1);
}

export default async function BuilderSummaryPage({
  searchParams,
}: SummaryPageProps) {
  const params = await searchParams;
  const name = params.name?.trim() ?? "Sin nombre";
  const category: Category =
    params.category === "mujer" || params.category === "otro"
      ? params.category
      : "hombre";
  const parsedCharacterIndex = Number(params.characterIndex ?? 0);
  const safeCharacterIndex = Number.isInteger(parsedCharacterIndex)
    ? parsedCharacterIndex
    : 0;
  const coneType: ConeType =
    params.coneType === "sencillo" ? "sencillo" : "azucarado";

  const selectedCharacterList = characters[category];
  const selectedCharacter =
    selectedCharacterList[safeCharacterIndex] ?? selectedCharacterList[0];
  const characterNumber = selectedCharacter.name.match(/\d+$/)?.[0] ?? "1";

  const selectedConeList = icecreams[coneType];
  const selectedIceCream =
    selectedConeList.find((item) => item.flavor === params.flavor) ??
    selectedConeList[0];

  return (
    <main className="min-h-screen bg-[var(--color-light)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/builder/step-2"
            className="rounded-full bg-white px-4 py-2 font-fredoka text-sm text-[var(--color-blue)] shadow-sm transition hover:scale-[1.02]"
          >
            Volver
          </Link>

          <Link
            href="/"
            className="rounded-full bg-[var(--color-orange)] px-4 py-2 font-fredoka text-sm text-white shadow-sm transition hover:opacity-90"
          >
            Inicio
          </Link>
        </div>

        <section className="grid gap-6 rounded-[2rem] bg-white p-6 shadow-lg lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[var(--color-light)] px-4 py-2 font-fredoka text-sm text-[var(--color-orange)]">
                Resumen final
              </span>

              <h1 className="mt-4 font-fredoka-condensed text-4xl text-[var(--color-orange)] sm:text-5xl">
                Tu pedido esta listo
              </h1>

              <p className="mt-3 font-fredoka text-base text-[var(--color-blue)]">
                Hola, {name}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[var(--color-light)] p-5">
                <p className="font-fredoka text-xs uppercase tracking-[0.18em] text-[var(--color-blue)]/70">
                  Character
                </p>
                <p className="mt-2 font-fredoka-condensed text-3xl text-[var(--color-orange)]">
                  Personaje {characterNumber}
                </p>
                <p className="mt-2 font-fredoka text-sm text-[var(--color-blue)]">
                  Categoria {category}
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[var(--color-light)] p-5">
                <p className="font-fredoka text-xs uppercase tracking-[0.18em] text-[var(--color-blue)]/70">
                  Helado
                </p>
                <p className="mt-2 font-fredoka-condensed text-3xl text-[var(--color-orange)]">
                  {formatFlavorName(selectedIceCream.flavor)}
                </p>
                <p className="mt-2 font-fredoka text-sm text-[var(--color-blue)]">
                  Cono {coneType}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3 rounded-[1.75rem] bg-[var(--color-light)] p-5">
              <p className="font-fredoka text-sm text-[var(--color-blue)]">
                Nombre: <span className="text-[var(--color-orange)]">{name}</span>
              </p>
              <p className="font-fredoka text-sm text-[var(--color-blue)]">
                Character:{" "}
                <span className="text-[var(--color-orange)]">
                  Personaje {characterNumber}
                </span>
              </p>
              <p className="font-fredoka text-sm text-[var(--color-blue)]">
                Sabor del helado:{" "}
                <span className="text-[var(--color-orange)]">
                  {formatFlavorName(selectedIceCream.flavor)}
                </span>
              </p>
              <p className="font-fredoka text-sm text-[var(--color-blue)]">
                Sabor del cono:{" "}
                <span className="text-[var(--color-orange)]">
                  {coneType === "azucarado" ? "Azucarado" : "Sencillo"}
                </span>
              </p>
            </div>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] bg-[linear-gradient(180deg,#f8fdff_0%,#fff8f1_100%)] p-5 sm:p-6">
            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
              <p className="mb-3 text-center font-fredoka text-sm text-[var(--color-blue)]">
                Tu character
              </p>
              <div className="relative mx-auto h-[260px] w-full max-w-[220px]">
                <Image
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  fill
                  sizes="(max-width: 640px) 220px, 220px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
              <p className="mb-3 text-center font-fredoka text-sm text-[var(--color-blue)]">
                Tu helado
              </p>
              <div className="relative mx-auto h-[300px] w-full max-w-[220px]">
                <Image
                  src={selectedIceCream.image}
                  alt={`Helado de ${selectedIceCream.flavor}`}
                  fill
                  sizes="(max-width: 640px) 220px, 220px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
