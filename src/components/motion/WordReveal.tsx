"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

interface WordRevealProps {
  text: string;
  className?: string;
}

/**
 * Primitiva de animación tipo Apple: el párrafo se "enciende" palabra por palabra
 * a medida que el usuario hace scroll.
 *
 * Rango: empieza apenas el párrafo asoma por el borde inferior de la pantalla y
 * termina cuando su final llega al 72% de la altura. Así el texto queda completo
 * justo cuando la sección está centrada, con el nombre todavía visible arriba.
 * Cada palabra ocupa una fracción igual de ese recorrido (opacidad 0.15 → 1).
 */
export function WordReveal({ text, className }: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 1", "end 0.72"] });
  const words = text.split(" ");

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {/* Texto completo para lectores de pantalla; las palabras animadas se ocultan. */}
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <Word key={`${word}-${index}`} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span aria-hidden="true" style={{ opacity }} className="mr-[0.28em]">
      {children}
    </motion.span>
  );
}
