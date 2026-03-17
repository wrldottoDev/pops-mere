"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IceCreamViewer } from "@/components/IceCreamViewer";
import { characters } from "@/data/characters";
import { icecreams, type ConeType } from "@/data/icecreams";

type Category = "hombre" | "mujer";

type StepTwoBuilderProps = {
  initialName: string;
  initialCategory: Category;
  initialCharacterIndex: number;
};

const coneOrder: ConeType[] = ["azucarado", "sencillo"];

function getLoopedIndex(
  currentIndex: number,
  direction: number,
  total: number,
) {
  return (currentIndex + direction + total) % total;
}

function getNextConeType(currentConeType: ConeType, direction: number) {
  const currentIndex = coneOrder.indexOf(currentConeType);
  const nextIndex = getLoopedIndex(currentIndex, direction, coneOrder.length);

  return coneOrder[nextIndex];
}

function formatFlavorName(flavor: string) {
  return flavor.charAt(0).toUpperCase() + flavor.slice(1);
}

export function StepTwoBuilder({
  initialName,
  initialCategory,
  initialCharacterIndex,
}: StepTwoBuilderProps) {
  const router = useRouter();
  const [coneType, setConeType] = useState<ConeType>("azucarado");
  const [flavorIndex, setFlavorIndex] = useState(0);
  const [flavorDirection, setFlavorDirection] = useState(0);
  const [coneDirection, setConeDirection] = useState(0);

  const currentList = useMemo(() => icecreams[coneType], [coneType]);
  const selectedIceCream = currentList[flavorIndex];
  const categoryCharacters = characters[initialCategory];
  const safeCharacterIndex =
    initialCharacterIndex >= 0 && initialCharacterIndex < categoryCharacters.length
      ? initialCharacterIndex
      : 0;

  const handleFlavorChange = (direction: number) => {
    setFlavorDirection(direction);
    setConeDirection(0);
    setFlavorIndex((currentIndex) =>
      getLoopedIndex(currentIndex, direction, currentList.length),
    );
  };

  const handleConeChange = (direction: number) => {
    setConeDirection(direction);
    setFlavorDirection(0);
    setConeType((currentConeType) => {
      const nextConeType = getNextConeType(currentConeType, direction);
      const nextList = icecreams[nextConeType];

      setFlavorIndex((currentIndex) =>
        currentIndex < nextList.length ? currentIndex : 0,
      );

      return nextConeType;
    });
  };

  const handleReady = () => {
    const params = new URLSearchParams({
      name: initialName,
      category: initialCategory,
      characterIndex: String(safeCharacterIndex),
      coneType,
      flavor: selectedIceCream.flavor,
    });

    router.push(`/builder/summary?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[var(--color-light)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="rounded-full bg-white px-4 py-2 font-fredoka text-sm text-[var(--color-blue)] shadow-sm transition hover:scale-[1.02]"
          >
            Volver
          </Link>

          <div className="rounded-full bg-white px-4 py-2 font-fredoka text-xs text-[var(--color-blue)] shadow-sm sm:text-sm">
            {coneType === "azucarado" ? "Cono azucarado" : "Cono sencillo"}
          </div>
        </div>

        <section className="grid gap-6 rounded-[2rem] bg-white p-6 shadow-lg lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[var(--color-light)] px-4 py-2 font-fredoka text-sm text-[var(--color-orange)]">
                Selector interactivo
              </span>

              <h1 className="mt-4 font-fredoka-condensed text-4xl text-[var(--color-orange)] sm:text-5xl">
                Construye tu helado
              </h1>

              <p className="mt-3 max-w-lg font-fredoka text-sm leading-6 text-[var(--color-blue)] sm:text-base">
                Cambia el sabor deslizando a los lados y alterna el tipo de cono
                con un gesto vertical. El preview se actualiza en tiempo real
                con tus combinaciones listas desde la carpeta transformed.
              </p>

              {initialName && (
                <p className="mt-4 font-fredoka text-base text-[var(--color-blue)]">
                  Hola, {initialName}
                </p>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[var(--color-light)] p-5">
                <p className="font-fredoka text-xs uppercase tracking-[0.18em] text-[var(--color-blue)]/70">
                  Sabor actual
                </p>
                <p className="mt-2 font-fredoka-condensed text-3xl text-[var(--color-orange)]">
                  {formatFlavorName(selectedIceCream.flavor)}
                </p>
                <p className="mt-2 font-fredoka text-sm text-[var(--color-blue)]">
                  {flavorIndex + 1} de {currentList.length}
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[var(--color-light)] p-5">
                <p className="font-fredoka text-xs uppercase tracking-[0.18em] text-[var(--color-blue)]/70">
                  Tipo de cono
                </p>
                <p className="mt-2 font-fredoka-condensed text-3xl text-[var(--color-orange)]">
                  {coneType === "azucarado" ? "Azucarado" : "Sencillo"}
                </p>
                <p className="mt-2 font-fredoka text-sm text-[var(--color-blue)]">
                  Desliza arriba o abajo para cambiarlo
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3 rounded-[1.75rem] bg-[var(--color-light)] p-5">
              <p className="font-fredoka text-sm text-[var(--color-blue)]">
                Desliza izquierda/derecha para cambiar sabor
              </p>
              <p className="font-fredoka text-sm text-[var(--color-blue)]">
                Desliza arriba/abajo para cambiar cono
              </p>
            </div>

            <button
              type="button"
              onClick={handleReady}
              className="mt-6 w-full rounded-full bg-[var(--color-orange)] px-5 py-3 font-fredoka text-white transition hover:opacity-90"
            >
              Listo
            </button>
          </div>

          <div className="flex flex-col items-center justify-center rounded-[1.75rem] bg-[linear-gradient(180deg,#f8fdff_0%,#fff8f1_100%)] p-5 sm:p-6">
            <IceCreamViewer
              coneType={coneType}
              flavorIndex={flavorIndex}
              flavorDirection={flavorDirection}
              coneDirection={coneDirection}
              selectedIceCream={selectedIceCream}
              onFlavorChange={handleFlavorChange}
              onConeToggle={handleConeChange}
            />

            <div className="mt-6 flex w-full max-w-[300px] items-center justify-between gap-3 rounded-full bg-white px-4 py-3 shadow-sm">
              <span className="font-fredoka text-sm text-[var(--color-blue)]">
                Swipe activo
              </span>
              <span className="font-fredoka text-sm text-[var(--color-orange)]">
                {flavorDirection !== 0
                  ? "Sabor"
                  : coneDirection !== 0
                    ? "Cono"
                    : "Listo"}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
