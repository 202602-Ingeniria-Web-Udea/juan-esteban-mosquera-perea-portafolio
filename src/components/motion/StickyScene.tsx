"use client";

import { useScroll, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface StickySceneProps {
  /** Alto total de la escena (clase de Tailwind). Más alto = animación más larga. */
  heightClassName: string;
  className?: string;
  id?: string;
  ariaLabel?: string;
  /** Recibe el progreso 0 → 1 de la escena y dibuja el contenido fijo. */
  children: (progress: MotionValue<number>) => ReactNode;
}

/**
 * Primitiva de animación tipo Apple: un contenedor alto con un hijo `sticky`
 * del tamaño de la pantalla. Mientras el usuario recorre el contenedor, el
 * contenido queda fijo y avanza según el progreso (0 al entrar, 1 al salir).
 */
export function StickyScene({ heightClassName, className, id, ariaLabel, children }: StickySceneProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} id={id} aria-label={ariaLabel} className={cn("relative", heightClassName, className)}>
      <div className="sticky top-0 h-svh overflow-hidden">{children(scrollYProgress)}</div>
    </section>
  );
}
