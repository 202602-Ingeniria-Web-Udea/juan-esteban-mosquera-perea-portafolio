"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Shape } from "@/components/atoms/Shape";

/**
 * Organismo: lienzo de fondo fijo con blobs de color, formas geométricas y grano.
 *
 * Las formas se mueven en parallax a tres velocidades distintas según el scroll
 * de toda la página (lentas, medias y rápidas), lo que da profundidad sin
 * distraer del contenido. Los blobs "respiran" con una animación CSS lenta.
 */
export function BackgroundCanvas() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const slow = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -160]);
  const medium = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -420]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -760]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Blobs de color muy desenfocados */}
      <motion.div style={{ y: slow }} className="absolute inset-0">
        <div className="absolute -top-40 left-[22%] size-[620px] animate-blob rounded-full bg-[radial-gradient(circle,rgb(62_92_118/0.75),transparent_70%)] blur-[90px]" />
        <div className="absolute top-[35%] -right-32 size-[560px] animate-blob rounded-full bg-[radial-gradient(circle,rgb(116_140_171/0.4),transparent_70%)] blur-[90px] [animation-delay:-8s]" />
        <div className="absolute bottom-[-10%] left-[40%] size-[440px] animate-blob rounded-full bg-[radial-gradient(circle,rgb(240_235_216/0.1),transparent_70%)] blur-[90px] [animation-delay:-14s]" />
      </motion.div>

      {/* Formas en parallax: cada grupo a una velocidad */}
      <motion.div style={{ y: medium }} className="absolute inset-0">
        <Shape variant="ring" className="absolute top-[12%] right-[12%] size-[340px]" />
        <Shape variant="dots" className="absolute top-[8%] right-[8%] h-40 w-56" />
        <Shape variant="plus" className="absolute top-[42%] left-[24%]" />
        <Shape variant="ring" className="absolute top-[88%] left-[30%] size-36 border-cream/20" />
      </motion.div>
      <motion.div style={{ y: fast }} className="absolute inset-0">
        <Shape variant="plus" className="absolute top-[20%] left-[55%]" />
        <Shape variant="plus" className="absolute top-[78%] right-[12%]" />
        <Shape variant="dots" className="absolute top-[110%] left-[26%] h-40 w-56" />
        <Shape variant="plus" className="absolute top-[140%] left-[70%]" />
      </motion.div>
      <motion.div style={{ y: medium, rotate: spin }} className="absolute top-[62%] right-[18%] size-24">
        <Shape variant="triangle" className="size-full" />
      </motion.div>

      <div className="grain absolute inset-0 opacity-[0.07]" />
    </div>
  );
}
