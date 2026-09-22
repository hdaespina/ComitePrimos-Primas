# Primos & Primas — Comité Familiar de Ahorro y Préstamo

Landing page pública para dar a conocer el comité familiar a los parientes y llevarlos a inscribirse como socios. Es un sitio estático, en español, dirigido casi exclusivamente a visitas desde el celular.

## Qué es el proyecto

- **Audiencia**: familiares (primos y primas) invitados por otro miembro de la familia. No es una institución abierta al público.
- **Objetivo de negocio**: explicar qué es el comité, sus beneficios/servicios, y convertir visitas en solicitudes de membresía a través de un formulario de onboarding (sección `#unirme`).
- **Fuente de contenido canónica**: `content/comite-primos-primas.md` — transcripción del documento fundacional (historia, propósito, misión, visión, valores y servicios). Cualquier cambio de copy en el sitio debe basarse en ese archivo; si el documento fuente cambia, actualiza primero `content/comite-primos-primas.md` y luego el HTML.
- Dos servicios del documento están marcados como **(Propuesta)** — Pequeños Ahorradores, Educación financiera — y uno como **(Retomarlo)** — Viajes y experiencias. El sitio debe seguir distinguiéndolos visualmente de los servicios activos (ver `.tag-proposal` / `.tag-revisit` en `dist/styles.css`) y nunca presentarlos como beneficios ya disponibles.
- **Cifras del comité** (fundado en los años 90, +80 socios históricos, 20 socios activos, 4 generaciones): viven en `content/comite-primos-primas.md` → sección "Cifras del comité" y se muestran en `dist/index.html` → sección `.stats`. Si estos números cambian, actualiza ambos lugares.

## Estructura del proyecto

```
/
├── CLAUDE.md                      # este archivo
├── README.md                      # instrucciones rápidas para humanos
├── content/
│   └── comite-primos-primas.md    # fuente de verdad del contenido (historia, misión, visión, valores, servicios)
├── dist/                          # sitio estático — esto es lo que se publica, sin build step
│   ├── index.html
│   ├── historia.html              # lectura completa de la historia del comité (link desde #historia)
│   ├── styles.css
│   ├── script.js
│   ├── favicon.svg
│   └── assets/
├── .github/workflows/pages.yml    # publica dist/ en GitHub Pages en cada push a main
└── .claude/skills/                # skills de este repo (ver abajo)
```

No hay bundler ni paso de build: `dist/` se edita directamente y se publica tal cual vía GitHub Pages. No introduzcas un build system (Vite, webpack, etc.) a menos que el sitio deje de ser una landing simple — mantener esto plano es intencional.

## Identidad de marca

Colores (definidos como variables CSS en `dist/styles.css`):
- Azul marca: `--blue-900 #082f66` (y variantes `--blue-950/800/700/100/050`)
- Verde: `--green-700 #16834f`
- Naranja (acento/CTA): `--orange-600 #f36b21`

Tono de voz: cálido, familiar, cercano; nunca corporativo/bancario. Evitar lenguaje que suene a institución financiera regulada abierta al público — el comité es privado y familiar. Todo el copy está en español.

## Convenciones de trabajo

- **Mobile-first de verdad**: la mayoría de la familia entra desde el celular. Cualquier sección o componente nuevo se prueba primero en viewport angosto (360–430px) y luego se escala hacia arriba. Breakpoints existentes: `1020px`, `780px`, `430px` en `dist/styles.css`.
- **Accesibilidad**: mantener `skip-link`, `aria-*` en el menú y el formulario, foco visible (`:focus-visible`), y `prefers-reduced-motion`.
- No agregues dependencias de terceros (frameworks JS, CDNs) sin necesidad real; el sitio funciona hoy con HTML/CSS/JS vanilla.
- Cambios de copy: edita `content/comite-primos-primas.md` primero, luego refleja el cambio en `dist/index.html` (y en `dist/historia.html` si el cambio afecta la sección "Historia").
- `dist/historia.html` reutiliza el mismo header/nav/footer que `dist/index.html` (con rutas `./index.html#...`) y muestra el relato completo de la sección "Historia" de `content/comite-primos-primas.md` en formato de lectura larga. Si la historia del documento fuente cambia, actualiza ambos: la versión resumida del timeline en `dist/index.html#historia` y el texto completo en `dist/historia.html`.

## Cómo previsualizar

Abrir `dist/index.html` directamente en un navegador, o servirlo con cualquier servidor estático:

```
npx serve dist
```

## Despliegue

`git push` a `main` dispara `.github/workflows/pages.yml`, que publica el contenido de `dist/` en GitHub Pages. No se requiere paso de build.

## Formulario de onboarding (`#unirme`)

El llamado a la acción principal del sitio es inscribirse como socio llenando un formulario (decisión tomada: **Google Form embebido** vía `<iframe>`, no un backend propio).

- El formulario vive en `dist/index.html`, sección `#unirme` → `.form-card` → `.form-embed iframe`.
- Actualmente usa un **placeholder**: `PLACEHOLDER_FORM_ID` aparece dos veces (el `src` del `iframe` y el link de fallback "Ábrelo en una pestaña nueva"). Hay que reemplazarlo por el ID real en cuanto exista el Google Form del comité.
  - El `src` del iframe debe ser la URL de "Insertar" de Google Forms con `?embedded=true`.
  - El link de fallback debe ser la misma URL sin `?embedded=true` (el `viewform` normal), con `target="_blank"`.
