"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Mantiene un valor dentro de [min, max) dando la vuelta, para un bucle infinito. */
function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

interface ParallaxTextProps {
  children: ReactNode;
  /** Velocidad base en % por segundo. El signo define la dirección. */
  baseVelocity?: number;
  className?: string;
}

/**
 * Primitiva de animación: fila de texto gigante que se desplaza sin fin.
 *
 * Se mueve siempre a `baseVelocity` y, además, acelera según la velocidad del
 * scroll (suavizada con un resorte). Al hacer scroll hacia arriba invierte el
 * sentido, lo que da la sensación de que el texto "flota" con el usuario.
 */
export function ParallaxText({ children, baseVelocity = 2, className }: ParallaxTextProps) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  // Resorte suave: el impulso del scroll entra y se disipa gradualmente, sin tirones.
  const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 180 });
  // Un scroll de 1000 px/s suma como máximo 1.2 veces la velocidad base.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.2], { clamp: false });
  // El contenido se repite 4 veces; moverse entre -25% y -50% hace el bucle imperceptible.
  const x = useTransform(baseX, (value) => `${wrap(-25, -50, value)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) direction.current = -1;
    else if (velocityFactor.get() > 0) direction.current = 1;
    moveBy += direction.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap" aria-hidden="true">
      <motion.div className={cn("flex whitespace-nowrap", className)} style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="block pr-[0.4em]">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
