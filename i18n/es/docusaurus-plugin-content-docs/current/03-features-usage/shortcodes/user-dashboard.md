---
title: "Panel de cuenta principal (retirado)"
description: "El shortcode, el bloque y el widget de Elementor del panel del cliente se retiraron en Rentiva 6.2.0; los clientes usan la página Mi cuenta."
sidebar_position: 13
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::warning Retirado en 6.2.0
El panel del cliente independiente se ha retirado. La página principal de un cliente es la página **Mi cuenta** (la página de cuenta de WooCommerce), donde se muestran las reservas, los favoritos y los pagos. Elimina `[rentiva_user_dashboard]`, su bloque o su widget de Elementor de tus páginas.
:::

# 🚗 Panel de cuenta principal (retirado)

## Contenido
- Qué muestra ahora el shortcode
- Adónde van ahora los clientes
- Notas para desarrolladores

## Qué muestra ahora el shortcode

El shortcode sigue registrado, así que una página que lo contenga no se rompe:

```shortcode
[rentiva_user_dashboard]
```

Desde Rentiva 6.2.0, el shortcode, el bloque **Master Account Dashboard** y el widget de Elementor ya no muestran ningún panel:

| Quién ve la página | Qué ve |
| :--- | :--- |
| Cliente con sesión iniciada | Una línea que indica que la cuenta se ha trasladado y un enlace **Ir a mi cuenta** a la página Mi cuenta. |
| Visitante (sin sesión iniciada) | La misma línea y el mismo enlace **Ir a mi cuenta** que un cliente. |
| Administrador | La misma línea y el mismo enlace, además de un aviso de que este panel está obsoleto y debe eliminarse de la página. Solo los administradores ven el aviso. |

- El bloque y el widget de Elementor están ocultos en los editores, por lo que ya no se pueden añadir a páginas nuevas.
- **MHM Rentiva > Páginas de shortcodes** ya no ofrece crear esta página.
- En una página con el slug `panel`, los visitantes y los usuarios con sesión iniciada que no son administradores se redirigen a Mi cuenta; los administradores todavía pueden abrirla.
- El shortcode no admite parámetros.
- **Los visitantes sin sesión iniciada** ven ahora la misma línea «Tu cuenta se ha trasladado» y el mismo enlace **Ir a mi cuenta** que los clientes (antes veían una página vacía). Solo la propia página `/panel/` del plugin envía al visitante a otro sitio: lo redirige a la página Mi cuenta, donde está el formulario de acceso.

## Adónde van ahora los clientes

Usa la página **Mi cuenta**. Sus secciones se documentan aquí:

- [Mis reservas](./my-bookings)
- [Mis favoritos](./my-favorites)
- [Historial de pagos](./payment-history)

## Notas para desarrolladores

- **Estructura HTML:** El aviso está envuelto en `.mhm-rentiva-retired-dashboard`; el aviso para administradores es `.mhm-rentiva-retired-dashboard__admin`.
- **Filtro:** `mhmrentiva_retired_dashboard_notice` filtra el marcado que se imprime (`$html`, `$role` = `customer` o `admin`).
- **Eliminado en 6.2.0:** las clases del panel del cliente (`CustomerDashboard`, `DashboardConfig`, `DashboardContext`, `DashboardDataProvider`, `DashboardNavigation`) y los hooks `mhmrentiva_dashboard_*`. Consulta la [publicación de la versión 6.2.0](/blog/rentiva-v6.2.0-release).

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 18.11.2026 | 6.4.0 | Los visitantes ven ahora la línea «la cuenta se ha trasladado» en lugar de una página en blanco. |
| 11.10.2026 | 6.2.0 | Página reescrita: el panel del cliente se ha retirado; los clientes usan Mi cuenta. |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y marcador de posición de imagen añadido. |
