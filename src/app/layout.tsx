import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

/* Tipografías: Space Grotesk para titulares, Inter para texto y JetBrains Mono para la terminal y fechas. */
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Juan Esteban Mosquera Perea · Software Engineer",
  description:
    "Portafolio de Juan Esteban Mosquera Perea, Software Engineer y Full Stack Developer de Medellín, Colombia. Backend, datos e inteligencia artificial.",
  authors: [{ name: "Juan Esteban Mosquera Perea" }],
  keywords: ["Software Engineer", "Full Stack Developer", "Backend", "Java", "Spring Boot", "Python", "FastAPI", "Next.js", "Medellín"],
  openGraph: {
    title: "Juan Esteban Mosquera Perea · Software Engineer",
    description: "Construyo software que conecta ingeniería, datos e inteligencia artificial.",
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1321",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
