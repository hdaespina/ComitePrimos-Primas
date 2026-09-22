# Configurar Form Publisher — PDF automático de inscripción

> Guía operativa para quien administre el Google Form del comité (no requiere saber programar). Objetivo: que cada inscripción digital genere automáticamente un PDF con el mismo formato de la ficha física, sin que nadie tenga que transcribir nada a mano.

Tiempo estimado: ~30 minutos, una sola vez. Después queda funcionando solo.

## Antes de empezar

Necesitas:
- Una cuenta de Google (Gmail normal o Google Workspace) desde la que administrará el comité el formulario.
- El Google Form del comité ya creado (si todavía no existe, créalo primero con las preguntas exactas de la sección siguiente — el orden y el texto importan).

## Paso 1 — Crear el Google Form con estas preguntas exactas

Form Publisher reconoce cada campo por el **texto exacto de la pregunta**, así que cópialas tal cual (puedes ajustar el copy después de terminar la configuración, pero mientras haces la plantilla mantenlas idénticas a esto):

| # | Pregunta (texto exacto) | Tipo de campo | Obligatorio |
|---|---|---|---|
| 1 | Nombre completo | Respuesta corta | Sí |
| 2 | Fecha de nacimiento | Fecha | Sí |
| 3 | Teléfono (WhatsApp) | Respuesta corta | Sí |
| 4 | Correo electrónico | Respuesta corta (validación de email) | Sí |
| 5 | Dirección | Respuesta corta | No |
| 6 | No. de DPI | Respuesta corta | No |
| 7 | Familiar que lo invitó / rama familiar | Respuesta corta | Sí |
| 8 | ¿Ya participabas antes en las actividades del equipo/comité? | Opción múltiple (Sí / No) | Sí |
| 9 | Número de acciones o aportaciones iniciales | Respuesta corta | Sí |
| 10 | Beneficiario 1 (nombre completo) | Respuesta corta | Sí |
| 11 | Beneficiario 2 (nombre completo) | Respuesta corta | No |
| 12 | Beneficiario 3 (nombre completo) | Respuesta corta | No |
| 13 | ¿Por qué quieres unirte? | Párrafo | No |
| 14 | Observaciones | Párrafo | No |
| 15 | Confirmo que leeré el reglamento antes de mi primera aportación | Casilla de verificación | Sí |
| 16 | Escribe tu nombre completo como confirmación de firma electrónica | Respuesta corta | Sí |

Notas:
- No se pide un monto fijo de "cuota de inscripción" — eso lo define el reglamento vigente y se conversa con la persona al momento de inscribirse, no se congela en el formulario.
- El campo 16 sustituye a la "Firma de Accionista" de la ficha física — Google Forms no tiene firma digital nativa, así que escribir el nombre completo funciona como confirmación equivalente. Si el comité prefiere una firma manuscrita real, eso se resuelve aparte en la reunión de bienvenida con el socio, no en el formulario.

## Paso 2 — Crear la plantilla en Google Docs

Crea un **Google Doc nuevo** (Drive → Nuevo → Documentos de Google) y pega esta plantilla completa. Los textos entre `{{ }}` son los que Form Publisher reemplaza automáticamente por la respuesta de cada pregunta — deben coincidir **exactamente** (mayúsculas, tildes, signos de interrogación) con el texto de las preguntas del Paso 1.

```
COMITÉ DE AHORRO Y PRÉSTAMO
"LOS PRIMOS Y LAS PRIMAS"

FORMULARIO DE INSCRIPCIÓN

Fecha de solicitud: {{Marca de tiempo}}

NOMBRE: {{Nombre completo}}

Fecha de nacimiento: {{Fecha de nacimiento}}

Teléfono: {{Teléfono (WhatsApp)}}          Correo: {{Correo electrónico}}

Dirección: {{Dirección}}

No. de DPI: {{No. de DPI}}

Familiar que lo invitó / rama familiar: {{Familiar que lo invitó / rama familiar}}

¿Participaba antes en las actividades del equipo/comité?: {{¿Ya participabas antes en las actividades del equipo/comité?}}

Número de acciones/aportaciones iniciales: {{Número de acciones o aportaciones iniciales}}

BENEFICIARIOS:
1.- {{Beneficiario 1 (nombre completo)}}
2.- {{Beneficiario 2 (nombre completo)}}
3.- {{Beneficiario 3 (nombre completo)}}

¿Por qué quiere unirse?: {{¿Por qué quieres unirte?}}

Observaciones: {{Observaciones}}

Confirmación de reglamento: {{Confirmo que leeré el reglamento antes de mi primera aportación}}


Guatemala, {{Marca de tiempo}}


_______________________________
Firma electrónica (nombre completo): {{Escribe tu nombre completo como confirmación de firma electrónica}}
```

