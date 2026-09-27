"use client";

import { motion, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { Icon } from "@/components/atoms/Icon";
import { FilterChips } from "@/components/molecules/FilterChips";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { projectFilters, projects } from "@/data/projects";
import { onOpenProject, onProjectFilter } from "@/lib/events";
import { cn } from "@/lib/cn";
import type { Project } from "@/types";
import { ProjectDialog } from "./ProjectDialog";

type Filter = (typeof projectFilters)[number];

/** Distancia de un "paso" de las flechas: ancho de card + separación. */
const SCROLL_STEP = 310;

/**
 * Organismo: sección Portafolio con **scroll horizontal nativo**.
 *
 * El carril usa `overflow-x-auto` + `scroll-snap`, así funciona con trackpad,
 * rueda con Shift, touch y teclado. Encima se añaden: flechas, arrastre con el
 * mouse, barra de progreso y filtros por categoría. Cada card abre su diálogo.
 */
export function PortfolioSection() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, startScroll: 0, moved: false });
  const { scrollXProgress } = useScroll({ container: trackRef });

  const visibleProjects = filter === "Todos" ? projects : projects.filter((project) => project.categories.includes(filter));

  /** Actualiza si las flechas pueden avanzar o retroceder. */
  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      atStart: track.scrollLeft <= 4,
      atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
  }, []);

  // Al cambiar el filtro, el carril vuelve al inicio.
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    updateEdges();
  }, [filter, updateEdges]);

  // Peticiones de otras secciones: la terminal (`open n`) y las cards de conocimientos.
  useEffect(() => {
    const scrollToSection = () => document.getElementById("portafolio")?.scrollIntoView({ behavior: "smooth" });
    const stopOpen = onOpenProject((projectId) => {
      const project = projects.find((item) => item.id === projectId);
      if (!project) return;
      setFilter("Todos");
      scrollToSection();
      window.setTimeout(() => setSelectedProject(project), 700);
    });
    const stopFilter = onProjectFilter((category) => setFilter(category));
    return () => {
      stopOpen();
      stopFilter();
    };
  }, []);

  const scrollByStep = (direction: 1 | -1) => trackRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: "smooth" });

  // Arrastre con el mouse (en touch el scroll nativo ya funciona).
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = { startX: event.clientX, startScroll: trackRef.current.scrollLeft, moved: false };
    setIsDragging(true);
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 5) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.startScroll - delta;
  };
  const endDrag = () => setIsDragging(false);

  const openProject = (project: Project) => {
    // Si el usuario estaba arrastrando, el clic final no debe abrir el diálogo.
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    setSelectedProject(project);
  };

  return (
    <section id="portafolio" aria-labelledby="portafolio-titulo" className="relative px-6 py-24 md:px-12 xl:px-16">
      <SectionHeader
        id="portafolio-titulo"
        eyebrow="03 · Proyectos"
        title="Mi"
        highlight="portafolio"
        description="Sistemas backend, plataformas full stack y proyectos de datos; varios de ellos están en producción. Desliza para ver más."
      />
      <Reveal className="-mt-4 mb-8">
        <FilterChips options={projectFilters} value={filter} onChange={setFilter} label="Filtrar proyectos por categoría" />
      </Reveal>

      <div
        ref={trackRef}
        onScroll={updateEdges}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        tabIndex={0}
        role="region"
        aria-label="Proyectos: desplázate horizontalmente"
        className={cn(
          "scrollbar-none -mx-6 flex gap-5 overflow-x-auto scroll-px-6 px-6 py-2 md:-mx-12 md:scroll-px-12 md:px-12 xl:-mx-16 xl:scroll-px-16 xl:px-16",
          // Durante el arrastre se desactiva el snap para que el movimiento sea continuo.
          isDragging ? "cursor-grabbing snap-none select-none" : "cursor-grab snap-x snap-mandatory",
        )}
      >
        {visibleProjects.map((project, index) => (
          <motion.div
            key={`${filter}-${project.id}`}
            className="flex snap-start"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: Math.min(index, 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectCard project={project} onLearnMore={openProject} />
          </motion.div>
        ))}
      </div>

      {/* Controles: flechas + progreso del scroll horizontal */}
      <div className="mt-7 flex items-center gap-4">
        <button
          type="button"
          onClick={() => scrollByStep(-1)}
          disabled={edges.atStart}
          aria-label="Proyectos anteriores"
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-mist/40 transition-all enabled:hover:border-cream disabled:cursor-default disabled:opacity-35"
        >
          <Icon name="chevronLeft" className="size-5" />
        </button>
        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-steel/50" aria-hidden="true">
          <motion.div className="h-full origin-left rounded-full bg-signature" style={{ scaleX: scrollXProgress }} />
        </div>
        <button
          type="button"
          onClick={() => scrollByStep(1)}
          disabled={edges.atEnd}
          aria-label="Más proyectos"
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-cream bg-cream text-ink transition-all disabled:cursor-default disabled:border-mist/40 disabled:bg-transparent disabled:text-cream disabled:opacity-35"
        >
          <Icon name="chevronRight" className="size-5" />
        </button>
      </div>

      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
