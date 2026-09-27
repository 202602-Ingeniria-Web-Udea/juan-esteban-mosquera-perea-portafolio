import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { IconName } from "@/lib/icons";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "link";

interface BaseProps {
  variant?: Variant;
  icon?: IconName;
  /** Ícono al final del texto (por ejemplo, una flecha). */
  trailingIcon?: IconName;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps & Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & { href?: undefined };
type ButtonAsLink = BaseProps & Omit<ComponentPropsWithoutRef<"a">, keyof BaseProps> & { href: string };

const variants: Record<Variant, string> = {
  primary:
    "h-12 px-6 rounded-full bg-cream text-ink font-semibold shadow-[0_10px_40px_rgb(240_235_216/0.2)] hover:shadow-[0_14px_50px_rgb(240_235_216/0.35)] hover:-translate-y-0.5",
  secondary:
    "h-12 px-6 rounded-full border border-mist/50 bg-ink/30 text-cream font-semibold hover:border-cream hover:bg-cream/5",
  link: "text-cream font-semibold underline-offset-4 decoration-mist hover:decoration-cream underline",
};

/**
 * Átomo: botón del sistema. Si recibe `href` se renderiza como enlace (`<a>`),
 * así el mismo estilo sirve para acciones y para navegación.
 */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", icon, trailingIcon, className, children, ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2.5 text-[0.925rem] transition-all duration-300 cursor-pointer",
    variants[variant],
    className,
  );
  const content = (
    <>
      {icon && <Icon name={icon} className="size-[1.1rem]" />}
      <span>{children}</span>
      {trailingIcon && (
        <Icon name={trailingIcon} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (typeof rest.href === "string") {
    return (
      <a {...(rest as ComponentPropsWithoutRef<"a">)} className={cn("group", classes)}>
        {content}
      </a>
    );
  }
  const buttonProps = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type="button" {...buttonProps} className={cn("group", classes)}>
      {content}
    </button>
  );
}
