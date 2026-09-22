---
name: landing-copy
description: Actualiza el copy de la landing de Primos & Primas a partir de documentos fuente del comité (historia, misión, visión, valores, servicios), manteniendo estructura, tono y secciones existentes. Úsalo cuando el comité comparta una versión nueva del documento fundacional/reglamento, o pida cambiar/agregar texto del sitio.
---

# Landing copy — Primos & Primas

Objetivo: mantener `dist/index.html` alineado con la fuente de verdad del contenido sin romper la estructura ni el tono del sitio.

## Pasos

1. Lee `content/comite-primos-primas.md` (fuente de verdad actual) y compáralo contra el documento nuevo que trae el usuario.
2. Actualiza primero `content/comite-primos-primas.md` con los cambios reales del documento fuente (agrega, corrige o retira texto). No inventes datos que no estén en el documento — si algo es ambiguo, pregunta.
3. Refleja el cambio en `dist/index.html`, respetando las secciones existentes (`#historia`, `#proposito`, `#programas`, `#unirme`, etc.) y sin agregar secciones nuevas salvo que el usuario lo pida explícitamente.
4. Mantén las etiquetas de estado de los servicios: `(Propuesta)` → clase `.tag-proposal`, `(Retomarlo)`/`(Por retomar)` → clase `.tag-revisit`. Un servicio marcado como propuesta nunca debe presentarse como ya disponible.
5. Conserva el tono: cálido, familiar, cercano, en español, nunca corporativo/bancario. El comité es privado — no es una institución abierta al público.
6. No toques `dist/styles.css` a menos que el cambio de contenido lo requiera (p. ej. una lista más larga que rompe el layout).
7. Verifica que el texto siga cabiendo bien en mobile (usa el skill `responsive-qa` después de un cambio de copy notable).
