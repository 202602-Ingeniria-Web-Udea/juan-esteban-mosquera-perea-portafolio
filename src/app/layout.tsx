import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

/* Tipografías: Space Grotesk para titulares, Inter para texto y JetBrains Mono para la terminal y fechas. */
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], weight: ["400", "500"] });

const siteUrl = "https://juan-esteban-mosquera-perea-portafo.vercel.app";

export const metadata: Metadata = {
  // Base para las URL absolutas de la vista previa (LinkedIn, WhatsApp, X). La imagen es src/app/opengraph-image.png.
  metadataBase: new URL(siteUrl),
  title: "Juan Esteban Mosquera Perea · Software Engineer",
  description:
    "Portafolio de Juan Esteban Mosquera Perea, Software Engineer y Full Stack Developer de Medellín, Colombia. Backend, datos e inteligencia artificial.",
  authors: [{ name: "Juan Esteban Mosquera Perea" }],
  keywords: ["Software Engineer", "Full Stack Developer", "Backend", "Java", "Spring Boot", "Python", "FastAPI", "Next.js", "Medellín"],
  openGraph: {
    title: "Juan Esteban Mosquera Perea · Software Engineer",
    description: "Construyo software que conecta ingeniería, datos e inteligencia artificial.",
    url: siteUrl,
    siteName: "Juan Esteban Mosquera Perea",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Esteban Mosquera Perea · Software Engineer",
    description: "Construyo software que conecta ingeniería, datos e inteligencia artificial.",
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
