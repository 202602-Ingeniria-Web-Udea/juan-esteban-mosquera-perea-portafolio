import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3 | 4;

const styles: Record<Level, string> = {
  1: "font-display font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(2.5rem,5vw,4rem)]",
  2: "font-display font-bold tracking-[-0.035em] leading-[1.1] text-[clamp(2.1rem,4vw,3rem)]",
  3: "font-display font-semibold tracking-[-0.01em] text-lg",
  4: "font-display font-semibold text-[1.05rem]",
};

interface HeadingProps {
  level?: Level;
  className?: string;
  id?: string;
  children: ReactNode;
}

/** Átomo: títulos con la escala tipográfica del sitio (h1–h4). */
export function Heading({ level = 2, className, id, children }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={cn(styles[level], className)}>
      {children}
    </Tag>
  );
}
