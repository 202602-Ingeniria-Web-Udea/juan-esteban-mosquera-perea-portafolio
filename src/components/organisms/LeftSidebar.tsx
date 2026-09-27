"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Icon } from "@/components/atoms/Icon";
import { profile } from "@/data/profile";
import { SidebarContent } from "./SidebarContent";

/**
 * Organismo: menú izquierdo fijo.
 * - Escritorio (≥1024px): barra fija de 300px con scroll interno propio.
 * - Tablet y móvil: cabecera fija con foto y nombre; el menú completo se abre
 *   en un panel lateral (drawer) con el botón de hamburguesa.
 */
export function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Mientras el panel está abierto: foco en "cerrar", Esc para salir y sin scroll de fondo.
  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", handleKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <aside
        aria-label="Información personal"
        className="scrollbar-slim fixed inset-y-0 left-0 z-30 hidden w-[300px] overflow-y-auto border-r border-steel/45 bg-navy/70 px-6 py-7 backdrop-blur-xl lg:block"
      >
        <SidebarContent />
      </aside>

      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-3 border-b border-steel/50 bg-navy/80 px-4 backdrop-blur-xl lg:hidden">
        <Avatar src={profile.photo} alt={`Foto de ${profile.name}`} size={38} />
        <div className="min-w-0 leading-tight">
          <p className="truncate font-display text-sm font-semibold">{profile.shortName}</p>
          <p className="truncate text-[0.7rem] text-mist">Software Engineer</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls="menu-movil"
          aria-label="Abrir información personal"
          className="ml-auto grid size-10 cursor-pointer place-items-center rounded-xl border border-mist/40 text-cream"
        >
          <Icon name="menu" className="size-5" />
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              key="panel"
              id="menu-movil"
              role="dialog"
              aria-modal="true"
              aria-label="Información personal"
              className="scrollbar-slim fixed inset-y-0 left-0 z-50 w-[min(88vw,320px)] overflow-y-auto border-r border-steel/50 bg-navy px-6 pt-14 pb-8 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar"
                className="absolute top-4 right-4 grid size-9 cursor-pointer place-items-center rounded-full border border-mist/40"
              >
                <Icon name="x" className="size-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
