import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Átomo: texto con el degradado firma y un brillo que lo recorre lentamente. */
export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("text-gradient animate-shine", className)}>{children}</span>;
}
