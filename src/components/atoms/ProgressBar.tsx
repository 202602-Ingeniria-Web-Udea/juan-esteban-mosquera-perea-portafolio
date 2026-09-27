"use client";

import { motion } from "motion/react";

interface ProgressBarProps {
  value: number;
  label: string;
}

/**
 * Átomo: barra de porcentaje con relleno degradado.
 * Se llena desde 0 hasta el valor cuando entra en pantalla.
 */
export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div
      className="h-[5px] overflow-hidden rounded-full bg-steel/45"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full bg-signature shadow-[0_0_12px_rgb(240_235_216/0.35)]"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </div>
  );
}