- Campos sugeridos para el Google Form (agrupar en este orden):
  1. Nombre completo
  2. Familiar que lo invitó / rama familiar
  3. Teléfono (WhatsApp)
  4. Correo electrónico
  5. ¿Ya participabas antes en las actividades del equipo/comité? (sí/no)
  6. ¿Por qué quieres unirte? (opcional, texto libre)
  7. Confirmación de que leerá el reglamento antes de su primera aportación (checkbox)
- La altura del `iframe` está fijada en CSS (`.form-embed iframe`, con ajustes en los media queries de 1020px/780px) porque Google Forms no se autoajusta de alto. Si el formulario real queda más largo o corto que el actual, ajusta esas alturas usando `responsive-qa`.
- No cambies este mecanismo (por ejemplo, a Supabase o Formspree) sin confirmarlo antes con el dueño del proyecto — fue una decisión explícita.

## Otros componentes del sitio

- **Preguntas frecuentes** (`#preguntas` en `dist/index.html`): acordeón nativo con `<details>/<summary>` (sin JS) que responde las objeciones más comunes antes de llenar el formulario. Las respuestas están redactadas para no inventar datos que no estén en `content/comite-primos-primas.md` o en el reglamento — si agregas una pregunta nueva, no inventes cifras ni condiciones, remite al reglamento vigente cuando no tengas el dato exacto.
- **Compartir con un familiar** (botón en `#unirme`, `data-share-invite` en `dist/script.js`): usa `navigator.share()` en mobile (comparte nativamente por WhatsApp, etc.) y cae a copiar el link al portapapeles si el navegador no soporta Web Share API.
- **Barra de CTA fija en mobile** (`.sticky-cta` en `dist/styles.css` y `dist/script.js`): aparece al hacer scroll más allá de la primera sección de cada página y se oculta permanentemente una vez que el visitante llega a `#unirme` (o, en `historia.html`, se mantiene visible porque esa página no tiene su propia sección `#unirme`). Solo visible en mobile (`<=780px`); en desktop el CTA del header ya es siempre visible.
- **Íconos de programas** (`.program-icon` en `dist/index.html`/`styles.css`): SVG inline decorativos (`aria-hidden="true"`) junto a cada tarjeta de `#programas`, sin dependencias externas.
- **Meta tags Open Graph / Twitter** (`<head>` de `dist/index.html` e `dist/historia.html`): controlan cómo se ve el link al compartirse por WhatsApp/redes. Usan `https://hdaespina.github.io/ComitePrimos-Primas/` como URL base — si el sitio se mueve a un dominio propio, actualiza `og:url`, `og:image`, `twitter:image` en ambos archivos.

## Accesibilidad — decisiones ya corregidas (no revertir)

Una auditoría de diseño encontró y corrigió estos problemas de contraste/tamaño; si tocas estos estilos, no reintroduzcas el problema:

- El texto sobre fondo naranja (`--orange-600`) debe ser oscuro (`--blue-950`/`--blue-900`), nunca blanco — el blanco sobre ese naranja da ~3:1 de contraste, por debajo del mínimo WCAG AA (4.5:1). Afecta `.button-primary`, `.legacy-seal`, `.main-nav .nav-cta:hover`.
- El texto naranja sobre fondo blanco/claro (números decorativos como `.card-number`, `.program-top > span`) debe usar `--orange-700` (`#b34e17`, ~5.2:1), no `--orange-600` directamente — el mismo problema de contraste aplica al revés.
- `:focus-visible` usa un anillo oscuro + halo blanco (`outline` + `box-shadow`) para verse bien tanto en fondo claro como oscuro — la versión anterior (durazno claro) era casi invisible sobre fondo blanco (~1.4:1).
- Ninguna etiqueta/microcopy del sitio debe bajar de `.8125rem` (13px), salvo el tagline decorativo del logo en el header (que siempre va acompañado del nombre completo en tamaño mayor).

## Próximos pasos sugeridos (no implementados todavía)

- **Prefill del campo "quién te invitó" vía `?ref=` en la URL**: se evaluó pero no se implementó porque requiere el `entry.XXXXXXX` real del campo del Google Form, que no existe todavía (el formulario sigue en `PLACEHOLDER_FORM_ID`). Una vez que el Google Form real esté conectado, se puede leer `new URLSearchParams(location.search).get('ref')` en `dist/script.js` y anexarlo al `src` del iframe y al link de fallback como `&entry.XXXXXXX=<valor>`.
- **Analytics ligero** (ej. Plausible) para medir el embudo real (visitas → clics en CTA → envíos del formulario) — no agregado porque es una dependencia de terceros nueva; requiere decisión explícita del dueño del proyecto.

## Skills de este repo

- `landing-copy`: para actualizar el copy del sitio a partir de documentos fuente del comité, preservando estructura, tono y las secciones existentes.
- `responsive-qa`: checklist de verificación antes de publicar cambios (mobile, accesibilidad, formulario, enlaces).

No hay subagentes personalizados en `.claude/agents/` — el proyecto es lo bastante simple como para usar los agentes genéricos (`Explore`, `general-purpose`) cuando haga falta investigar, en vez de mantener un agente dedicado.
