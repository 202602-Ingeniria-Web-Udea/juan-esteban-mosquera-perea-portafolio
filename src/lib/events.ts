/**
 * Eventos globales entre secciones que no comparten un padre cercano.
 * Ejemplo: el comando `open 2` de la terminal abre un proyecto del portafolio,
 * y una card de conocimientos puede activar un filtro del portafolio.
 * Usar eventos del navegador evita un estado global solo para esto.
 */
import type { ProjectCategory } from "@/types";

const OPEN_PROJECT = "portfolio:open-project";
const FILTER_PROJECTS = "portfolio:filter";

/** Desplaza la página hasta el portafolio y abre el diálogo del proyecto indicado. */
export function requestOpenProject(projectId: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_PROJECT, { detail: projectId }));
}

/** Desplaza la página hasta el portafolio y aplica un filtro de categoría. */
export function requestProjectFilter(category: ProjectCategory) {
  window.dispatchEvent(new CustomEvent<ProjectCategory>(FILTER_PROJECTS, { detail: category }));
}

export function onOpenProject(handler: (projectId: string) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<string>).detail);
  window.addEventListener(OPEN_PROJECT, listener);
  return () => window.removeEventListener(OPEN_PROJECT, listener);
}

export function onProjectFilter(handler: (category: ProjectCategory) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<ProjectCategory>).detail);
  window.addEventListener(FILTER_PROJECTS, listener);
  return () => window.removeEventListener(FILTER_PROJECTS, listener);
}
