"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retraso en segundos; útil para entradas escalonadas en grillas. */
  delay?: number;
  /** Desplazamiento vertical inicial en píxeles. */
  y?: number;
}

/**
 * Primitiva de animación: aparece con fade y desplazamiento al entrar en pantalla.
 * Con "reducir movimiento" activo, MotionConfig deja solo el fade.
 */
export function Reveal({ children, className, delay = 0, y = 32 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
