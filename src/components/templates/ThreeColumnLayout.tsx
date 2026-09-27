import type { ReactNode } from "react";

interface ThreeColumnLayoutProps {
  /** Menú izquierdo fijo. */
  sidebar: ReactNode;
  /** Menú derecho fijo (redes sociales). */
  rail: ReactNode;
  /** Fondo decorativo detrás de todo. */
  background?: ReactNode;
  children: ReactNode;
}

/**
 * Plantilla: layout de tres columnas del Figma.
 *
 * Los menús laterales son `position: fixed` y el contenido central usa el
 * scroll de la ventana (no un contenedor con overflow). Así `position: sticky`
 * y las animaciones ligadas al scroll funcionan sin trucos en todos los tamaños.
 * El contenido deja margen para los menús: 300px a la izquierda desde `lg`
 * y 76px a la derecha desde `md`.
 */
export function ThreeColumnLayout({ sidebar, rail, background, children }: ThreeColumnLayoutProps) {
  return (
    <>
      <a
        href="#perfil"
        className="sr-only z-[60] rounded-full bg-cream px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Saltar al contenido
      </a>
      {background}
      {sidebar}
      {rail}
      <main className="relative z-10 pt-16 md:mr-[76px] lg:ml-[300px] lg:pt-0">{children}</main>
    </>
  );
}
