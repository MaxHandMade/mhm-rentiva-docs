---
title: Popular routes
description: Usage guide and technical reference for the Popular Routes showcase module.
sidebar_position: 18
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page describes the Popular Routes module — the homepage showcase for VIP transfer routes — covering operational use, full attribute reference, and developer extension points.

Introduced in [v4.34.0](/blog/rentiva-v4.34.0-release); clickable cards + deep-link pre-fill landed in [v4.34.1](/blog/rentiva-v4.34.1-release).
:::

# 🌟 Popular Routes

## Contents
- What this module is
- Admin workflow — pinning routes
- Frontend usage (shortcode / Gutenberg block / Elementor widget)
- Attribute reference (16 attributes)
- Card click behavior — deep-link pre-fill
- Developer extension points (filter hooks)
- Lite vs Pro behavior
- Empty state

The Popular Routes module surfaces your strongest VIP transfer routes on the homepage as A → B cards (origin → destination, average duration, distance, starting price). Each card is a clickable link that deep-links into the transfer-search form with the chosen origin and destination already selected, so the visitor only adds date/time and submits.

## What this module is

A **conversion surface for the transfer module**, not a search interface. The transfer module already includes the search form (`[rentiva_transfer_search]`) and results listing (`[rentiva_transfer_results]`). Popular Routes is the upstream nudge that tells visitors VIP transfer is on offer and gives them a one-click path from "I see a route I want" to "the search form has it pre-selected."

Three rendering surfaces share a single canonical renderer (Render Parity contract):

| Surface | Identifier |
| :--- | :--- |
| Shortcode | `[rentiva_popular_routes]` |
| Gutenberg block | `mhm-rentiva/popular-routes` (titled "MHM Popular Transfer Routes") |
| Elementor widget | `mhm_rentiva_popular_routes` (titled "MHM Popular Routes") |

The block and widget delegate to the shortcode via `do_shortcode()`. Whatever the shortcode renders, the block and widget render identically — no double codepath.

## Admin workflow — pinning routes

The module reads from the existing **Transfer Routes** table — there is no separate "popular routes" data source. You decide which routes are popular by checking a box.

### 1. Define your routes

Go to **MHM Rentiva → Transfer Routes** and create or edit routes the usual way: pick origin and destination locations, set distance and duration, choose a pricing method (fixed price or per-km), and enter the price.

### 2. Pin the routes you want on the homepage

Each route's edit form has a checkbox at the bottom:

> **🌟 Vitrine Koy (pin to popular routes block)**
>
> Featured routes are pinned first in the `[rentiva_popular_routes]` block, Gutenberg block, and Elementor widget on the homepage.

Tick the box and save. The route now appears with a "🌟 Showcase" badge in the routes list, and it's pinned to the top of the Popular Routes section on every surface that renders the shortcode/block/widget.

The transient cache (1-hour TTL) is automatically invalidated on every save and delete, so changes go live on the next page request.

## Frontend usage

### Shortcode

Drop the shortcode into any page or post:

```shortcode
[rentiva_popular_routes]
```

This renders the default — six cards, three columns on desktop, "featured first" sort order, all visibility flags on, light theme.

A more configured example:

```shortcode
[rentiva_popular_routes
    columns="3"
    limit="6"
    order="featured"
    heading="Popüler Transfer Rotaları"
    subheading="En çok tercih edilen güzergahlar"
    filter_origin_city="Istanbul"
    show_view_all="true"]
```

### Gutenberg block

Add the **MHM Popular Transfer Routes** block from the block inserter (category: Widgets). Inspector controls are grouped into four panels:

| Panel | Controls |
| :--- | :--- |
| Layout | Columns (2/3/4), maximum cards, theme (light/dark) |
| Heading | Title, subtitle, "View all" toggle, "View all" URL override |
| Sorting & Filters | Sort order (5 options), pinned-only toggle, origin city filter, origin type filter |
| Card Display | Show duration, show distance, show traffic note, show starting price, currency symbol |

The block uses `ServerSideRender`, so the editor preview matches the live frontend exactly.

### Elementor widget

Add the **MHM Popular Routes** widget from the Elementor panel (category: MHM Rentiva). The same four control sections are available, plus Elementor's standard wrapper styling controls (margin, padding, color, typography).

## Attribute reference

All 16 attributes accept the canonical snake_case form (used by the shortcode) and a camelCase alias (used by the block / widget). The plugin's CAM (Canonical Attribute Mapper) normalizes both to the same internal form.

| Attribute | Default | Type | Purpose |
| :--- | :--- | :--- | :--- |
| `limit` | `6` | int (1-50) | Maximum cards rendered. Capped to `Mode::maxTransferRoutes()` on Lite plans. |
| `columns` | `3` | enum | Desktop grid columns: `2`, `3`, or `4`. Tablet always 2, mobile always 1. |
| `order` | `featured` | enum | `featured` / `price_asc` / `price_desc` / `alphabetical` / `newest` |
| `heading` | "Popular Routes" | string | Section title (translatable). |
| `subheading` | "Most preferred VIP transfer routes" | string | Section subtitle (translatable). |
| `show_view_all` | `true` | bool | Show the "Search transfers" link in the section header. |
| `view_all_url` | empty | url | Override the link target. When empty, the `mhm_rentiva_popular_routes_view_all_url` filter is used; when that's also empty, the link is hidden. |
| `show_duration` | `true` | bool | Render the "Approx. X min" line on each card. |
| `show_distance` | `true` | bool | Render the "X km" line on each card. |
| `show_traffic_note` | `true` | bool | Render the "May vary with traffic" disclaimer. |
| `show_price` | `true` | bool | Render the starting-price line on each card. |
| `currency_symbol` | `₺` | string | Prefix for the price (single character or short code). |
| `filter_origin_city` | empty | string | Show only routes whose origin location is in this city (case-insensitive). |
| `filter_origin_type` | empty | enum | Show only routes whose origin is of this type: `airport` / `train` / `hotel` / `marina` / `city_center`. |
| `featured_only` | `false` | bool | Render only routes that have the "🌟 Showcase" checkbox ticked. |
| `theme` | `light` | enum | `light` / `dark` (light is the production-tested default). |

