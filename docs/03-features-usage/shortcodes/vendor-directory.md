---
title: Vendor directory
description: Usage guide and technical reference for the Vendor Directory module — public catalogue of active vendors with city, badge, and rating filters.
sidebar_position: 27
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page documents the Vendor Directory module — the Pro-gated public catalogue at `/vendors/` (EN) / `/bayiler/` (TR) that lists every active vendor with city, badge, and minimum-rating filters. Covers operational use, attribute reference, schema/SEO, and developer extension points.

Introduced in [v4.38.0](/blog/rentiva-v4.38.0-release); vehicle-count lifecycle parity, pagination strict-type fix, and SEO/cache parity guards landed in [v4.38.1](/blog/rentiva-v4.38.1-release).
:::

# 🗂️ Vendor Directory

## Contents
- What this module is
- URL structure (`/vendors/` EN, `/bayiler/` TR)
- Frontend usage (shortcode / Gutenberg block / Elementor widget)
- Filter UI (city, badge, minimum rating, sort)
- Pagination
- Attribute reference (8 attributes)
- Schema.org `ItemList` + `BreadcrumbList` JSON-LD
- Cache strategy (30-min transient + prefix-wildcard invalidation)
- Developer extension points (5 filter hooks + `seo_disable` kill switch)
- Two-layer Pro gate
- Empty states

The Vendor Directory closes the marketplace discovery loop. Profile pages exist (introduced in [v4.37.0](/blog/rentiva-v4.37.0-release)) but they're not reachable without a list. Directory is that list — server-rendered, no-JS friendly, SEO-first, Dokan-style.

## What this module is

A **discovery surface for vendors**, parallel to how `[rentiva_vehicles_grid]` is a discovery surface for vehicles. Customers don't usually know vendor names a priori; they want to scan a list, filter by location, and click into a profile. Vendor Directory is that scan-list, with a shape that crawlers and screen readers also understand.

Three rendering surfaces share a single canonical renderer (Render Parity contract):

| Surface | Identifier |
| :--- | :--- |
| Shortcode | `[rentiva_vendor_directory]` |
| Gutenberg block | `mhm-rentiva/vendor-directory` (titled "MHM Vendor Directory") |
| Elementor widget | `mhm_rentiva_vendor_directory` (titled "MHM Vendor Directory") |

The block and widget delegate to the shortcode via `do_shortcode()`. Whatever the shortcode renders, the block and widget render identically — no double codepath.

In addition to manual placement, the module registers a **rewrite rule** that serves a full-page wrapper at `/{base}/` automatically — no WordPress page needed.

## URL structure

The base segment is translatable:

| Locale | URL |
| :--- | :--- |
| EN (default) | `/vendors/` |
| TR | `/bayiler/` (`.po` translation of `_x('vendors', 'URL slug', ...)`) |
| Custom | Override with the `mhm_rentiva_vendor_directory_url_base` filter |

The base is sibling to (but separate from) the Vendor Profile base — Profile is single-vendor with a slug capture group (`/vendor/{slug}/`), Directory is base-only (`/vendors/`).

Filter, sort, and pagination state are carried in the query string:

```
/vendors/?city=Istanbul&badge=verified&min_rating=4&sort=rating&paged=2
```

Every combination is a unique, indexable URL — search engines crawl the full filter matrix.

## Frontend usage

### Manual placement (page or post)

Drop the shortcode into any page:

```shortcode
[rentiva_vendor_directory]
```

This renders the default — 12 vendors per page, rating-DESC sort, all UI sections visible.

Configured example:

```shortcode
[rentiva_vendor_directory
    per_page="12"
    default_sort="rating"
    show_filter_bar="yes"
    show_breadcrumb="yes"
    show_pagination="yes"
    empty_message="Şu an aktif bayi bulunmuyor."]
```

### Gutenberg block

Add the **MHM Vendor Directory** block from the inserter (category: Widgets). Inspector controls expose every shortcode attribute via Inspector panels.

### Elementor widget

Add the **MHM Vendor Directory** widget from the Elementor panel (category: MHM Rentiva). Auto-parity controls match shortcode attributes.

## Filter UI

The default filter bar is a horizontal row of four `<select>` dropdowns + an "Apply" submit button (`<form method="get">`). Every control is a native HTML element — the form works without JavaScript. The JS layer (when enabled) adds an optional `change` event auto-submit as progressive enhancement.

