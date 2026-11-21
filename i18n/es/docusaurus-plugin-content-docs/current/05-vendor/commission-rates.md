---
id: commission-rates
title: "Configuración de la tasa de comisión"
sidebar_label: "Tasas de comisión"
sidebar_position: 11
slug: /vendor/commission-rates
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una función del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones: Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Objetivo
Este documento explica cómo decide MHM Rentiva **qué tasa de comisión** se aplica a una reserva concreta y dónde se encuentra cada una de las cuatro pantallas de configuración en wp-admin. Para saber cómo se crea, se liquida y se paga la entrada resultante `commission_credit` del libro contable, consulta [Liquidaciones y libro contable](/docs/vendor/payouts-ledger).
:::

# 💰 Configuración de la tasa de comisión

Cada reserva pagada de un vehículo de un vendedor genera un crédito de comisión para el vendedor propietario de ese vehículo, independientemente de quién haya abierto la reserva. Los vehículos que pertenecen al propio sitio, y no a un vendedor, no generan ninguno. La **tasa** que se usa para ese cálculo se determina mediante una jerarquía de 4 niveles: gana el nivel más específico que tenga un valor, y cualquier nivel que se deje vacío simplemente pasa al siguiente.

---

## 🏗️ 1. La jerarquía de tasas

| Prioridad | Nivel | Dónde se configura | Se aplica a |
|---|---|---|---|
| 1 (más alta) | **Anulación por vehículo** | Pantalla de edición del vehículo → metabox «Anulación de la tasa de comisión» | Un único vehículo |
| 2 | **Anulación por vendedor** | Gestión de vendedores → página de detalle del vendedor → campo «Anulación de la tasa de comisión» | Todas las reservas de un vendedor (salvo que se aplique una anulación por vehículo) |
| 3 | **Nivel de descuento por volumen** | Gestión de vendedores → pestaña Comisión → «Niveles de descuento por volumen» | Vendedores cuyos ingresos liquidados de los últimos 30 días superan un umbral |
| 4 (más baja) | **Tasa global** | Gestión de vendedores → pestaña Comisión → tasa actual | El valor predeterminado de toda la plataforma; siempre está definido |

:::tip Cómo funciona «vacío»
Dejar en blanco el campo de anulación por vehículo o de anulación por vendedor **no** significa «0 % de comisión», sino «aquí no hay anulación, comprueba el siguiente nivel». Un `0` literal es una anulación real y deliberada (0 % de comisión para ese vehículo/vendedor).
:::

---

## 🚗 2. Anulación a nivel de vehículo

**Ubicación:** Edita cualquier vehículo → barra lateral → metabox **Anulación de la tasa de comisión**.

Introduce un porcentaje (0–100, se admiten decimales, p. ej. `4.5`) para aplicar a las reservas de ese vehículo una tasa de comisión fija, independientemente de la tasa propia del vendedor o de la tasa por nivel/global de la plataforma. Deja el campo vacío para recurrir a la tasa a nivel de vendedor (o inferior).

Este es el nivel más específico: úsalo para un único vehículo que tenga un acuerdo comercial especial (p. ej. un anuncio promocional o un vehículo de un socio con una tasa negociada).

---

## 🧑‍💼 3. Anulación a nivel de vendedor

**Ubicación:** Gestión de vendedores → **Vendedores activos** → haz clic en un vendedor → campo **Anulación de la tasa de comisión** en la página de detalle del vendedor.

Introduce un porcentaje para aplicar una tasa de comisión fija a todas las reservas de ese vendedor (cualquier vehículo que no tenga su propia anulación). Déjalo vacío para recurrir al nivel de descuento por volumen del vendedor o a la tasa global.

Úsalo para contratos con vendedores negociados individualmente, sin necesidad de modificar cada vehículo que publiquen.

---

## 📉 4. Niveles de descuento por volumen

**Ubicación:** Gestión de vendedores → pestaña **Comisión** → sección **Niveles de descuento por volumen**.

Los vendedores sin anulación manual reciben automáticamente un descuento sobre la tasa global cuando sus **ingresos netos liquidados** de los últimos 30 días superan un umbral. Siempre hay exactamente **3 niveles**: los umbrales y los importes de descuento (en puntos porcentuales) se pueden editar, pero no se pueden añadir ni eliminar niveles.

| Nivel predeterminado | Umbral de ingresos a 30 días | Descuento |
|---|---|---|
| 1 | 30.000 | −6 puntos |
| 2 | 15.000 | −4 puntos |
| 3 | 5.000 | −2 puntos |

Ejemplo: con los valores predeterminados anteriores, un vendedor cuyos ingresos liquidados de los últimos 30 días son 18.000 recibe el descuento del nivel 2 (−4 puntos) sobre la tasa global.

---

## 🌐 5. Tasa global

**Ubicación:** Gestión de vendedores → pestaña **Comisión** → sección superior.

La tasa predeterminada de toda la plataforma. Es el único nivel que siempre tiene un valor: es la base a la que recurre cada reserva cuando no se aplica ninguna anulación por vehículo, anulación por vendedor ni descuento por nivel. Al cambiarla se crea una nueva versión de la política de tasas; las reservas existentes ya acreditadas conservan la tasa con la que se calcularon originalmente (consulta [Liquidaciones y libro contable](/docs/vendor/payouts-ledger) para ver cómo las instantáneas de tasas protegen las transacciones pasadas frente a cambios de tasa posteriores).

---

## 📐 6. Ejemplo práctico

Se registra una reserva de un vehículo cuyo vendedor no tiene anulación a nivel de vendedor, pero el propio vehículo tiene configurada una anulación de `4%`:

1. **Anulación por vehículo** → `4%` está presente → **se usa esta tasa**, no se comprueba ningún nivel inferior.

Si ese mismo vehículo no tuviera anulación, pero el vendedor tuviera una anulación de `10%`:

2. **Anulación por vehículo** → vacía → se pasa al siguiente nivel.
3. **Anulación por vendedor** → `10%` está presente → **se usa esta tasa**.

Si ni el vehículo ni el vendedor tuvieran anulación, y los ingresos liquidados de los últimos 30 días del vendedor fueran 20.000 (superando el nivel de 15.000):

4. **Anulación por vehículo** → vacía → se pasa al siguiente nivel.
5. **Anulación por vendedor** → vacía → se pasa al siguiente nivel.
6. **Nivel de descuento por volumen** → coincide con el nivel 2 → se usa la tasa global menos 4 puntos.

---

## Resumen de la sección
- La jerarquía siempre da como resultado un valor: un campo vacío significa «comprueba el siguiente nivel», nunca «0 %».
- Las anulaciones por **vehículo** y por **vendedor** son para acuerdos puntuales y negociados.
- Los **niveles** recompensan automáticamente a los vendedores con mucho volumen, sin trabajo manual por vendedor.
- La **tasa global** es el recurso permanente y el único nivel que nunca puede estar vacío.

## Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 18.11.2026 | Pro 6.5.0 | El crédito se asigna al vendedor propietario del vehículo reservado; los vehículos propios del sitio no generan comisión. |
| 07.07.2026 | Sin publicar | Versión inicial: documenta las pantallas de administración de anulación por vehículo, anulación por vendedor y nivel de descuento por volumen. |
