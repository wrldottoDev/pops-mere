import { StepTwoBuilder } from "@/components/StepTwoBuilder";

type Category = "hombre" | "mujer" | "otro";

type StepTwoPageProps = {
  searchParams: Promise<{
    name?: string;
    category?: string;
    characterIndex?: string;
  }>;
};

export default async function BuilderStepTwoPage({
  searchParams,
}: StepTwoPageProps) {
  const params = await searchParams;
  const initialName = params.name?.trim() ?? "";
  const initialCategory: Category =
    params.category === "mujer" || params.category === "otro"
      ? params.category
      : "hombre";
  const parsedCharacterIndex = Number(params.characterIndex ?? 0);
  const initialCharacterIndex =
    Number.isInteger(parsedCharacterIndex) && parsedCharacterIndex >= 0
      ? parsedCharacterIndex
      : 0;

  return (
    <StepTwoBuilder
      initialName={initialName}
      initialCategory={initialCategory}
      initialCharacterIndex={initialCharacterIndex}
    />
  );
}
