---
id: common-issues
title: "Problemas comunes y soluciones"
sidebar_label: "Problemas comunes"
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página recoge los problemas técnicos y operativos más habituales que pueden encontrar los usuarios y administradores de MHM Rentiva, junto con pasos rápidos para resolverlos.
:::

# 🛠️ Problemas comunes y soluciones

Los temas siguientes están organizados en torno a los escenarios que aparecen con más frecuencia en las solicitudes de soporte.

---

## 📅 1. Problemas de reservas y calendario

### ¿Se crea una reserva pero no aparece en el calendario?
- **Motivo:** Es posible que el estado de la reserva sea `pending`. El calendario solo muestra entradas con estado `confirmed` o `completed`.
- **Solución:** Comprueba el estado en la lista de reservas y confírmala.

### ¿Te aparece el error «Las fechas seleccionadas no están disponibles»?
- **Motivo:** Hay otra reserva confirmada en esas fechas o el vehículo está en modo «Mantenimiento».
- **Solución:** Revisa las restricciones personalizadas en `Vehicle Settings > Availability` o examina los conflictos de `Util::has_overlap()`.

---

## 💳 2. Pago e integración con WooCommerce

### ¿El pago se ha completado pero el estado de la reserva no ha cambiado?
- **Motivo:** La señal del webhook de WooCommerce o de IPN (Instant Payment Notification) no llega a Rentiva.
- **Solución:**
    1. Revisa los registros de errores en WooCommerce > Estado > Registros.
    2. Usa `Order > Actions > Re-send Payment Notification` para activarlo manualmente.
    3. Verifica las correspondencias de estados en la clase `WooCommerceBridge`.

### ¿Error «No hay métodos de pago disponibles» en la página de pago?
- **Motivo:** La moneda definida para el vehículo no coincide con la moneda aceptada por el método de pago.
- **Solución:** Revisa los ajustes de `CurrencyHelper` y las restricciones de los métodos de pago de WooCommerce.

---

## 👤 3. Problemas de vendedores

### ¿No puedes acceder al panel del vendedor (error 403)?
- **Motivo:** Al usuario no se le ha asignado el rol `rentiva_vendor` o la cuenta está en estado «Suspendido».
- **Solución:** Activa la cuenta desde el perfil del usuario y verifica el rol.

### ¿El saldo del vendedor aparece como 0?
- **Motivo:** La reserva aún no ha pasado al estado `completed` o la entrada del libro de cuentas (Ledger) aún no se ha `cleared`.
- **Solución:** Revisa la sección «Ciclo de ganancias» en la documentación de `Payouts & Ledger`.

---

## ⚡ 4. Problemas de rendimiento e interfaz

### ¿Los cambios no se reflejan en la parte pública?
- **Motivo:** Una caché de páginas agresiva (WP Rocket, LiteSpeed, etc.) o la caché del navegador.
- **Solución:**
    1. Realiza un «vaciado de caché» desde los ajustes de Rentiva.
    2. Prueba a usar el parámetro `cache="false"` en los shortcodes.

### ¿En un sitio con Polylang o WPML, los visitantes ven nombres en otro idioma?
- **Desde la 6.4.0:** el mensaje de disponibilidad de la página del vehículo y los nombres de combustible, transmisión y categoría de la barra lateral de búsqueda aparecen en el idioma de cada visitante. Las cachés compartidas de Rentiva no contienen texto; los nombres de categoría se leen de los términos de tu plugin de traducción.
- **Solución si un idioma sigue mostrando nombres incorrectos:** traduce las categorías de vehículos en tu plugin de traducción y vacía la caché de páginas.

### ¿Los servicios de mapa o ubicación no funcionan?
- **Motivo:** Clave de API de Google Maps no válida o HTTP referer restringido.
- **Solución:** Prueba la clave desde Rentiva > Ajustes > pestaña API.

---

## 📝 Lista de comprobación para la resolución de problemas
Si el problema persiste, sigue estos pasos:
1. Activa el modo `WP_DEBUG`.
2. Revisa los registros de `AdvancedLogger` (registros del sistema).
3. Desactiva temporalmente otros plugins para comprobar si hay conflictos entre plugins.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 18.11.2026 | 6.4.0 | Se ha añadido una nota sobre sitios multilingües (Polylang/WPML). |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido elementos detallados de resolución de problemas para reservas, pagos y vendedores. |
