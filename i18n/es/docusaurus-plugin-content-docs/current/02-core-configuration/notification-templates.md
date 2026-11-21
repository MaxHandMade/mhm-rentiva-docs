---
id: notification-templates
title: "Plantillas de aviso"
sidebar_label: "Plantillas de aviso"
sidebar_position: 9
slug: /core-configuration/notification-templates
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

La pestaña Plantillas de aviso es el centro desde el que puedes personalizar, probar y restaurar todo el contenido de los correos electrónicos (HTML) que se envían a clientes y administradores, incluida la vuelta al diseño "Gold Standard". Accede a ella desde **MHM Rentiva > Ajustes > Plantillas de aviso**. Si un campo está vacío, el sistema usa el diseño Gold Standard.

---

## 🛠️ Herramientas de gestión

En la parte superior derecha de la página aparecen dos botones fundamentales:
- **Ajustes de correo electrónico:** Ofrece acceso rápido a ajustes globales como el nombre del remitente y el color.
- **Restaurar Gold Standard:** Sirve para corregir errores en las plantillas o volver al diseño profesional original.

---

## 📂 Categorías de plantillas

Los avisos se agrupan en pestañas:

### 1. Avisos de reserva
Mensajes principales relacionados con el proceso de alquiler del cliente. Cada uno tiene su propio interruptor **Activado** (cuando corresponde), **Asunto** y **Contenido (HTML)**:
- **Correo de nueva reserva:** Se envía al cliente cuando se crea una reserva. Su asunto predeterminado es "Reserva recibida: #…": la reserva se ha recibido, pero aún no está confirmada; la confirmación le llega al cliente mediante el correo de estado cuando se recibe el pago.
- **Correo de cambio de estado de la reserva:** Actualizaciones de estado como Confirmada o Pendiente.
- **Correo de aviso al administrador:** La alerta que recibes cuando llega una nueva reserva (tú eliges la dirección del destinatario).
- **Correo de cancelación automática:** Se envía cuando vence el plazo de pago.
- **Correo de cancelación manual:** Se envía cuando el personal cancela una reserva.
- **Correo de recordatorio de recogida:** Se envía poco antes de la recogida; detalla la recogida y la devolución.
- **Correo de bienvenida al cliente:** Se envía tras la primera reserva del cliente.

El asunto y el contenido que ves en estos campos son exactamente lo que se envía. Si guardaste la pantalla de ajustes con un asunto predeterminado anterior, se muestra y se usa el nuevo asunto predeterminado; un asunto que hayas escrito tú se conserva.

### 2. Correos de reembolso
Plantillas específicas de los procesos de reembolso:
- **Correo de reembolso al cliente:** El importe reembolsado, el número de reserva y cómo le llega el dinero al cliente.
- **Correo de reembolso al administrador:** Información enviada al administrador para el seguimiento contable y operativo.

Cuando un reembolso se devuelve manualmente (transferencia bancaria, efectivo), el cliente recibe el correo de Rentiva "el reembolso se te abonará mediante transferencia manual" en lugar del correo de WooCommerce "tu pedido ha sido reembolsado". Si el correo de Rentiva está desactivado, o la reserva no tiene una dirección válida, se envía el correo de WooCommerce como antes. En un reembolso que devuelve la propia pasarela de pago, el correo de WooCommerce no cambia. Cuando confirmas la transferencia manual de un reembolso, el cliente recibe un segundo correo: "…se te ha transferido tu reembolso", con la referencia de la transferencia si la has introducido.

### 3. Avisos de mensajes y de vendedores (Pro)
> Estas pestañas aparecen cuando **MHM Rentiva Pro** está activo.

- **Avisos de mensajes:** Alerta de nuevo mensaje al personal, el correo de respuesta al cliente y el acuse de recibo automático.
- **Avisos de vendedores:** Correos del marketplace de vendedores.

### 4. Vista previa del correo electrónico
Consulta más abajo.

---

## 🔍 Vista previa y pruebas de correo electrónico

Usa la pestaña **Vista previa del correo electrónico** para comprobar el estado real de las plantillas:
- **Vista previa en directo:** Muestra cómo aparecerá el correo en la bandeja de entrada del cliente.
- **Enviar prueba:** Selecciona una plantilla concreta y envía un "Correo electrónico de prueba" a cualquier dirección para verificar la entrega.

---

## 🏷️ Etiquetas dinámicas disponibles (marcadores de posición)

Añade los siguientes códigos entre corchetes `{}` en el contenido de la plantilla para que los datos se rellenen automáticamente. La lista de etiquetas también se muestra encima de cada pestaña. La lista completa está en la página [Correos electrónicos y avisos](./emails.md):
- `{booking_id}`: Número de reserva.
- `{vehicle_title}`: Nombre del vehículo.
- `{pickup_date}` / `{dropoff_date}`: Fechas.
- `{pickup_time}` / `{return_time}`: Horas.
- `{pickup_datetime}` / `{return_datetime}`: Fecha y hora juntas (solo la fecha si no hay hora guardada).
- `{total_price}`: Importe total.
- `{contact_name}` / `{salutation_name}`: Nombre del cliente; la segunda está pensada para saludos y muestra "estimado cliente" cuando no hay nombre.
- `{site_name}`: El nombre de tu sitio.

---

## ✉️ Enviar un correo electrónico a un cliente desde una reserva

En la pantalla de edición de una reserva, la caja **Enviar correo electrónico al cliente** te permite elegir un tipo: Confirmación de reserva, Recordatorio de reserva, Cancelación de reserva o Mensaje personalizado. Aquí el asunto y el cuerpo se rellenan a partir de la plantilla y puedes cambiarlos antes de enviar. Una plantilla sin cambios se envía exactamente igual que el correo automático; si cambias el asunto, ese pasa a ser el título del correo. Si el envío está desactivado o el modo de prueba está activo, la caja te lo indica; si el cliente ha desactivado los avisos, se añade una nota. El envío queda registrado en el historial de la reserva.

---

![Ajustes > pestaña Plantillas de aviso](/img/docs/screens/settings-email-templates.webp)

*Ajustes > pestaña Plantillas de aviso, lista de plantillas y herramienta de vista previa*

---

### Resumen de la sección
- Empieza con un diseño de correo profesional usando el **Gold Standard**.
- Personaliza los mensajes con **etiquetas dinámicas**.
- Usa la **herramienta de vista previa** para corregir errores antes de publicar.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Se documentan los tipos de plantilla, las etiquetas de fecha y hora, `{salutation_name}`, el asunto "Reserva recibida" de nueva reserva, los correos de reembolso para reembolsos manuales y la caja "Enviar correo electrónico al cliente". |
| 23.04.2026 | 4.27.2 | Se añade la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se crea la documentación de Plantillas de aviso con 4 pestañas y detalles de la herramienta de vista previa. |
