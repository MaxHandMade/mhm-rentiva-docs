---
id: transfer-settings
title: "Ajustes de transferencia (configuración global)"
sidebar_label: "Ajustes de transferencia"
sidebar_position: 8
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página describe la clase `TransferSettings`, que define el comportamiento global del módulo de transferencias (reglas de pago, porcentajes de anticipo y tipos de ubicación personalizados).
:::

# ⚙️ Ajustes de transferencia

`TransferSettings` es la clase central que define las reglas financieras y estructurales de las operaciones de transferencia. Está totalmente integrada con la arquitectura moderna de `SettingsHelper` y `SettingsCore` de Rentiva.

---

## 🏗️ Grupos de ajustes y campos

La clase gestiona los siguientes ajustes en el panel de administración con el ID `mhmrentiva_transfer_section`:

### 1. Comportamiento del pago (tipo de pago)
Determina el modelo de pago que utiliza el cliente al hacer una reserva de transferencia:
- **Pago completo obligatorio:** se cobra el importe total en el momento de la reserva.
- **Anticipo (porcentaje):** solo se cobra un porcentaje especificado (anticipo).

### 2. Porcentaje de anticipo
El porcentaje que se aplica cuando el modelo de pago está configurado como «Porcentaje».
- **Predeterminado:** 20 %
- **Rango:** 0 % – 100 % (validación `number_field` con seguridad de tipos).

### 3. Tipos de ubicación personalizados
Tipos introducidos manualmente para cubrir necesidades operativas, además de los tipos de ubicación predeterminados (aeropuerto, hotel, etc.).
- **Formato:** se introducen mediante un `textarea_field`, una categoría por línea.
- **Ejemplo:** `Stadium`, `Exhibition Center`, `Yacht Marina`.

---

## 🛠️ Integración técnica

### Registro
Los campos de ajustes se registran con seguridad de tipos mediante `SettingsHelper`:

```php
SettingsHelper::select_field(
    $page_slug,
    'mhmrentiva_transfer_deposit_type',
    __( 'Payment Type', 'mhm-rentiva' ),
    $options,
    $description,
    self::SECTION_TRANSFER
);
```

### Métodos de acceso
Hay métodos estáticos disponibles para acceder de forma segura a estos ajustes desde otras partes del código:
- `TransferSettings::get_deposit_type()`
- `TransferSettings::get_deposit_rate()`

---

## 🛡️ Reglas de validación

- **Saneamiento:** los valores de texto se filtran mediante `sanitize_text_field`; los valores de área de texto, mediante `sanitize_textarea_field`.
- **Validación:** los campos numéricos se convierten a enteros mediante `absint` y no pueden superar los valores mínimo/máximo especificados.

## Resumen de la sección
- Todas las reglas globales del módulo de transferencias las gestiona esta clase.
- Los ajustes se presentan como una sección integrada en la página de ajustes generales de Rentiva.
- `TransferBookingHandler` hace referencia directa a las reglas de pago.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se añadió la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se actualizó la clase TransferSettings para reflejar los modelos de pago y los tipos de ubicación. |
