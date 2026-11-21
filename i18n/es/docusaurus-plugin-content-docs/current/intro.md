---
slug: /
sidebar_position: 0
title: "Bienvenida"
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# Documentación de MHM Rentiva

Te damos la bienvenida al centro de documentación oficial de **MHM Rentiva**, el plugin de WordPress que lleva tus operaciones de alquiler de vehículos a un nivel profesional. Este centro ofrece una guía completa tanto para propietarios de sitios como para desarrolladores.

:::tip Acceso rápido
¿Buscas una función concreta? Usa las categorías principales de abajo para ir directamente a la información que necesitas.
:::

## Ediciones: Lite frente a Pro

**MHM Rentiva (Lite)** es la edición gratuita publicada en WordPress.org. Cubre todo el núcleo del alquiler (gestión de la flota, disponibilidad, reservas, clientes, pago con WooCommerce, notificaciones por correo electrónico, las páginas de la cuenta del cliente y todos los shortcodes, bloques y widgets de Elementor) **sin límites de vehículos, reservas ni anuncios, sin funciones temporales y sin pantallas bloqueadas**.

**MHM Rentiva Pro** es un *complemento de pago independiente* que se instala junto a Lite. No sustituye a Lite; añade sobre ella la capa de marketplace, transferencias y cumplimiento normativo:

| Función exclusiva de Pro | Qué incluye |
| --- | --- |
| **Marketplace multivendedor** | Alta y aprobación de vendedores, panel del vendedor, anuncios de vendedores |
| **Pagos a proveedores, comisión y libro contable** | Acumulación de comisiones, compensación, aprobación de pagos al proveedor, libro contable |
| **Informes y disputas de vendedores** | Informes del vendedor al administrador y el flujo de apelación |
| **Transferencias VIP + rutas basadas en ubicaciones** | Búsqueda/resultados de transferencias, gestión de rutas, rutas populares |
| **Mensajería con clientes** | Conversaciones entre administrador ↔ cliente |
| **Informes avanzados** | Informes ampliados más allá del escritorio de Lite |
| **Pantalla de exportación dedicada** | La página de administración de exportación independiente |
| **Herramientas de RGPD / conservación de datos** | Exportación/borrado de datos, consentimiento, cron de conservación |

:::info Cómo distinguir cuál es cuál
Cada página de la documentación que describe una función de Pro lleva una insignia **![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square)** en la parte superior. Las páginas sin ella documentan funciones de Lite que funcionan en la edición gratuita.

Las funciones de Pro dependen de una **licencia válida**, no simplemente están ocultas: con Pro instalado pero sin licencia, esas pantallas permanecen desactivadas. Pro está disponible en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🚀 Primeros pasos</h3>
      <p className="cardDescription">Pon el sistema en marcha en minutos. Una hoja de ruta paso a paso para los requisitos, la activación y la configuración inicial.</p>
      <Link className="button button--secondary button--block" to="/docs/getting-started/reading-order">Empieza ahora</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">⚙️ Configuración principal</h3>
      <p className="cardDescription">Ajustes generales, pasarelas de pago de WooCommerce, configuración de impuestos y sistemas de notificación por correo electrónico.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/settings">Configura los ajustes</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🚗 Funciones y uso</h3>
      <p className="cardDescription">Aprovecha al máximo la gestión de vehículos, el seguimiento de reservas, el portal del cliente y los módulos de informes.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/reading-order">Guía del usuario</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💻 Guía para desarrolladores</h3>
      <p className="cardDescription">Referencias de la API REST, listas de hooks/filtros y esquema de la base de datos para quienes quieran personalizar el plugin.</p>
      <Link className="button button--secondary button--block" to="/docs/developer/reading-order">Detalles técnicos</Link>
    </div>
  </div>
</div>

---

## 🔝 Temas populares
¿Buscas una respuesta rápida? Consulta los temas más visitados:

- 💳 [Integración de pagos con WooCommerce](./core-configuration/payments)
- 📧 [Personalizar las plantillas de correo electrónico](./core-configuration/emails)
- 🏎️ [Añadir vehículos y calendario de disponibilidad](./features-usage/vehicles)
- 🧩 [Referencia de shortcodes](./features-usage/shortcodes/overview)
- ✅ [Lista de comprobación tras la instalación](./getting-started/post-install-checklist)
- ➕ [Gestión de servicios adicionales](./features-usage/additional-services-usage)
- 🛠️ [Guía de solución de problemas](./faq/common-issues)

---

## 🏗️ Recursos técnicos
Documentación técnica en profundidad para desarrolladores:

- 🧱 [Arquitectura de módulos](./developer/core/technical-architecture)
- 💰 [Gobernanza financiera](./developer/financial/governance-controls)
- 🧾 [Modelo de datos del libro contable](./developer/financial/financial-ledger-model)
- 🧪 [Auditoría de controladores](./developer/testing/test-suite)
- 🧠 [Arquitectura de la API REST](./api/overview)
- 🌐 [Referencia de la API REST v1](./api/v1/rest-api-v1)

---

## 🤝 Ecosistema de vendedores
- 🚀 [Alta de vendedores](./vendor/onboarding)
- 💳 [Sistema de pagos al proveedor y libro contable](./vendor/payouts-ledger)
- 📊 [Analíticas y rendimiento](./vendor/analytics)
- 🛡️ [Seguridad y privacidad](./vendor/security-privacy)

---

## 🌐 Soporte y comunidad
- **Informar de un problema:** [GitHub Issues](https://github.com/MaxHandMade/mhm-rentiva/issues)
- **Foro de la comunidad:** [Soporte de WordPress](https://wordpress.org/support/plugin/mhm-rentiva)
- **Blog para desarrolladores:** [Blog](/blog)

---

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Corrección urgente de la contaminación de pruebas en Ajustes + eliminación del aviso duplicado de complementos. |
| 23.04.2026 | 4.27.1 | Corrección urgente de la fuga de idioma en i18n. |
| 23.04.2026 | 4.27.0 | Preparación para el envío a WordPress.org. |
| 21.03.2026 | 4.21.5 | Todos los ID de rutas y asignaciones de categorías verificados al 100 %. |
