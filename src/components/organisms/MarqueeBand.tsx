import { ParallaxText } from "@/components/motion/ParallaxText";

interface MarqueeBandProps {
  /** Palabras de la fila con contorno. */
  outlineWords: string[];
  /** Palabras de la fila rellena con el degradado. */
  filledWords: string[];
}

/** Separador entre palabras de las bandas. */
function Row({ words, filled }: { words: string[]; filled: boolean }) {
  return (
    <>
      {words.map((word) => (
        <span key={word}>
          <span className={filled ? "text-gradient" : "text-outline"}>{word}</span>
          <span className="mx-[0.35em] inline-block align-middle text-[0.55em] text-steel">✦</span>
        </span>
      ))}
    </>
  );
}

/**
 * Organismo: banda de texto flotante entre secciones.
 * Dos filas de palabras gigantes que se mueven en sentidos opuestos con el scroll.
 * Es decorativa (el contenido ya está en la página), por eso se oculta a lectores de pantalla.
 */
export function MarqueeBand({ outlineWords, filledWords }: MarqueeBandProps) {
  const rowClass = "font-display text-[clamp(3rem,8vw,5.25rem)] leading-[1.05] font-bold tracking-[-0.03em] uppercase";
  return (
    <div className="-mx-6 my-6 -rotate-[2.5deg] overflow-hidden py-8 select-none md:-mx-10">
      <ParallaxText baseVelocity={-1.6} className={rowClass}>
        <Row words={outlineWords} filled={false} />
      </ParallaxText>
      <ParallaxText baseVelocity={1.6} className={rowClass}>
        <Row words={filledWords} filled />
      </ParallaxText>
    </div>
  );
}
