---
id: developer-reading-order
title: "Hoja de ruta de la guía para desarrolladores"
sidebar_label: "Orden de lectura"
sidebar_position: 1
slug: /developer/reading-order
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 💻 Hoja de ruta de la guía para desarrolladores

Para comprender la arquitectura técnica de MHM Rentiva y desarrollar sobre el plugin, te recomendamos seguir el orden de lectura que aparece a continuación.

:::tip INICIO TÉCNICO
Se ha diseñado una ruta de aprendizaje jerárquica que parte de la estructura principal del plugin y se extiende hasta el motor financiero y las capas de API.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">⚙️ 1. Núcleo y arquitectura</h3>
      <p className="cardDescription">Componentes principales como la estructura de módulos, la arquitectura de transferencias y el Layout Pipeline.</p>
      <Link className="button button--secondary button--block" to="/docs/developer/core/framework-architecture">Estructura principal</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">🌐 2. API y comunicación</h3>
      <p className="cardDescription">Endpoints REST v1/v2, seguridad de webhooks y jerarquía de servicios.</p>
      <Link className="button button--secondary button--block" to="/docs/api/overview">Guía de la API</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">💰 3. Motor financiero</h3>
      <p className="cardDescription">Modelo de libro mayor, políticas de comisión, gestión de pagos a proveedores e integridad criptográfica de la auditoría.</p>
      <Link className="button button--secondary button--block" to="/docs/developer/financial/governance-controls">Arquitectura financiera</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">🧪 4. Pruebas y operaciones</h3>
      <p className="cardDescription">Estrategias de pruebas unitarias, simulaciones de webhooks y listas de comprobación para la puesta en producción.</p>
      <Link className="button button--secondary button--block" to="/docs/api/controller-audit">Guía de pruebas</Link>
    </div>
  </div>
</div>

---

## 🔝 Referencias técnicas clave
Otros documentos que los desarrolladores consultan con frecuencia:

- 📑 [Tipos de contenido personalizados](/docs/developer/post-types)
- 🎨 [Componentes de la interfaz y escritorio](/docs/developer/ui-components/dashboard-widgets)
- 🔒 [Estándares de seguridad y privacidad](/docs/vendor/security-privacy)

---

### Resumen de la sección
- La documentación técnica está ordenada según la cadena de dependencias.
- En la primera fase se recomiendan las secciones **Núcleo + API**; en la segunda fase, **Finanzas + Pruebas**.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 21.03.2026 | 4.21.3 | Se han actualizado los enlaces rotos (Arquitectura financiera, Guía de pruebas) a las rutas correctas. |
| 19.03.2026 | 4.21.2 | Se ha creado la hoja de ruta de la guía para desarrolladores con un diseño de tarjetas premium. |
