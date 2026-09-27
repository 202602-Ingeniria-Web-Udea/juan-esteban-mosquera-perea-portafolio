import { cn } from "@/lib/cn";

/** Átomo: línea divisoria sutil. */
export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-steel/50", className)} />;
}
