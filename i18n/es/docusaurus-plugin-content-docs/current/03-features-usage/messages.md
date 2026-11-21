---
id: messages
title: "Sistema de mensajería"
sidebar_position: 12
slug: /features-usage/messages
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto con Lite, además de una licencia válida.
Consulta [Ediciones — Lite vs Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info SPA de React (desde la v4.40.0)
La página de administración de Mensajes se migró por completo a una **SPA de React** en la v4.40.0 (el pulido de CSS se finalizó en la v4.41.0). Los 6 componentes de React se sirven desde `build/admin/messages.js`. La página se carga sin un renderizado PHP de página completa: los datos se obtienen mediante endpoints REST de `/wp-json/mhm-rentiva/v1/messages/*`. Se eliminaron los métodos de renderizado PHP heredados.
:::

El sistema de mensajería es un canal de soporte centralizado que te permite comunicarte de forma directa y segura con tus clientes antes o después de un alquiler. Gestiona todas las solicitudes entrantes desde **MHM Rentiva > Mensajes**.

---

## 📩 Lista de mensajes y filtrado

La bandeja de entrada se organiza según la urgencia y el tipo de solicitud. La lista incluye las siguientes columnas principales:

- **Asunto y etiquetas:** Los mensajes nuevos (NEW) se resaltan con una etiqueta naranja.
- **Prioridad:** Nivel de urgencia establecido como «Normal», «Alta» o «Urgente».
- **Categoría:** El tema del mensaje (General, Reserva, Pago, Soporte técnico, etc.; la lista se gestiona en [Ajustes de mensajes](../02-core-configuration/message-settings.md)).
- **Estado:** Seguimiento del estado como «Pendiente», «Respondido» o «Cerrado».

:::note Mensajes del formulario de contacto
Los mensajes que los visitantes envían a través del [formulario de contacto](./shortcodes/contact.md) del sitio web están en una lista distinta: **MHM Rentiva > Mensajes de contacto**. Allí se muestra en el mensaje la reserva seleccionada, el filtro de tipo coincide con los tipos del formulario, y es donde se encuentran la protección antispam del formulario y el filtro **Spam**.
:::

---

## 💬 Comunicación y flujo de respuesta

Al hacer clic en un mensaje se abre una página de detalles que presenta el diálogo con el cliente en una estructura de hilo:

1.  **Identidad del cliente:** El nombre de usuario y la dirección de correo electrónico del remitente aparecen en la parte superior.
2.  **Contenido del mensaje:** El texto real enviado por el cliente y la hora de envío (p. ej., «hace 3 semanas»).
3.  **Botón de respuesta:** Te permite escribir al instante una respuesta al cliente desde el panel de administración.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 IMAGEN: DETALLES DEL MENSAJE Y FLUJO DE RESPUESTA</strong><br/>
  <em>mhm-rentiva-message-details-reply</em>
</div>

---

## ⚙️ Gestión técnica y asociación con reservas

La pantalla de edición de mensajes tiene una función clave para mantener el contexto operativo: la **asociación con reservas.**

- **Cambio de categoría y estado:** El administrador puede actualizar manualmente el tipo de mensaje y su estado (p. ej., de Pendiente a Respondido).
- **Vinculación con reservas:** Puedes vincular un mensaje entrante a un número de reserva existente (como #3037). Así, al ver los detalles de la reserva, puedes consultar toda la correspondencia histórica relacionada con esa transacción.

---

## 📱 Adaptable a móviles (v4.48.0+)

La tabla de mensajes cambia a un **diseño de tarjetas apiladas** en pantallas pequeñas (≤782px). Los encabezados de columna se insertan en línea mediante CSS `attr(data-label)`, sin desplazamiento horizontal. La vista de hilo también se apila verticalmente.

---

## Componentes de React (v4.40.0+)

| Componente | Finalidad |
| :--- | :--- |
| `MessagesPage` | Raíz: vista de lista + vista de hilo + vista de ajustes |
| `MessageTable` | Bandeja de entrada de mensajes ordenable y filtrable |
| `ThreadView` | Hilo con burbujas de chat y formulario de respuesta |
| `SettingsView` | Gestión de categorías y estados |

**Espacio de nombres REST:** `GET/POST /wp-json/mhm-rentiva/v1/messages/*`

---

### Resumen de la sección
- Organiza las solicitudes de soporte con el **filtrado de mensajes**.
- Mejora la satisfacción del cliente con el **flujo de respuesta**.
- Relaciona el historial de comunicación con los datos operativos mediante la **asociación con reservas**.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 11.05.2026 | 4.48.0 | Diseño apilado para móviles en la tabla de mensajes (≤782px). |
| 11.05.2026 | 4.41.0 | Pulido de CSS finalizado. Se añadió el menú de administración de pagos a proveedores. |
| 11.05.2026 | 4.40.0 | Migración completa a SPA de React. Componentes MessagesPage, MessageTable, ThreadView y SettingsView. |
| 23.04.2026 | 4.27.2 | Documentación sincronizada con la versión actual del plugin. |
| 19.03.2026 | 4.21.2 | Documentación de mensajes actualizada con las funciones de flujo de respuesta y asociación con reservas, según la interfaz real. |
| 26.02.2026 | 4.21.0 | Versión inicial creada. |
