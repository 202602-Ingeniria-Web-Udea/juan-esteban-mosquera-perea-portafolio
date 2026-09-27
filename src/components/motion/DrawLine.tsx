"use client";

import { motion, type MotionValue } from "motion/react";
import { cn } from "@/lib/cn";

interface DrawLineProps {
  /** Progreso 0 → 1 que controla cuánto de la línea está dibujada. */
  progress: MotionValue<number>;
  className?: string;
}

/** Primitiva de animación: línea vertical que se dibuja de arriba hacia abajo según el progreso. */
export function DrawLine({ progress, className }: DrawLineProps) {
  return (
    <div aria-hidden="true" className={cn("w-0.5 rounded-full bg-steel/50", className)}>
      <motion.div
        className="size-full origin-top rounded-full bg-signature shadow-[0_0_14px_rgb(240_235_216/0.4)]"
        style={{ scaleY: progress }}
      />
    </div>
  );
}
