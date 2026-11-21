---
id: overview
title: "API REST y sistema nervioso"
sidebar_label: "Resumen"
sidebar_position: 1
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 🧠 API REST y sistema nervioso

Te damos la bienvenida al sistema nervioso central que gobierna el flujo de datos entre todos los módulos de MHM Rentiva, las integraciones con sistemas externos y la comunicación de la interfaz moderna (Interactivity API).

:::tip GUÍA TÉCNICA
Usa las tarjetas de abajo para acceder a información técnica detallada sobre las capas asíncronas del sistema, los protocolos seguros y los planes futuros.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🌐 Endpoints v1 (actual)</h3>
      <p className="cardDescription">Endpoints REST activos actualmente. Referencias para alquileres, servicios de ubicación y auditorías de estado.</p>
      <Link className="button button--secondary button--block" to="/docs/api/v1/rest-api-v1">Referencia v1</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">🏗️ Planificación v2 (futuro)</h3>
      <p className="cardDescription">La transición del sistema a API-First. Soporte para aplicaciones móviles, diseño JWT y hoja de ruta de la arquitectura de API de nueva generación.</p>
      <Link className="button button--secondary button--block" to="/docs/api/rest-v2-planning">Plan v2</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🛡️ Seguridad y licencias</h3>
      <p className="cardDescription">Firma HMAC, gestión de claves de API y protocolos de comunicación con el servidor de licencias externo.</p>
      <Link className="button button--secondary button--block" to="/docs/api/license-server-protocols">Detalles de seguridad</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">🔍 Auditoría y arquitectura</h3>
      <p className="cardDescription">Auditoría de controladores, jerarquía del sistema nervioso e informes de optimización del rendimiento.</p>
      <Link className="button button--secondary button--block" to="/docs/api/api-nervous-system">Análisis de arquitectura</Link>
    </div>
  </div>
</div>

---

## 🔝 Temas técnicos populares
Los temas de la API que más necesitan los desarrolladores:

- 🛡️ [Métodos de autenticación de la API](./v1/auth-and-security)
- 🔑 [Uso del gestor de claves de API](./v1/api-key-manager)
- 🧾 [API de callback de pagos](./v1/financial-rest-callbacks)
- 🚦 [Códigos de error y limitación de peticiones](./v1/rate-limits-and-errors)

---

### Resumen de la sección
- Los documentos de esta sección están preparados para desarrolladores que quieren entender la infraestructura técnica del plugin.
- Todos los procesos de transición de `v1` y `v2` se presentan con una jerarquía estandarizada.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 21.03.2026 | 4.21.3 | Enlaces rotos (Referencia v1, Plan v2, etc.) corregidos como rutas relativas. |
| 19.03.2026 | 4.21.2 | Se ha creado una página de inicio con diseño de tarjetas premium para la categoría de API. |
