/**
 * Registro central de íconos.
 *
 * Los datos guardan solo el *nombre* del ícono (un string). Así el contenido se
 * puede pasar de componentes de servidor a componentes de cliente (las funciones
 * no son serializables) y cambiar un ícono se hace en un único lugar.
 */
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  LuAppWindow,
  LuArrowRight,
  LuArrowUpRight,
  LuBookOpen,
  LuBrain,
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuCloud,
  LuCodeXml,
  LuDownload,
  LuExternalLink,
  LuGraduationCap,
  LuMail,
  LuMapPin,
  LuMenu,
  LuRocket,
  LuServer,
  LuShieldCheck,
  LuSparkles,
  LuTerminal,
  LuUsers,
  LuX,
} from "react-icons/lu";
import {
  SiDocker,
  SiElevenlabs,
  SiExpress,
  SiFastapi,
  SiGithubactions,
  SiJavascript,
  SiJsonwebtokens,
  SiJunit5,
  SiMariadb,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOpenjdk,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSonarqubecloud,
  SiSpringboot,
  SiSwagger,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";

/** Íconos de interfaz y redes, referenciados por nombre desde los datos. */
export const icons = {
  appWindow: LuAppWindow,
  arrowRight: LuArrowRight,
  arrowUpRight: LuArrowUpRight,
  book: LuBookOpen,
  brain: LuBrain,
  check: LuCheck,
  chevronLeft: LuChevronLeft,
  chevronRight: LuChevronRight,
  cloud: LuCloud,
  code: LuCodeXml,
  download: LuDownload,
  externalLink: LuExternalLink,
  github: FaGithub,
  graduation: LuGraduationCap,
  linkedin: FaLinkedinIn,
  mail: LuMail,
  mapPin: LuMapPin,
  menu: LuMenu,
  rocket: LuRocket,
  server: LuServer,
  shieldCheck: LuShieldCheck,
  sparkles: LuSparkles,
  terminal: LuTerminal,
  users: LuUsers,
  x: LuX,
} satisfies Record<string, IconType>;

export type IconName = keyof typeof icons;

/**
 * Logos de tecnologías, indexados por el mismo nombre que se muestra en pantalla.
 * Si una tecnología no está aquí, su etiqueta se muestra sin logo.
 */
export const techIcons: Record<string, IconType> = {
  Java: SiOpenjdk,
  "Spring Boot": SiSpringboot,
  "Vue 3": SiVuedotjs,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
  JWT: SiJsonwebtokens,
  Swagger: SiSwagger,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  FastAPI: SiFastapi,
  ElevenLabs: SiElevenlabs,
  JUnit: SiJunit5,
  "GitHub Actions": SiGithubactions,
  SonarCloud: SiSonarqubecloud,
  "Azure DevOps": VscAzureDevops,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MariaDB: SiMariadb,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  "Scikit-learn": SiScikitlearn,
};
