import type { Social } from "@/types";
import { profile } from "./profile";

export const githubProfileUrl = "https://github.com/juanes0789";

/** Enlaces del menú derecho (y de la barra flotante en móvil). */
export const socials: Social[] = [
  { label: "GitHub", href: githubProfileUrl, icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juan-esteban-mosquera-perea-b3665a342",
    icon: "linkedin",
  },
  { label: "Correo", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "Descargar CV", href: profile.cvUrl, icon: "download", download: true },
];
