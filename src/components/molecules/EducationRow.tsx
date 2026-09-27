"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { DatePill } from "@/components/atoms/DatePill";
import { Heading } from "@/components/atoms/Heading";
import { cn } from "@/lib/cn";
import type { Education } from "@/types";

/**
 * Molécula: fila de educación (estructura del Figma).
 * Izquierda: institución, rol y fechas. Derecha: título y descripción.
 * El nodo de la línea de tiempo se "enciende" cuando la fila llega al centro de la pantalla.
 */
export function EducationRow({ institution, role, period, title, description }: Education) {
  const ref = useRef<HTMLLIElement>(null);
  const isActive = useInView(ref, { margin: "0px 0px -45% 0px", once: true });

  return (
    <li
      ref={ref}
      className={cn(
        "relative grid gap-3 border-b border-steel/45 py-7 transition-opacity duration-700 last:border-b-0 md:grid-cols-[240px_1fr] md:gap-9",
        isActive ? "opacity-100" : "opacity-50",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-8 -left-[37px] size-3.5 rounded-full border-2 transition-all duration-700 md:-left-[41px]",
          isActive ? "border-cream bg-cream shadow-[0_0_0_6px_rgb(240_235_216/0.15)]" : "border-steel bg-ink",
        )}
      />
      <div>
        <Heading level={4}>{institution}</Heading>
        <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-[0.82rem] text-mist">
          {role} <DatePill>{period}</DatePill>
        </div>
      </div>
      <div>
        <Heading level={4}>{title}</Heading>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-mist">{description}</p>
      </div>
    </li>
  );
}
