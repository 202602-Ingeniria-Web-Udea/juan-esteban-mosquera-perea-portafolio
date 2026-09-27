"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Configuración global de animaciones: si el sistema pide "reducir movimiento",
 * Motion desactiva las animaciones de transformación y deja solo los fades.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
