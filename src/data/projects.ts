import type { Project, ProjectCategory } from "@/types";

export const projectFilters: Array<"Todos" | ProjectCategory> = ["Todos", "Backend", "Full Stack", "Data & AI"];

/** Proyectos en orden estratégico: primero los que están en producción y muestran backend. */
export const projects: Project[] = [
  {
    id: "embedded-payments",
    title: "Embedded Payments Platform",
    coverTitle: "Embedded Payments",
    cover: "/projects/embedded-payments.svg",
    year: "2026",
    role: "Full-Stack Developer",
    categories: ["Backend", "Full Stack"],
    summary: "Plataforma de pagos con gestión de comercios, payment intents, reembolsos y checkout embebido.",
    description:
      "Plataforma full stack de pagos embebidos que cubre la gestión de comercios, intenciones de pago, transacciones, reembolsos y un flujo de checkout integrable en sitios externos.",
    features: [
      "Doble autenticación: JWT para usuarios y API Keys para integraciones de comercios.",
      "Control de acceso basado en roles (RBAC), auditoría y logging.",
      "Arquitectura por capas: dominio, aplicación e infraestructura.",
      "API REST documentada con Swagger/OpenAPI.",
      "Persistencia relacional en PostgreSQL (Neon) y despliegue con Docker.",
    ],
    highlight: {
      title: "Decisión de arquitectura",
      text: "La lógica de negocio vive en el dominio, independiente del framework, lo que facilita las pruebas y la extensión del sistema.",
    },
    stack: ["Java", "Spring Boot", "Vue 3", "PostgreSQL", "JWT", "Swagger", "Docker"],
    demoUrl: "https://embedded-payments1.vercel.app/",
    repoUrl: "https://github.com/juanes0789/embedded-payments",
  },
  {
    id: "voiceflowai",
    title: "VoiceFlowAI",
    coverTitle: "VoiceFlowAI",
    cover: "/projects/voiceflowai.svg",
    year: "2026",
    role: "Fundador y único desarrollador",
    categories: ["Full Stack", "Data & AI"],
    summary: "Tutor de voz con IA para practicar la fluidez en inglés, con LLM y voces de distintos acentos.",
    description:
      "Plataforma de tutoría por voz con inteligencia artificial para practicar la fluidez en inglés, desarrollada de principio a fin: desde el concepto hasta producción.",
    features: [
      "Conversaciones de varios turnos generadas con APIs de LLM.",
      "Síntesis de voz con ElevenLabs y acentos de EE. UU., Reino Unido y Australia.",
      "Reconocimiento de voz desde el navegador para interactuar sin usar las manos.",
      "Modos de conversación: entrevista, viaje, casual y tecnología.",
      "Backend asíncrono con FastAPI en Docker sobre Render y frontend en Vercel.",
    ],
    highlight: {
      title: "Del concepto a producción",
      text: "Diseñé, construí y desplegué todo el sistema en solitario, con ramas por funcionalidad y flujos de despliegue continuo.",
    },
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "ElevenLabs", "Docker"],
    demoUrl: "https://voice-flow-ai-learning.vercel.app/",
    repoUrl: "https://github.com/juanes0789/VoiceFlowAI",
  },
  {
    id: "bookify",
    title: "Bookify",
    coverTitle: "Bookify",
    cover: "/projects/bookify.svg",
    role: "Scrum Master y QA",
    team: true,
    categories: ["Backend"],
    summary: "Plataforma de reservas de servicios desarrollada en equipo, con plan de calidad, quality gates e integración continua.",
    description:
      "Proyecto académico colaborativo: un sistema backend para gestionar proveedores, servicios, disponibilidad, reservas, cancelaciones e historial. Mi rol en el equipo fue Scrum Master y responsable de QA.",
    features: [
      "Facilitación de Scrum: sprint planning, backlog, historias de usuario, Definition of Ready y Definition of Done.",
      "Gestión del trabajo en Azure DevOps con boards, sprints y dashboards.",
      "Plan de calidad y diseño de casos de prueba.",
      "Pruebas unitarias con JUnit siguiendo el patrón AAA y análisis de cobertura.",
      "Quality gates en SonarCloud e integración continua con GitHub Actions.",
    ],
    highlight: {
      title: "Aporte al equipo",
      text: "Mantuve el proceso ágil del equipo y convertí la calidad en parte del flujo de trabajo, para detectar problemas antes de integrar.",
    },
    stack: ["Java", "Spring Boot", "PostgreSQL", "JUnit", "GitHub Actions", "SonarCloud", "Azure DevOps"],
    repoUrl: "https://github.com/juanes0789/bookify-QA",
  },
  {
    id: "udea-innova",
    title: "UdeA Innova",
    coverTitle: "UdeA Innova",
    cover: "/projects/udea-innova.svg",
    year: "2025",
    role: "Full-Stack Developer",
    team: true,
    categories: ["Full Stack"],
    summary: "Plataforma para que la comunidad universitaria identifique y comparta problemáticas de la UdeA.",
    description:
      "Aplicación web para que la comunidad de la Universidad de Antioquia identifique, comparta y aborde problemáticas de la institución.",
    features: [
      "Landing, autenticación, dashboards y vistas según el rol del usuario.",
      "Inicio de sesión con Google y GitHub mediante OAuth.",
      "Componentes de React reutilizables con una arquitectura modular.",
      "API REST con Node.js y Express sobre MariaDB.",
      "Trabajo en equipo con ramas por funcionalidad y pull requests.",
    ],
    highlight: {
      title: "Trabajo colaborativo",
      text: "Frontend y backend separados, integrados mediante una API REST y desarrollados por un equipo multidisciplinario.",
    },
    stack: ["React", "Node.js", "Express", "MariaDB", "JavaScript"],
    demoUrl: "https://app-udea-innova-frontend.vercel.app/",
  },
  {
    id: "banking-simulation",
    title: "Banking Simulation Platform",
    coverTitle: "Banking Simulation",
    cover: "/projects/banking-simulation.svg",
    year: "2024",
    role: "Líder de desarrollo full stack",
    team: true,
    categories: ["Full Stack", "Backend"],
    summary: "Aplicación web de gestión bancaria desarrollada con Scrum, con backend en Java y frontend en React.",
    description: "Aplicación web de gestión bancaria cuyo desarrollo full stack lideré siguiendo la metodología Scrum.",
    features: [
      "Backend en Java para la lógica de negocio y las peticiones HTTP.",
      "Operaciones CRUD sobre MariaDB.",
      "Frontend dinámico en React y JavaScript, integrado de extremo a extremo.",
      "Planeación y seguimiento del trabajo con Scrum.",
    ],
    highlight: {
      title: "Liderazgo técnico",
      text: "Coordiné el desarrollo full stack del equipo y la integración entre el backend y el frontend.",
    },
    stack: ["Java", "React", "JavaScript", "MariaDB"],
  },
  {
    id: "fraud-detection",
    title: "Fraud Detection (IEEE-CIS)",
    coverTitle: "Fraud Detection",
    cover: "/projects/fraud-detection.svg",
    categories: ["Data & AI"],
    summary: "Análisis de transacciones y preparación de datos para detectar operaciones fraudulentas con Machine Learning.",
    description:
      "Proyecto de Machine Learning orientado al análisis de transacciones y a la detección de posibles operaciones fraudulentas con el dataset IEEE-CIS.",
    features: [
      "Análisis exploratorio de las transacciones.",
      "Procesamiento y transformación de variables.",
      "Análisis estadístico del desbalance entre clases.",
      "Preparación de datos para modelos de clasificación.",
    ],
    highlight: {
      title: "Enfoque",
      text: "El trabajo se centró en entender y preparar los datos, la base para que un modelo de clasificación sea confiable.",
    },
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
  },
  {
    id: "plantvillage",
    title: "PlantVillage: Computer Vision",
    coverTitle: "PlantVillage",
    cover: "/projects/plantvillage.svg",
    categories: ["Data & AI"],
    summary: "Clasificación de imágenes de plantas con Deep Learning y búsqueda vectorial eficiente.",
    description:
      "Proyecto de clasificación de imágenes de plantas que combina Deep Learning con búsqueda eficiente de representaciones vectoriales.",
    features: [
      "Extracción de características con la red preentrenada ResNet50.",
      "Indexación y búsqueda de vectores similares con FAISS.",
      "Clasificación de imágenes del dataset PlantVillage.",
    ],
    highlight: {
      title: "Técnica clave",
      text: "Cada imagen se convierte en un vector (embedding) y FAISS encuentra las más parecidas de forma eficiente, incluso entre miles de vectores.",
    },
    stack: ["Python", "ResNet50", "FAISS", "Deep Learning"],
  },
  {
    id: "transito-medellin",
    title: "Incidentes de tránsito en Medellín",
    coverTitle: "Tránsito Medellín",
    cover: "/projects/transito-medellin.svg",
    categories: ["Data & AI"],
    summary: "Análisis y visualización de cerca de 207.000 incidentes de tránsito registrados entre 2014 y 2018.",
    description:
      "Proyecto de análisis y visualización de datos con información de incidentes de tránsito registrados en Medellín entre 2014 y 2018.",
    features: [
      "Dataset de aproximadamente 207.000 registros.",
      "Exploración, limpieza y transformación de datos con Pandas.",
      "Visualizaciones con Matplotlib.",
      "Dashboards en Power BI orientados a la toma de decisiones.",
    ],
    highlight: {
      title: "Impacto",
      text: "Los dashboards resumen miles de registros en indicadores pensados para apoyar la toma de decisiones.",
    },
    stack: ["Python", "Pandas", "Matplotlib", "Power BI"],
    
  },
];
