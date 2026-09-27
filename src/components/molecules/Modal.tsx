"use client";

import { motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Id del título del contenido, para `aria-labelledby`. */
  labelledBy: string;
  children: ReactNode;
  className?: string;
  /** Oculta el botón × genérico cuando el contenido trae su propio cierre (la terminal). */
  hideCloseButton?: boolean;
}

/**
 * Molécula: diálogo genérico sobre `<dialog>` nativo.
 *
 * El elemento nativo aporta gratis el foco atrapado, el cierre con Esc y la capa
 * superior. Aquí se añade: cerrar al hacer clic fuera del panel, bloquear el
 * scroll de la página y la animación de entrada.
 */
export function Modal({ open, onClose, labelledBy, children, className, hideCloseButton = false }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && dialog.open) dialog.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onClose={onClose}
      // El <dialog> ocupa toda la pantalla: un clic directo sobre él es un clic fuera del panel.
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none justify-items-center overflow-y-auto bg-transparent p-4 text-cream open:grid sm:p-8"
    >
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn("relative my-auto w-full", className)}
        >
          {!hideCloseButton && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-ink/70 text-cream backdrop-blur-sm transition-colors hover:bg-cream hover:text-ink"
            >
              <Icon name="x" className="size-4" />
            </button>
          )}
          {children}
        </motion.div>
      )}
    </dialog>
  );
}
