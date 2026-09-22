# Primos & Primas

Landing page del Comité Familiar de Ahorro y Préstamo Primos & Primas.

El sitio presenta la historia, el propósito, los valores, los programas y un formulario de inscripción para que nuevos socios de la familia se unan al comité.

Ver `CLAUDE.md` para el contexto completo del proyecto (estructura, identidad de marca, convenciones y skills).

## Estructura

- `content/comite-primos-primas.md`: fuente de verdad del contenido (historia, misión, visión, valores, servicios).
- `dist/index.html`: contenido y estructura del sitio.
- `dist/historia.html`: lectura completa de la historia del comité.
- `dist/inscripcion.html`: formulario de inscripción, en su propia página.
- `dist/styles.css`: identidad visual y diseño adaptable.
- `dist/script.js`: navegación móvil.
- `dist/assets/`: emblema, logotipos e imagen principal.

## Formulario de inscripción

El formulario vive en `dist/inscripcion.html` (no en la landing) e incrusta un Google Form. Antes de publicar, reemplaza el placeholder `PLACEHOLDER_FORM_ID` en ese archivo por el ID real del formulario (ver detalles en `CLAUDE.md`).

Para que cada inscripción genere automáticamente un PDF con el formato de la ficha física del comité (sin transcribir nada a mano), sigue la guía paso a paso en [`docs/form-publisher-setup.md`](./docs/form-publisher-setup.md).

## Vista local

Abre `dist/index.html` en un navegador moderno, o sirve la carpeta con `npx serve dist`.

