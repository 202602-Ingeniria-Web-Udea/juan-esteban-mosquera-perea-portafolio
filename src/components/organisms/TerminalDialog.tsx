"use client";

import { useCallback, useEffect, useRef, type KeyboardEvent } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Modal } from "@/components/molecules/Modal";
import { profile } from "@/data/profile";
import { useTerminal } from "@/hooks/useTerminal";
import { requestOpenProject } from "@/lib/events";
import { completableCommands, suggestedCommands, type TerminalAction } from "@/lib/terminal";

interface TerminalDialogProps {
  open: boolean;
  onClose: () => void;
}

const PROMPT_USER = "juanes@portfolio";

/** Prompt de la terminal (`juanes@portfolio:~$`). */
function Prompt() {
  return (
    <span className="shrink-0 text-mist">
      <span className="font-medium text-cream">{PROMPT_USER}</span>:~$
    </span>
  );
}

/**
 * Organismo: diálogo del perfil con forma de terminal de macOS.
 * Se escribe sola al abrirse y luego acepta comandos (ver `src/lib/terminal.tsx`).
 */
export function TerminalDialog({ open, onClose }: TerminalDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Acciones especiales de los comandos. useCallback: la referencia debe ser estable.
  const handleAction = useCallback(
    (action: TerminalAction) => {
      switch (action.type) {
        case "exit":
          onClose();
          break;
        case "download-cv": {
          const link = document.createElement("a");
          link.href = profile.cvUrl;
          link.download = profile.cvFileName;
          link.click();
          break;
        }
        case "open-project":
          // Se cierra la terminal y, tras la animación, se abre el proyecto en el portafolio.
          window.setTimeout(() => {
            onClose();
            requestOpenProject(action.projectId);
          }, 450);
          break;
      }
    },
    [onClose],
  );

  const { lines, input, setInput, isTyping, typedText, execute, browseHistory } = useTerminal(open, handleAction);

  // Mantiene visible la última línea.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, typedText]);

  // Al terminar la intro, el foco pasa al campo de comandos.
  useEffect(() => {
    if (open && !isTyping) inputRef.current?.focus();
  }, [open, isTyping]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      execute(input);
      setInput("");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      browseHistory("up");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      browseHistory("down");
    } else if (event.key === "Tab") {
      const match = completableCommands.find((command) => input && command.startsWith(input.toLowerCase()));
      if (match) {
        event.preventDefault();
        setInput(match);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="terminal-title" className="max-w-[780px]" hideCloseButton>
      <div className="overflow-hidden rounded-2xl border border-mist/40 bg-ink/95 shadow-[0_40px_120px_rgb(0_0_0/0.6),0_0_80px_rgb(116_140_171/0.15)]">
        {/* Barra de la ventana */}
        <div className="relative flex h-11 items-center gap-2 border-b border-steel/60 bg-navy px-4">
          <button type="button" onClick={onClose} aria-label="Cerrar terminal" className="size-3 cursor-pointer rounded-full bg-cream" />
          <span className="size-3 rounded-full bg-mist" aria-hidden="true" />
          <span className="size-3 rounded-full bg-steel" aria-hidden="true" />
          <h2 id="terminal-title" className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-mist">
            {PROMPT_USER}: ~
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="ml-auto grid size-7 cursor-pointer place-items-center rounded-md text-mist transition-colors hover:bg-ink/50 hover:text-cream"
          >
            <Icon name="x" className="size-4" />
          </button>
        </div>

        {/* Salida */}
        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          className="scrollbar-slim h-[min(58vh,420px)] overflow-y-auto px-5 py-5 font-mono text-[0.8rem] leading-[1.75] text-cream/90 sm:px-6 sm:text-[0.84rem]"
          aria-live="polite"
        >
          {lines.map((line) =>
            line.kind === "input" ? (
              <div key={line.id} className="mt-3 flex gap-2 first:mt-0">
                <Prompt />
                <span className="break-all">{line.content}</span>
              </div>
            ) : (
              <div key={line.id} className="break-words">
                {line.content}
              </div>
            ),
          )}

          {/* Línea de entrada: durante la intro muestra lo que se "teclea" solo. */}
          <div className="mt-3 flex items-center gap-2">
            <Prompt />
            {isTyping ? (
              <span>
                {typedText}
                <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-cream" aria-hidden="true" />
              </span>
            ) : (
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Escribe un comando"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent text-cream caret-cream outline-none placeholder:text-steel"
                placeholder="escribe help"
              />
            )}
          </div>
        </div>

        {/* Chips de comandos para móvil o para quien no quiera teclear */}
        <div className="scrollbar-none flex gap-2 overflow-x-auto border-t border-steel/50 px-5 py-3.5 sm:px-6">
          {suggestedCommands.map((command, index) => (
            <button
              key={command}
              type="button"
              disabled={isTyping}
              onClick={() => execute(command)}
              className={
                index === 0
                  ? "shrink-0 cursor-pointer rounded-lg bg-cream px-3 py-1.5 font-mono text-xs text-ink disabled:opacity-50"
                  : "shrink-0 cursor-pointer rounded-lg border border-mist/35 px-3 py-1.5 font-mono text-xs text-cream transition-colors hover:border-cream disabled:opacity-50"
              }
            >
              {command}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
