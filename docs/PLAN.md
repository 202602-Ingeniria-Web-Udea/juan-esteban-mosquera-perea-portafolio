# Plan de implementación: Portafolio web (Proyecto 1)

> Estado: **PLAN v4, listo para ejecutar**. Todas las decisiones están cerradas; solo falta la aprobación para empezar.
> Entrega: **domingo 27/09/2026, 23:59**. Se califica el último commit en `main` antes de esa hora.

## Registro de decisiones

| # | Decisión | Estado |
|---|---|---|
| D1 | Diseño base: `docs/figma.png` (analizado en la sección 2) | ✅ Cerrada |
| D2 | Sitio en **español** | ✅ Cerrada |
| D3 | Portafolio con **scroll horizontal nativo** (snap + arrastre + flechas) | ✅ Cerrada |
| D4 | Tema **artístico**: degradados y formas, con un sistema consistente | ✅ Cerrada |
| D5 | Diálogo del perfil: **terminal** | ✅ Cerrada |
| D7 | Contenido: `docs/whoami.md` + enlaces de `docs/Juan_Esteban_Mosquera_Perea_CV_fullstack1.pdf` | ✅ Cerrada |
| D7a | **Foto:** se deja un espacio preparado (`public/images/profile.png`) con un marcador de posición mientras tanto | ✅ Cerrada |
| D7b | **Correo:** juamosque1@gmail.com | ✅ Cerrada |
| D7c | **CV descargable:** `docs/JuanEsteban_Mosquera_cv.pdf` → se copia a `public/cv/JuanEsteban_Mosquera_cv.pdf` | ✅ Cerrada |
| D8 | **Entrega:** la hace el estudiante (repo, Vercel e invitación al profesor). Yo dejo el proyecto listo con `git init` y commits locales | ✅ Cerrada |
| D9 | **Paleta:** `#0d1321 · #1d2d44 · #3e5c76 · #748cab · #f0ebd8` (sección 4.1) | ✅ Cerrada |
| D10 | % de lenguajes: Java 85 · Python 85 · TypeScript 80 · JavaScript 80 · SQL 80 · Go 65 | ✅ Cerrada |
| D11 | 3.ª fila de Educación: **Bootcamp de Análisis de Datos**, Talento Tech (Ministerio TIC), 2025 | ✅ Cerrada |
| D12 | Inglés **B2+** (igual que los CV) | ✅ Cerrada |
| D13 | LinkedIn: `linkedin.com/in/juan-esteban-mosquera-perea-b3665a342` | ✅ Cerrada |
| D14 | **No** se muestra el teléfono en ninguna parte del sitio | ✅ Cerrada |
| D15 | **Sezzle Calculator no se incluye** en el portafolio | ✅ Cerrada |
| D16 | **Bookify:** proyecto académico colaborativo; el rol es **Scrum Master y QA** | ✅ Cerrada |

---

## 1. Concepto

Portafolio con **scroll narrativo tipo Apple** (texto flotante que escala, se desplaza y se revela palabra por palabra al hacer scroll) montado sobre el layout obligatorio de tres columnas del Figma. Visualmente es un lienzo oscuro con **degradados vivos y formas geométricas flotantes** que se mueven en parallax.

**Mensaje estratégico** (sale de `whoami.md`): *"Construyo software que conecta ingeniería, datos e inteligencia artificial para resolver problemas reales."* Todo el sitio refuerza tres pilares: **Backend y arquitectura · Full Stack · Data & AI**.

**Decisión técnica clave:** los menús laterales van con `position: fixed` y el contenido central usa el **scroll de la ventana**. Así `position: sticky` y las animaciones ligadas al scroll funcionan sin trucos, y el scroll en móvil se siente nativo.

---

## 2. Análisis del Figma y cómo se adapta

