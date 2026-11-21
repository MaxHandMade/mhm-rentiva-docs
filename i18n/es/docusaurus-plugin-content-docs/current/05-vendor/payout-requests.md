---
id: payout-requests
title: "Solicitudes de pago"
sidebar_label: "Solicitudes de pago"
sidebar_position: 1
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

Cuando el ecosistema de vendedores está activo, el proceso de transferir a los vendedores los importes de alquiler que han ganado se gestiona desde el menú **MHM Rentiva > Todas las solicitudes de pago**.

---

## 📅 Flujo de solicitud de pago

Las ganancias del vendedor pasan al saldo una vez confirmado el pago del cliente. El proceso funciona así:
1. **Creación de la solicitud:** El vendedor crea una solicitud de pago desde su panel.
2. **Revisión del administrador:** El administrador ve las solicitudes pendientes en la lista.
3. **Aprobación y pago:** La transferencia física se realiza a través del banco o canal de pago designado.
4. **Actualización del estado:** Una vez completado el pago, la solicitud se marca como «Pagado».

---

## 🏧 Parámetros de cálculo de ganancias

El sistema tiene en cuenta los siguientes conceptos:
- **Importe total del alquiler:** El importe neto del alquiler del vehículo.
- **Comisión de la plataforma:** La parte que retiene el administrador.
- **Ingresos adicionales:** Ingresos extra procedentes de servicios como el seguro, la silla infantil, etc.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 Imagen próximamente: lista de solicitudes de pago</strong><br/>
  <em>Aquí aparecerá la pantalla de gestión de liquidaciones de MHM Rentiva.</em>
</div>

---

## 📄 Extractos de liquidación (v4.61.0)

Cuando apruebas una liquidación, el sistema genera automáticamente un **extracto de pago** (_hakediş makbuzu_) del periodo que cubre esa liquidación. El extracto tiene **numeración correlativa** (p. ej., `MKB-2026-0001`) y queda fijado como **registro inmutable** en el momento de la aprobación: nunca se reescribe después, por lo que siempre refleja las cifras tal como eran cuando se pagó al vendedor.

El extracto enumera todos los movimientos contables del periodo (ganancias y posibles penalizaciones), con los totales del periodo y el importe pagado. El vendedor recibe automáticamente un **correo electrónico** con un enlace para verlo e imprimirlo desde su panel.

### Dónde encontrarlo

- **Administrador:** el número de extracto y un enlace **Ver** aparecen en la lista **Todas las solicitudes de pago**, junto a la liquidación aprobada.
- **Vendedor:** el extracto aparece en el historial de liquidaciones del vendedor, y el correo electrónico enlaza directamente a él (se abre dentro de la propia sesión del vendedor en el panel).

### Desglose de la comisión

Cada línea de ganancias del extracto muestra el desglose completo, para que el vendedor vea exactamente cómo se ha calculado su importe neto:

| Columna | Significado |
| :--- | :--- |
| **Bruto** | El importe total de la reserva antes de la comisión. |
| **Comisión** | El porcentaje de la plataforma y el importe deducido (p. ej., `%20 · 400.00`). |
| **Neto** | Lo que el vendedor ha ganado realmente (Bruto − Comisión). |

Una fila **«Comisión total deducida»** del periodo suma la comisión de todas las ganancias del extracto. Las líneas de penalización y de reembolso muestran «—» en Bruto/Comisión (no llevan comisión). Los extractos emitidos **antes de la v4.61.0** no se registraron con este detalle y solo muestran el importe neto.

### Marca del extracto

El extracto lleva la identidad de tu empresa. En **Ajustes → Mercado de vendedores → Marca del extracto** puedes configurar:

- Nombre de la empresa, dirección, delegación de Hacienda y NIF, teléfono y correo electrónico
- Un **logotipo** de la empresa
- Una **nota al pie** personalizada (p. ej., un aviso legal)

La marca se aplica **al visualizar el extracto**, por lo que cualquier cambio en estos ajustes se refleja de inmediato en todos los extractos, incluidos los ya emitidos.

---

## 🛠️ Infraestructura técnica

Todos los registros de ganancias se almacenan de forma atómica en la tabla `mhmrentiva_vendor_transactions`. Cuando se cancela una reserva, se refleja como un cargo en la cuenta del vendedor. Los extractos se guardan como una instantánea inmutable en el registro de la liquidación aprobada y se generan bajo demanda.

---

### Resumen de la sección
- La **liquidación** es el sistema que gestiona las ganancias de los vendedores.
- El **seguimiento del saldo** se actualiza automáticamente tras cada reserva.
- Las **solicitudes** se completan con la aprobación del administrador.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 29.06.2026 | 4.61.0 | Se documentan los extractos de liquidación (numerados e imprimibles), el desglose de la comisión y la marca del extracto. |
| 23.04.2026 | 4.27.2 | Se añade la traducción al inglés. |
| 18.03.2026 | 4.21.2 | Se crea el documento. |
