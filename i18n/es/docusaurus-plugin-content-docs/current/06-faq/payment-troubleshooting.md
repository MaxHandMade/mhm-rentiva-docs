---
id: payment-troubleshooting
title: "Solución de problemas de pagos y finanzas"
sidebar_label: "Problemas de pago"
sidebar_position: 30
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Objetivo
Una guía técnica para diagnosticar y resolver discrepancias entre los procesos de pago (WooCommerce, iyzico, Stripe, etc.) y el Ledger financiero.
:::

# 💳 Solución de problemas de pagos y finanzas

Los errores de pago suelen deberse a las conexiones de la API, a las correspondencias de estados o a bloqueos de la base de datos.

---

## 🛑 1. Códigos de error habituales y soluciones

### HTTP 400 / 401 (Bad Request / Unauthorized)
- **Motivo:** Las claves de la API (clave pública/privada) se han introducido incorrectamente o el modo de prueba/real no coincide.
- **Solución:** Comprueba las claves y el «Modo de funcionamiento» en la pestaña Rentiva > Ajustes de pago.

### HTTP 403 (Acceso denegado)
- **Motivo:** Es posible que el cortafuegos del servidor (WAF/Cloudflare) esté bloqueando las direcciones IP del proveedor de pagos.
- **Solución:** Añade a la lista blanca los rangos de IP del proveedor de pagos (p. ej., iyzico, Stripe).

### HTTP 500 (Error del servidor)
- **Motivo:** Un error de PHP o un conflicto de la base de datos durante el proceso de callback.
- **Solución:** Revisa el archivo `wp-content/debug.log` y depura los errores del método `WooCommerceBridge::handle_webhook()`.

---

## 🔄 2. Problemas de correspondencia de estados

### ¿Pago «Completado» pero la reserva sigue «Pendiente»?
- **Comprobación:** Asegúrate de que el estado del pedido de WooCommerce sea `processing` o `completed`.
- **Detalle técnico:** Rentiva escucha los hooks de estado de WooCommerce (`woocommerce_order_status_changed`). Si no se produce la activación automática, puede haber un conflicto con algún plugin.
- **Solución:** Actualiza el pedido manualmente y comprueba si el estado de Rentiva se sincroniza.

---

## 📖 3. Incoherencias en el Ledger

### Intentos de doble gasto
- **Situación:** Una solicitud de liquidación aparece como aprobada, pero el saldo no se ha reducido.
- **Motivo:** `AtomicPayoutService` puede haberse quedado bloqueado por un bloqueo de transacción.
- **Solución:** Verifica mediante SQL si existe un registro en la tabla `mhmrentiva_ledger` con el `UUID` correspondiente.

### ¿No se ha creado el abono de la comisión?
- **Motivo:** El motor de comisiones (`CommissionEngine`) solo procesa las reservas con estado `completed` (viaje finalizado).
- **Solución:** Confirma que la reserva ha finalizado realmente y que su estado es `completed`.

---

## 🛠️ 4. Prueba de conexión de la API (idempotencia)

En todas las llamadas a la API se utiliza una clave `idempotency`:
- **Diagnóstico:** Se impide que la misma solicitud de pago se envíe varias veces.
- **Solución:** Si recibes un error de callback, busca el valor `transaction_id` del proveedor de pagos en `AdvancedLogger` y comprueba si hay una entrada duplicada.

## 🙋 5. Carrito, página de pago e invitados: preguntas frecuentes

### ¿Por qué mi carrito o mi página de pago tienen un aspecto «clásico» cuando uso el bloque Carrito/Finalizar compra?
Mientras haya un alquiler en el carrito, Rentiva muestra el carrito clásico de WooCommerce y la página de pago clásica, para que aparezcan los pasos de la reserva, el anticipo y el importe restante. Un carrito que solo contiene productos de la tienda mantiene el bloque Carrito. Para mantener el bloque Carrito, desactiva **Página de carrito clásica** en MHM Rentiva > Ajustes > pestaña Pago; consulta [Ajustes de pago](../02-core-configuration/payments.md).

### ¿Por qué no aparece «Contra reembolso» para un alquiler?
Nunca se ofrece para una reserva: un anticipo pagado en la puerta no es un anticipo, y el importe restante se paga de todos modos en la recogida. Los pedidos que solo contienen productos de la tienda lo mantienen. Si el contra reembolso es tu único método habilitado, habilita la tarjeta o la transferencia bancaria en WooCommerce > Ajustes > Pagos. Si aun así se elige (por ejemplo, en el bloque Finalizar compra con el ajuste de carrito clásico desactivado), aparece en la lista pero se rechaza al elegirlo, con el mensaje «El contra reembolso no está disponible para una reserva. Elige otro método de pago.»

### ¿Por qué hay dos líneas para el mismo vehículo en el carrito, o por qué ha cambiado una línea?
Si se elige de nuevo el mismo vehículo para fechas que se solapan (por ejemplo, tras pulsar el botón Atrás del navegador), se sustituye la línea anterior y se informa al cliente de que «Tu carrito ya contenía ... Ahora contiene tu última elección». El importe no se duplica. Un vehículo distinto o fechas consecutivas siguen siendo líneas separadas. Si un carrito sigue conteniendo el mismo vehículo dos veces para fechas que se solapan, la página de pago indica «Tu carrito contiene ... más de una vez para fechas que se solapan. Elimina la línea sobrante para continuar.» y el cliente elimina la línea sobrante.

### Un cliente dice que el vehículo dejó de estar disponible al pagar.
Otro cliente reservó esas fechas antes. El cliente ve un único mensaje que indica que el vehículo ya no está disponible para esas fechas y, en la página del carrito, la línea se elimina con ese motivo. Puede elegir otras fechas u otro vehículo.

### Hay un botón que dice «Entendido, no volver a mostrar». ¿Qué hace?
Oculta el aviso sobre las páginas de carrito o de pago basadas en bloques solo para ti; los demás administradores lo siguen viendo. El aviso solo aparece en las pantallas de Rentiva y en la página Plugins.

### El cliente es un invitado. ¿Cómo ve su reserva?
En la página de pago, un invitado ve la casilla **¿Crear una cuenta?** de WooCommerce mientras haya un alquiler en el carrito. Si crea una cuenta, la reserva aparece en **Mi cuenta**. Sin cuenta no tiene página de Mi cuenta; la página de agradecimiento y los correos electrónicos contienen los detalles de la reserva.

## Lista de comprobación
1. Validez de las claves de la API (prueba frente a real).
2. Bloqueos del cortafuegos (WAF).
3. Corrección de la URL de webhook/callback.
4. Sincronización de estados de WooCommerce.
5. Hay un método de pago distinto del contra reembolso habilitado para los alquileres.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 18.11.2026 | 6.4.0 | Añadidas preguntas sobre el carrito, la página de pago y los invitados. |
| 23.04.2026 | 4.27.2 | Añadida la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Añadidos detalles sobre códigos de error de la API, correspondencia de estados y coherencia del Ledger. |