| Elemento en Figma | Estructura que se respeta | Adaptación |
|---|---|---|
| **Sidebar izq.** | Avatar circular con punto verde, nombre y título → lista clave:valor (Age, Residence, Freelance, Address) → Languages con barra y % → Programming Languages con barra y % → Extra Skills con ícono de check | Mismo orden. Clave:valor → Ubicación, Universidad, Semestre, Estado ("Abierto a prácticas"). Barras con relleno degradado animado. Superficie de vidrio (glass) |
| **Hero** | "I'm *Nombre*" + rol con palabra en color acento + párrafo + botón "HIRE ME →" + **foto grande con fondo blanco** a la derecha | Misma composición, pero dentro de la escena sticky tipo Apple (sección 5.1). El rol va con texto degradado. El botón abre la terminal |
| **My Knowledge** | Título centrado + subtítulo → grid **3×2** de cards: ícono lineal centrado en color acento, título y bajada corta. Una card muestra el estado *hover* (descripción + link) | Grid 3×2 con los 6 pilares técnicos. Por defecto: ícono + título + bajada. En hover/focus: se revela la descripción (como la card "Advertising"). En móvil la descripción siempre se ve |
| **Education** | **Un solo contenedor** con filas separadas por divisores. Columna izq.: institución, rol ("Student") y *pill* de fechas en color acento. Columna der.: título y descripción | Idéntica estructura. Se añade una línea de tiempo lateral que se dibuja con el scroll |
| **Portfolio** | Título + subtítulo → cards con imagen arriba, título, descripción y link "Learn more >" en acento, en fila | Misma card, con scroll horizontal nativo. "Saber más" abre el diálogo del proyecto |
| **Footer** | Barra simple con © | Se amplía: CTA "¿Construimos algo juntos?" + © |
| **Rail derecho** | Label "Links" + íconos circulares en color acento | Mismos círculos con degradado; GitHub, LinkedIn y correo |

---

## 3. Stack

| Requisito | Elección | Motivo |
|---|---|---|
| NextJS | Next.js (última estable), App Router, carpeta `src/` | Requisito |
| TypeScript | Modo `strict` | Requisito |
| TailwindCSS | Tailwind v4 (tokens en `@theme`) | Requisito |
| Icons | `react-icons` (Simple Icons para tecnologías, Lucide para UI y marcas para redes) | Un solo paquete con logos de tecnologías y redes |
| Animaciones | `motion` (Framer Motion): `useScroll`, `useTransform`, `useSpring`, `useVelocity`, `AnimatePresence` | Idiomático en React; se anima solo `transform` y `opacity` |
| Fuente | `next/font`: **Space Grotesk** (titulares, con carácter artístico) + **Inter** (texto) + **JetBrains Mono** (terminal y fechas) | Personalidad sin sacrificar legibilidad |
| Diálogos | `<dialog>` nativo + animación con `motion` | Foco, `Esc` y backdrop incluidos |
| Deploy | Vercel conectado a GitHub | Requisito |

---

## 4. Sistema visual "artístico pero consistente"

La creatividad está en **las reglas**: pocos ingredientes, siempre usados igual.

### 4.1 Paleta (cerrada)

Paleta de azules nocturnos con un crema cálido de contraste. La paleta es sobria, así que lo llamativo sale de **la luz**: resplandores, degradados que brillan hacia el crema y formas que flotan. No se añaden colores fuera de la paleta; solo se usan con transparencias.

| Token | Hex | Rol | Contraste (WCAG) |
|---|---|---|---|
| `ink` | `#0d1321` | Fondo del lienzo | — |
| `navy` | `#1d2d44` | Superficies: sidebar, cards, terminal | — |
| `steel` | `#3e5c76` | Bordes, formas, blobs y tramo inicial del degradado. **Nunca para texto** | 2.65 : 1 sobre `ink` ❌ texto |
| `mist` | `#748cab` | Texto secundario, íconos, fechas | 5.37 : 1 sobre `ink` ✅ · 4.02 : 1 sobre `navy` (solo ≥ 18px o íconos) |
| `cream` | `#f0ebd8` | Texto principal, botones, acentos y resplandores | 15.5 : 1 sobre `ink` ✅ · 11.6 : 1 sobre `navy` ✅ |

