# Portafolio · Juan Esteban Mosquera Perea

Portafolio web personal como **Software Engineer y Full Stack Developer**, desarrollado para el Proyecto 1 de Ingeniería Web. Parte del diseño base en Figma (layout de tres columnas con menús laterales fijos) y lo lleva a una experiencia de **scroll narrativo tipo Apple**: texto gigante que se enciende, escala y se desvanece mientras el usuario baja por la página.

🔗 **Demo:** https://TU-PROYECTO.vercel.app <!-- Reemplazar por el enlace de Vercel -->

![Next.js](https://img.shields.io/badge/Next.js-16-0d1321?logo=nextdotjs) ![React](https://img.shields.io/badge/React-19-1d2d44?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3e5c76?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-748cab?logo=tailwindcss&logoColor=white)

---

## Contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Cómo ejecutarlo](#cómo-ejecutarlo)
- [Estructura del proyecto (Atomic Design)](#estructura-del-proyecto-atomic-design)
- [Decisiones de diseño](#decisiones-de-diseño)
- [Personalización](#personalización)
- [Despliegue](#despliegue)

## Características

### Requisitos del proyecto

| Requisito | Implementación |
|---|---|
| Menú izquierdo fijo | Foto, nombre, título, datos de contacto, idiomas y lenguajes con % de dominio, y habilidades extra. En móvil se abre como panel lateral. |
| Perfil | Nombre, foto en fondo blanco, descripción y botón **Conóceme**, que abre un diálogo con forma de **terminal interactiva**. |
| Conocimientos | Grilla 3×2 de cards con ícono, título y descripción (estructura del Figma). |
| Educación | Contenedor con filas: institución, fechas, título y descripción (estructura del Figma). |
| Portafolio | Cards con imagen, título, descripción y botón **Saber más**, con **scroll horizontal**. Cada card abre un diálogo con el detalle, las tecnologías y los enlaces a GitHub y a la demo. |
| Footer | Llamado a la acción con correo y descarga del CV. |
| Menú derecho fijo | GitHub, LinkedIn, correo y CV. En móvil pasa a ser una barra flotante inferior. |
| Responsive | Diseñado para móvil (390 px), tablet (768 px) y escritorio (1280 px en adelante). |

### Extras (innovación y creatividad)

- **Escena inicial tipo Apple:** la frase *"Construyo software que conecta ingeniería, datos e inteligencia artificial"* queda fija en pantalla; cada línea se enciende con el scroll y luego la frase se aleja para dar paso al perfil.
- **Descripción que se revela palabra por palabra** según avanza el scroll.
- **Bandas de texto flotante:** palabras gigantes que se mueven en sentidos opuestos y aceleran con la velocidad del scroll.
- **Escena "Cómo trabajo":** el flujo *Problema → Diseño → Implementación → Testing → Calidad → Despliegue* se enciende paso a paso.
- **Terminal interactiva:** se escribe sola al abrirse y luego acepta comandos (`help`, `whoami`, `stack`, `proyectos`, `open <n>`, `workflow`, `contacto`, `cv`…), con historial (↑/↓), autocompletado (Tab) y chips clicables para móvil. `open 2` cierra la terminal y abre el proyecto 2 del portafolio.
- **Fondo artístico:** manchas de color, formas geométricas en parallax a tres velocidades y textura de grano.
- **Detalles:** línea de tiempo que se dibuja con el scroll, cards con brillo que sigue al cursor, filtros del portafolio, arrastre con el mouse, barra de progreso de lectura y portadas de proyecto generadas en SVG.
- **Accesibilidad:** HTML semántico, diálogos nativos (`<dialog>`) con foco atrapado y cierre con Esc, textos alternativos, contraste verificado (WCAG AA) y soporte de **"reducir movimiento"**: si el sistema lo pide, las animaciones de desplazamiento se desactivan y solo quedan fundidos suaves.

## Tecnologías

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | Framework de React, renderizado estático y optimización de fuentes e imágenes |
| [React 19](https://react.dev/) | Componentes e interactividad |
| [TypeScript](https://www.typescriptlang.org/) (modo estricto) | Tipado del contenido y de los componentes |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos, con tokens de diseño propios definidos en `@theme` |
| [Motion](https://motion.dev/) (Framer Motion) | Animaciones ligadas al scroll (`useScroll`, `useTransform`, `useSpring`) |
| [React Icons](https://react-icons.github.io/react-icons/) | Íconos de interfaz (Lucide), redes sociales y logos de tecnologías (Simple Icons) |

## Cómo ejecutarlo

Requisitos: **Node.js 20.9 o superior** y npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo en http://localhost:3000
npm run dev

# 3. Compilación de producción y servidor local
npm run build
npm start

# Revisión de código
npm run lint
```

## Estructura del proyecto (Atomic Design)

```
src/
├── app/                 # Rutas de Next.js: layout, página, estilos globales e ícono
├── components/
│   ├── atoms/           # Piezas mínimas: Button, Icon, Avatar, Tag, ProgressBar, Heading, DatePill, GradientText, Shape, Divider
│   ├── molecules/       # Combinaciones de átomos: SkillMeter, InfoItem, SocialLink, SectionHeader, KnowledgeCard,
│   │                    #   EducationRow, ProjectCard, FilterChips, Modal
│   ├── organisms/       # Secciones completas: LeftSidebar, SocialRail, IntroScene, ProfileSection, TerminalDialog,
│   │                    #   KnowledgeSection, WorkflowScene, EducationSection, PortfolioSection, ProjectDialog,
│   │                    #   MarqueeBand, BackgroundCanvas, Footer
│   ├── templates/       # ThreeColumnLayout: estructura de tres columnas del Figma
│   └── motion/          # Primitivas de animación: Reveal, WordReveal, ParallaxText, StickyScene, DrawLine
├── data/                # Todo el contenido (perfil, habilidades, educación, proyectos, redes)
├── hooks/               # useTerminal: lógica de la terminal interactiva
├── lib/                 # Registro de íconos, comandos de la terminal, eventos entre secciones y utilidades
└── types/               # Tipos del contenido
public/
├── cv/                  # Hoja de vida descargable
├── images/              # Foto de perfil
└── projects/            # Portadas SVG de los proyectos
```

### Componentes reutilizados

| Componente | Dónde se reutiliza |
|---|---|
| `Icon` | Menú izquierdo, redes, botones, cards, terminal, diálogos y footer |
| `Button` | Perfil, diálogos de proyecto y footer |
| `Tag` | Habilidades extra, cards de proyecto, diálogos y categorías |
| `SkillMeter` + `ProgressBar` | Idiomas y lenguajes de programación |
| `SectionHeader` + `GradientText` | Conocimientos, Educación, Portafolio, Cómo trabajo, perfil y footer |
| `Modal` | Terminal del perfil y diálogo de cada proyecto |
| `SocialLink` | Menú derecho de escritorio y barra flotante de móvil |
| `Avatar` | Menú izquierdo, cabecera móvil y marcador de la foto del perfil |
| `Shape` | Fondo artístico y marco de la foto |
| `Reveal` / `StickyScene` / `DrawLine` | Todas las secciones, escenas fijas y líneas de tiempo |

## Decisiones de diseño

- **Paleta cerrada de cinco colores:** `#0d1321` (fondo), `#1d2d44` (superficies), `#3e5c76` (formas y bordes), `#748cab` (texto secundario) y `#f0ebd8` (texto principal y acentos). Los degradados y brillos se construyen solo con estos colores y transparencias, lo que mantiene el estilo artístico pero consistente. `#3e5c76` no se usa para texto porque no alcanza el contraste mínimo.
- **Un solo degradado firma** (`#3e5c76 → #748cab → #f0ebd8`, a 135°), reservado para acentos: palabras clave, barras, fechas, íconos de redes y bordes en hover.
- **Scroll de la ventana, no de un contenedor:** los menús laterales son `position: fixed` y el contenido central usa el scroll normal de la página. Así `position: sticky` y las animaciones ligadas al scroll funcionan igual en escritorio y en móvil, y el scroll en el celular se siente nativo.
- **Scroll horizontal nativo en el portafolio:** `overflow-x-auto` con `scroll-snap`, que funciona con trackpad, touch y teclado. Las flechas, el arrastre y la barra de progreso son mejoras encima del comportamiento nativo.
- **Animaciones con `transform` y `opacity`:** son las propiedades que el navegador anima sin recalcular el layout, lo que mantiene la fluidez.
- **Contenido separado de la presentación:** los textos viven en `src/data/` con tipos de TypeScript; los componentes solo los muestran.
- **Tipografías:** Space Grotesk (titulares), Inter (texto) y JetBrains Mono (terminal y fechas), cargadas con `next/font`.

## Personalización

- **Foto:** guarda la imagen en `public/images/profile.png` (idealmente con fondo blanco) y en `src/data/profile.ts` cambia `photo: null` por `photo: "/images/profile.png"`.
- **Textos, habilidades y proyectos:** edita los archivos de `src/data/`.
- **Enlaces de proyectos:** cada proyecto acepta `demoUrl` y `repoUrl`. Si no hay repositorio, el botón lleva al perfil de GitHub.
- **Comandos de la terminal:** están en `src/lib/terminal.tsx`.

## Despliegue

El proyecto está listo para [Vercel](https://vercel.com/): al importar el repositorio, Vercel detecta Next.js automáticamente y no requiere variables de entorno ni configuración adicional.

---

Hecho por **Juan Esteban Mosquera Perea** · [GitHub](https://github.com/juanes0789) · [LinkedIn](https://www.linkedin.com/in/juan-esteban-mosquera-perea-b3665a342)
