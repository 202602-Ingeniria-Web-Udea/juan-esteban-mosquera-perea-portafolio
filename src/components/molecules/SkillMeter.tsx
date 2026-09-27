import { ProgressBar } from "@/components/atoms/ProgressBar";
import type { Skill } from "@/types";

/** Molécula: nombre + porcentaje + barra. Se usa para idiomas y lenguajes de programación. */
export function SkillMeter({ name, value, level }: Skill) {
  const label = level ? `${name} · ${level}` : name;
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2 text-[0.8rem]">
        <span className="truncate">{label}</span>
        <span className="font-mono text-[0.7rem] text-mist">{value}%</span>
      </div>
      <ProgressBar value={value} label={`Dominio de ${name}`} />
    </div>
  );
}