**Degradados derivados:**
- **Firma (texto y acentos):** `steel → mist → cream` a 135°. En el texto destacado se anima con un brillo que recorre la palabra (`background-position`).
- **Aurora de fondo:** blobs radiales de `steel` y `mist` al 30–40% y muy desenfocados sobre `ink`, con un halo `cream` al 8% detrás de la foto y los titulares.
- **Profundidad:** `ink → navy` vertical para separar secciones sin líneas duras.
- **Botón principal:** fondo `cream` con texto `ink`. **Secundario:** borde `mist/40` con texto `cream`.

El punto verde "en línea" del avatar del Figma pasa a ser un punto `cream` con un pulso suave, para no salir de la paleta.

### 4.2 Reglas de consistencia
1. **Un solo degradado firma** (`steel → mist → cream`), siempre a 135°, y solo en elementos de acento: palabras clave, barras de %, pills de fecha, íconos de redes y bordes de las cards en hover.
2. **Tres tipos de forma**, nunca más: *blobs* (manchas de degradado muy desenfocadas al fondo), *anillos/contornos* (círculo, triángulo y "+" con trazo fino) y *retícula de puntos*.
3. Las formas viven en una capa de fondo fija (`BackgroundCanvas`) y se mueven en **parallax** a 3 velocidades distintas. Los blobs "respiran" lentamente (morph de 20 s).
4. **Grano** sutil (SVG noise al 4%) sobre todo el lienzo: le quita lo digital a los degradados.
5. Radios: `rounded-3xl` en cards, `rounded-full` en pills y botones. Espaciado en escala de 4.
6. Las cards son "vidrio": fondo `navy/60`, `backdrop-blur` y borde `steel/40` de 1px que se vuelve degradado firma en hover.

---

## 5. Guion del scroll (la parte tipo Apple)

Cada efecto está atado al progreso del scroll (0 → 1) de su sección; si el usuario sube, la animación se revierte.

### 5.1 Perfil: escena sticky (~250vh)
| Progreso | Qué pasa |
|---|---|
| 0.00 – 0.30 | Frase gigante, línea por línea: **"Construyo software"** → **"que conecta ingeniería,"** → **"datos"** → **"e inteligencia artificial."** Cada línea escala de 1.2 a 1, entra y se desvanece. Los blobs del fondo se desplazan con ella |
| 0.30 – 0.50 | Se arma el hero del Figma: "Hola, soy **Juan Esteban**" + rol en degradado **"Software Engineer & Full Stack Developer"** + **foto con fondo blanco** que sube con leve escala dentro de un marco con forma orgánica |
| 0.50 – 0.85 | La descripción del perfil se revela **palabra por palabra** (opacidad 0.15 → 1) |
| 0.85 – 1.00 | Aparecen los botones **"Conóceme →"** (abre la terminal) y **"Descargar CV"** (secundario) |

### 5.2 Bandas de texto flotante (entre secciones)
Dos filas de palabras gigantes (una con contorno y otra rellena de degradado) moviéndose en **direcciones opuestas** con el scroll, con un empujón extra según la velocidad:
- Banda 1: `JAVA · SPRING BOOT · PYTHON · FASTAPI · TYPESCRIPT · REACT · NEXT.JS · GO`
- Banda 2: `CLEAN CODE · SOLID · REST APIs · DOCKER · CI/CD · AZURE · MACHINE LEARNING`

### 5.3 Escena "Cómo trabajo" (opcional, sticky ~150vh)
El flujo de `whoami.md`: **Problema → Diseño → Implementación → Testing → Calidad → Despliegue**. Cada palabra se enciende con el degradado conforme avanza el scroll, unidas por una línea que se dibuja. Es muy estratégica porque cuenta *cómo piensas*, no solo qué sabes. *(Recortable si falta tiempo.)*

### 5.4 Conocimientos
Título que se llena de degradado al entrar; cards con entrada escalonada; hover con leve inclinación 3D, brillo que sigue al cursor y revelado de la descripción.

