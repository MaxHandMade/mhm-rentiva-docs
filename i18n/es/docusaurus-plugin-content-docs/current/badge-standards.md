---
id: badge-standards
title: "Estándares y guía de uso de insignias"
sidebar_label: "Estándares de insignias"
sidebar_position: 120
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-standard_v2-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta guía define los estándares, los códigos de color y las reglas de uso de las insignias visuales que se utilizan en las páginas de documentación de MHM Rentiva.
:::

# 🏷️ Estándares y guía de uso de insignias

Las insignias basadas en `Shields.io` se utilizan para visualizar rápidamente la vigencia y el nivel técnico de cada página de documentación.

---

## 🔝 1. Formato actual de las insignias (v4.27.2)

La secuencia estándar que debe aparecer en la parte superior de cada página:

```markdown
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)
```

---

## 🏛️ 2. Componentes de las insignias

### Insignia de versión
- **Color:** Azul (`blue`)
- **Formato:** `version-{plugin_version}`
- **Uso:** Indica con qué versión principal del plugin es compatible esta página.

### Insignias de seguridad y cumplimiento
- **Color:** Verde (`green`) o verde oscuro (`0f766e`)
- **Valores:**
  - `WPCS Compliant`: Cumple los estándares de programación de WordPress (WordPress Coding Standards).
  - `Security Hardened`: Se ha aplicado el refuerzo de seguridad.
  - `SQL Safe`: Protegido contra inyección SQL.

### Insignia de actualización
- **Color:** Naranja (`orange`)
- **Formato:** `last updated-DD.MM.YYYY`
- **Uso:** Muestra cuándo se revisó o actualizó la página por última vez.

---

## 🎨 3. Parámetros de estilo

Todas las insignias deben utilizar los siguientes parámetros para mantener la coherencia visual:
- **`style=flat-square`**: Proporciona un aspecto moderno con bordes rectos.
- **`logo=...`**: Se pueden añadir logotipos de marca cuando sea necesario.

---

## 📏 4. Reglas de uso

1. **Posición:** Las insignias deben colocarse inmediatamente después del frontmatter YAML y antes del encabezado principal (`#`).
2. **Orden:** El orden estándar es: **Versión** → **Tipo de documento / Seguridad** → **Última actualización**.
3. **Espaciado:** Deja un único espacio entre las insignias.
4. **Precisión:** La fecha de actualización debe reflejar siempre la fecha en que se realizó el cambio.

---

## 📝 5. Ejemplo

```markdown
---
id: sample-page
title: Sample Page
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# Sample Title
Content goes here...
```

## Resumen de la sección
- Un uso coherente de las insignias da a la documentación un aspecto profesional.
- Todas las páginas se han normalizado al nuevo formato a partir de la v4.21.2.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido los estándares de la v4.21.2 y los nuevos códigos de color. |
