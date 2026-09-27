"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { StickyScene } from "@/components/motion/StickyScene";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

/** Estilo de cada línea de la frase: sólida, degradada, contorno, sólida. */
const lineStyles = ["text-cream", "text-gradient animate-shine", "text-outline [-webkit-text-stroke-color:rgb(240_235_216/0.75)]", "text-cream"];

/**
 * Organismo: escena inicial tipo Apple.
 *
 * La frase queda fija en pantalla durante ~120vh de scroll:
 * - 0.00 – 0.55: cada línea se "enciende" una tras otra (opacidad 0.12 → 1 y sube).
 * - 0.60 – 1.00: la frase completa se aleja (escala 1 → 0.88, sube y se desvanece)
 *   para dar paso al perfil.
 */
export function IntroScene() {
  const reduceMotion = useReducedMotion();
  return (
    <StickyScene heightClassName={reduceMotion ? "h-svh" : "h-[220vh]"} ariaLabel="Presentación">
      {(progress) => <IntroContent progress={progress} reduceMotion={Boolean(reduceMotion)} />}
    </StickyScene>
  );
}

function IntroContent({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) {
  const scale = useTransform(progress, [0.6, 1], [1, 0.88]);
  const opacity = useTransform(progress, [0.7, 0.98], [1, 0]);
  const y = useTransform(progress, [0.6, 1], [0, -90]);
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0]);
  const lines = profile.introLines;

  return (
    <div className="flex h-full flex-col justify-center px-6 md:px-12 xl:px-16">
      <motion.div style={reduceMotion ? undefined : { scale, opacity, y }} className="origin-left">
        <p className="mb-7 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-mist uppercase before:h-px before:w-7 before:bg-mist">
          Portafolio · 2026
        </p>
        <h2 className="font-display text-[clamp(2.6rem,6.4vw,5.75rem)] leading-[0.98] font-bold tracking-[-0.045em]">
          {lines.map((line, index) => (
            <IntroLine
              key={line}
              progress={progress}
              // La primera línea arranca encendida; las demás se reparten entre 0.08 y 0.55.
              range={index === 0 ? null : [0.08 + (index - 1) * 0.16, 0.22 + (index - 1) * 0.16]}
              reduceMotion={reduceMotion}
              className={lineStyles[index % lineStyles.length]}
            >
              {line}
            </IntroLine>
          ))}
        </h2>
      </motion.div>

      <motion.div
        style={{ opacity: hintOpacity }}
        className="absolute bottom-24 left-6 flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-mist md:bottom-10 md:left-12 xl:left-16"
        aria-hidden="true"
      >
        <span className="relative h-8 w-5 rounded-full border-[1.5px] border-mist after:absolute after:top-1.5 after:left-1/2 after:h-1.5 after:w-[3px] after:-translate-x-1/2 after:animate-bounce after:rounded-full after:bg-cream" />
        HAZ SCROLL
      </motion.div>
    </div>
  );
}

interface IntroLineProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number] | null;
  reduceMotion: boolean;
  className: string;
}

function IntroLine({ children, progress, range, reduceMotion, className }: IntroLineProps) {
  const [start, end] = range ?? [0, 0.001];
  const opacity = useTransform(progress, [start, end], [range ? 0.12 : 1, 1]);
  const y = useTransform(progress, [start, end], [range ? 28 : 0, 0]);
  return (
    <motion.span style={reduceMotion ? undefined : { opacity, y }} className={cn("block pb-[0.06em]", className)}>
      {children}
    </motion.span>
  );
}