| Control | Query param | Options |
| :--- | :--- | :--- |
| City | `city` | All cities (vendor headquarters ∪ vehicle pickup locations, distinct) |
| Badge | `badge` | All / Verified vendors / New vendors |
| Minimum rating | `min_rating` | All ratings / 3+ ★ / 4+ ★ / 5 ★ |
| Sort | `sort` | Highest rated (default) / Newest / A → Z |

On mobile (≤600px), the filter bar collapses into two buttons ("Filter (N)" + "Sort") that open a full-screen sheet via a native `<details>` element — still no JS required.

### Default sort: rating DESC with newest tiebreaker

Rating-DESC is the default because it surfaces the strongest vendors first. Vendors with no ratings (or identical ratings) tie-break on `user_registered` DESC — newer accounts surface above older accounts at the same rating, so a fresh marketplace doesn't feel stagnant.

## Pagination

Classic page-number pagination — `?paged=N` query parameter, no AJAX. The default is 12 per page (4 columns × 3 rows on desktop, 2 × 6 on tablet, 1 × 12 on mobile). The `.current` selector is scoped under `.mhm-vendor-directory-pagination` to prevent theme `.current` rules from hijacking the styling (verified in regression tests since [v4.38.1](/blog/rentiva-v4.38.1-release)).

## Attribute reference

All 8 attributes accept the canonical snake_case form (used by the shortcode) and a camelCase alias (used by the block / widget).

| Attribute | Default | Type | Purpose |
| :--- | :--- | :--- | :--- |
| `per_page` | `12` | int (1-50) | Cards per page. Clamped to range. |
| `default_sort` | `rating` | enum | Default sort when `?sort=` is absent. Options: `rating`, `newest`, `alpha`. |
| `show_filter_bar` | `yes` | bool | Render the filter bar above the grid. |
| `show_breadcrumb` | `yes` | bool | Render the plugin's `Anasayfa › Bayiler` breadcrumb (auto-disabled when an SEO plugin is active — see Schema/SEO below). |
| `show_pagination` | `yes` | bool | Render the page-number nav at the bottom of the grid. |
| `empty_message` | empty | string | Override the "No vendors matched these criteria." copy (filter-result empty branch). |
| `class` | empty | string | Extra CSS class(es) on the wrapper. Multiple tokens accepted; each is sanitized individually. |
| `id` | empty | string | DOM id on the wrapper element. Sanitized via `sanitize_html_class()`. |

## Schema.org `ItemList` + `BreadcrumbList` JSON-LD

The module emits two `<script type="application/ld+json">` blocks in `<head>` for the directory page:

- **`ItemList`** — ordered list of vendor profile URLs (only the rendered page, not the full result set, to keep payload bounded).
- **`BreadcrumbList`** — the `Home › Vendors` trail, mirroring the visible breadcrumb.

JSON encoding uses `JSON_HEX_TAG | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES` — Türkçe characters preserved, hostile `</script>` injections hex-encoded.

### SEO plugin probe — defers automatically

Both JSON-LD emission and the visual breadcrumb are **inert when any major SEO plugin is active**. The probe set:

- Yoast SEO (`WPSEO_VERSION` constant or `WPSEO_Frontend` class)
- Rank Math (`RANK_MATH_VERSION` constant or `RankMath` class)
- All in One SEO (`AIOSEO_VERSION` constant or `AIOSEO\Plugin\AIOSEO` class)
- SEOPress (`SEOPRESS_VERSION` constant)
- The SEO Framework (`THE_SEO_FRAMEWORK_VERSION` constant)
- SmartCrawl (`SMARTCRAWL_VERSION` constant or `Smartcrawl_Init` class)

Google penalizes duplicate schema, and these plugins have richer settings UIs than ours, so we yield to them. The probe runs both at the `register()` early-return (since [v4.38.1](/blog/rentiva-v4.38.1-release)) and at each callback as a defensive second layer (in case an SEO plugin loads after our wiring runs).

The page title (default: `Vendors — {site name}`) and meta description (default: `Discover all our vendors. {N} vendors · {M} vehicles`) follow the same probe — emit only when no SEO plugin is active. Override either default via filter (see Developer extension points).

## Cache strategy

Each unique combination of filter + sort + page is cached in a transient with a 30-minute TTL:

```
mhm_rentiva_vendor_dir_{md5(query_args)}
```

Invalidation is a **subset of the Vendor Profile invalidator** — only fields that affect directory listing trigger a flush:

