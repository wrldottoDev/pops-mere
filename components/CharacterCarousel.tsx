"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";

type Character = {
  id: string;
  name: string;
  image: string;
};

type CharacterCarouselProps = {
  character: Character;
  direction: number;
  onSwipe: (direction: number) => void;
};

const swipeThreshold = 80;

export function CharacterCarousel({
  character,
  direction,
  onSwipe,
}: CharacterCarouselProps) {
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x <= -swipeThreshold) {
      onSwipe(1);
    }

    if (info.offset.x >= swipeThreshold) {
      onSwipe(-1);
    }
  };

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[24px] bg-[var(--color-light)]/40 px-4 py-6">
      <div className="absolute inset-x-10 top-4 h-10 rounded-full bg-white/70 blur-xl" />

      <AnimatePresence custom={direction} initial={false} mode="wait">
        <motion.div
          key={character.id}
          custom={direction}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={handleDragEnd}
          className="relative h-[320px] w-full max-w-[240px] cursor-grab active:cursor-grabbing"
          variants={{
            enter: (currentDirection: number) => ({
              x: currentDirection >= 0 ? 130 : -130,
              opacity: 0,
              scale: 0.96,
            }),
            center: {
              x: 0,
              opacity: 1,
              scale: 1,
            },
            exit: (currentDirection: number) => ({
              x: currentDirection >= 0 ? -130 : 130,
              opacity: 0,
              scale: 0.96,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 260, damping: 26 },
            opacity: { duration: 0.2 },
            scale: { type: "tween", duration: 0.22 },
          }}
        >
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="(max-width: 640px) 240px, 240px"
            className="object-contain select-none"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