### Sort order details

- **`featured`** — pinned routes first (in `created_at DESC` order within the pinned set), then non-pinned routes (also `created_at DESC`). This is the default and the intended showcase ordering.
- **`price_asc`** / **`price_desc`** — sorts on `min_price` (calculated pricing) or `base_price` (fixed pricing) ascending or descending.
- **`alphabetical`** — sorts on origin name, then destination name.
- **`newest`** — pure `created_at DESC` regardless of pinned status.

### Origin type icons

The card top-right corner shows an icon based on the origin location's type:

| Type | Default icon |
| :--- | :--- |
| `airport` | ✈️ |
| `train` | 🚆 |
| `hotel` | 🏨 |
| `marina` | ⛵ |
| `city_center` | 🏙️ |
| (other) | ↗ |

Override the mapping with the `mhm_rentiva_popular_routes_type_icon` filter (see Developer extension points below).

## Card click behavior — deep-link pre-fill

Each card is wrapped in an `<a>` element. Clicking it lands on the transfer-search page (resolved via filters, see below) with the chosen `origin_id` and `destination_id` appended as query parameters:

```
.../transfer/?origin_id=73&destination_id=76
```

The transfer-search shortcode reads these query parameters and pre-selects the matching options in its `<select>` elements. The visitor sees:

> **TESLİM ALMA KONUMU:** İstanbul Havalimanı (IST)
> **BIRAKMA KONUMU:** Taksim Ofis
> **TARİH:** _(empty — visitor enters)_
> **SAAT:** 10:00

…and only needs to add date and submit. The path from "click on a homepage card" to "see results" is two interactions instead of four.

The pre-fill is **backwards compatible**: a transfer-search page loaded without query parameters behaves exactly as it did before v4.34.1. The change is purely additive.

## Developer extension points

### `mhm_rentiva_popular_routes_view_all_url`

Filter for the **section header link** target ("Search transfers" link). Returned by `resolve_view_all_url()`.

```php
add_filter('mhm_rentiva_popular_routes_view_all_url', function ($url) {
    return home_url('/transfer/');
});
```

When this filter returns empty, the section header link is hidden — useful for installations that don't have a transfer-search page yet.

### `mhm_rentiva_popular_routes_search_url`

Filter for the **card click target** base URL (introduced in v4.34.1). Independent from the section header link, so themes can route them to different pages.

```php
add_filter('mhm_rentiva_popular_routes_search_url', function ($url) {
    return home_url('/transfer-search/');
});
```

When empty, falls back to the `mhm_rentiva_popular_routes_view_all_url` filter, which itself falls back to `home_url('/transfer/')`.

### `mhm_rentiva_popular_routes_type_icon`

Filter the origin-type icon. Receives the default icon and the type slug.

```php
add_filter('mhm_rentiva_popular_routes_type_icon', function ($icon, $type) {
    if ($type === 'airport') {
        return '🛫';
    }
    return $icon;
}, 10, 2);
```

Useful when the brand voice wants different emoji or short text glyphs.

### `TransferRouteProvider::get_popular_routes()`

The repository class is part of the public-ish API. It accepts a sanitized argument array and returns route objects with origin/destination data joined. Themes that want to render their own card markup can call it directly:

```php
$routes = \MHMRentiva\Admin\Transfer\Engine\TransferRouteProvider::get_popular_routes([
    'limit'              => 6,
    'order'              => 'featured',
    'featured_only'      => false,
    'filter_origin_city' => 'Istanbul',
    'filter_origin_type' => 'airport',
]);

foreach ($routes as $route) {
    // $route->origin_name, $route->destination_name, $route->min_price,
    // $route->is_featured, $route->origin_type, etc.
}
```

The query result is transient-cached for 1 hour. Calling `TransferRouteProvider::clear_cache()` invalidates all cached variants — admin route CRUD does this automatically.

## Lite vs Pro behavior

| Plan | Maximum cards rendered | Maximum routes admin can define |
| :--- | :--- | :--- |
| Lite | 3 | 3 (existing quota) |
| Pro | `limit` attribute (default 6, max 50) | unlimited |

The cap on rendered cards is enforced via `Mode::maxTransferRoutes()`. A Lite site that uses `limit="20"` quietly clamps to 3 — no error, no upsell modal, the section just renders three cards.

## Empty state

If no routes pass the eligibility filter (both endpoints `is_active=1` AND `allow_transfer=1`, plus any user-supplied filters), the section renders **nothing at all** — no "Coming soon..." placeholder, no empty grid, no console noise. New installations look clean; populated installations only show what they have.

This is intentional. A blank-but-present section reads as broken; a missing section is invisible.

## See also

- [v4.34.0 release notes](/blog/rentiva-v4.34.0-release) — original feature introduction
- [v4.34.1 release notes](/blog/rentiva-v4.34.1-release) — clickable cards + deep-link pre-fill
- [v4.34.2 release notes](/blog/rentiva-v4.34.2-release) — transfer-card icon styling hotfix
- [Transfer search shortcode](./transfer-search) — the form Popular Routes deep-links into
- [Transfer results shortcode](./transfer-results) — the results page that renders after search submission
- [VIP Transfer module](../vip-transfer) — operational guide for the broader transfer feature