- `_rentiva_vendor_status` user_meta change (active ↔ suspended)
- `_rentiva_vendor_city` user_meta change (filter dropdown + per-city result set)
- `_rentiva_vendor_reliability_score` user_meta change (badge filter buckets)
- `save_post_vehicle` (vehicle add/remove changes vehicle_count + city pool)
- `mhm_rentiva_vehicle_lifecycle_changed` (active/withdrawn/paused affects inclusion)
- `transition_comment_status` (review approval changes rating aggregate)
- `profile_update` (display name change affects card label + alpha sort)

Bio changes and avatar uploads are **deliberately not invalidated** — directory cards don't render those fields, so a flush there would be wasted work. The cache fronts a prefix-wildcard SQL `DELETE` (one query drops every cached variant in one shot).

When the lifecycle status doesn't actually change, the invalidator no-ops (parity with the comment-status no-op since [v4.38.1](/blog/rentiva-v4.38.1-release)) — re-saves of vehicles without lifecycle transitions don't defeat the cache.

## Developer extension points

### `mhm_rentiva_vendor_directory_url_base`

Override the URL base segment. Useful for custom marketplace slugs.

```php
add_filter('mhm_rentiva_vendor_directory_url_base', function ($base) {
    return 'firmalar';
});
```

The locale-change watcher detects the new value and flushes rewrite rules automatically.

### `mhm_rentiva_vendor_directory_per_page`

Override the per-page cap from outside the shortcode. Lets you set a site-wide policy without editing every block/widget instance.

```php
add_filter('mhm_rentiva_vendor_directory_per_page', function () {
    return 24;
});
```

### `mhm_rentiva_vendor_directory_empty_message`

Filter the "no vendors found" copy. Two contexts:

- Filter-result empty (the user filtered down to zero matches)
- Site-wide zero (no active vendors anywhere)

Override based on context:

```php
add_filter('mhm_rentiva_vendor_directory_empty_message', function ($message, $context) {
    if ($context === 'site_wide_zero') {
        return 'Henüz kayıtlı bayimiz yok. Yakında!';
    }
    return $message;
}, 10, 2);
```

### `mhm_rentiva_vendor_directory_page_title`

Override the page title (default: `Vendors — {site name}`). Returned by `VendorDirectorySeo::build_title()`. Inert when an SEO plugin is active.

### `mhm_rentiva_vendor_directory_meta_description`

Override the meta description. The filter receives three arguments — default copy, vendor count, vehicle count — so you can build context-aware copy.

```php
add_filter('mhm_rentiva_vendor_directory_meta_description',
    function (string $default, int $vendor_count, int $vehicle_count): string {
        return sprintf(
            'Antalya rent-a-car marketplace — %d aktif bayi, %d araç.',
            $vendor_count,
            $vehicle_count
        );
    },
    10,
    3
);
```

### `mhm_rentiva_vendor_directory_seo_disable`

Global kill switch for both schema JSON-LD and title/description emission. Returns `false` by default; set to `true` to opt out entirely (typically because your theme handles directory metadata its own way).

```php
add_filter('mhm_rentiva_vendor_directory_seo_disable', '__return_true');
```

## Two-layer Pro gate

Vendor Directory is a **Pro-only feature** — it requires the `vendor_marketplace` flag. Lite users hit two gates:

1. **Dispatch-time gate** — `template_redirect` handler returns a WordPress 404 for `/{base}/` requests when `Mode::canUseVendorMarketplace()` is false. The user sees the theme's 404 page.
2. **Render-time gate** — manual shortcode usage by Lite users (block / widget / shortcode in a page) returns an empty string. No upsell modal, no error log, no half-rendered HTML.

Upgrade prompts live on `/pricing` and the existing `[mhm_rentiva_pricing_table]` shortcode.

## Empty states

| State | Render |
| :--- | :--- |
| Filter result empty (active vendors exist, filters exclude all of them) | "Bu kriterlere uyan bayi bulunamadı." + "Filtreleri Temizle" link returning to `/{base}/` |
| Site-wide zero (no active vendors anywhere) | "Henüz kayıtlı bayimiz yok. Yakında!" — overridable via filter |
| Lite user | WordPress 404 (dispatch gate) or empty string (manual placement) |

## See also

- [v4.38.0 release notes](/blog/rentiva-v4.38.0-release) — original feature introduction
- [v4.38.1 release notes](/blog/rentiva-v4.38.1-release) — vehicle-count lifecycle parity, pagination strict-type fix, SEO/cache parity guards
- [Vendor public profile shortcode](./vendor-profile) — the destination page each directory card links to
- [Vendor application form shortcode](./vendor-apply) — the onboarding form
- [Vendor onboarding](/docs/vendor/onboarding) — how vendors get into the directory in the first place
