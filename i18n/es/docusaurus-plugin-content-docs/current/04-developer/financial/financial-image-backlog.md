---
id: financial-image-backlog
title: "Inventario pendiente de imágenes financieras (recursos)"
sidebar_label: "Imágenes financieras pendientes"
sidebar_position: 10
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto con Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página registra el estado actual de los diagramas, dibujos técnicos y recursos multimedia utilizados en la documentación financiera.
:::

# 🖼️ Inventario pendiente de imágenes financieras

El sistema de documentación utiliza ahora un enfoque híbrido con **diagramas Mermaid dinámicos** e iconos **SVG estáticos**. La siguiente lista muestra en qué recurso visual se apoya cada página técnica.

## 📊 Inventario de diagramas e imágenes

| Código | Ruta del archivo / Tipo | Estado | Página de referencia |
| :--- | :--- | :--- | :--- |
| **FIN-MERMAID-OVERVIEW** | `Mermaid Code` | ✅ Actualizado | Visión general financiera |
| **FIN-IMG-LEDGER-001** | `ledger-001.svg` | 🔄 Pendiente de revisión | Modelo de libro contable |
| **FIN-MERMAID-POLICY** | `Mermaid Code` | ✅ Actualizado | Comisión y políticas |
| **FIN-MERMAID-GOV** | `Mermaid Code` | ✅ Actualizado | Controles de gobernanza |
| **FIN-IMG-ANALYTICS-001** | `analytics-001.svg`| ✅ Actualizado | Métricas de analítica |
| **FIN-IMG-DB-001** | `db-001.svg` | ⚠️ Falta (V4.21) | Arquitectura de la base de datos |
| **FIN-MERMAID-SIG** | `Mermaid Code` | ✅ Actualizado | Criptografía de auditoría e integridad |

---

## 🛠️ Estándares visuales

1. **Uso de Mermaid:** para los flujos de arquitectura y los diagramas de secuencia siempre se debe preferir Mermaid. Así, los diagramas se pueden actualizar fácilmente cada vez que se actualiza la documentación.
2. **Formato SVG:** los archivos SVG de `/static/img/docs/financial/` se utilizan para esquemas fijos y relaciones entre tablas.
3. **Convención de nombres:** sigue estrictamente el formato `fin-fin-img-{category}-{index}.svg`.

---

## 📅 Próximas incorporaciones (TODO)

- [ ] **Mapa del recorrido de la liquidación:** diagrama de secuencia que muestra el recorrido de una solicitud de pago al proveedor desde el usuario final hasta el banco.
- [ ] **Visualizador de la cadena de hashes criptográficos:** ilustración técnica que muestra cómo se enlaza la cadena SHA-256.
- [ ] **Diagrama del flujo de impuestos:** diagrama de distribución de las partidas de impuestos (IVA, retenciones) a lo largo del libro contable.

## Resumen de la sección
- El inventario pendiente de imágenes es la lista de control central para los recursos dinámicos y estáticos.
- Todos los diagramas Mermaid nuevos deben registrarse en esta lista.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se añadió la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se modernizó el inventario de imágenes para reflejar la migración a Mermaid y la nueva estructura de recursos. |
| 26.02.2026 | 4.21.0-docs | Página normalizada según el estándar de plantilla única. |
