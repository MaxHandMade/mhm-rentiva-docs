---
id: vendor-overview
title: "Economía y gestión de vendedores"
sidebar_label: "Resumen"
sidebar_position: 1
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto con Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

# 🤝 Economía y gestión de vendedores

El centro de documentación que abarca el ciclo de vida, las operaciones financieras y las reglas del marketplace para los vendedores que alquilan vehículos a través del portal de MHM Rentiva.

:::tip GESTIÓN DE VENDEDORES
Usa las tarjetas de abajo para encontrar información detallada sobre la incorporación de vendedores, los procesos de pago al proveedor y los estándares de seguridad.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🚀 Incorporación de vendedores</h3>
      <p className="cardDescription">Registro de nuevos vendedores, aprobación de perfiles y una guía para subir vehículos al sistema.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/onboarding">Guía de incorporación</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">💳 Pagos al proveedor y libro mayor</h3>
      <p className="cardDescription">Registros del libro mayor financiero, solicitudes de pago al proveedor y gestión de los periodos de pago.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/payouts-ledger">Detalles financieros</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">📊 Analítica y rendimiento</h3>
      <p className="cardDescription">Estadísticas de ingresos por vendedor, tasas de ocupación de los vehículos y datos de rendimiento.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/analytics">Estadísticas de vendedores</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">🛡️ Seguridad y privacidad</h3>
      <p className="cardDescription">Protección de datos personales, acuerdos con vendedores y protocolos de transacciones seguras.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/security-privacy">Guía de seguridad</Link>
    </div>
  </div>
</div>

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #7c3aed' }}>
      <h3 className="cardTitle">💰 Sistema de anuncios de pago</h3>
      <p className="cardDescription">Tarifa de publicación basada en WooCommerce: pasarela de pago para nuevos vehículos, renovaciones y republicaciones.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/vendor-management#-paid-listing-system-v4241">Detalles de la tarifa de publicación</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #059669' }}>
      <h3 className="cardTitle">🔄 Ciclo de vida del vehículo</h3>
      <p className="cardDescription">Periodo de publicación de 90 días, pausa, renovación, retirada y puntuación de fiabilidad.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/vendor-management#-vehicle-lifecycle-management-v4240">Detalles del ciclo de vida</Link>
    </div>
  </div>
</div>

## 🔝 Referencias rápidas
- 💰 [¿Cómo crear una solicitud de pago al proveedor?](/docs/vendor/payout-requests)
- 🏢 [Guía de uso del panel del vendedor](/docs/vendor/vendor-management)
- 💳 [Sistema de anuncios de pago](/docs/vendor/vendor-management#-paid-listing-system-v4241)

---

### Resumen de la sección
- Esta sección define el puente comercial y técnico entre el administrador y el vendedor.
- Todas las transacciones financieras se auditan criptográficamente mediante el modelo **MHM Ledger**.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 01.04.2026 | 4.24.1 | Se han añadido las tarjetas Sistema de anuncios de pago y Ciclo de vida del vehículo. Referencias rápidas actualizadas. |
| 28.03.2026 | 4.23.1 | Insignia de versión actualizada; referencias al rediseño del formulario de vendedor y a la migración a SelectWoo de la v4.23.1. |
| 26.03.2026 | 4.23.0 | Insignia de versión actualizada; referencias a la arquitectura de ubicaciones de transferencia de la v4.23.0. |
| 19.03.2026 | 4.21.2 | Se ha creado la página de resumen con diseño de tarjetas premium para la categoría de vendedores. |
