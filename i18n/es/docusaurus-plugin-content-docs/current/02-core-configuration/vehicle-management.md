---
id: vehicle-management
title: "Gestión de vehículos (Ajustes)"
sidebar_label: "Gestión de vehículos"
sidebar_position: 2
slug: /core-configuration/vehicle-management
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

La pestaña Gestión de vehículos es el área central desde la que gestionas los precios de alquiler (basados en multiplicadores) y las restricciones de reserva de los vehículos de tu flota. Accede a ella desde **MHM Rentiva > Ajustes > Gestión de vehículos**.

---

## 💰 Ajustes de precios de vehículos

Optimiza los precios de todos los vehículos del sistema desde un único centro mediante multiplicadores.

- **Multiplicador de precio base:** se usa para aumentar o reducir globalmente todos los precios de los vehículos (p. ej., 1.0 = precio normal, 1.2 = recargo del 20 %).
- **Multiplicador de precio de fin de semana:** el porcentaje de aumento de precio que se aplica los viernes, sábados y domingos (p. ej., introduce 1.2 para un recargo de fin de semana del 20 %).
- **Ajustes de impuestos (WooCommerce):** los ajustes «Precios con impuestos incluidos» y «Tipo impositivo (%)» funcionan totalmente integrados con el sistema central de impuestos de WooCommerce. Los cambios se obtienen del panel de WooCommerce.

---

### 🖼️ IMAGEN: PANEL DE PRECIOS DE VEHÍCULOS
*(Pestaña Ajustes > Gestión de vehículos, multiplicadores de precio y campos de impuestos)*

---

## 📅 Ajustes de disponibilidad de vehículos

Aquí se definen las reglas que determinan durante cuánto tiempo y en qué condiciones los clientes pueden alquilar vehículos.

- **Duración mínima / máxima del alquiler:** el número mínimo y máximo de días que se pueden alquilar los vehículos (por defecto: 1 – 30 días).
- **Días de reserva anticipada:** con cuánta antelación respecto a hoy pueden hacer una reserva los clientes (p. ej., 365 días).
- **Permitir reservas para el mismo día:** si se marca, los clientes pueden crear una solicitud de reserva para el día en curso (alquiler urgente).
- **Ubicación de alquiler predeterminada (alternativa):** si no se ha definido una ubicación específica para un vehículo o para el propietario del vehículo (vendedor), el sistema usa esta ubicación «alternativa».

---

## 💡 Notas técnicas

:::tip Lógica de cálculo del precio
El sistema calcula el precio con esta fórmula:
`Daily Rate × Number of Days × Base Multiplier × [Weekend Multiplier if applicable]`
:::

---

### Resumen de la sección
- Usa los **multiplicadores de precio** para aplicar un descuento o un recargo a toda la flota a la vez.
- Usa los **límites de disponibilidad** para definir tus límites operativos (días mín./máx.).
- La **integración con WooCommerce** garantiza que los cálculos de impuestos y céntimos no tengan errores.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se ha creado la documentación de Gestión de vehículos (Ajustes) a partir de una captura de pantalla del panel y del análisis del código. |
