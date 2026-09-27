"use client";

import type { MouseEvent } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { requestProjectFilter } from "@/lib/events";
import type { Knowledge } from "@/types";

/**
 * Molécula: card de conocimiento (estructura del Figma: ícono, título y bajada).
 *
 * En dispositivos con mouse la descripción está plegada y se despliega en hover
 * o foco, como la card "Advertising" del diseño. En pantallas táctiles siempre
 * se ve. Un brillo sigue la posición del cursor usando variables CSS.
 */
export function KnowledgeCard({ icon, title, tagline, description, projectFilter }: Knowledge) {
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      className="group glass relative flex h-full flex-col items-center overflow-hidden rounded-3xl px-6 py-8 text-center transition-all duration-500 focus-within:border-signature hover:-translate-y-1.5 hover:border-signature hover:shadow-[0_24px_60px_rgb(0_0_0/0.4),0_0_60px_rgb(116_140_171/0.18)]"
    >
      {/* Brillo que sigue al cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(260px circle at var(--x, 50%) var(--y, 0%), rgb(240 235 216 / 0.1), transparent 60%)" }}
      />
      <div className="mb-5 grid size-14 place-items-center rounded-2xl border border-mist/30 bg-ink/50 text-cream transition-all duration-500 group-hover:border-transparent group-hover:bg-signature group-hover:text-ink">
        <Icon name={icon} className="size-6" />
      </div>
      <Heading level={3}>{title}</Heading>
      <p className="mt-1.5 text-[0.8rem] text-mist">{tagline}</p>

      {/* Descripción plegable: grid-rows 0fr → 1fr anima la altura sin medirla. */}
      <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 can-hover:grid-rows-[0fr] can-hover:group-hover:grid-rows-[1fr] can-hover:group-focus-within:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <p className="mt-3 text-[0.82rem] leading-relaxed text-cream/85">{description}</p>
          {projectFilter && (
            <a
              href="#portafolio"
              onClick={() => requestProjectFilter(projectFilter)}
              className="mt-3 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-cream hover:underline"
            >
              Ver proyectos <Icon name="arrowRight" className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
