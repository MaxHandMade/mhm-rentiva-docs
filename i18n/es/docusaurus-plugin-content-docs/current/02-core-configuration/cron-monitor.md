---
id: cron-monitor
title: "Monitor de tareas Cron"
sidebar_label: "Monitor de tareas Cron"
sidebar_position: 15
slug: /core-configuration/cron-monitor
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

La pestaña Monitor de tareas Cron es el área de administración desde la que supervisas en tiempo real el estado de las tareas automatizadas (operaciones programadas) que MHM Rentiva ejecuta en segundo plano. Accede a ella desde **MHM Rentiva > Ajustes > Monitor de tareas Cron**.

El plugin utiliza el sistema WP-Cron para operaciones como el envío de correos electrónicos, la cancelación de reservas y la limpieza de datos.

---

## 🕒 Tareas principales supervisadas

Desde este panel puedes ver todas las colas y tareas programadas propias del plugin:

- **Cancelación automática de reservas:** elimina automáticamente del sistema las reservas pendientes de pago cuyo plazo ha vencido.
- **Cola de correos electrónicos:** pone en cola y envía los mensajes de confirmación, recordatorio o agradecimiento que corresponden a los clientes.
- **Políticas de conservación de datos:** limpia los registros antiguos y los datos temporales según los periodos de conservación definidos en Ajustes.
- **Comprobación de licencia y actualizaciones:** valida periódicamente la licencia y comprueba si hay nuevas versiones del plugin.

---

### 🖼️ IMAGEN: PANEL DEL MONITOR DE TAREAS CRON
*(Ajustes > pestaña Monitor de tareas Cron — lista de tareas activas y botones «Ejecutar ahora»)*

---

:::tip Intervención manual
Si una tarea aparece como «Programado» pero parece bloqueada, o si necesitas que se ejecute de inmediato, pulsa el botón **«Ejecutar ahora»** junto a la tarea correspondiente para lanzarla manualmente.
:::

---

### Resumen de la sección
- Aprovecha la **transparencia en segundo plano** para ver qué tareas realizará el sistema y cuándo.
- **Simplifica la detección de errores**: una tarea cron que no se ejecuta puede detener el envío de correos electrónicos.
- Mantén el **control operativo** lanzando manualmente las tareas críticas (por ejemplo, la cancelación) siempre que sea necesario.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se ha creado la documentación del Monitor de tareas Cron como página independiente. |
