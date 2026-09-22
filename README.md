# Primos & Primas

Landing page del Comité Familiar de Ahorro y Préstamo Primos & Primas.

El sitio presenta la historia, el propósito, los valores, los programas y un formulario de inscripción para que nuevos socios de la familia se unan al comité.

Ver `CLAUDE.md` para el contexto completo del proyecto (estructura, identidad de marca, convenciones y skills).

## Estructura

- `content/comite-primos-primas.md`: fuente de verdad del contenido (historia, misión, visión, valores, servicios).
- `dist/index.html`: contenido y estructura del sitio.
- `dist/styles.css`: identidad visual y diseño adaptable.
- `dist/script.js`: navegación móvil.
- `dist/assets/`: emblema e imagen principal.

## Formulario de inscripción

La sección `#unirme` incrusta un Google Form. Antes de publicar, reemplaza el placeholder `PLACEHOLDER_FORM_ID` en `dist/index.html` por el ID real del formulario (ver detalles en `CLAUDE.md`).

## Vista local

Abre `dist/index.html` en un navegador moderno, o sirve la carpeta con `npx serve dist`.

