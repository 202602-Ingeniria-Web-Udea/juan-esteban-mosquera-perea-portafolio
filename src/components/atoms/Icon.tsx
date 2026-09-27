import { icons, type IconName } from "@/lib/icons";

interface IconProps {
  name: IconName;
  className?: string;
  /** Texto accesible. Si se omite, el ícono es decorativo y se oculta a lectores de pantalla. */
  label?: string;
}

/** Átomo: dibuja un ícono del registro central por su nombre. */
export function Icon({ name, className = "size-4", label }: IconProps) {
  const Component = icons[name];
  return label ? (
    <Component className={className} role="img" aria-label={label} />
  ) : (
    <Component className={className} aria-hidden="true" focusable="false" />
  );
}
