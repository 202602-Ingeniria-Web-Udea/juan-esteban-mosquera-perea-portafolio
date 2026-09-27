"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/atoms/Button";
import { profile } from "@/data/profile";

const CTA_LINES = ["¿Construimos algo", "juntos?"];

/**
 * Organismo: footer con llamado a la acción.
 * La frase tiene dos capas: una tenue y otra con el degradado encima, que se
 * descubre de izquierda a derecha según el scroll (clip-path).
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const reveal = useTransform(scrollYProgress, [0.1, 0.75], [100, 0]);
  const clipPath = useTransform(reveal, (value) => `inset(0 ${reduceMotion ? 0 : value}% 0 0)`);

  return (
    <footer ref={ref} id="contacto" className="relative px-6 pt-28 pb-28 text-center md:px-12 md:pb-10 xl:px-16">
      <p className="flex items-center justify-center gap-3 font-mono text-xs tracking-[0.2em] text-mist uppercase before:h-px before:w-7 before:bg-mist after:h-px after:w-7 after:bg-mist">
        ¿Hablamos?
      </p>
      <h2 className="relative mx-auto mt-6 w-fit font-display text-[clamp(2.6rem,7vw,5rem)] leading-none font-bold tracking-[-0.045em]">
        <span className="block text-cream/15">
          {CTA_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
        <motion.span aria-hidden="true" style={{ clipPath }} className="absolute inset-0 block">
          {CTA_LINES.map((line) => (
            <span key={line} className="text-gradient block">
              {line}
            </span>
          ))}
        </motion.span>
      </h2>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href={`mailto:${profile.email}`} icon="mail">
          {profile.email}
        </Button>
        <Button variant="secondary" href={profile.cvUrl} download={profile.cvFileName} icon="download">
          Descargar CV
        </Button>
      </div>

      <div className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-steel/50 pt-6 text-[0.8rem] text-mist md:flex-row">
        <p>© 2026 {profile.name}</p>
        <p>Hecho con Next.js · Tailwind CSS · TypeScript</p>
        <a href="#perfil" className="transition-colors hover:text-cream">
          Volver arriba ↑
        </a>
      </div>
    </footer>
  );
}
