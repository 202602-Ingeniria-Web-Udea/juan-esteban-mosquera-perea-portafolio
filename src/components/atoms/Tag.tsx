import { cn } from "@/lib/cn";
import { techIcons } from "@/lib/icons";

interface TagProps {
  label: string;
  /** Muestra el logo de la tecnología si existe en el registro. */
  withIcon?: boolean;
  active?: boolean;
  className?: string;
}

/** Átomo: etiqueta tipo chip para habilidades y tecnologías. */
export function Tag({ label, withIcon = false, active = false, className }: TagProps) {
  const TechIcon = withIcon ? techIcons[label] : undefined;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.72rem] leading-none",
        active ? "border-cream bg-cream text-ink" : "border-mist/35 bg-ink/35 text-cream",
        className,
      )}
    >
      {TechIcon && <TechIcon className="size-3 text-mist" aria-hidden="true" />}
      {label}
    </span>
  );
}