Detalles opcionales de diseño (no afectan el funcionamiento, solo la presentación):
- Pega el emblema del comité (`dist/assets/simbolo-primos-primas.png` — la versión a color, porque esta plantilla va sobre fondo blanco) en la esquina superior derecha, como en la ficha física original.
- Usa el azul de marca (`#082f66`) para el encabezado "COMITÉ DE AHORRO Y PRÉSTAMO" y el naranja (`#f36b21`) para "FORMULARIO DE INSCRIPCIÓN", si quieres que se vea igual de reconocible que el sitio.

Guarda el documento con un nombre claro, por ejemplo **"Plantilla — Ficha de inscripción Primos & Primas"**.

## Paso 3 — Instalar y configurar Form Publisher

1. Abre el Google Form del comité (el mismo cuyo ID reemplazará `PLACEHOLDER_FORM_ID` en `dist/inscripcion.html`).
2. Ve a **Extensiones → Complementos → Obtener complementos**, busca **"Form Publisher"** e instálalo. Autoriza los permisos que pida (necesita acceso a Forms, Docs y Drive para poder generar y guardar los PDF).
3. Abre **Extensiones → Form Publisher → Create configuration**.
4. Cuando pregunte por la plantilla, elige **"Use an existing template"** y selecciona el Google Doc del Paso 2.
5. Form Publisher va a detectar automáticamente cada `{{...}}` de la plantilla y lo va a emparejar con la pregunta del Form que tenga el mismo texto — revisa que todos queden en verde/emparejados antes de continuar. Si alguno queda en rojo, es porque el texto no coincidió exactamente; corrígelo en la plantilla o en la pregunta del Form hasta que coincidan.
6. En **"Output format"**, elige **PDF**.
7. En **"File name"**, usa algo como: `Inscripción - {{Nombre completo}} - {{Marca de tiempo}}` — así cada PDF queda nombrado con el socio y la fecha, fácil de encontrar después.
8. En **"Destination folder"**, elige o crea una carpeta de Drive, por ejemplo **"Comité Primos & Primas / Inscripciones"**. Ahí quedará cada PDF generado.
9. (Opcional pero recomendado) En **"Notification"**, activa el envío automático de una copia del PDF por correo a la dirección de quien administre las inscripciones del comité — así no hay que entrar a Drive a revisar cada vez que llega alguien nuevo.
10. Guarda la configuración con **"Save"**.

## Paso 4 — Probar que funciona

1. Abre el link público del Google Form (el mismo que reemplaza `PLACEHOLDER_FORM_ID`) y llénalo tú mismo con datos de prueba.
2. Al enviarlo, espera unos segundos y revisa la carpeta de Drive del Paso 3 — debe aparecer un PDF nuevo con el nombre configurado.
3. Ábrelo y confirma que cada campo aparece en el lugar correcto y que el diseño se parece a la ficha física original.
4. Si configuraste la notificación por correo, confirma que también llegó ahí.
5. Borra la respuesta de prueba del Form (Respuestas → los tres puntos → Eliminar respuesta) y el PDF de prueba de la carpeta de Drive, para no dejar datos falsos mezclados con inscripciones reales.

## Límites del plan gratuito

Form Publisher tiene un límite de documentos generados por mes en su plan gratuito (verifica el número vigente en [formpublisher.com](https://formpublisher.com), puede cambiar). Con 20 socios activos y un ritmo de inscripción lento, el plan gratuito debería alcanzar de sobra. Si el comité crece mucho más rápido de lo esperado y el límite se queda corto, hay dos caminos: pasar a un plan pago de Form Publisher, o migrar a la alternativa de Google Apps Script documentada en `CLAUDE.md` (sin límite de uso, pero requiere pegar un script una vez).

## Mantenimiento

- Si cambian las preguntas del Google Form (agregar, quitar o renombrar), hay que actualizar la plantilla de Google Docs para que seguir usando el `{{texto exacto}}` correspondiente.
- Si el diseño de la ficha física cambia, solo hay que editar el Google Doc de la plantilla — Form Publisher usa la versión más reciente automáticamente, no hace falta reconfigurar nada más.
