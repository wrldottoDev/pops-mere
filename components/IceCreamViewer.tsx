"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import type { ConeType, IceCreamOption } from "@/data/icecreams";

type IceCreamViewerProps = {
  coneType: ConeType;
  flavorIndex: number;
  flavorDirection: number;
  coneDirection: number;
  selectedIceCream: IceCreamOption;
  onFlavorChange: (direction: number) => void;
  onConeToggle: (direction: number) => void;
};

const horizontalThreshold = 50;
const verticalThreshold = 50;

export function IceCreamViewer({
  coneType,
  flavorIndex,
  flavorDirection,
  coneDirection,
  selectedIceCream,
  onFlavorChange,
  onConeToggle,
}: IceCreamViewerProps) {
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const { x, y } = info.offset;
    const isHorizontalGesture = Math.abs(x) > Math.abs(y);

    if (isHorizontalGesture) {
      if (x <= -horizontalThreshold) {
        onFlavorChange(1);
      }

      if (x >= horizontalThreshold) {
        onFlavorChange(-1);
      }

      return;
    }

    if (y <= -verticalThreshold || y >= verticalThreshold) {
      onConeToggle(y < 0 ? 1 : -1);
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <motion.div
        className="absolute bottom-5 h-8 w-40 rounded-full bg-[var(--color-blue)]/12 blur-md"
        animate={{ scaleX: coneType === "azucarado" ? 1.04 : 0.96 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      />

      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.16}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.02 }}
        className="relative flex h-[400px] w-full max-w-[300px] touch-none items-center justify-center rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,248,248,0.92))] p-4 shadow-[0_24px_60px_rgba(26,134,176,0.12)]"
      >
        <div className="absolute inset-x-8 top-5 h-10 rounded-full bg-white/90 blur-xl" />
        <div className="absolute left-5 top-7 h-4 w-4 rounded-full bg-[var(--color-orange)]/18" />
        <div className="absolute right-6 top-10 h-3 w-3 rounded-full bg-[var(--color-turquoise)]/25" />

        <AnimatePresence
          initial={false}
          mode="wait"
          custom={{ flavorDirection, coneDirection }}
        >
          <motion.div
            key={`${coneType}-${selectedIceCream.flavor}-${flavorIndex}`}
            custom={{ flavorDirection, coneDirection }}
            variants={{
              enter: ({
                flavorDirection: nextFlavorDirection,
                coneDirection: nextConeDirection,
              }: {
                flavorDirection: number;
                coneDirection: number;
              }) => ({
                opacity: 0,
                x: nextFlavorDirection === 0 ? 0 : nextFlavorDirection > 0 ? 90 : -90,
                y: nextConeDirection === 0 ? 0 : nextConeDirection > 0 ? 80 : -80,
                scale: 0.96,
              }),
              center: {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              },
              exit: ({
                flavorDirection: nextFlavorDirection,
                coneDirection: nextConeDirection,
              }: {
                flavorDirection: number;
                coneDirection: number;
              }) => ({
                opacity: 0,
                x: nextFlavorDirection === 0 ? 0 : nextFlavorDirection > 0 ? -90 : 90,
                y: nextConeDirection === 0 ? 0 : nextConeDirection > 0 ? -80 : 80,
                scale: 0.96,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 170, damping: 24 },
              y: { type: "spring", stiffness: 165, damping: 23 },
              opacity: { duration: 0.3 },
              scale: { type: "tween", duration: 0.32 },
            }}
            className="relative h-full w-full"
          >
            <motion.div
              animate={{
                scale: coneDirection === 0 ? [1, 1.015, 1] : [1, 1.03, 0.99, 1],
              }}
              transition={{
                type: "tween",
                duration: coneDirection === 0 ? 0.34 : 0.5,
                times: coneDirection === 0 ? [0, 0.55, 1] : [0, 0.4, 0.72, 1],
              }}
              className="relative h-full w-full"
            >
              <Image
                src={selectedIceCream.image}
                alt={`Helado de ${selectedIceCream.flavor} en cono ${coneType}`}
                fill
                sizes="(max-width: 640px) 280px, 300px"
                className="object-contain select-none"
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
