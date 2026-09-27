import Image from "next/image";
import { cn } from "@/lib/cn";

interface AvatarProps {
  src: string | null;
  alt: string;
  size?: number;
  /** Muestra el punto de "disponible" del diseño de Figma. */
  showStatus?: boolean;
  className?: string;
}

/**
 * Átomo: foto circular con aro degradado.
 * Mientras no haya foto (`src` en null) muestra una silueta sobre fondo blanco.
 */
export function Avatar({ src, alt, size = 96, showStatus = false, className }: AvatarProps) {
  return (
    <div className={cn("relative shrink-0 rounded-full bg-signature p-[3px]", className)} style={{ width: size, height: size }}>
      <div className="relative size-full overflow-hidden rounded-full bg-white">
        {src ? (
          <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" priority />
        ) : (
          <PhotoPlaceholder />
        )}
      </div>
      {showStatus && (
        <span
          className="absolute right-[6%] bottom-[6%] size-4 animate-pulse-soft rounded-full border-[3px] border-navy bg-cream"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/** Silueta neutra que ocupa el lugar de la foto hasta que se agregue. */
export function PhotoPlaceholder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={cn("size-full", className)} role="img" aria-label="Espacio para la foto">
      <rect width="200" height="200" fill="#ffffff" />
      <circle cx="100" cy="80" r="36" fill="#e3e8ef" />
      <path d="M28 200c0-44 32-72 72-72s72 28 72 72z" fill="#e3e8ef" />
    </svg>
  );
}
