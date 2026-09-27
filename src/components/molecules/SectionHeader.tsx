import type { ReactNode } from "react";
import { GradientText } from "@/components/atoms/GradientText";
import { Heading } from "@/components/atoms/Heading";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  /** Primera parte del título, en crema. */
  title: string;
  /** Palabra destacada con el degradado firma. */
  highlight: string;
  description?: ReactNode;
}

/** Molécula: encabezado centrado de cada sección (eyebrow + título + descripción). */
export function SectionHeader({ id, eyebrow, title, highlight, description }: SectionHeaderProps) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="flex items-center justify-center gap-3 font-mono text-xs tracking-[0.2em] text-mist uppercase before:h-px before:w-7 before:bg-mist after:h-px after:w-7 after:bg-mist">
        {eyebrow}
      </p>
      <Heading level={2} id={id} className="mt-3">
        {title} <GradientText>{highlight}</GradientText>
      </Heading>
      {description && <p className="mt-3 text-[0.97rem] text-mist">{description}</p>}
    </Reveal>
  );
}
