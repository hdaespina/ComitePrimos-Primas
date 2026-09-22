# Primos & Primas — Comité Familiar de Ahorro y Préstamo

Landing page pública para dar a conocer el comité familiar a los parientes y llevarlos a inscribirse como socios. Es un sitio estático, en español, dirigido casi exclusivamente a visitas desde el celular.

## Qué es el proyecto

- **Audiencia**: familiares (primos y primas) invitados por otro miembro de la familia. No es una institución abierta al público.
- **Objetivo de negocio**: explicar qué es el comité, sus beneficios/servicios, y convertir visitas en solicitudes de membresía a través de un formulario de onboarding (sección `#unirme`).
- **Fuente de contenido canónica**: `content/comite-primos-primas.md` — transcripción del documento fundacional (historia, propósito, misión, visión, valores y servicios). Cualquier cambio de copy en el sitio debe basarse en ese archivo; si el documento fuente cambia, actualiza primero `content/comite-primos-primas.md` y luego el HTML.
- Dos servicios del documento están marcados como **(Propuesta)** — Pequeños Ahorradores, Educación financiera — y uno como **(Retomarlo)** — Viajes y experiencias. El sitio debe seguir distinguiéndolos visualmente de los servicios activos (ver `.tag-proposal` / `.tag-revisit` en `dist/styles.css`) y nunca presentarlos como beneficios ya disponibles.

## Estructura del proyecto

```
/
├── CLAUDE.md                      # este archivo
├── README.md                      # instrucciones rápidas para humanos
├── content/
│   └── comite-primos-primas.md    # fuente de verdad del contenido (historia, misión, visión, valores, servicios)
├── dist/                          # sitio estático — esto es lo que se publica, sin build step
│   ├── index.html
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
- Cambios de copy: edita `content/comite-primos-primas.md` primero, luego refleja el cambio en `dist/index.html`.

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

## Skills de este repo

- `landing-copy`: para actualizar el copy del sitio a partir de documentos fuente del comité, preservando estructura, tono y las secciones existentes.
- `responsive-qa`: checklist de verificación antes de publicar cambios (mobile, accesibilidad, formulario, enlaces).

No hay subagentes personalizados en `.claude/agents/` — el proyecto es lo bastante simple como para usar los agentes genéricos (`Explore`, `general-purpose`) cuando haga falta investigar, en vez de mantener un agente dedicado.
