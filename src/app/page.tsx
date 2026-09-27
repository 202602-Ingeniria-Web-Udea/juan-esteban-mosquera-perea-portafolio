import { BackgroundCanvas } from "@/components/organisms/BackgroundCanvas";
import { EducationSection } from "@/components/organisms/EducationSection";
import { Footer } from "@/components/organisms/Footer";
import { IntroScene } from "@/components/organisms/IntroScene";
import { KnowledgeSection } from "@/components/organisms/KnowledgeSection";
import { LeftSidebar } from "@/components/organisms/LeftSidebar";
import { MarqueeBand } from "@/components/organisms/MarqueeBand";
import { PortfolioSection } from "@/components/organisms/PortfolioSection";
import { ProfileSection } from "@/components/organisms/ProfileSection";
import { SocialRail } from "@/components/organisms/SocialRail";
import { WorkflowScene } from "@/components/organisms/WorkflowScene";
import { ThreeColumnLayout } from "@/components/templates/ThreeColumnLayout";

/**
 * Página principal. El orden de las secciones sigue el guion del scroll:
 * frase inicial → perfil → banda flotante → conocimientos → cómo trabajo →
 * educación → banda flotante → portafolio → footer.
 */
export default function Home() {
  return (
    <ThreeColumnLayout sidebar={<LeftSidebar />} rail={<SocialRail />} background={<BackgroundCanvas />}>
      <IntroScene />
      <ProfileSection />
      <MarqueeBand
        outlineWords={["Java", "Spring Boot", "Python", "FastAPI", "TypeScript", "React", "Next.js", "Go"]}
        filledWords={["Clean Code", "SOLID", "REST APIs", "Docker", "CI/CD", "Azure", "Machine Learning"]}
      />
      <KnowledgeSection />
      <WorkflowScene />
      <EducationSection />
      <MarqueeBand
        outlineWords={["Backend", "Full Stack", "Data", "AI", "Cloud"]}
        filledWords={["PostgreSQL", "Node.js", "Pandas", "Scikit-learn", "GitHub Actions", "SonarCloud"]}
      />
      <PortfolioSection />
      <Footer />
    </ThreeColumnLayout>
  );
}
