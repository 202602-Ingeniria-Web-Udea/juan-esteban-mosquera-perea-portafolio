"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { GradientText } from "@/components/atoms/GradientText";
import { Heading } from "@/components/atoms/Heading";
import { DrawLine } from "@/components/motion/DrawLine";
import { StickyScene } from "@/components/motion/StickyScene";
import { workflow } from "@/data/knowledge";
import type { WorkflowStep } from "@/types";

/**
 * Organismo: escena "Cómo trabajo".
 * Mientras la escena está fija, cada paso del flujo (Problema → … → Despliegue)
 * se enciende en orden y una línea vertical se dibuja uniéndolos.
 */
export function WorkflowScene() {
  const reduceMotion = useReducedMotion();
  return (
    <StickyScene
      id="como-trabajo"
      ariaLabel="Cómo trabajo"
      heightClassName={reduceMotion ? "h-auto min-h-svh" : "h-[200vh]"}
    >
      {(progress) => <WorkflowContent progress={progress} reduceMotion={Boolean(reduceMotion)} />}
    </StickyScene>
  );
}

function WorkflowContent({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) {
  const lineProgress = useTransform(progress, [0.05, 0.85], [0, 1]);
  return (
    <div className="grid h-full content-center gap-8 px-6 md:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12 xl:px-16">
      <div>
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-mist uppercase before:h-px before:w-7 before:bg-mist">
          Mi proceso
        </p>
        <Heading level={2} className="mt-3">
          Cómo <GradientText>trabajo</GradientText>
        </Heading>
        <p className="mt-3 max-w-sm text-[0.95rem] text-mist">
          Primero entiendo el problema; después elijo la tecnología. Cada paso reduce el riesgo del siguiente.
        </p>
      </div>

      <div className="relative pl-9 md:pl-12">
        <DrawLine progress={reduceMotion ? progress : lineProgress} className="absolute top-3 bottom-3 left-[7px] md:left-[11px]" />
        <ol className="flex flex-col gap-3 md:gap-4">
          {workflow.map((step, index) => (
            <Step
              key={step.title}
              step={step}
              index={index}
              progress={progress}
              reduceMotion={reduceMotion}
              // Cada paso se enciende en su tramo del recorrido (entre 0.05 y 0.85).
              range={[0.05 + (index * 0.8) / workflow.length, 0.05 + ((index + 0.6) * 0.8) / workflow.length]}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

interface StepProps {
  step: WorkflowStep;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  reduceMotion: boolean;
}

function Step({ step, index, progress, range, reduceMotion }: StepProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const x = useTransform(progress, range, [-12, 0]);
  return (
    <li className="relative">
      <motion.span
        aria-hidden="true"
        style={reduceMotion ? undefined : { opacity }}
        className="absolute top-[0.65em] -left-[33px] size-2.5 rounded-full bg-cream md:-left-[45px] md:size-3"
      />
      <motion.div style={reduceMotion ? undefined : { opacity, x }}>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-mist">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="font-display text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.05] font-bold tracking-[-0.03em]">{step.title}</h3>
        </div>
        <p className="mt-0.5 pl-8 text-[0.82rem] text-mist md:text-[0.9rem]">{step.description}</p>
      </motion.div>
    </li>
  );
}
