"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CharacterCarousel } from "@/components/CharacterCarousel";
import { characters } from "@/data/characters";

type Category = "hombre" | "mujer" | "otro";

function getNextIndex(currentIndex: number, direction: number, total: number) {
  return (currentIndex + direction + total) % total;
}

export default function BuilderPage() {
  const router = useRouter();
  const [category, setCategory] = useState<Category>("hombre");
  const [characterIndex, setCharacterIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [name, setName] = useState("");

  const currentCharacters = useMemo(() => characters[category], [category]);
  const selectedCharacter = currentCharacters[characterIndex];
  const trimmedName = name.trim();
  const characterNumber = selectedCharacter.name.match(/\d+$/)?.[0] ?? "1";

  const changeCategory = (newCategory: Category) => {
    setCategory(newCategory);
    setCharacterIndex(0);
    setDirection(0);
  };

  const changeCharacter = (nextDirection: number) => {
    setDirection(nextDirection);
    setCharacterIndex((currentIndex) =>
      getNextIndex(currentIndex, nextDirection, currentCharacters.length),
    );
  };

  const handleContinue = () => {
    if (!trimmedName) {
      return;
    }

    const params = new URLSearchParams({
      name: trimmedName,
      category,
      characterIndex: String(characterIndex),
    });

    router.push(`/builder/step-2?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[var(--color-light)] px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="text-center font-fredoka-condensed text-4xl text-[var(--color-orange)] sm:text-5xl">
          Elige tu personaje
        </h1>

        <p className="mt-2 text-center font-fredoka text-[var(--color-blue)]">
          Selecciona una categoría, desliza para cambiar de personaje y escribe
          tu nombre.
        </p>

        <div className="mt-6 flex w-full gap-2">
          <button
            type="button"
            onClick={() => changeCategory("hombre")}
            className={`flex-1 rounded-full px-4 py-3 font-fredoka text-sm text-white transition sm:text-base ${
              category === "hombre"
                ? "bg-[var(--color-orange)]"
                : "bg-[var(--color-blue)]"
            }`}
          >
            Hombre
          </button>

          <button
            type="button"
            onClick={() => changeCategory("mujer")}
            className={`flex-1 rounded-full px-4 py-3 font-fredoka text-sm text-white transition sm:text-base ${
              category === "mujer"
                ? "bg-[var(--color-orange)]"
                : "bg-[var(--color-blue)]"
            }`}
          >
            Mujer
          </button>

          <button
            type="button"
            onClick={() => changeCategory("otro")}
            className={`flex-1 rounded-full px-4 py-3 font-fredoka text-sm text-white transition sm:text-base ${
              category === "otro"
                ? "bg-[var(--color-orange)]"
                : "bg-[var(--color-blue)]"
            }`}
          >
            Otro
          </button>
        </div>

        <section className="mt-8 rounded-[28px] bg-white p-6 shadow-lg sm:p-7">
          <CharacterCarousel
            character={selectedCharacter}
            direction={direction}
            onSwipe={changeCharacter}
          />

          <div className="mt-4 flex items-center justify-between gap-3 rounded-full bg-[var(--color-light)] px-4 py-3 font-fredoka text-sm text-[var(--color-blue)]">
            <span>Personaje {characterNumber}</span>
            <span>
              {characterIndex + 1}/{currentCharacters.length}
            </span>
          </div>

          <p className="mt-4 text-center font-fredoka text-sm text-[var(--color-blue)]">
            Desliza horizontalmente para cambiar de personaje
          </p>

          <label className="mt-5 block">
            <span className="mb-2 block text-center font-fredoka text-sm text-[var(--color-blue)]">
              Tu nombre
            </span>
            <input
              type="text"
              placeholder="Escribe tu nombre"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-full border border-gray-300 px-4 py-3 text-center font-fredoka text-[var(--color-blue)] placeholder:text-gray-400 focus:border-[var(--color-orange)] focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)]/30"
            />
          </label>

          {trimmedName && (
            <p className="mt-3 text-center font-fredoka text-[var(--color-blue)]">
              Hola, {trimmedName}
            </p>
          )}

          <button
            type="button"
            onClick={handleContinue}
            disabled={!trimmedName}
            className={`mt-6 w-full rounded-full px-5 py-3 font-fredoka text-white transition ${
              trimmedName
                ? "bg-[var(--color-orange)] hover:opacity-90"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            Continuar
          </button>
        </section>
      </div>
    </main>
  );
}
