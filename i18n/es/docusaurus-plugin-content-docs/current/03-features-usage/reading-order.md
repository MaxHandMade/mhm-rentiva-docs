---
id: features-usage-reading-order
title: "Hoja de ruta de funciones y uso"
sidebar_label: "Orden de lectura"
sidebar_position: 1
slug: /features-usage/reading-order
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 🚗 Hoja de ruta de funciones y uso

Para sacar el máximo partido a todo lo que ofrece MHM Rentiva, te recomendamos seguir el orden operativo que se indica a continuación.

:::tip GUÍA DE USO
Utiliza las tarjetas por categorías de abajo para gestionar tus operaciones diarias de alquiler, añadir vehículos y generar informes.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏎️ 1. Vehículos e inventario</h3>
      <p className="cardDescription">Añadir vehículos, gestión de categorías, precios y ajustes globales de vehículos.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/vehicles">Gestión de vehículos</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📅 2. Seguimiento de reservas</h3>
      <p className="cardDescription">Gestiona las solicitudes entrantes, supervisa el calendario y revisa los detalles de las reservas.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/bookings">Reservas</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">✨ 3. Servicios adicionales y VIP</h3>
      <p className="cardDescription">Servicios adicionales como sillas de bebé y seguros, además de la definición de rutas de transferencia VIP.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/additional-services-usage">Servicios adicionales</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💬 4. Clientes y comunicación</h3>
      <p className="cardDescription">Gestión del portal de clientes, programa de fidelización y sistema de mensajería interna.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/customers">Gestión de clientes</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--12 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #8b5cf6' }}>
      <h3 className="cardTitle">📊 5. Informes y análisis</h3>
      <p className="cardDescription">Gráficos de rendimiento del negocio, informes de ingresos y exportación de datos.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/reports">Informes y exportación</Link>
    </div>
  </div>
</div>

---

## 📈 Ciclo operativo

```mermaid
graph TD
    A[<b>1. Add Vehicle</b>] --> B[<b>2. Receive Booking</b>]
    B --> C[<b>3. Operations / Delivery</b>]
    C --> D[<b>4. Customer Relations</b>]
    D --> E[<b>5. Reporting & Analytics</b>]
    E --> A
    
    style A fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style B fill:#eff6ff,stroke:#2563eb,stroke-width:2px
    style C fill:#fff1f2,stroke:#e11d48,stroke-width:2px
    style D fill:#faf5ff,stroke:#9333ea,stroke-width:2px
    style E fill:#fffbeb,stroke:#d97706,stroke-width:2px
```

---

### Resumen de la sección
- Esta sección abarca los flujos de trabajo para el uso diario del plugin.
- El ciclo operativo está diseñado para un negocio de alquiler sostenible.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 21.03.2026 | 4.21.3 | Todos los enlaces de las tarjetas (Vehículos, Reservas, Servicios adicionales, etc.) se han corregido a rutas relativas. |
| 19.03.2026 | 4.21.2 | Se ha creado la hoja de ruta de funciones y uso con un diseño de tarjetas premium. |
