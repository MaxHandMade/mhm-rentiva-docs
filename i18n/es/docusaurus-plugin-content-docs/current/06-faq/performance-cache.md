---
id: performance-cache
title: "Gestión del rendimiento y la caché"
sidebar_label: "Rendimiento y caché"
sidebar_position: 40
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Explica la arquitectura de caché que utiliza Rentiva para funcionar de forma eficiente en sitios de alquiler de vehículos con mucho tráfico y cómo resolver los problemas de rendimiento más habituales.
:::

# ⚡ Gestión del rendimiento y la caché

El sistema ofrece optimización en tres capas principales: caché de objetos, transitorios y caché de página.

---

## 🛠️ 1. Capas de caché

### Transitorios de WordPress (nivel de base de datos)
- **Uso:** cálculos de precios, consultas complejas de listados de vehículos y analíticas de vendedores.
- **TTL (vida útil):** normalmente 15 minutos (`900 seconds`) para los datos críticos.
- **Importante:** si los transitorios se acumulan en la base de datos sin eliminarse, pueden ralentizar todo el sitio. Usa `mhmrentiva_flush_cache` para limpiarlos manualmente.

### Caché de objetos (nivel de memoria)
- **Uso:** si Redis o Memcached están activos, el sistema obtiene todos los datos de objetos desde la memoria.
- **Ventaja:** reduce el número de consultas SQL hasta en un 80 %.
- **Precaución:** si observas incoherencias en los datos, desactiva Redis temporalmente y vuelve a probar el problema.

---

## 🐢 2. Problemas de rendimiento habituales

### Resultados lentos en la búsqueda de vehículos
- **Motivo:** se busca en demasiadas claves meta de `WP_Query`.
- **Solución:** activa la función «Meta Optimizer» de Rentiva. Plantéate guardar los metadatos de uso frecuente (marca, modelo, año, etc.) en una tabla independiente o en una estructura de índices optimizada.

### Páginas de gestión del panel de administración lentas
- **Motivo:** se listan a la vez grandes volúmenes de datos de reservas (más de 10 000).
- **Solución:** reduce el número de elementos por página (por defecto: 20). Desactiva las columnas innecesarias desde el menú «Opciones de pantalla».

---

## 🕒 3. Problemas de datos obsoletos

### ¿He cambiado un ajuste pero no se refleja en la parte pública?
- **Posibles motivos:**
    1. **Caché de página:** la caché de página de plugins como WP Rocket o LiteSpeed está desactualizada.
    2. **Caché de fragmentos:** zonas como la tabla de precios o las preguntas frecuentes pueden tener cachés independientes.
- **Solución:** pulsa el botón de restablecer la caché en Rentiva > Acciones rápidas > Restablecer caché.

---

### Después de actualizar Rentiva (6.4.0)
Vacía la caché de página una vez después de la actualización (la caché de tu proveedor de alojamiento, LiteSpeed Cache, WP Rocket, etc.). Una página almacenada en caché con la versión 6.3.x conserva el marcado antiguo del formulario de reserva y del calendario, y los nuevos scripts no pueden ejecutarse en ella. La caché breve propia de Rentiva se actualiza sola. Lo mismo se aplica después de cambiar el color de acento de la parte pública en **Ajustes > Página pública y visualización > Colores**.

---

## 📈 4. Supervisión y medición

Supervisa lo siguiente para hacer un seguimiento del rendimiento de tu sitio:
- **TTFB (tiempo hasta el primer byte):** velocidad del servidor y tiempo de ejecución de PHP.
- **Número de consultas (consultas SQL):** usa el plugin «Query Monitor» para ver qué proporción del total representan las consultas de Rentiva.
- **Tareas cron:** comprueba si las actualizaciones financieras o las tareas de limpieza se ejecutan según lo programado.

## Lista de comprobación
1. Comprueba el estado de Redis/Memcached.
2. Verifica las exclusiones de la caché de página (la página de pago debe estar excluida).
3. Optimiza las consultas meta innecesarias.
4. Realiza periódicamente una «Limpieza de la base de datos».

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 18.11.2026 | 6.4.0 | Nota sobre la caché de página tras las actualizaciones y los cambios de color. |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido los escenarios de caché de objetos, transitorios y datos obsoletos. |