### 5.5 Educación
Línea de tiempo que **se dibuja** con el scroll (`scaleY` = progreso); cada fila se enciende cuando la línea la alcanza.

### 5.6 Portafolio
Entrada escalonada de las cards; indicador de progreso del scroll horizontal; chips de filtro (**Todos · Backend · Full Stack · Data & AI**).

### 5.7 Footer
"¿Construimos algo juntos?" se colorea con el degradado según el scroll; las formas del fondo convergen.

### 5.8 Global
- Barra de progreso de lectura vertical en el rail derecho.
- Las barras de % del sidebar se animan de 0 al valor al cargar.
- **`prefers-reduced-motion`**: sin transformaciones ni parallax, solo fades.

---

## 6. Contenido (mapeado desde `whoami.md`)

### 6.1 Sidebar izquierdo
- **Foto** (espacio preparado, ver D7a) · **Juan Esteban Mosquera Perea** · *Software Engineer · Full Stack Developer*
- **Info:** 📍 Medellín, Colombia · 🎓 Universidad de Antioquia · 📚 8.º semestre, Ingeniería de Sistemas · 🟢 Abierto a prácticas · ✉️ juamosque1@gmail.com
- **Idiomas:** Español 100% (Nativo) · Inglés 75% (B2+, Upper-Intermediate)
- **Lenguajes de programación:** Java 85 · Python 85 · TypeScript 80 · JavaScript 80 · SQL 80 · Go 65
- **Habilidades extra:** Spring Boot · FastAPI · React / Next.js · Docker · CI/CD (GitHub Actions) · Azure DevOps · SonarCloud · Scrum · APIs de LLM (Claude)

### 6.2 Conocimientos (grid 3×2)
| Card | Bajada | Descripción (hover) |
|---|---|---|
| Software Engineering | Arquitectura · SOLID · Clean Code | Arquitecturas por capas y modulares, diseño orientado a objetos y patrones de diseño |
| Backend Development | APIs REST · Auth · RBAC | Servicios con Spring Boot, FastAPI y Go; autenticación, auditoría, logging y reglas de negocio |
| Frontend Development | React · Next.js · TypeScript | Interfaces orientadas a la experiencia de usuario con React, Next.js, Vue y Angular, e integración frontend/backend |
| Data & AI | Análisis · ML · IA aplicada | Pandas, NumPy, Scikit-learn, visualización e integración de modelos y APIs de IA |
| Cloud & DevOps | Docker · CI/CD · Azure | Despliegues en Azure y Vercel, pipelines con GitHub Actions y Azure DevOps |
| Testing & Calidad | JUnit · BDD · Quality Gates | Pruebas unitarias (AAA), cobertura, análisis estático con SonarCloud y Gherkin |

### 6.3 Educación (contenedor con filas, como en Figma)
| Institución | Rol + fechas | Título | Descripción |
|---|---|---|---|
| Universidad de Antioquia | Estudiante · 2023 – Actualidad | Ingeniería de Sistemas (8.º semestre) | Ingeniería y arquitectura de software, bases de datos, IA y ciencia de datos; actualmente profundizo en investigación, calidad de software y gestión de proyectos |
| Universidad de Antioquia | Monitor · 2026 – Actualidad | Monitor de Ciencia de Datos | Asesoría académica y acompañamiento en análisis de datos, programación y fundamentos de ciencia de datos |
| Talento Tech · Ministerio TIC | Estudiante · 2025 | Bootcamp de Análisis de Datos | Formación en análisis, limpieza y visualización de datos con Python dentro del programa Talento Tech del Ministerio TIC de Colombia |

### 6.4 Portafolio (8 proyectos, orden estratégico)
Los datos de los proyectos combinan `whoami.md` con los CV. Donde el CV es más reciente o más específico, manda el CV.

