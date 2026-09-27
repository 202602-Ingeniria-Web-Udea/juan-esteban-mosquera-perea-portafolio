"use client";

import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";
import { Modal } from "@/components/molecules/Modal";
import { githubProfileUrl } from "@/data/socials";
import type { Project } from "@/types";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Organismo: diálogo "Saber más" de un proyecto.
 * Muestra la descripción completa, características, una decisión destacada,
 * el stack y los enlaces. Sin repositorio propio, el botón lleva al perfil de GitHub.
 */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  return (
    <Modal open={project !== null} onClose={onClose} labelledBy="proyecto-titulo" className="max-w-3xl">
      {project && (
        <article className="overflow-hidden rounded-3xl border border-steel/60 bg-navy shadow-[0_40px_120px_rgb(0_0_0/0.6)]">
          <div className="relative h-48 sm:h-60">
            <Image src={project.cover} alt="" fill sizes="768px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
            <div className="absolute right-6 bottom-5 left-6">
              <p className="font-mono text-[0.7rem] tracking-[0.08em] text-mist uppercase">
                {[project.role, project.team ? "Proyecto en equipo" : null, project.year].filter(Boolean).join(" · ")}
              </p>
              <Heading level={2} id="proyecto-titulo" className="mt-1 !text-[clamp(1.6rem,4vw,2.25rem)]">
                {project.title}
              </Heading>
            </div>
          </div>

          <div className="px-6 pt-4 pb-7 sm:px-8">
            <div className="flex flex-wrap gap-1.5">
              {project.categories.map((category) => (
                <Tag key={category} label={category} active />
              ))}
            </div>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-cream/90">{project.description}</p>

            <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
              <div>
                <Heading level={4} className="mb-3">
                  Características
                </Heading>
                <ul className="flex flex-col gap-2.5">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-[0.88rem] leading-snug text-mist">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-cream" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="h-fit rounded-2xl border-signature p-5">
                <p className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.08em] text-mist uppercase">
                  <Icon name="sparkles" className="size-3.5" /> {project.highlight.title}
                </p>
                <p className="mt-2 text-[0.9rem] leading-relaxed">{project.highlight.text}</p>
              </aside>
            </div>

            <Heading level={4} className="mt-6 mb-3">
              Tecnologías
            </Heading>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Tag key={tech} label={tech} withIcon className="py-1.5 text-[0.78rem]" />
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.demoUrl && (
                <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer" icon="externalLink">
                  Ver demo
                </Button>
              )}
              <Button
                variant="secondary"
                href={project.repoUrl ?? githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon="github"
              >
                {project.repoUrl ? "Ver código" : "Ver mi GitHub"}
              </Button>
            </div>
          </div>
        </article>
      )}
    </Modal>
  );
}
