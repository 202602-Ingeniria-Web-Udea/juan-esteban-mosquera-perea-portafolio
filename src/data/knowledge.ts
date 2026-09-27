import type { Knowledge, WorkflowStep } from "@/types";

/** Las seis áreas de la grilla 3×2 (estructura del Figma). */
export const knowledge: Knowledge[] = [
  {
    icon: "code",
    title: "Software Engineering",
    tagline: "Arquitectura · SOLID · Clean Code",
    description:
      "Arquitecturas por capas y modulares, diseño orientado a objetos, patrones de diseño y modelado con C4 y UML.",
  },
  {
    icon: "server",
    title: "Backend Development",
    tagline: "APIs REST · Auth · RBAC",
    description:
      "Servicios con Spring Boot, FastAPI y Go; autenticación, autorización, auditoría, logging y validación de reglas de negocio.",
    projectFilter: "Backend",
  },
  {
    icon: "appWindow",
    title: "Frontend Development",
    tagline: "React · Next.js · TypeScript",
    description:
      "Interfaces orientadas a la experiencia de usuario con React, Next.js, Vue y Angular, integradas con APIs REST.",
    projectFilter: "Full Stack",
  },
  {
    icon: "brain",
    title: "Data & AI",
    tagline: "Análisis · ML · IA aplicada",
    description:
      "Análisis exploratorio con Pandas y NumPy, visualización, Machine Learning con Scikit-learn e integración de modelos y APIs de IA.",
    projectFilter: "Data & AI",
  },
  {
    icon: "cloud",
    title: "Cloud & DevOps",
    tagline: "Docker · CI/CD · Azure",
    description:
      "Contenedores con Docker, pipelines con GitHub Actions y Azure DevOps, y despliegues en Azure, Vercel y Render.",
  },
  {
    icon: "shieldCheck",
    title: "Testing & Calidad",
    tagline: "JUnit · BDD · Quality Gates",
    description:
      "Pruebas unitarias con el patrón AAA, cobertura, análisis estático con SonarCloud y escenarios BDD con Gherkin.",
  },
];

/** Forma de trabajo: se muestra en la escena "Cómo trabajo" y en el comando `workflow`. */
export const workflow: WorkflowStep[] = [
  { title: "Problema", description: "Entiendo el contexto y las reglas de negocio antes de elegir una tecnología." },
  { title: "Diseño", description: "Defino la arquitectura, los modelos y los contratos de API." },
  { title: "Implementación", description: "Código limpio, modular y con responsabilidades claras." },
  { title: "Testing", description: "Pruebas unitarias y casos de prueba desde el inicio." },
  { title: "Calidad", description: "Análisis estático y quality gates para detectar problemas temprano." },
  { title: "Despliegue", description: "Contenedores, CI/CD y nube para llegar a producción." },
];
