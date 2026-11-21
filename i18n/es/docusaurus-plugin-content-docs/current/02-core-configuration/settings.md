---
id: settings
title: "Ajustes generales"
sidebar_label: "Ajustes generales"
sidebar_position: 1
slug: /core-configuration/settings
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

La página de ajustes generales es el punto de partida donde configuras los principios básicos de funcionamiento del plugin, la moneda y la identidad de la empresa. Accede a ella desde la pestaña **MHM Rentiva > Ajustes > Ajustes generales**.

---

## ⚙️ Configuración general

Esta sección define las preferencias básicas de visualización y moneda del sistema.

- **Moneda:** MHM Rentiva funciona totalmente integrado con WooCommerce. Si WooCommerce está activo en tu sitio, la moneda se toma de WooCommerce y el ajuste siguiente simplemente la sigue. Sin WooCommerce, el plugin usa su propio ajuste de moneda, que por defecto es **USD**.
- **Posición de la moneda:** Los ajustes de ubicación, como el símbolo a la izquierda o a la derecha, también se gestionan de forma centralizada a través de WooCommerce.
- **Modo oscuro:** Define el esquema de colores del panel de administración.
    - **Automático (sistema):** Cambia automáticamente según el modo de tu sistema operativo (noche/día).
    - **Claro / Oscuro:** Puedes elegir una apariencia fija.

---

### 🖼️ IMAGEN: PANTALLA DE CONFIGURACIÓN GENERAL
*(Pestaña Ajustes > Ajustes generales, área de preferencias de moneda y apariencia)*

---

## 🏢 Información de marca y contacto

La información que introduzcas aquí se usa automáticamente como marcadores de posición en los correos electrónicos dirigidos a clientes, las facturas en PDF y los formularios de contacto.

- **Nombre de la marca:** El nombre completo de tu empresa o marca.
- **Correo electrónico de soporte:** La dirección de correo electrónico utilizada para la atención al cliente.
- **Teléfono de contacto:** El número de contacto oficial de tu empresa (se recomienda el formato +90 555...).
- **Horario de soporte:** El horario de trabajo en el que ofreces atención al cliente (p. ej., 09:00 – 18:00).

---

## 💡 Notas técnicas

:::info
Si quieres cambiar la moneda y WooCommerce está instalado, haz el cambio en **WooCommerce > Ajustes > General**. MHM Rentiva detectará el cambio al instante.
:::

---

### Resumen de la sección
- La **moneda** principal del sistema funciona sincronizada con WooCommerce.
- La apariencia del panel de administración (modo oscuro) se configura en **Configuración general**.
- La **información de marca** conforma la identidad corporativa de los documentos y las plantillas de correo electrónico.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Documentación de los ajustes generales actualizada a partir de la captura de pantalla del panel. |
