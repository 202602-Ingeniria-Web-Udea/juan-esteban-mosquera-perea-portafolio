import type { Profile } from "@/types";

const email = "juamosque1@gmail.com";

/** Información personal, usada en el menú izquierdo, el perfil, la terminal y el footer. */
export const profile: Profile = {
  name: "Juan Esteban Mosquera Perea",
  firstName: "Juan Esteban",
  shortName: "Juan Esteban Mosquera",
  title: "Software Engineer · Full Stack Developer",
  role: "Software Engineer & Full Stack Developer",
  // Foto en public/images/profile.jpg. Con `null` se muestra una silueta de marcador.
  photo: "/images/profile.jpg",
  summary:
    "Estudiante de Ingeniería de Sistemas en la Universidad de Antioquia, enfocado en backend, desarrollo full stack y análisis de datos. Construyo soluciones que combinan buenas prácticas de ingeniería, arquitectura y automatización para resolver problemas reales.",
  mission: "Construyo sistemas mantenibles, observables, testeables y escalables.",
  email,
  location: "Medellín, Colombia",
  cvUrl: "/cv/JuanEsteban_Mosquera_cv.pdf",
  cvFileName: "JuanEsteban_Mosquera_cv.pdf",
  info: [
    { icon: "mapPin", label: "Ubicación", value: "Medellín, Colombia" },
    { icon: "graduation", label: "Universidad", value: "Universidad de Antioquia" },
    { icon: "book", label: "Programa", value: "8.º semestre · Ing. de Sistemas" },
    { icon: "mail", label: "Correo", value: email, href: `mailto:${email}` },
    { icon: "sparkles", label: "Estado", value: "Abierto a prácticas" },
  ],
  introLines: ["Construyo software", "que conecta ingeniería,", "datos", "e inteligencia artificial."],
  interests: [
    "Software Engineering",
    "Backend Development",
    "Full Stack Development",
    "Data Engineering",
    "Artificial Intelligence",
    "Cloud Computing",
    "Software Architecture",
    "DevOps",
    "Fintech",
  ],
};
