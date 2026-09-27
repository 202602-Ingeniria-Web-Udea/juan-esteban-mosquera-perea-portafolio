import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";
import type { Social } from "@/types";

interface SocialLinkProps extends Social {
  className?: string;
  /** Posición del tooltip: a la izquierda en el rail de escritorio, arriba en móvil. */
  tooltip?: "left" | "top";
}

/** Molécula: botón circular con el degradado firma que enlaza a una red social o al CV. */
export function SocialLink({ label, href, icon, download, className, tooltip = "left" }: SocialLinkProps) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      {...(download ? { download: "" } : {})}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative grid size-10 place-items-center rounded-full bg-signature text-ink shadow-[0_6px_20px_rgb(116_140_171/0.25)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105",
        className,
      )}
    >
      <Icon name={icon} className="size-[18px]" />
      <span
        className={cn(
          "pointer-events-none absolute whitespace-nowrap rounded-lg border border-steel/60 bg-navy px-2.5 py-1 text-xs text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
          tooltip === "left" ? "right-[calc(100%+12px)]" : "bottom-[calc(100%+10px)]",
        )}
      >
        {label}
      </span>
    </a>
  );
}
