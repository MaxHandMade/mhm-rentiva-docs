---
id: reports
title: "Informes"
sidebar_position: 11
slug: /features-usage/reports
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite vs Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info SPA de React (desde la v4.37.x)
La página de informes se migró a una **SPA de React con Chart.js** en la v4.37.x (Faz 1b). Todo el renderizado de gráficos y la obtención de datos se realizan en el lado del cliente mediante la API REST. Se eliminaron 9 archivos de informes heredados en PHP/JS. El filtro de fechas y los 5 componentes de pestañas son componentes de React.
:::

Los informes son el centro de análisis avanzado que convierte todos los datos operativos de MHM Rentiva en resultados financieros y estadísticos. Supervisa las tendencias de crecimiento y la eficiencia de tu negocio en **MHM Rentiva > Informes**.

:::caution Diferencia entre Lite y Pro
La pantalla **Informes** viene con Rentiva Pro y se abre cuando tu licencia incluye la función de informes avanzados (condición: `Edition::canUseAdvancedReports()`). Lite no tiene pantalla de informes; el escritorio de Lite tiene sus propias tarjetas de estadísticas, su gráfico de ingresos y sus próximas operaciones.
:::

---

## Métricas globales de rendimiento (widget de estadísticas)

En la parte superior de la página se muestran, en una **cuadrícula de 2x2** enriquecida con iconos y colores, cuatro indicadores principales de rendimiento que se actualizan según el rango de fechas seleccionado:

- **Total de reservas:** Todas las transacciones dentro del rango definido.
- **Ingresos de este mes:** Facturación total del mes en curso (con el símbolo de moneda).
- **Reservas activas:** Número de vehículos actualmente en uso (en poder del cliente).
- **Tasa de ocupación (%):** El porcentaje de utilización de la capacidad de tu flota.

:::info Nota técnica
El widget de estadísticas se almacena en caché con el prefijo de clave de caché `mhmrentiva_dashboard_stats`. Todos los cálculos de fechas usan la zona horaria de WordPress (`wp_date`).
:::

---

## Pestañas de informes y detalles

MHM Rentiva te permite procesar los datos desde 5 perspectivas diferentes:

### 1. Resumen
Un resumen tipo "instantánea" de todos los informes. Presenta análisis de ingresos, reservas, clientes y vehículos en gráficos comparativos en una sola pantalla.

### 2. Informe de ingresos — Solo Pro
Detalla tu salud financiera.
- **Análisis de ingresos:** Media de ingresos diarios y ganancias totales.
- **Tendencia de ingresos:** Gráficos de barras que muestran qué días de la semana (lun-dom) son más rentables. El formato de fecha se localiza mediante `date_i18n(get_option('date_format'))`.
- **Conjunto de datos de cancelaciones:** Las reservas canceladas se reflejan en el gráfico como un conjunto de datos independiente con una línea discontinua roja.
- **Detalles diarios:** Una lista transparente de ingresos fecha por fecha.

### 3. Distribución de reservas
Analiza la distribución por estado de las reservas y las tasas de cancelación.
- **Tasa de cancelación (%):** El porcentaje de reservas canceladas sobre el total de reservas.
- **Distribución por estado:** Un desglose de las reservas confirmadas, pendientes, completadas y canceladas por número y porcentaje.

### 4. Informe de vehículos (rendimiento de vehículos)
Mide qué vehículos o categorías generan más ingresos.
- **Vehículos más populares:** Modelos con mayor número de alquileres.
- **Número de alquileres frente a ingresos totales:** Ingresos totales generados por cada vehículo.

### 5. Informe de clientes (análisis de clientes)
Hace un seguimiento de la fidelidad de los clientes y de sus hábitos de gasto.
- **Resumen de clientes:** Total de clientes, clientes recurrentes e importe medio de gasto.
- **Ciclo de vida (LTV):** Visualiza en un gráfico la proporción de clientes nuevos frente a los recurrentes.

---

## Filtrado y exportación de datos

- **Rango de fechas personalizado:** Selecciona las fechas de inicio y fin para realizar análisis históricos o de previsión.
- **Actualización dinámica:** El calendario y los gráficos se recalculan al instante en cuanto se aplica un filtro.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>IMAGEN: PANELES DE INFORMES Y ANÁLISIS</strong><br/>
  <em>mhm-rentiva-reports-all-tabs</em>
</div>

---

### Resumen de la sección
- Obtén una radiografía de tu negocio con el **Resumen**.
- Identifica los segmentos más rentables con los **informes de ingresos/vehículos**.
- Desarrolla estrategias de fidelización con los **informes de clientes**.

## Componentes de React (v4.37.x+)

| Componente | Finalidad |
| :--- | :--- |
| `ReportsPage` | Raíz — estadísticas de cabecera + navegación por pestañas + filtro de rango de fechas |
| `BookingsTab` | Gráfico de distribución de reservas + tabla de estados |
| `RevenueTab` | Gráfico de barras de ingresos (Chart.js) + lista de detalle diario |
| `VehiclesTab` | KPI de rendimiento de vehículos + tabla de vehículos principales |
| `CustomersTab` | Gráfico del ciclo de vida de clientes + métricas de resumen |

**Filtro de fechas:** Se apila verticalmente en móviles (≤782px) — clase `.mhm-reports__date-filter`.

**Espacio de nombres REST:** `GET /wp-json/mhm-rentiva/v1/reports/*`

---

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 09.11.2026 | 6.3.1 | Corrección: la nota sobre Lite / Pro ahora indica lo correcto: la pantalla de informes es un módulo Pro; el gráfico de ingresos y las próximas operaciones del escritorio están en Lite. |
| 12.05.2026 | 4.49.0 | Corrección del apilado vertical del filtro de fechas en móviles (punto de ruptura de 782px). |
| 11.05.2026 | 4.48.0 | Diseño de 2 columnas de la cuadrícula de estadísticas en móviles. |
| 06.05.2026 | 4.37.x | Migración completa a SPA de React con Chart.js. Se eliminaron 9 archivos heredados en PHP/JS. ReportsRestController + 5 componentes de pestañas. |
| 23.04.2026 | 4.27.2 | Documentación sincronizada con la versión actual del plugin. |
| 27.03.2026 | 4.23.0 | Se documentaron la restricción Lite/Pro (gráfico de ingresos + próximas operaciones), el diseño en cuadrícula de 2x2 del widget de estadísticas, las correcciones de zona horaria (`wp_date`), el conjunto de datos de cancelaciones y la corrección del prefijo de clave de caché. |
| 19.03.2026 | 4.21.2 | Página de informes actualizada conforme a la interfaz real con 5 pestañas y todos los detalles de los gráficos. |
| 26.02.2026 | 4.21.0 | Versión inicial creada. |
