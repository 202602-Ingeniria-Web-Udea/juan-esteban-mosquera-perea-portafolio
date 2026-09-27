<div align="center">
  <img src="src/app/apple-icon.png" alt="Logotipo Prompt MJ" width="88" height="88" />

# Portafolio · Juan Esteban Mosquera Perea

**Software Engineer & Full Stack Developer** · Medellín, Colombia

Portafolio web personal con scroll narrativo tipo Apple, construido con Next.js, React, TypeScript y Tailwind CSS.

**[Ver el sitio en vivo →](https://portfolio-tau-one-zrffiy5zwc.vercel.app/)**

![Next.js](https://img.shields.io/badge/Next.js-16-0d1321?logo=nextdotjs) ![React](https://img.shields.io/badge/React-19-1d2d44?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3e5c76?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-748cab?logo=tailwindcss&logoColor=white)

</div>

---

## Sobre el proyecto

Este repositorio contiene mi hoja de vida en formato web, desarrollada como **Proyecto 1 del curso de Ingeniería Web** (Universidad de Antioquia). Parte de un diseño base en Figma, con un layout de tres columnas y menús laterales fijos, y lo lleva a una experiencia de **scroll narrativo**: el texto aparece, se enciende y se desvanece a medida que se baja por la página, al estilo de las páginas de producto de Apple.

El objetivo es presentar mi perfil profesional (backend, desarrollo full stack, datos e inteligencia artificial) y, al mismo tiempo, practicar el flujo completo de desarrollo frontend: maquetación desde un diseño, componentes reutilizables con Atomic Design, control de versiones con Git y despliegue en Vercel.

## Contenido

- [Qué incluye](#qué-incluye)
- [Tecnologías](#tecnologías)
- [Cómo ejecutarlo](#cómo-ejecutarlo)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Decisiones de diseño](#decisiones-de-diseño)
- [Accesibilidad y rendimiento](#accesibilidad-y-rendimiento)
- [Edición del contenido](#edición-del-contenido)
- [Contacto](#contacto)

## Qué incluye

### Secciones

| Sección | Qué muestra |
|---|---|
| **Menú izquierdo (fijo)** | Foto, nombre, título profesional, datos de contacto, idiomas y lenguajes de programación con su porcentaje de dominio, y habilidades extra. En móvil se abre como un panel lateral. |
| **Perfil** | Presentación con foto sobre fondo blanco y una descripción breve. El botón **Conóceme** abre una terminal interactiva. |
| **Conocimientos** | Seis áreas de especialización en una grilla de cards, cada una con ícono, título y descripción. |
| **Cómo trabajo** | Mi proceso de desarrollo: Problema → Diseño → Implementación → Testing → Calidad → Despliegue. |
| **Educación** | Formación académica: institución, fechas, título y descripción. |
| **Portafolio** | Proyectos con imagen, rol, descripción y tecnologías, en un carrusel con **scroll horizontal**. Cada uno tiene un botón **Saber más** que abre el detalle con enlaces a la demo y al código. |
| **Footer** | Llamado a la acción con correo y descarga de la hoja de vida. |
| **Menú derecho (fijo)** | GitHub, LinkedIn, correo y CV. En móvil se convierte en una barra flotante inferior. |

### Detalles interactivos

- **Escena inicial:** la frase *"Construyo software que conecta ingeniería, datos e inteligencia artificial"* queda fija en pantalla; cada línea se enciende con el scroll y luego la frase se aleja para dar paso al perfil.
- **Texto que se revela palabra por palabra** en la descripción del perfil.
- **Bandas de texto flotante** con tecnologías y prácticas, que se desplazan en sentidos opuestos y reaccionan a la velocidad del scroll.
- **Terminal interactiva:** se escribe sola al abrirse y luego acepta comandos. Pruebe `help`, `whoami`, `stack`, `proyectos`, `open 2`, `workflow`, `contacto` o `cv`. Tiene historial (↑/↓), autocompletado (Tab) y botones de comandos para móvil.
- **Línea de tiempo** en Educación que se dibuja con el scroll.
- **Filtros** del portafolio por categoría (Backend, Full Stack, Data & AI), arrastre con el mouse y flechas de navegación.
- **Fondo artístico** con manchas de color, formas geométricas en parallax y textura de grano.

## Tecnologías

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | Framework de React, generación estática y optimización de fuentes e imágenes |
| [React 19](https://react.dev/) | Componentes e interactividad |
| [TypeScript](https://www.typescriptlang.org/) (modo estricto) | Tipado del contenido y de los componentes |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos, con tokens de diseño propios definidos en `@theme` |
| [Motion](https://motion.dev/) | Animaciones ligadas al scroll (`useScroll`, `useTransform`, `useSpring`) |
| [React Icons](https://react-icons.github.io/react-icons/) | Íconos de interfaz (Lucide), redes sociales y logos de tecnologías (Simple Icons) |
| [Vercel](https://vercel.com/) | Despliegue continuo desde la rama `main` |

## Cómo ejecutarlo

**Requisitos:** Node.js 20.9 o superior y npm.

```bash
# 1. Clonar el repositorio
git clone https://github.com/juanes0789/portfolio.git
cd portfolio

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo → http://localhost:3000
npm run dev
```

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera la versión de producción |
| `npm start` | Sirve la versión de producción (después de `build`) |
| `npm run lint` | Revisa el código con ESLint |

El proyecto no necesita variables de entorno ni servicios externos.

## Estructura del proyecto

El código sigue **Atomic Design**: los componentes van de piezas mínimas a secciones completas, y el contenido está separado de la presentación.

```
src/
├── app/                 # Layout, página principal, estilos globales e íconos del sitio
├── components/
│   ├── atoms/           # Piezas mínimas: Button, Icon, Avatar, Tag, ProgressBar, Heading, DatePill, GradientText, Shape…
│   ├── molecules/       # Combinaciones de átomos: SkillMeter, InfoItem, SocialLink, SectionHeader, KnowledgeCard,
│   │                    #   EducationRow, ProjectCard, FilterChips, Modal
│   ├── organisms/       # Secciones completas: menús, perfil, terminal, conocimientos, educación, portafolio, footer…
│   ├── templates/       # ThreeColumnLayout: la estructura de tres columnas del diseño
│   └── motion/          # Animaciones reutilizables: Reveal, WordReveal, ParallaxText, StickyScene, DrawLine
├── data/                # Todo el contenido: perfil, habilidades, conocimientos, educación, proyectos y redes
├── hooks/               # useTerminal: lógica de la terminal interactiva
├── lib/                 # Registro de íconos, comandos de la terminal y utilidades
└── types/               # Tipos del contenido
public/
├── cv/                  # Hoja de vida descargable
├── images/              # Foto de perfil
└── projects/            # Portadas de los proyectos (SVG)
```

### Componentes reutilizados

| Componente | Dónde se usa |
|---|---|
| `Icon` | Menús, botones, cards, terminal, diálogos y footer |
| `Button` | Perfil, diálogos de proyecto y footer |
| `Tag` | Habilidades extra, cards de proyecto, diálogos y categorías |
| `SkillMeter` + `ProgressBar` | Idiomas y lenguajes de programación |
| `SectionHeader` + `GradientText` | Encabezados de todas las secciones, perfil y footer |
| `Modal` | Terminal del perfil y detalle de cada proyecto |
| `SocialLink` | Menú derecho de escritorio y barra flotante de móvil |
| `Avatar` | Menú izquierdo y cabecera móvil |
| `Shape` | Fondo artístico y marco de la foto |
| `Reveal`, `StickyScene`, `DrawLine` | Entradas animadas, escenas fijas y líneas de tiempo en varias secciones |

## Decisiones de diseño

- **Paleta cerrada de cinco colores:** `#0d1321` (fondo), `#1d2d44` (superficies), `#3e5c76` (formas y bordes), `#748cab` (texto secundario) y `#f0ebd8` (texto principal y acentos). Los degradados y brillos se construyen solo con estos colores y transparencias, lo que da un estilo artístico pero consistente.
- **Un solo degradado firma** (`#3e5c76 → #748cab → #f0ebd8`, a 135°), reservado para palabras clave, barras de progreso, fechas, íconos de redes y bordes en hover.
- **Tipografías:** Space Grotesk para titulares, Inter para el texto y JetBrains Mono para la terminal y las fechas.
- **Logotipo "Prompt MJ":** el símbolo `›` de una terminal se lee como una M y lo acompaña una J cuyo travesaño superior es, a la vez, el cursor. Está construido sobre una retícula con trazo uniforme y funciona en un solo color y a 16 px.
- **Scroll de la ventana, no de un contenedor:** los menús laterales son fijos y el contenido central usa el scroll normal de la página. Así las escenas fijas y las animaciones ligadas al scroll se comportan igual en escritorio y en móvil.
- **Scroll horizontal nativo** en el portafolio (`overflow-x` con `scroll-snap`), que funciona con trackpad, pantalla táctil y teclado. Las flechas, el arrastre y la barra de progreso se suman a ese comportamiento.
- **Contenido separado de la presentación:** los textos viven en `src/data/` con tipos de TypeScript; los componentes solo los muestran.

## Accesibilidad y rendimiento

- HTML semántico, con encabezados jerárquicos y un enlace para saltar al contenido.
- Diálogos con el elemento nativo `<dialog>`: el foco queda dentro del diálogo y se cierran con Esc o con un clic fuera.
- Contraste de texto verificado según WCAG AA; el color `#3e5c76` no se usa para texto porque no alcanza el mínimo.
- Soporte de **"reducir movimiento"**: si el sistema lo pide, las animaciones de desplazamiento se desactivan y solo quedan fundidos suaves.
- Diseño responsive, probado en móvil (390 px), tablet (768 px) y escritorio (1280 px en adelante).
- Las animaciones usan solo `transform` y `opacity`, que el navegador anima sin recalcular el layout.
- La página se genera de forma estática y las fuentes se sirven desde el propio sitio con `next/font`.

## Edición del contenido

Todo el texto se edita en `src/data/`, sin tocar los componentes:

| Archivo | Contenido |
|---|---|
| `profile.ts` | Nombre, título, descripción, datos de contacto y foto |
| `skills.ts` | Idiomas, lenguajes de programación y habilidades extra |
| `knowledge.ts` | Áreas de conocimiento y pasos de "Cómo trabajo" |
| `education.ts` | Formación académica |
| `projects.ts` | Proyectos: descripción, características, tecnologías y enlaces (`demoUrl`, `repoUrl`) |
| `socials.ts` | Redes sociales |

Los comandos de la terminal están en `src/lib/terminal.tsx`.

## Contacto

**Juan Esteban Mosquera Perea**
[juamosque1@gmail.com](mailto:juamosque1@gmail.com) · [GitHub](https://github.com/juanes0789) · [LinkedIn](https://www.linkedin.com/in/juan-esteban-mosquera-perea-b3665a342)
