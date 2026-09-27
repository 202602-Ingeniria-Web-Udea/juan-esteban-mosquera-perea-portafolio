import { cn } from "@/lib/cn";

/** Átomo: fechas en una píldora con el degradado firma (como en el Figma). */
export function DatePill({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full bg-signature px-2.5 py-1 font-mono text-[0.7rem] font-medium text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
