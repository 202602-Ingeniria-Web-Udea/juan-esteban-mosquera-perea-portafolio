"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { introScript, runCommand, type TerminalAction } from "@/lib/terminal";

export interface TerminalLine {
  id: number;
  kind: "input" | "output";
  content: ReactNode;
}

const TYPING_DELAY_MS = 45;
const PAUSE_BETWEEN_COMMANDS_MS = 380;

/**
 * Estado y lógica de la terminal interactiva.
 *
 * 1. Al abrirse por primera vez "escribe" sola los comandos de `introScript`,
 *    letra por letra (o de inmediato si el usuario prefiere menos movimiento).
 * 2. Después acepta comandos, con historial (↑/↓) y autocompletado (Tab).
 * Las acciones especiales (abrir proyecto, descargar CV, cerrar) se delegan a `onAction`.
 */
export function useTerminal(isOpen: boolean, onAction: (action: TerminalAction) => void) {
  const reduceMotion = useReducedMotion();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);
  const nextId = useRef(0);
  const introPlayed = useRef(false);

  const pushLines = useCallback((...newLines: Array<Omit<TerminalLine, "id">>) => {
    setLines((current) => [...current, ...newLines.map((line) => ({ ...line, id: nextId.current++ }))]);
  }, []);

  /** Ejecuta un comando: imprime la entrada, la salida y dispara su acción. */
  const execute = useCallback(
    (raw: string, remember = true) => {
      const result = runCommand(raw);
      if (result.action?.type === "clear") {
        setLines([]);
      } else {
        pushLines({ kind: "input", content: raw });
        if (result.output) pushLines({ kind: "output", content: result.output });
      }
      if (remember && raw.trim()) {
        history.current = [...history.current, raw.trim()];
        historyIndex.current = -1;
      }
      if (result.action && result.action.type !== "clear") onAction(result.action);
    },
    [onAction, pushLines],
  );

  // Referencias estables para que la intro no se reinicie si cambian estas funciones.
  const executeRef = useRef(execute);
  const reduceMotionRef = useRef(reduceMotion);
  useEffect(() => {
    executeRef.current = execute;
    reduceMotionRef.current = reduceMotion;
  });

  // Intro automática: solo la primera vez que se abre la terminal.
  useEffect(() => {
    if (!isOpen || introPlayed.current) return;
    introPlayed.current = true;
    const run = (command: string) => executeRef.current(command, false);

    if (reduceMotionRef.current) {
      introScript.forEach(run);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)));

    (async () => {
      setIsTyping(true);
      await wait(400);
      for (const command of introScript) {
        for (let index = 1; index <= command.length; index++) {
          if (cancelled) return;
          setTypedText(command.slice(0, index));
          await wait(TYPING_DELAY_MS);
        }
        if (cancelled) return;
        setTypedText("");
        run(command);
        await wait(PAUSE_BETWEEN_COMMANDS_MS);
      }
      setIsTyping(false);
    })();

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
      // Si se cerró a mitad de la intro, se completa de inmediato la próxima vez.
      setIsTyping(false);
      setTypedText("");
    };
  }, [isOpen]);

  /** Navega el historial con las flechas. */
  const browseHistory = useCallback((direction: "up" | "down") => {
    const entries = history.current;
    if (entries.length === 0) return;
    if (direction === "up") {
      historyIndex.current = historyIndex.current === -1 ? entries.length - 1 : Math.max(0, historyIndex.current - 1);
    } else {
      historyIndex.current = historyIndex.current === -1 ? -1 : historyIndex.current + 1;
      if (historyIndex.current >= entries.length) historyIndex.current = -1;
    }
    setInput(historyIndex.current === -1 ? "" : entries[historyIndex.current]);
  }, []);

  return { lines, input, setInput, isTyping, typedText, execute, browseHistory };
}
