import { cn } from "@/lib/cn";

export type ShapeVariant = "ring" | "plus" | "triangle" | "dots";

interface ShapeProps {
  variant: ShapeVariant;
  className?: string;
}

/**
 * Átomo: las únicas formas decorativas del sistema visual.
 * Limitarlas a cuatro variantes mantiene el fondo "artístico" pero consistente.
 */
export function Shape({ variant, className }: ShapeProps) {
  const base = cn("pointer-events-none", className);
  switch (variant) {
    case "ring":
      return <div aria-hidden="true" className={cn("rounded-full border border-mist/30", base)} />;
    case "plus":
      return (
        <span aria-hidden="true" className={cn("font-display text-2xl font-light text-cream/35", base)}>
          +
        </span>
      );
    case "triangle":
      return (
        <svg aria-hidden="true" viewBox="0 0 100 100" className={cn("fill-none stroke-mist/35", base)} strokeWidth={1}>
          <path d="M50 8 94 88H6z" />
        </svg>
      );
    case "dots":
      return (
        <div
          aria-hidden="true"
          className={cn("dot-grid opacity-60 [mask-image:linear-gradient(135deg,#000,transparent)]", base)}
        />
      );
  }
}
