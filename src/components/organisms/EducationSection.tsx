"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { EducationRow } from "@/components/molecules/EducationRow";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import { education } from "@/data/education";

/**
 * Organismo: sección Educación. Un solo contenedor con filas, como en el Figma,
 * y una línea de tiempo que se dibuja desde que el contenedor entra por el 75%
 * de la pantalla hasta que su final llega al 55%.
 */
export function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.75", "end 0.55"] });

  return (
    <section id="educacion" aria-labelledby="educacion-titulo" className="relative px-6 py-24 md:px-12 xl:px-16">
      <SectionHeader
        id="educacion-titulo"
        eyebrow="02 · Trayectoria"
        title="Mi"
        highlight="educación"
        description="Formación académica y roles que han moldeado mi forma de construir software."
      />
      <Reveal>
        <div ref={containerRef} className="glass relative rounded-[28px] py-3 pr-5 pl-12 md:pr-10 md:pl-[70px]">
          <DrawLine progress={scrollYProgress} className="absolute top-12 bottom-12 left-[17px] md:left-[35px]" />
          <ol>
            {education.map((entry) => (
              <EducationRow key={`${entry.title}-${entry.period}`} {...entry} />
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
