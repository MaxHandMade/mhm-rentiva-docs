---
id: system-diagnostics-usage
title: "Estado del sistema y prueba de ajustes"
sidebar_label: "Estado del sistema"
sidebar_position: 18
slug: /features-usage/system-diagnostics
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

El estado del sistema y la prueba de ajustes te permiten verificar que todos los componentes del plugin (pasarelas de pago, correo electrónico, tareas cron, inventario de vehículos) funcionan correctamente. Accede a ello desde la pestaña **MHM Rentiva > Ajustes > Prueba de ajustes**.

Se recomienda ejecutar estas pruebas periódicamente para que tu negocio funcione sin problemas.

---

## Pruebas por categoría

El sistema de diagnóstico analiza tu negocio en los siguientes apartados:

- **Entrega de correos electrónicos:** Comprueba si las notificaciones llegan a los clientes.
- **Permisos de escritura en directorios:** Comprueba los permisos de las carpetas para las imágenes de vehículos y los informes generados.
- **Enlaces a páginas críticas:** Verifica que las páginas de búsqueda, reserva y pago estén publicadas.
- **Estado de WP Cron:** Supervisa si las tareas programadas (recordatorios, cálculos de pagos al proveedor) se ponen en cola correctamente.

---

### 🖼️ IMAGEN: INFORME DE DIAGNÓSTICO DEL SISTEMA
*(Página de prueba de ajustes y notificaciones de éxito/error)*

---

## Resolución de errores y acciones

Cuando una prueba falla, el sistema ofrece las siguientes soluciones:
- **Corrección con un clic:** Si el problema es sencillo —como una página que falta—, crea la página automáticamente.
- **Registro detallado:** Muestra el detalle técnico del error (p. ej., error 500 del servidor) para que te resulte más fácil obtener soporte.
- **Volver a analizar:** Tras resolver el problema, vuelve a ejecutar la prueba para verificar el estado.

---

### Resumen de la sección
- **Garantía operativa:** Evita la pérdida de clientes causada por errores de configuración.
- **Diagnóstico rápido:** Determina en segundos si un problema se debe al servidor o a la configuración.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentación sincronizada con la versión actual del plugin. |
| 19.03.2026 | 4.21.2 | Se ha creado la guía de uso del estado del sistema y la prueba de ajustes. |
