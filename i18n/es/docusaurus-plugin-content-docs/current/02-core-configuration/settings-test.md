---
id: settings-test
title: "Prueba de ajustes (pruebas de diagnóstico)"
sidebar_label: "Prueba de ajustes"
sidebar_position: 16
slug: /core-configuration/settings-test
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

La pestaña Prueba de ajustes es una herramienta de diagnóstico que comprueba automáticamente si todas las partes del plugin (base de datos, correo electrónico, sistema de archivos, integración con WooCommerce, etc.) están configuradas correctamente. Accede a ella desde **MHM Rentiva > Ajustes > Prueba de ajustes**.

Garantiza que tu sistema cumple todos los requisitos después de instalar el plugin o de realizar cambios en el servidor.

---

## 🩺 Categorías de pruebas completas

El sistema realiza un análisis exhaustivo en los siguientes apartados principales:

- **Infraestructura de correo electrónico:** conexión SMTP, nombre del remitente de los correos, disponibilidad de las plantillas y capacidad de entrega de mensajes de prueba.
- **Permisos del sistema de archivos:** verifica que los archivos CSS, JS y de registro se pueden escribir en los directorios designados (p. ej., `/uploads/mhm-rentiva/`).
- **Configuración de seguridad:** validez de las claves de autenticación y si los mecanismos de restricción por IP y la protección contra ataques de fuerza bruta están activos.
- **Integración con WooCommerce:** comprueba que los métodos de pago, las reglas de impuestos y la sincronización de productos son totalmente compatibles con el plugin.
- **Estado interno del sistema:** idoneidad del modo SQL para el rendimiento, versión de PHP y corrección de los ajustes básicos de WordPress (zona horaria, etc.).

---

### 🛡️ Resultados del informe de diagnóstico

El significado de cada fila en la pantalla del informe:

| Icono | Estado | Descripción |
| :---: | :--- | :--- |
| ✅ | **SUPERADA** | El componente del sistema correspondiente cumple todos los requisitos y funciona sin problemas. |
| ❌ | **FALLIDA** | Un error crítico de configuración (p. ej., falta el permiso de escritura de archivos). Debe corregirse. |
| ⚠️ | **ADVERTENCIA** | El sistema funciona, pero se recomienda una mejora de rendimiento o de configuración. |

---

### 🖼️ IMAGEN: INFORME DE PRUEBA DE AJUSTES
*(Ajustes > pestaña Prueba de ajustes — lista de resultados del diagnóstico y pantalla de resumen del informe)*

---

### Resumen de la sección
- Ejecuta esta prueba después de cada cambio de configuración para una **solución rápida de problemas**.
- Comparte los resultados de esta página con nuestro equipo antes de enviar **solicitudes de soporte** para agilizar el proceso de diagnóstico.
- Realiza una **instalación segura** para garantizar que tus clientes no encuentren errores durante el proceso de reserva.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se ha creado la documentación de Prueba de ajustes (diagnóstico) como página independiente. |
