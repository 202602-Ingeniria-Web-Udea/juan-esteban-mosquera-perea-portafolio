import { KnowledgeCard } from "@/components/molecules/KnowledgeCard";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { knowledge } from "@/data/knowledge";

/** Organismo: sección Conocimientos, grilla 3×2 de cards como en el Figma. */
export function KnowledgeSection() {
  return (
    <section id="conocimientos" aria-labelledby="conocimientos-titulo" className="relative px-6 py-24 md:px-12 xl:px-16">
      <SectionHeader
        id="conocimientos-titulo"
        eyebrow="01 · Lo que sé hacer"
        title="Mis"
        highlight="conocimientos"
        description="Seis áreas donde combino ingeniería de software, datos e inteligencia artificial."
      />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {knowledge.map((item, index) => (
          <li key={item.title}>
            {/* Entrada escalonada: cada card espera un poco más que la anterior. */}
            <Reveal delay={(index % 3) * 0.1} className="h-full">
              <KnowledgeCard {...item} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
