import { cn } from "@/lib/cn";

interface FilterChipsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

/** Molécula: grupo de chips para filtrar (se comporta como botones de alternancia). */
export function FilterChips<T extends string>({ options, value, onChange, label }: FilterChipsProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-2">
      {options.map((option) => {
        const isActive = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-[0.82rem] transition-all duration-300",
              isActive
                ? "border-cream bg-cream font-semibold text-ink"
                : "border-mist/35 text-mist hover:border-mist hover:text-cream",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
