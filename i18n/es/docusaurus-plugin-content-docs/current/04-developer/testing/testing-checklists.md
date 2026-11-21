---
id: testing-checklists
title: "Listas de comprobación de pruebas"
sidebar_label: "Listas de comprobación"
sidebar_position: 3
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página contiene las listas de comprobación críticas que deben completarse cuando se desarrolla una nueva funcionalidad o antes de publicar una versión.
:::

# ✅ Listas de comprobación de pruebas

Además de las pruebas automatizadas, las siguientes listas de comprobación deben ejecutarse de forma manual o semiautomática para mantener la integridad del sistema.

---

## 🛠️ Proceso de desarrollo (comprobaciones locales)

Esta es la última capa antes de enviar el código al entorno de staging:
- [ ] **Tipado estricto:** ¿Contienen todos los archivos PHP nuevos `declare(strict_types=1);`?
- [ ] **Saneamiento:** ¿Se han saneado todos los valores de `$_POST` y `$_GET`?
- [ ] **Escapado:** ¿Se han filtrado todas las salidas HTML con `esc_html` o `wp_kses`?
- [ ] **i18n:** ¿Se han marcado todas las cadenas visibles para el usuario con el dominio de texto `mhm-rentiva`?

---

## 💰 Pruebas financieras y de escenarios

Para los cambios que afectan a la capa financiera, deben verificarse los siguientes escenarios:
- [ ] **Integridad del libro mayor:** ¿Se refleja correctamente el saldo en `Ledger` después de la transacción?
- [ ] **Doble aprobación:** ¿Funciona el principio Maker-Checker? (Bloqueo de la autoaprobación).
- [ ] **Exportación CSV:** ¿Se puede exportar la lista de pagos en un formato compatible con Excel (UTF-8 BOM)?
- [ ] **Flujo negativo:** ¿Se detectan los errores de saldo insuficiente o de fecha no válida?

---

## 🚀 Lista de comprobación previa al lanzamiento

Pasos que deben completarse antes de las versiones menores/mayores:
- [ ] **Comprobación de migraciones:** ¿Están listas las migraciones SQL (up/down) para las nuevas tablas o columnas?
- [ ] **Vaciado de caché:** ¿Se han eliminado los transitorios antiguos mediante `CacheManager`?
- [ ] **Auditoría de shortcodes:** ¿Se muestran correctamente todos los shortcodes del frontend (`[rentiva_...]`)?
- [ ] **Límite de solicitudes:** ¿Está activa la limitación de solicitudes en los endpoints de la API?

---

## 📱 Control de calidad de UI/UX

- [ ] **Diseño adaptable:** ¿Se muestran correctamente los widgets de Elementor en móviles y tabletas?
- [ ] **Selector de fecha:** ¿Funciona el selector de calendario en todos los navegadores (Chrome, Safari, Firefox)?
- [ ] **Interfaz de errores:** ¿Guían correctamente al usuario los mensajes de error de los formularios?

## Resumen de la sección
- Las listas de comprobación garantizan la calidad operativa del sistema.
- Completar los elementos financieros **no es opcional**.
- Cada lista de comprobación completada se documenta en el `Sprint Report`.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Página actualizada con elementos de deuda técnica y de pruebas de estrés financiero. |
