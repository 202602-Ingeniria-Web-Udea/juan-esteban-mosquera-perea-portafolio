import { Avatar } from "@/components/atoms/Avatar";
import { Tag } from "@/components/atoms/Tag";
import { InfoItem } from "@/components/molecules/InfoItem";
import { SkillMeter } from "@/components/molecules/SkillMeter";
import { profile } from "@/data/profile";
import { extraSkills, languages, programmingLanguages } from "@/data/skills";
import type { ReactNode } from "react";

/** Título de bloque del menú izquierdo, con la rayita degradada del sistema. */
function BlockTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 font-display text-[0.72rem] font-semibold tracking-[0.08em] uppercase before:h-0.5 before:w-3.5 before:rounded-full before:bg-signature">
      {children}
    </h2>
  );
}

/**
 * Organismo: contenido del menú izquierdo (información personal, contacto,
 * idiomas, lenguajes y habilidades extra). Se reutiliza en la barra fija de
 * escritorio y en el panel desplegable de móvil.
 */
export function SidebarContent() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center">
        <Avatar src={profile.photo} alt={`Foto de ${profile.name}`} size={96} showStatus />
        <p className="mt-3 font-display text-[1.05rem] leading-tight font-semibold">
          {profile.firstName}
          <br />
          {profile.name.replace(profile.firstName, "").trim()}
        </p>
        <p className="mt-1 text-[0.78rem] text-mist">{profile.title}</p>
      </div>

      <section className="mt-5 border-t border-steel/50 pt-4" aria-label="Datos de contacto">
        <ul className="flex flex-col gap-2">
          {profile.info.map((entry) => (
            <InfoItem key={entry.label} {...entry} />
          ))}
        </ul>
      </section>

      <section className="mt-4 border-t border-steel/50 pt-4">
        <BlockTitle>Idiomas</BlockTitle>
        <div className="flex flex-col gap-2.5">
          {languages.map((language) => (
            <SkillMeter key={language.name} {...language} />
          ))}
        </div>
      </section>

      <section className="mt-4 border-t border-steel/50 pt-4">
        <BlockTitle>Lenguajes de programación</BlockTitle>
        {/* Dos columnas para que todo el menú quepa en pantallas de 900px de alto. */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          {programmingLanguages.map((language) => (
            <SkillMeter key={language.name} {...language} />
          ))}
        </div>
      </section>

      <section className="mt-4 border-t border-steel/50 pt-4">
        <BlockTitle>Habilidades extra</BlockTitle>
        <ul className="flex flex-wrap gap-1.5">
          {extraSkills.map((skill) => (
            <li key={skill}>
              <Tag label={skill} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