| # | Proyecto | Año | Rol | Categoría | Stack clave | Enlaces |
|---|---|---|---|---|---|---|
| 1 | **Embedded Payments Platform** | 2026 | Full-Stack Developer | Full Stack · Backend | Java, Spring Boot, Vue 3, PostgreSQL (Neon), JWT + API Keys, Swagger, Docker | [Demo](https://embedded-payments1.vercel.app/) · [GitHub](https://github.com/juanes0789/embedded-payments) |
| 2 | **VoiceFlowAI** | 2026 | Fundador y único desarrollador | Full Stack · AI | Next.js, TypeScript, FastAPI, Python, APIs de LLM, ElevenLabs, Docker, Render + Vercel | [Demo](https://voice-flow-ai-learning.vercel.app/) |
| 3 | **Bookify** | — | **Scrum Master y QA** (académico, en equipo) | Backend · Calidad | Spring Boot, PostgreSQL, JUnit, GitHub Actions, SonarCloud, Azure DevOps | — |
| 4 | **UdeA Innova** | 2025 | Full-Stack Developer (en equipo) | Full Stack | React, Node.js, Express, MariaDB, OAuth (Google y GitHub) | [Demo](https://app-udea-innova-frontend.vercel.app/) |
| 5 | **Banking Simulation Platform** | 2024 | Líder de desarrollo full stack | Full Stack | Java, React, MariaDB, Scrum | — |
| 6 | **Fraud Detection (IEEE-CIS)** | — | — | Data & AI | Python, Pandas, Scikit-learn | — |
| 7 | **PlantVillage: Computer Vision** | — | — | Data & AI | ResNet50, FAISS, Deep Learning | — |
| 8 | **Incidentes de tránsito en Medellín** | — | — | Data & AI | Pandas, Matplotlib, Power BI (~207.000 registros) | — |

Datos que aportan los CV y se usan en los diálogos:
- **Embedded Payments:** gestión de comercios, *payment intents*, transacciones, reembolsos y checkout embebido; doble autenticación (JWT para usuarios y API Keys para comercios) con RBAC; arquitectura por capas (dominio, aplicación, infraestructura); API documentada con Swagger/OpenAPI.
- **VoiceFlowAI:** fundador y único desarrollador; tutor de voz con IA para practicar fluidez en inglés; conversaciones de varios turnos con LLM; voces con acento de EE. UU., Reino Unido y Australia; modos entrevista, viaje, casual y tecnología; reconocimiento de voz del navegador; backend en Docker sobre Render y frontend en Vercel.
- **Bookify** *(de `whoami.md`, con el rol corregido)*: proyecto académico colaborativo para gestionar proveedores, servicios, disponibilidad, reservas, cancelaciones e historial. Como **Scrum Master** facilité la planeación de sprints, el backlog, las historias de usuario con Definition of Ready/Done y las revisiones en Azure DevOps. Como **QA** lideré el plan de calidad: casos de prueba, pruebas unitarias con JUnit (AAA), cobertura, quality gates en SonarCloud e integración continua con GitHub Actions. La card y el diálogo destacan el rol y el trabajo en equipo en vez de presentarlo como desarrollo individual.
- **UdeA Innova:** landing, autenticación, dashboards y vistas por rol; componentes React reutilizables; trabajo en equipo con ramas y pull requests.
- **Banking Simulation Platform:** liderazgo del desarrollo full stack con Scrum; backend Java con lógica de negocio y peticiones HTTP; CRUD sobre MariaDB; frontend en React.

Cada **diálogo de proyecto** muestra: imagen, rol, descripción, características (lista), stack con íconos (`Tag`), una decisión destacada (de arquitectura o, en Bookify, de proceso y calidad) y botones **Ver demo** / **Ver código**. Si un proyecto no tiene enlace propio, el botón de código lleva al perfil de GitHub. Si un proyecto no tiene rol definido, la insignia de rol no se muestra. Los proyectos con demo en vivo llevan una insignia "En producción" en la card.

**Imágenes:** **portadas generadas** (SVG en `public/projects/`) con el sistema visual: degradado de la paleta + forma geométrica + logos del stack + nombre. Son consistentes entre sí, no dependen de capturas y se pueden reemplazar por capturas reales cambiando solo la ruta en `data/projects.ts`.

### 6.5 Rail derecho
GitHub (`github.com/juanes0789`) · LinkedIn (`linkedin.com/in/juan-esteban-mosquera-perea-b3665a342`) · Correo (`mailto:juamosque1@gmail.com`) · CV (descarga directa).

---

## 7. Terminal (diálogo del perfil)

Ventana estilo macOS (tres puntos, título `juanes@portfolio: ~`) con fuente mono y degradado sutil en el borde.

1. **Intro automática** con efecto de máquina de escribir:
   ```
   $ whoami
   Juan Esteban Mosquera Perea, Software Engineer & Full Stack Developer
   Medellín, CO · UdeA · 8.º semestre
   $ cat mision.txt
   Construyo sistemas mantenibles, observables, testeables y escalables.
   ```
2. **Luego es interactiva**: prompt con cursor parpadeante donde se pueden escribir comandos:

   | Comando | Respuesta |
   |---|---|
   | `help` | Lista de comandos |
   | `whoami` | Presentación |
   | `stack` | Lenguajes y frameworks agrupados, con barras ASCII `█████░` |
   | `proyectos` | Lista de proyectos; `open <n>` hace scroll al proyecto y abre su diálogo |
   | `workflow` | Problema → Diseño → … → Despliegue, animado |
   | `intereses` | Backend, Data, IA, Cloud, Fintech… |
   | `idiomas` | Español nativo · Inglés B2+ |
   | `contacto` | Links clicables (correo, GitHub, LinkedIn) |
   | `cv` | Imprime `Descargando JuanEsteban_Mosquera_cv.pdf... ✔` y descarga el PDF |
   | `clear` / `exit` | Limpia / cierra |
   | *(easter egg)* `sudo contratar` | "Permiso concedido ✔" + confeti de degradado |

3. **Chips clicables** con los comandos principales debajo del prompt (para móvil y para quien no quiera teclear). Historial con ↑/↓.

---

## 8. Estructura del proyecto (Atomic Design)

```
src/
├── app/            layout.tsx · page.tsx · globals.css (tokens @theme)
├── components/
│   ├── atoms/      Avatar · Button · Icon · ProgressBar · Heading · Tag · DatePill · GradientText · Divider · Shape
│   ├── molecules/  InfoItem · SkillMeter · CheckItem · SocialLink · SectionHeader · KnowledgeCard
│   │               EducationRow · ProjectCard · Modal · FilterChips
│   ├── organisms/  LeftSidebar · SocialRail · ProfileSection · TerminalDialog · MarqueeBand · WorkflowScene
│   │               KnowledgeSection · EducationSection · PortfolioSection · ProjectDialog · Footer · BackgroundCanvas
│   ├── templates/  ThreeColumnLayout
│   └── motion/     Reveal · WordReveal · ParallaxText · StickyScene · DrawLine · Typewriter
├── data/           profile.ts · skills.ts · knowledge.ts · education.ts · projects.ts · socials.ts · terminal.ts
├── types/          index.ts
└── hooks/          usePrefersReducedMotion.ts · useTerminal.ts
public/             images/ (profile.png + placeholder, og-image) · projects/ (portadas SVG) · cv/JuanEsteban_Mosquera_cv.pdf
```

### Evidencia de reutilización (rúbrica: ≥ 6 componentes en > 2 partes)
| Componente | Dónde se reutiliza |
|---|---|
| `Icon` | Sidebar, knowledge cards, redes, botones, terminal, diálogos, footer |
| `Button` | Hero, cada ProjectCard, diálogos, footer |
| `ProgressBar` / `SkillMeter` | Idiomas y lenguajes |
| `GradientText` | Hero, títulos de sección, bandas, footer |
| `SectionHeader` | Conocimientos, Educación, Portafolio, Cómo trabajo |
| `Modal` | TerminalDialog y ProjectDialog |
| `Tag` | Habilidades extra, stack de cada proyecto, diálogos, filtros |
| `DatePill` | Filas de educación y diálogos de proyecto |
| `Shape` | Fondo, marco de la foto, portadas, footer |
| `Reveal` / `WordReveal` | Todas las secciones |

---

## 9. Responsividad y fases

### 9.1 Breakpoints
| Breakpoint | Menú izquierdo | Contenido | Menú derecho |
|---|---|---|---|
| ≥ 1024px | Fijo, ~300px | Centro | Fijo, ~72px |
| 768–1023px | Drawer con hamburguesa | Ancho completo | Fijo, compacto |
| < 768px | Mini cabecera fija (foto + nombre) + drawer | Ancho completo; escenas sticky más cortas; grid 1 columna | Barra flotante inferior |

### 9.2 Fases (primero requisitos y deploy, después magia)
| # | Fase | Entregable | Est. |
|---|---|---|---|
| 0 | Setup | `create-next-app` en la raíz del proyecto, dependencias, `git init`, copiar CV a `public/`, `npm run build` limpio. **Tú** creas el repo y conectas Vercel para tener un primer deploy pronto | 20 min |
| 1 | Datos y tipos | `types/` + `data/` con el contenido de `whoami.md` | 25 min |
| 2 | Tokens y átomos | `globals.css` con la paleta, fuentes, átomos y moléculas | 45 min |
| 3 | Layout | `ThreeColumnLayout`, sidebars fijos, responsive con drawer | 40 min |
| 4 | Secciones estáticas | Hero, Conocimientos, Educación, Portafolio, Footer → **commit + deploy (MVP)** | 60 min |
| 5 | Diálogos | `Modal`, `ProjectDialog`, `TerminalDialog` interactiva → commit | 60 min |
| 6 | Fondo artístico | `BackgroundCanvas` con blobs, formas, grano y parallax; portadas SVG → commit | 40 min |
| 7 | Scroll tipo Apple | Escena del perfil, bandas flotantes, timeline, cards (+ "Cómo trabajo") → commit | 90 min |
| 8 | Pulido | Móvil, reduced-motion, accesibilidad, Lighthouse, metadata/OG | 30 min |
| 9 | Documentación y cierre | README, comentarios, revisión ortográfica, commit final. **Tú** haces el push a `main`, el deploy final y la invitación al profesor | 30 min |

**Total: ~7 h.** Orden de recorte si aprieta el tiempo: escena "Cómo trabajo" → easter egg → tilt 3D → filtros del portafolio → velocidad en las bandas. **No se recortan**: escena del perfil, bandas flotantes, terminal y fondo artístico.

### 9.3 Calidad y documentación
- Comentarios JSDoc en español por componente y en cada animación (qué rango del scroll controla qué propiedad).
- README: propósito, link de Vercel, stack, Atomic Design, cómo correrlo, decisiones de diseño y capturas.
- Revisión ortográfica final de todo el texto (cada error descuenta 0.05).
- `npm run build` limpio; pruebas en 375, 768, 1280 y 1920px; Lighthouse ≥ 90 en rendimiento y accesibilidad.

---

## 10. Notas antes de ejecutar

- **El CV descargable (`JuanEsteban_Mosquera_cv.pdf`) todavía incluye tu teléfono y la URL antigua de LinkedIn (`/in/juan-esteban-mosquera`).** El sitio no mostrará el teléfono, pero cualquiera que descargue el PDF lo verá. Si quieres evitarlo, reemplaza el PDF antes de la entrega; basta con dejar el nuevo archivo en `public/cv/` con el mismo nombre.
- **Enlaces que faltan (opcional):** Bookify, Banking Simulation y los 3 proyectos de datos no tienen enlace propio; su botón "Ver código" lleva a tu perfil de GitHub. Si me pasas los repos, los agrego en `data/projects.ts`.
- **Foto:** cuando la tengas, guárdala como `public/images/profile.png`, idealmente con fondo blanco o recortada.
