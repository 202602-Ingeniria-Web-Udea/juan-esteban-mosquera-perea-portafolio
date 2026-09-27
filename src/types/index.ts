/**
 * Tipos del contenido del portafolio.
 * Todo el texto vive en `src/data/` con estos tipos, así los componentes
 * solo se encargan de presentar y el contenido se edita en un único lugar.
 */
import type { IconName } from "@/lib/icons";

/** Dato de contacto o información personal del menú izquierdo. */
export interface InfoEntry {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
}

export interface Profile {
  name: string;
  firstName: string;
  shortName: string;
  title: string;
  role: string;
  /** Ruta de la foto en `public/`. `null` muestra el marcador de posición. */
  photo: string | null;
  summary: string;
  mission: string;
  email: string;
  location: string;
  cvUrl: string;
  cvFileName: string;
  info: InfoEntry[];
  /** Frases de la escena inicial tipo Apple, una por línea. */
  introLines: string[];
  interests: string[];
}

/** Idioma o lenguaje de programación con su porcentaje de dominio. */
export interface Skill {
  name: string;
  value: number;
  level?: string;
}

export interface Knowledge {
  icon: IconName;
  title: string;
  tagline: string;
  description: string;
  /** Filtro del portafolio que se activa desde la card, si aplica. */
  projectFilter?: ProjectCategory;
}

export interface Education {
  institution: string;
  role: string;
  period: string;
  title: string;
  description: string;
}

export type ProjectCategory = "Backend" | "Full Stack" | "Data & AI";

export interface Project {
  id: string;
  title: string;
  /** Título corto que se superpone a la portada. */
  coverTitle: string;
  cover: string;
  year?: string;
  role?: string;
  team?: boolean;
  categories: ProjectCategory[];
  summary: string;
  description: string;
  features: string[];
  highlight: { title: string; text: string };
  stack: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface Social {
  label: string;
  href: string;
  icon: IconName;
  /** Si es true, el enlace descarga el archivo en lugar de abrir una pestaña. */
  download?: boolean;
}

export interface WorkflowStep {
  title: string;
  description: string;
}
