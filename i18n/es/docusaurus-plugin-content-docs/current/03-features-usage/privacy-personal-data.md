---
id: privacy-personal-data
title: "Privacidad y datos personales"
sidebar_label: "Privacidad y datos personales"
sidebar_position: 17
slug: /features-usage/privacy-personal-data
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva se integra con las herramientas de datos personales propias de WordPress. Cuando un cliente te pregunta qué datos tienes sobre él, o te pide que los borres, gestionas la solicitud desde **Herramientas > Exportar datos personales** y **Herramientas > Borrar datos personales**, y Rentiva añade sus datos a ambas. Además, añade una sección ya preparada a tu guía de la política de privacidad.

> Las partes marcadas con **(Pro)** necesitan **MHM Rentiva Pro**. Siguen funcionando después de que caduque la licencia, porque los datos y los derechos del cliente sobre ellos se mantienen.

---

## Exportar datos personales

Introduce la dirección de correo electrónico del cliente; la exportación reúne lo siguiente (las herramientas propias de WordPress exportan la cuenta de WordPress y las de WooCommerce, los campos de facturación):

| Grupo | Qué se incluye |
| :--- | :--- |
| **Reservas de MHM Rentiva** | Todas las reservas de la persona, incluidas las reservas como invitado (relacionadas por dirección de correo electrónico): número, estado, vehículo, fechas de recogida y devolución, nombre, correo electrónico, teléfono, notas, total, estado del pago, detalles de cancelación y reembolso, enlace y nota del comprobante de pago, la línea **Contrato de alquiler aceptado** (fecha y versión del texto) y las notas del historial de la reserva, incluidas las notas del personal. Se excluyen quién la canceló y el registro interno de acciones. |
| **Mensajes de contacto de MHM Rentiva** | Fecha, tipo, nombre, correo electrónico, teléfono, empresa, mensaje, consentimiento, dirección IP, navegador y nombre del archivo adjunto. |
| **Registro de correos electrónicos de MHM Rentiva** | Fecha y asunto de los correos electrónicos enviados. |
| **Datos de la cuenta de MHM Rentiva** | Teléfono, dirección, vehículos favoritos, vehículos para comparar, último inicio de sesión y última actividad, y las preferencias de notificación (correo electrónico de bienvenida, notificaciones de reservas, correos electrónicos de marketing). |
| **Mensajes de MHM Rentiva Pro (Pro)** | Las conversaciones de mensajes de la persona. |
| **Datos de vendedor de MHM Rentiva Pro (Pro)** | Perfil de vendedor, todas las solicitudes, todas las liquidaciones (incluidas las rechazadas, con su estado) y los informes, página por página. La cuenta bancaria (IBAN) aparece **solo con sus 4 últimos dígitos**. |
| **Registros de consentimiento de MHM Rentiva Pro (Pro)** | Cuándo se dio o se retiró el consentimiento de privacidad. |

---

## Borrar datos personales

El borrado sigue estas reglas:

- **Reservas:** las reservas completadas, canceladas, reembolsadas y de no presentación se **anonimizan**: se eliminan el nombre, los datos de contacto y las notas; la fecha, el vehículo y el importe se conservan para tu contabilidad, y la copia en la línea del pedido de WooCommerce vinculado también se anonimiza. Las reservas pendientes, confirmadas o en curso se **conservan** y aparecen en el resultado, porque un alquiler en curso todavía necesita a alguien con quien contactar. Vuelve a ejecutar el borrado cuando terminen. Si una reserva no se puede anonimizar por completo, el resultado lo indica; vuelve a ejecutarlo al cabo de 15 minutos.
- **Mensajes de contacto, registro de correos electrónicos y registro de la aplicación:** se eliminan.
- **Datos de la cuenta:** se eliminan los datos de la cuenta de Rentiva. La cuenta de usuario de WordPress **no** se elimina; elimínala desde **Usuarios** si lo necesitas. Si el cliente había **desactivado** una notificación por correo electrónico, esa preferencia se conserva para que la cuenta eliminada no vuelva a recibir correos electrónicos.
- **Los pedidos de WooCommerce vinculados** conservan sus datos de facturación según tu ajuste de privacidad de WooCommerce.
- **Mensajes (Pro):** las conversaciones de la persona se eliminan por completo, incluidas tus respuestas.
- **Datos de vendedor (Pro):** las solicitudes, las liquidaciones, el libro contable y los informes se **conservan** por obligación legal de conservación, y el resultado lo indica.
- **Registros de consentimiento (Pro):** se borran. El resultado también te recuerda que las copias en las cachés de informes se actualizan en un plazo de 24 horas.

