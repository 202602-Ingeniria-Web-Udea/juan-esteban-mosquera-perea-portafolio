"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { PhotoPlaceholder } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { GradientText } from "@/components/atoms/GradientText";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Shape } from "@/components/atoms/Shape";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { profile } from "@/data/profile";
import type { IconName } from "@/lib/icons";
import { TerminalDialog } from "./TerminalDialog";

/** Datos flotantes alrededor de la foto. */
const floatingChips: Array<{ icon: IconName; strong: string; text: string; className: string; delay: number }> = [
  { icon: "graduation", strong: "8.º semestre", text: "· UdeA", className: "top-[8%] -left-2", delay: 0 },
  { icon: "server", strong: "Backend", text: "· Data · AI", className: "right-0 bottom-[16%]", delay: 1.2 },
  { icon: "mapPin", strong: "", text: "Medellín, CO", className: "bottom-[3%] left-[8%]", delay: 2.4 },
];

/**
 * Organismo: sección Perfil (estructura del Figma).
 * Nombre, rol, descripción que se revela palabra por palabra, botón que abre la
 * terminal y foto con fondo blanco dentro de un marco orgánico con parallax.
 */
export function ProfileSection() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  // La foto y sus aros se desplazan a distinta velocidad que el texto (parallax).
  const photoY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 60, reduceMotion ? 0 : -60]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 50]);

  return (
    <section
      ref={sectionRef}
      id="perfil"
      aria-labelledby="perfil-titulo"
      className="relative grid min-h-svh items-center gap-6 px-6 py-16 md:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 xl:px-16"
    >
      <div className="order-2 lg:order-1">
        <Reveal>
          <p className="font-display text-lg text-mist md:text-xl">Hola, soy</p>
          <Heading level={1} id="perfil-titulo" className="mt-1">
            {profile.firstName}
            <br />
            {profile.name.replace(profile.firstName, "").trim()}
          </Heading>
          <p className="mt-3 font-display text-[clamp(1.3rem,2.4vw,1.85rem)] leading-tight font-semibold tracking-[-0.02em]">
            <GradientText>{profile.role}</GradientText>
          </p>
        </Reveal>
        <WordReveal text={profile.summary} className="mt-6 max-w-[560px] text-[0.98rem] leading-relaxed md:text-[1.05rem]" />
        <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
          <Button icon="terminal" onClick={() => setIsTerminalOpen(true)}>
            Conóceme
          </Button>
          <Button variant="secondary" icon="download" href={profile.cvUrl} download={profile.cvFileName}>
            Descargar CV
          </Button>
        </Reveal>
      </div>

      <motion.div style={{ y: photoY }} className="relative order-1 mx-auto grid h-[300px] w-full max-w-[420px] place-items-center lg:order-2 lg:h-[520px]">
        <div aria-hidden="true" className="absolute size-[280px] rounded-full bg-[radial-gradient(circle,rgb(240_235_216/0.22),transparent_65%)] lg:size-[440px]" />
        <motion.div style={{ rotate: orbitRotate }} className="absolute grid place-items-center" aria-hidden="true">
          <Shape variant="ring" className="size-[270px] border-dashed border-mist/20 lg:size-[520px]" />
        </motion.div>
        <Shape variant="ring" className="absolute size-[240px] lg:size-[450px]" />

        {/* Marco orgánico con fondo blanco (requisito: foto en fondo blanco). */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[230px] w-[186px] overflow-hidden rounded-[46%_54%_42%_58%/38%_40%_60%_62%] bg-white shadow-[0_30px_80px_rgb(0_0_0/0.45),0_0_0_1px_rgb(240_235_216/0.4)] lg:h-[400px] lg:w-[324px]"
        >
          {profile.photo ? (
            <Image src={profile.photo} alt={`Foto de ${profile.name}`} fill sizes="(min-width: 1024px) 324px, 186px" className="object-cover" priority />
          ) : (
            <PhotoPlaceholder className="translate-y-[12%] scale-110" />
          )}
        </motion.div>

        {floatingChips.map((chip) => (
          <motion.div
            key={chip.text}
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
            className={`absolute hidden items-center gap-2 rounded-2xl border border-mist/35 bg-navy/85 px-3.5 py-2 text-[0.78rem] shadow-[0_12px_30px_rgb(0_0_0/0.3)] backdrop-blur-md sm:flex ${chip.className}`}
          >
            <Icon name={chip.icon} className="size-4 text-mist" />
            <span>
              {chip.strong && <b className="font-display font-semibold">{chip.strong} </b>}
              {chip.text}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <TerminalDialog open={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </section>
  );
}
