---
id: go-live-checklist
title: "Lista de comprobación para la puesta en producción (protocolo de lanzamiento)"
sidebar_label: "Lista de puesta en producción"
sidebar_position: 3
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::important Advertencia crítica
Todos los elementos deben estar en «Verde» (superados) antes de pasar a producción. En particular, la corrección de las claves financieras evita errores de datos irrecuperables.
:::

# 🚀 Lista de comprobación para la puesta en producción

Este protocolo está diseñado para garantizar la continuidad del sistema y la seguridad de los datos durante las transiciones de versión de Rentiva.

---

## 🏗️ 1. Comprobaciones de infraestructura y licencia

- [ ] **Activación del modo Pro:** ¿Se ha validado la clave de licencia en el servidor de producción para las comprobaciones de `Mode::featureEnabled()`?
- [ ] **Migraciones SQL:** ¿Se han ejecutado sin errores los scripts `up()` necesarios para las tablas `{$wpdb->prefix}mhmrentiva_*`?
- [ ] **Obligatoriedad de SSL:** ¿Se ha confirmado que el tráfico de pagos a proveedores y de webhooks circula únicamente por HTTPS?
- [ ] **SMTP / Mailer:** ¿Se ha entregado correctamente un correo electrónico de prueba mediante `Mailer::send()`?

---

## 💰 2. Ajustes de seguridad financiera

- [ ] **Secretos HMAC:** ¿Se han introducido correctamente los conjuntos dedicados de API Secret y Key para el entorno de producción?
- [ ] **Idempotencia de webhooks:** ¿Se ha verificado que las llamadas repetidas no crean entradas duplicadas en `Ledger` (con el modo de prueba desactivado)?
- [ ] **Códigos de moneda:** ¿Se ha confirmado que los ajustes de moneda actuales de WooCommerce son compatibles con `CurrencyHelper` de Rentiva?
- [ ] **Congelación de gobernanza:** ¿Se han asignado los permisos financieros críticos (aprobación masiva) exclusivamente a los roles `Checker` autorizados?

---

## ⚡ 3. Aplicación y rendimiento

- [ ] **Minificación de recursos:** ¿Se han minificado los archivos CSS y JS para el entorno de producción?
- [ ] **Vaciado de caché:** ¿Se han borrado mediante `CacheManager` los transitorios y las cachés de objetos que quedaron de la versión anterior?
- [ ] **Auditoría de shortcodes:** ¿Se muestran correctamente los shortcodes `[rentiva_...]` en las páginas de reserva críticas?
- [ ] **Estado de cron:** ¿Están activas las tareas de informes financieros que se ejecutan mediante `wp-cron`?

---

## 🚨 4. Preparación ante emergencias (reversión)

- [ ] **Copia de seguridad de la base de datos:** ¿Se ha verificado que hay una copia de seguridad actual de la base de datos accesible?
- [ ] **Reversión de versión:** ¿Hay preparada una etiqueta `git` o una copia de seguridad del paquete para volver a la versión estable anterior en caso de error?
- [ ] **Comunicación:** ¿Se ha informado a todas las partes interesadas (vendedores, equipo de operaciones) sobre la ventana de lanzamiento?

## Resumen de la sección
- El protocolo de puesta en producción es una parte integral del proceso de lanzamiento de versiones.
- Una sola carencia en los elementos financieros pone el lanzamiento en estado «Bloqueado».

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Página ampliada con elementos de activación PRO y de seguridad financiera. |
