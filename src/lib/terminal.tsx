/**
 * Comandos de la terminal del perfil.
 *
 * Cada comando devuelve lo que se imprime (JSX) y, opcionalmente, una acción
 * que la terminal ejecuta (limpiar, cerrar, descargar el CV o abrir un proyecto).
 * Mantenerlos aquí separa el "qué responde" del "cómo se dibuja" (TerminalDialog).
 */
import type { ReactNode } from "react";
import { workflow } from "@/data/knowledge";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { languages, programmingLanguages } from "@/data/skills";
import { githubProfileUrl, socials } from "@/data/socials";

export type TerminalAction = { type: "clear" } | { type: "exit" } | { type: "download-cv" } | { type: "open-project"; projectId: string };

export interface CommandResult {
  output?: ReactNode;
  action?: TerminalAction;
}

/** Comandos visibles en `help` y en los chips clicables. */
export const commandList: Array<{ name: string; description: string }> = [
  { name: "help", description: "Muestra esta ayuda" },
  { name: "whoami", description: "Quién soy" },
  { name: "stack", description: "Lenguajes y frameworks" },
  { name: "proyectos", description: "Lista de proyectos" },
  { name: "open <n>", description: "Abre el proyecto número n" },
  { name: "workflow", description: "Cómo trabajo" },
  { name: "intereses", description: "Áreas que me apasionan" },
  { name: "idiomas", description: "Idiomas que hablo" },
  { name: "contacto", description: "Dónde encontrarme" },
  { name: "cv", description: "Descarga mi hoja de vida" },
  { name: "clear", description: "Limpia la terminal" },
  { name: "exit", description: "Cierra la terminal" },
];

export const suggestedCommands = ["help", "whoami", "stack", "proyectos", "workflow", "contacto", "cv", "sudo contratar"];

/** Nombres simples para autocompletar con Tab. */
export const completableCommands = [...commandList.map((command) => command.name.split(" ")[0]), "sudo contratar"];

/** Comandos que la terminal escribe sola al abrirse. */
export const introScript = ["whoami", "cat mision.txt"];

const Muted = ({ children }: { children: ReactNode }) => <span className="text-mist">{children}</span>;
const Strong = ({ children }: { children: ReactNode }) => <span className="font-medium text-cream">{children}</span>;

/** Barra de progreso compacta para la terminal (evita depender de los caracteres de bloque de la fuente). */
function TermBar({ value }: { value: number }) {
  return (
    <span className="inline-block h-2.5 w-28 overflow-hidden rounded-sm bg-steel/40 align-middle">
      <span className="block h-full bg-cream" style={{ width: `${value}%` }} />
    </span>
  );
}

function externalLink(href: string, label: string) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-cream underline decoration-mist underline-offset-4 hover:decoration-cream">
      {label}
    </a>
  );
}

/** Interpreta una línea escrita por el usuario. */
export function runCommand(raw: string): CommandResult {
  const input = raw.trim().replace(/\s+/g, " ");
  const [command, ...args] = input.toLowerCase().split(" ");

  switch (command) {
    case "":
      return {};
    case "help":
      return {
        output: (
          <div className="grid grid-cols-[auto_1fr] gap-x-6">
            {commandList.map(({ name, description }) => (
              <div key={name} className="contents">
                <Strong>{name}</Strong>
                <Muted>{description}</Muted>
              </div>
            ))}
          </div>
        ),
      };
    case "whoami":
      return {
        output: (
          <>
            <Strong>{profile.name}</Strong>
            <br />
            <Muted>{profile.role} · Medellín, CO · UdeA · 8.º semestre</Muted>
          </>
        ),
      };
    case "cat":
      if (args[0] === "mision.txt") return { output: profile.mission };
      return { output: <Muted>cat: {args[0] ?? ""}: no existe el archivo. Prueba con: cat mision.txt</Muted> };
    case "stack":
      return {
        output: (
          <>
            {programmingLanguages.map(({ name, value }) => (
              <div key={name} className="whitespace-pre">
                <Muted>{name.toLowerCase().padEnd(12)}</Muted>
                <TermBar value={value} />
                <Muted> {value}%</Muted>
              </div>
            ))}
            <div className="mt-2">
              <Muted>frameworks: </Muted>Spring Boot · FastAPI · React · Next.js · Node.js · Express · NestJS
            </div>
          </>
        ),
      };
    case "proyectos":
    case "projects":
      return {
        output: (
          <>
            {projects.map((project, index) => (
              <div key={project.id}>
                <Muted>{String(index + 1).padStart(2, " ")}.</Muted> <Strong>{project.title}</Strong>
                {project.role && <Muted> · {project.role}</Muted>}
              </div>
            ))}
            <div className="mt-2">
              <Muted>Escribe </Muted>
              <Strong>open &lt;n&gt;</Strong>
              <Muted> para ver el detalle de un proyecto.</Muted>
            </div>
          </>
        ),
      };
    case "open": {
      const index = Number(args[0]) - 1;
      const project = projects[index];
      if (!project) {
        return { output: <Muted>open: número inválido. Usa un número del 1 al {projects.length}.</Muted> };
      }
      return { output: <Muted>Abriendo {project.title}…</Muted>, action: { type: "open-project", projectId: project.id } };
    }
    case "workflow":
      return {
        output: (
          <div className="flex flex-wrap gap-x-2">
            {workflow.map((step, index) => (
              <span key={step.title}>
                <Strong>{step.title}</Strong>
                {index < workflow.length - 1 && <Muted> →</Muted>}
              </span>
            ))}
          </div>
        ),
      };
    case "intereses":
      return { output: profile.interests.join(" · ") };
    case "idiomas":
      return {
        output: languages.map(({ name, level, value }) => (
          <div key={name} className="whitespace-pre">
            <Muted>{name.toLowerCase().padEnd(10)}</Muted>
            <TermBar value={value} />
            <Muted> {level}</Muted>
          </div>
        )),
      };
    case "contacto":
      return {
        output: (
          <>
            <div>
              <Muted>correo    </Muted>
              <a href={`mailto:${profile.email}`} className="text-cream underline decoration-mist underline-offset-4">
                {profile.email}
              </a>
            </div>
            <div>
              <Muted>github    </Muted>
              {externalLink(githubProfileUrl, "github.com/juanes0789")}
            </div>
            <div>
              <Muted>linkedin  </Muted>
              {externalLink(socials.find((social) => social.icon === "linkedin")?.href ?? "", "juan-esteban-mosquera-perea")}
            </div>
          </>
        ),
      };
    case "cv":
      return { output: <Muted>Descargando {profile.cvFileName}… ✔</Muted>, action: { type: "download-cv" } };
    case "clear":
      return { action: { type: "clear" } };
    case "exit":
      return { action: { type: "exit" } };
    case "sudo":
      if (args.join(" ") === "contratar") {
        return {
          output: (
            <>
              <Muted>[sudo] verificando credenciales… ✔</Muted>
              <br />
              <Strong>Permiso concedido.</Strong> Escríbeme a{" "}
              <a href={`mailto:${profile.email}`} className="text-cream underline decoration-mist underline-offset-4">
                {profile.email}
              </a>{" "}
              y empezamos.
            </>
          ),
        };
      }
      return { output: <Muted>Buen intento. Prueba con: sudo contratar</Muted> };
    default:
      return {
        output: (
          <Muted>
            comando no encontrado: {input}. Escribe <Strong>help</Strong> para ver los comandos.
          </Muted>
        ),
      };
  }
}
