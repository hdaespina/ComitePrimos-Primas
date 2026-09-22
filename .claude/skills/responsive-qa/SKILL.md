---
name: responsive-qa
description: Checklist de verificación antes de publicar cambios en la landing de Primos & Primas — mobile, accesibilidad, formulario de onboarding y enlaces. Úsalo antes de hacer push a main o después de tocar dist/index.html, dist/styles.css o dist/script.js.
---

# Responsive QA — Primos & Primas

La mayoría de la familia entra desde el celular, así que cualquier cambio se valida mobile-first antes de publicarse.

## Checklist

1. **Viewport angosto primero**: revisa el sitio en ~360–430px de ancho antes que en desktop. Sin scroll horizontal, sin texto cortado, botones con al menos 44px de alto para el dedo.
2. **Breakpoints existentes**: confirma que los cambios no rompen las reglas en `dist/styles.css` para `1020px`, `780px` y `430px`.
3. **Menú móvil**: el botón hamburguesa abre/cierra el menú, cierra con Escape y al hacer click en un link (`dist/script.js`).
4. **Formulario de onboarding (`#unirme`)**: todos los campos requeridos tienen `label`, mensajes de error visibles y anunciados (`aria-live`/`aria-describedby`), el envío funciona desde mobile (teclado correcto por tipo de campo: `tel`, `email`), y hay confirmación clara de éxito o error.
5. **Accesibilidad**: `skip-link` funciona, el foco es visible (`:focus-visible`), los `alt` de imágenes son correctos, contraste de texto sobre fondos de color (azul/verde/naranja) es legible.
6. **Enlaces internos**: los anchors del menú (`#historia`, `#proposito`, `#programas`, `#unirme`) llevan a la sección correcta.
7. **`prefers-reduced-motion`**: las animaciones/transiciones respetan la preferencia del sistema.
8. **Sin dependencias rotas**: si se agregó un script externo (p. ej. cliente de Supabase), confirma que carga por HTTPS y que el sitio sigue funcionando si ese script falla (no debe bloquear el resto de la página).
