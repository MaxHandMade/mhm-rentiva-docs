---
id: payment-settings
title: "Arquitectura de la clase PaymentSettings (interfaz e integración)"
sidebar_label: "Ajustes de pago (técnico)"
sidebar_position: 5
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página explica la arquitectura de los ajustes de pago de Rentiva y cómo la clase `PaymentSettings` hace de puente con **WooCommerce** para gestionar las pasarelas de pago, en lugar de gestionarlas directamente.
:::

# 💳 Clase PaymentSettings

Rentiva sigue el principio de «No reinventar la rueda» en cuanto a seguridad y flexibilidad de pagos, delegando todo el procesamiento de pagos en la capa de **WooCommerce**. `PaymentSettings` es un centro de control que gestiona el estado de esta integración.

---

## 🏗️ Estrategia arquitectónica: delegación

El núcleo de Rentiva no procesa directamente datos de tarjetas de crédito ni bancarios. En su lugar:
1.  **Frontend:** cuando se completa el formulario de reserva, se crea un pedido de WooCommerce.
2.  **PaymentSettings:** esta clase comprueba si WooCommerce está activo y dirige al administrador a la ubicación correcta en los ajustes de WC.
3.  **Cumplimiento legal:** los datos de pago se almacenan según los estándares de WC; Rentiva solo hace referencia al ID de la transacción.

---

## 🛡️ Supervisión del estado de la integración

El método `render_payment_section_description()` verifica en tiempo real si el sistema puede aceptar pagos:

```php
// Is WooCommerce loaded?
if ( class_exists( 'WooCommerce' ) ) {
    // Quick link to WC Settings and Status Active badge
} else {
    // Critical warning prompting the admin to install WC
}
```

---

## 🔗 Registro y API de ajustes

`PaymentSettings` se registra como una sección en la página central de ajustes de Rentiva (`SettingsCore::PAGE`).

-   **ID de sección:** `mhmrentiva_general_payment_section`
-   **Hook:** `admin_init` (a través del `SettingsManager` central).

---

## 📋 Clases relacionadas

Los ajustes de pago no se limitan únicamente a esta clase; los ajustes operativos se distribuyen entre las siguientes clases:

| Clase | Responsabilidad |
| :--- | :--- |
| `WooCommerceBridge` | Asignaciones de productos y pedidos. |
| `EmailSettings` | Configuración de los correos electrónicos de confirmación posteriores al pago. |
| `MaintenanceSettings` | Limitación de frecuencia y reglas de seguridad en las páginas de pago. |

## Resumen de la sección
- Rentiva no gestiona pasarelas de pago; utiliza **WooCommerce** como motor.
- `PaymentSettings` muestra visualmente los ajustes y el estado de conexión de este puente.
- Los ajustes específicos de cada pasarela (iyzico, Stripe, etc.) se configuran siempre a través de WC.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Página reescrita desde cero para reflejar la estrategia de delegación en WooCommerce. |
