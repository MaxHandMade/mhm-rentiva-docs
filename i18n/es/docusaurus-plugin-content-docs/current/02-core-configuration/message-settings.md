---
id: message-settings
title: "Ajustes de mensajes"
sidebar_label: "Ajustes de mensajes"
sidebar_position: 10
slug: /core-configuration/message-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto con Lite, además de una licencia válida.
Consulta [Ediciones — Lite vs Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

La pestaña Ajustes de mensajes es donde configuras el sistema de chat interno entre clientes y personal, las preferencias de avisos y las categorías del flujo de trabajo. Accede a ella desde **MHM Rentiva > Ajustes > Ajustes de mensajes**.

:::important Función Pro
El sistema de mensajería está disponible como parte del paquete Premium. Tu licencia debe admitir esta función para que los ajustes estén activos.
:::

---

## 🛠️ Herramientas de gestión

- **Restablecer conversaciones:** borra de forma permanente todo el historial de mensajes de la base de datos (se usa para limpieza operativa).
- **Restablecer esta pestaña:** restaura los ajustes de mensajes a sus valores predeterminados de fábrica.

---

## 📂 Pestañas de ajustes

El sistema de mensajería se configura en cuatro apartados principales:

### 1. Avisos
- **Correo electrónico de gestión:** la dirección de destino para las alertas al personal (si se deja en blanco, se usa el correo electrónico global del administrador).
- **Nombre de salida:** el nombre del remitente que se muestra en los correos electrónicos de aviso de mensajes (si se deja en blanco, se usa el nombre del sitio).
- **Alertar al personal de nuevos mensajes de clientes:** envía al personal una alerta por correo electrónico cuando llega un nuevo mensaje de un cliente.
- **Avisar a los clientes de las respuestas del personal:** envía al cliente un correo electrónico cuando el personal responde a un mensaje.

### 2. Reglas del sistema
- **Visibilidad en el escritorio:** activa el widget de mensajes en el escritorio de WordPress.
- **Capacidad del widget:** define cuántos mensajes recientes se muestran en el escritorio (por defecto: 5, de 1 a 20).
- **Respuesta automática:** envía al cliente un correo electrónico automático de acuse de recibo cuando envía un mensaje (desactivado por defecto).

### 3. Categorías
Permite clasificar los mensajes por tema. Las categorías predeterminadas son:
- General, Reserva, Pago, Soporte técnico, Queja, Sugerencia.
- *Puedes renombrar o eliminar categorías y añadir otras nuevas con **Añadir categoría**.*

### 4. Estados del flujo de trabajo
Se usan para seguir el ciclo de vida de los mensajes:
- Pendiente, Respondido, Cerrado.
- *Los tres estados son fijos; puedes cambiar el nombre con el que se muestra cada uno. La urgencia se establece con la prioridad del mensaje (Normal, Alta, Urgente), no con un estado.*

:::note Mensajes del formulario de contacto
Los mensajes enviados a través del formulario de contacto de la web forman una lista aparte (**MHM Rentiva > Mensajes de contacto**) con su propia protección contra spam; consulta [Formulario de contacto](../03-features-usage/shortcodes/contact.md).
:::

---

### 🖼️ IMAGEN: PANEL DE AJUSTES DE MENSAJES
*(Ajustes > pestaña Ajustes de mensajes, área de gestión de categorías y avisos)*

---

### Resumen de la sección
- Usa **Avisos** para aprovechar al máximo tu capacidad de responder al instante a las consultas de los clientes.
- Usa **Categorías** para dirigir las solicitudes entrantes a los departamentos correspondientes (Ventas, Soporte, etc.).
- Usa **Flujo de trabajo** para asegurarte de que ninguna solicitud de un cliente quede sin respuesta.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 18.11.2026 | 6.5.0 | Nombres de campos, categorías y estados fijos del flujo de trabajo corregidos para que coincidan con la pantalla; añadida referencia a Mensajes de contacto y a la protección contra spam. |
| 23.04.2026 | 4.27.2 | Añadida la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Creada la documentación de Ajustes de mensajes con 4 subpestañas y detalles de la gestión de categorías. |
