"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { SocialLink } from "@/components/molecules/SocialLink";
import { socials } from "@/data/socials";

/**
 * Organismo: menú derecho fijo con las redes sociales (mínimo GitHub y LinkedIn).
 * En escritorio es una columna con barra de progreso de lectura; en móvil pasa
 * a ser una barra flotante en la parte inferior.
 */
export function SocialRail() {
  const { scrollYProgress } = useScroll();
  const percentage = useTransform(scrollYProgress, (value) => `${Math.round(value * 100)}%`);

  return (
    <>
      <nav
        aria-label="Redes sociales"
        className="fixed inset-y-0 right-0 z-30 hidden w-[76px] flex-col items-center border-l border-steel/45 bg-navy/55 pt-24 pb-8 backdrop-blur-xl md:flex lg:pt-8"
      >
        <p className="mb-5 font-display text-[0.65rem] font-semibold tracking-[0.14em] text-mist uppercase">Links</p>
        <ul className="flex flex-col gap-3.5">
          {socials.map((social) => (
            <li key={social.label}>
              <SocialLink {...social} />
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col items-center gap-2.5" aria-hidden="true">
          <div className="h-44 w-[3px] overflow-hidden rounded-full bg-steel/50">
            <motion.div className="size-full origin-top bg-signature" style={{ scaleY: scrollYProgress }} />
          </div>
          <motion.span className="font-mono text-[0.62rem] text-mist">{percentage}</motion.span>
        </div>
      </nav>

      <nav
        aria-label="Redes sociales"
        className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2.5 rounded-full border border-mist/35 bg-navy/85 p-2 backdrop-blur-xl md:hidden"
      >
        {socials.map((social) => (
          <SocialLink key={social.label} {...social} tooltip="top" />
        ))}
      </nav>
    </>
  );
}
