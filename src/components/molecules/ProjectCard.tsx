import Image from "next/image";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onLearnMore: (project: Project) => void;
}

/**
 * Molécula: card de proyecto (estructura del Figma: imagen, título, descripción y "Saber más").
 * Añade el rol, la insignia "En producción" y las tecnologías principales.
 */
export function ProjectCard({ project, onLearnMore }: ProjectCardProps) {
  const { title, coverTitle, cover, role, year, team, summary, stack, demoUrl } = project;
  const meta = [role, team ? "En equipo" : year].filter(Boolean).join(" · ");

  return (
    <article className="glass group flex w-[min(82vw,290px)] shrink-0 snap-start flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:border-mist/60 sm:w-[290px]">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={cover}
          alt={`Portada del proyecto ${title}`}
          fill
          sizes="290px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-1.5">
          {stack.slice(0, 2).map((tech) => (
            <span key={tech} className="rounded-md bg-ink/60 px-2 py-0.5 font-mono text-[0.65rem] text-cream backdrop-blur-sm">
              {tech}
            </span>
          ))}
        </div>
        {demoUrl && (
          <span className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1 text-[0.65rem] font-semibold text-ink">
            <span className="size-1.5 rounded-full bg-ink" aria-hidden="true" />
            En producción
          </span>
        )}
        <p
          aria-hidden="true"
          className="absolute bottom-4 left-5 max-w-[80%] font-display text-2xl leading-none font-bold tracking-[-0.03em] text-cream drop-shadow-[0_2px_12px_rgb(13_19_33/0.6)]"
        >
          {coverTitle}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {meta && <p className="font-mono text-[0.66rem] tracking-[0.06em] text-mist uppercase">{meta}</p>}
        <Heading level={3} className="mt-1.5">
          {title}
        </Heading>
        <p className="mt-2 text-[0.84rem] leading-relaxed text-mist">{summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {stack.slice(2, 5).map((tech) => (
            <Tag key={tech} label={tech} withIcon />
          ))}
        </div>
        <button
          type="button"
          onClick={() => onLearnMore(project)}
          className="mt-auto inline-flex cursor-pointer items-center gap-2 self-start pt-5 text-[0.85rem] font-semibold text-cream"
          aria-label={`Saber más sobre ${title}`}
        >
          <span className="border-b border-mist transition-colors group-hover:border-cream">Saber más</span>
          <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
}