---

## Texto de la guía de la política

En **Ajustes > Privacidad** (la guía de la política) Rentiva añade dos sugerencias que puedes copiar en tu propia política de privacidad. Conserva lo que se aplique a tu sitio y ajusta los plazos de conservación:

- **MHM Rentiva:** secciones para **Reservas**, **Formulario de contacto**, **Correos electrónicos y registros** y **Tu cuenta**, además de un recordatorio de que las copias de seguridad de la base de datos realizadas con las herramientas de base de datos de Rentiva contienen estos datos y no se modifican con una solicitud de borrado: elimina tú mismo las copias de seguridad antiguas.
- **MHM Rentiva Pro (Pro):** secciones para **Mensajes**, **Vendedores** y **Consentimiento**, además de un recordatorio de que las cachés de informes guardan copias de los nombres y direcciones de correo electrónico de los clientes durante un máximo de 24 horas, de que los archivos CSV de informes guardados en `uploads/mhm-rentiva-exports/` no se eliminan automáticamente (elimínalos cuando ya no los necesites) y de que se conserva el registro de auditoría del administrador, que registra qué miembro del personal ha consultado los datos bancarios o de documentos.

---

## Controles de privacidad de Mi cuenta (Pro)

Los clientes ven esto en **Mi cuenta**:

- **Tarjeta de consentimiento de privacidad:** mientras el cliente no haya dado su consentimiento, aparece una tarjeta con **Aceptar** y **Rechazar** en la parte superior del escritorio de Mi cuenta, dentro de la página. Ya no es una ventana emergente sobre otras páginas.
- Sección **Controles de privacidad**: **Solicitar exportación de datos**, **Solicitar borrado de datos** y, solo después de que el cliente haya dado su consentimiento, **Retirar el consentimiento**.

**Solicitar exportación de datos** y **Solicitar borrado de datos** abren una solicitud estándar de WordPress que el cliente confirma por correo electrónico (se puede enviar un nuevo correo electrónico de confirmación cada 10 minutos). Una vez confirmada, procesas la solicitud desde las pantallas de **Herramientas** indicadas arriba. El consentimiento que se muestra en la tarjeta es la misma respuesta que lee la comprobación de consentimiento del formulario de reserva.

:::info Cambiado en 6.4.0
La exportación y el borrado de datos personales, el texto de la guía de la política y las solicitudes de Mi cuenta son novedades de la 6.4.0. **Retirar el consentimiento** ahora solo aparece después de que el cliente haya dado su consentimiento, y la tarjeta de consentimiento se sitúa en la parte superior del escritorio de Mi cuenta en lugar de abrirse en un cuadro sobre la página.
:::

---

### Resumen de la sección
- Usa **Herramientas > Exportar / Borrar datos personales**; Rentiva añade reservas, mensajes de contacto, registro de correos electrónicos, datos de la cuenta y el registro de la aplicación (solo en el borrado). Pro añade mensajes, datos de vendedor y registros de consentimiento.
- Las reservas cerradas se anonimizan; las que están en curso se conservan.
- Copia las secciones de la guía de la política en tu política de privacidad.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 / Pro 6.5.0 | Página creada: exportación y borrado de datos personales, texto de la guía de la política, controles de privacidad de Mi cuenta. |
