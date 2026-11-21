---
id: test-suite
title: "Suite de pruebas e infraestructura"
sidebar_label: "Herramientas de pruebas"
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página explica a los desarrolladores el ecosistema de pruebas de Rentiva: la configuración de PHPUnit, la matriz de CI, los wrappers de Docker y la estructura personalizada del Listener.
:::

# Arquitectura de la suite de pruebas

Rentiva utiliza una infraestructura de **PHPUnit 9.6** personalizada para WordPress. Esta infraestructura se refuerza con herramientas propias que garantizan tanto la velocidad de las pruebas como la calidad de la limpieza de la base de datos.

---

## Línea base actual de pruebas

| Versión | Pruebas | Aserciones | Omitidas | Fecha |
|---|---|---|---|---|
| **v4.63.0** (actual) | **1.366** | **4.060** | 26 | 02.07.2026 |
| v4.60.0 | 1.350 | — | — | 23.06.2026 |
| v4.58.2 | 1.237 | 3.736 | 15 | 22.05.2026 |
| v4.58.1 | 1.231 | 3.726 | 15 | 21.05.2026 |
| v4.58.0 | 1.215 | — | — | 15.05.2026 |
| v4.39.0 | 1.115 | 3.425 | — | 10.05.2026 |
| v4.38.2 | 1.070 | 3.332 | 7 | 09.05.2026 |
| v4.37.0 | 982 | 3.162 | — | 05.05.2026 |
| v4.27.0 | 728 | — | 6 | 23.04.2026 |
| v4.26.5 | 720 | 2.601 | 6 | 15.04.2026 |
| v4.23.0 | 567 | 2.036 | 4 | 26.03.2026 |
| v4.20.0 (línea base inicial bloqueada) | 268 | 1.379 | — | — |

> **Nota sobre las pruebas omitidas:** Las 26 pruebas omitidas son pruebas de integración que dependen de WooCommerce (`WP_Ajax_UnitTestCase`) y se omiten en entornos en los que WooCommerce no se inicializa en la base de datos de pruebas de PHPUnit; se trata de una carencia conocida del entorno, no de un defecto. La corrección de esas rutas de código se verifica por separado mediante la reproducción en vivo con `wp eval` y pruebas de humo en el navegador. Los fallos de línea base por cuota de entorno de `saas_block` documentados anteriormente ya no se aplican: esa capa de orquestación se eliminó en la v4.60.0.

---

## Categorías de pruebas

### Pruebas de renderizado de shortcodes
13 archivos de pruebas de renderizado de shortcodes validan la salida de todos los shortcodes. Estas pruebas cubren el pipeline CAM de principio a fin: `AllowlistRegistry` -> `CanonicalAttributeMapper` -> `render()` del shortcode.

### Pruebas de SettingsSanitizer
4 archivos de pruebas de SettingsSanitizer prueban la sanitización y validación de los valores de los ajustes.

### Pruebas de AllowlistRegistry
Se verifican 199 claves de atributo únicas, 19 entradas de TAG_MAPPING y la coherencia de los valores enum.

### Pruebas de KeyNormalizer
27 pruebas, 32 aserciones: conversión camelCase/snake_case, resolución de alias y casos límite.

---

## Matriz de CI

El pipeline de CI se ejecuta con la siguiente matriz:

| | PHP 8.1 | PHP 8.2 | PHP 8.3 |
|---|---|---|---|
| **WP 6.7** | PHPUnit | PHPUnit | PHPUnit |
| **WP latest** | PHPUnit | PHPUnit + PHPCS | PHPUnit |

- **Total:** 6 trabajos en paralelo (PHP 8.1/8.2/8.3 x WP 6.7/latest)
- **Control de PHPCS:** se ejecuta mediante `composer phpcs` en PHP 8.2 y es un control obligatorio
- No se permite fusionar hasta que todos los trabajos se superen

---

## Componentes principales

### 1. Configuración de PHPUnit (`phpunit.xml`)
El proceso de pruebas inicializa el entorno de pruebas de WordPress mediante `tests/bootstrap.php`.
- **Cobertura:** rastrea el directorio `./src/` con un objetivo de cobertura del 100 %.
- **Multisitio:** configurado como `0` (false) de forma predeterminada.

### 2. MHM Test Listener (`MHM_Test_Listener`)
Un listener personalizado que aplica la estrategia de «Reinicio híbrido» (Hybrid Reset).
- **Propósito:** limpia automáticamente las tablas temporales (con el prefijo `wptests_`) creadas durante las ejecuciones de pruebas aisladas (`MHM_TEST_IS_ISOLATED`).
- **Seguridad:** solo elimina las tablas que coinciden con un patrón controlado (`DROP TABLE IF EXISTS`).

---

## Uso de Docker y CLI

Las pruebas se ejecutan dentro de un contenedor **Docker** aislado, independientemente del sistema operativo anfitrión (Windows/macOS/Linux).

```bash
# Run all tests
npm run test

# Run only a specific group
docker exec -it mhm-container vendor/bin/phpunit --group financial

# PHPCS check (CI gate)
composer phpcs
```

---

## Informe de cobertura de código

El sistema aplica reglas de cobertura estrictas para los módulos financieros críticos y los módulos principales.
- **Informe HTML:** se genera en el directorio `build/coverage`.
- **Módulos críticos:** los módulos `src/Core/Financial` y `src/Core/Security` siempre se auditan.

---

## Datos de prueba (fixtures)

Los datos de prueba se guardan en el directorio `tests/fixtures`.
- **Idempotencia:** como la base de datos se limpia antes de cada suite de pruebas, las pruebas son independientes entre sí.
- **Aislamiento:** gracias a `MHM_Test_Listener`, los datos no colisionan durante las ejecuciones de pruebas en paralelo.

## Resumen de la sección
- La infraestructura de pruebas se basa en **PHPUnit 9.6**.
- **1.366 pruebas, 4.060 aserciones, 26 omitidas** (línea base de la v4.63.0; las omisiones se deben a una carencia conocida del entorno de WooCommerce en PHPUnit, no a defectos).
- Matriz de CI: **6 trabajos** (PHP 8.1/8.2/8.3 x WP 6.7/latest) + control de PHPCS.
- La contaminación de la base de datos se evita con la estrategia de **Reinicio híbrido**.
- Durante el desarrollo, `npm run test` es el comando de validación principal.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 02.07.2026 | 4.63.0 | Tabla de línea base actualizada (fila actual v4.63.0 — 1.366 / 4.060 / 26). Eliminada la nota obsoleta sobre `saas_block` (esa capa de orquestación se eliminó en la v4.60.0); sustituida por una nota precisa sobre el motivo de las 26 omisiones (carencia del entorno de WooCommerce en PHPUnit). Añadida la fila del hito v4.60.0. |
| 22.05.2026 | 4.58.2 | Tabla de línea base actualizada (fila actual v4.58.2 — 1.237 / 3.736 / 15). Se indican 7 fallos de línea base por cuota de entorno de `saas_block` documentados (fuera del alcance). Añadidos los hitos recientes entre la v4.23.0 y la v4.58.2. |
| 23.04.2026 | 4.27.2 | Añadida la traducción al inglés. |
| 27.03.2026 | 4.23.0 | Añadidos la línea base de pruebas v4.23.0 (567/2036/4), la matriz de CI (6 trabajos + PHPCS) y las categorías de pruebas (renderizado de shortcodes, sanitizer, allowlist, key normalizer). |
| 19.03.2026 | 4.21.2 | Añadida la documentación de PHPUnit 9.6 y MHM_Test_Listener. |
