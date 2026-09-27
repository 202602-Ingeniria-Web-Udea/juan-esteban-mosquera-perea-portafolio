import { Icon } from "@/components/atoms/Icon";
import type { InfoEntry } from "@/types";

/** Molécula: ícono + dato personal (ciudad, universidad, correo...). */
export function InfoItem({ icon, label, value, href }: InfoEntry) {
  const content = (
    <>
      <Icon name={icon} className="size-[15px] shrink-0 text-mist" />
      <span className="sr-only">{label}: </span>
      <span className="truncate">{value}</span>
    </>
  );
  return (
    <li className="text-[0.8rem] text-cream">
      {href ? (
        <a href={href} className="flex items-center gap-2.5 transition-colors hover:text-mist">
          {content}
        </a>
      ) : (
        <span className="flex items-center gap-2.5">{content}</span>
      )}
    </li>
  );
}
