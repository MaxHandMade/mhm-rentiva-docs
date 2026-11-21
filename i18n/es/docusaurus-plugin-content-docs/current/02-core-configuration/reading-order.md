---
id: core-configuration-reading-order
title: "Hoja de ruta de la configuración principal"
sidebar_label: "Orden de lectura"
sidebar_position: 1
slug: /core-configuration/reading-order
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# ⚙️ Hoja de ruta de la configuración principal

Tras instalar el plugin, los ajustes deben configurarse siguiendo un orden lógico para que los procesos operativos funcionen sin problemas. Esta sección recoge los pasos de configuración principales que constituyen el «corazón» del sistema.

:::tip GUÍA DE CONFIGURACIÓN
Sigue las tarjetas por categorías que aparecen a continuación para configurar el sistema por completo. Cada tarjeta ofrece acceso rápido al grupo de ajustes correspondiente.
:::

---

<div className="row">
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏢 1. Ajustes generales</h3>
      <p className="cardDescription">Define la información de la empresa, la moneda y los modos de funcionamiento principales.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/settings">Ajustes generales</Link>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📅 2. Reserva</h3>
      <p className="cardDescription">Duraciones del alquiler, porcentajes de anticipo y comportamiento de las reservas.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/booking-settings">Reserva</Link>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">💳 3. Pagos</h3>
      <p className="cardDescription">Configura las pasarelas de pago de WooCommerce y las reglas de cobro.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/payments">Ajustes de pago</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">📧 4. Notificaciones</h3>
      <p className="cardDescription">Plantillas de correo electrónico, ajustes SMTP y notificaciones automáticas.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/emails">Ajustes de correo electrónico</Link>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #6366f1' }}>
      <h3 className="cardTitle">🏎️ 5. Campos del vehículo</h3>
      <p className="cardDescription">Datos técnicos (tipo de combustible, transmisión, etc.) y definiciones de características del vehículo.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/vehicle-settings">Ajustes de vehículos</Link>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #ec4899' }}>
      <h3 className="cardTitle">🔑 6. Licencia</h3>
      <p className="cardDescription">Activa tu clave para desbloquear las funciones Pro.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/license">Gestión de licencias</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #8b5cf6' }}>
      <h3 className="cardTitle">⚡ 7. Sistema y rendimiento</h3>
      <p className="cardDescription">Caché, reglas de seguridad y comprobaciones del estado del sistema.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/system-performance">Sistema y velocidad</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #10b981' }}>
      <h3 className="cardTitle">🛠️ 8. Mantenimiento y herramientas</h3>
      <p className="cardDescription">Limpieza de la base de datos, supervisión de cron y herramientas de diagnóstico.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/maintenance">Página de mantenimiento</Link>
    </div>
  </div>
</div>

---

## 📈 Diagrama del flujo de configuración

```mermaid
graph TD
    Start((START)) --> GS[1. General Settings]
    GS --> BS[2. Booking Management]
    BS --> PS[3. Payment Settings]
    PS --> ES[4. Email Gateways]
    ES --> AS[5. Vehicle Fields]
    AS --> LZ[6. License Activation]
    LZ --> SP[7. System & Security]
    SP --> UT[8. Maintenance & Diagnostics]
    UT --> End((COMPLETE))
```

---

### Resumen de la sección
- Configurar los ajustes en el orden correcto evita conflictos en el sistema.
- Se recomienda validar el sistema al final con las herramientas de **Mantenimiento y diagnóstico**.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se ha creado la hoja de ruta de la configuración principal con diseño de tarjetas premium. |
