---
title: Vendor public profile
description: Usage guide and technical reference for the Vendor Public Profile module — shortcode, Gutenberg block, and Elementor widget.
sidebar_position: 26
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro feature
This page documents a capability of the **MHM Rentiva Pro** add-on. It is not part of the free
Lite edition on WordPress.org and requires Pro installed alongside Lite plus a valid licence.
See [Editions — Lite vs Pro](/docs/) for the full split, or get Pro at [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Purpose
This page documents the Vendor Public Profile module — the public-facing trust page customers land on before booking with a vendor. Covers operational use, full attribute reference, schema/SEO behavior, and developer extension points.

Introduced in [v4.37.0](/blog/rentiva-v4.37.0-release); badge filter wiring + review meta fallback added in [v4.37.1](/blog/rentiva-v4.37.1-release); UX polish (avatar, vehicle thumbnails, SEO probe, mobile breakpoint) in [v4.37.2](/blog/rentiva-v4.37.2-release); admin slug edit collision fix in [v4.38.1](/blog/rentiva-v4.38.1-release).
:::

# 👤 Vendor Public Profile

## Contents
- What this module is
- URL structure (`/vendor/{slug}/` EN, `/bayi/{slug}/` TR)
- Admin workflow — slug, avatar, badge eligibility
- Frontend usage (shortcode / Gutenberg block / Elementor widget)
- Attribute reference (12 attributes)
- Schema.org `LocalBusiness` JSON-LD + SEO plugin probe
- Developer extension points (6 filter hooks)
- Lite vs Pro behavior
- Empty states

The Vendor Public Profile module gives every approved vendor a dedicated trust page at a clean, shareable URL. Visitors can preview the vendor's identity, badge status, fleet snapshot, recent reviews, and location before booking — closing the trust gap between "I see a vehicle I like" and "I'm willing to send my details to this person."

## What this module is

A **conversion surface for the marketplace**, not an admin panel. The vendor application form (`[rentiva_vendor_apply]`) handles onboarding; the vendor dashboard (`[rentiva_user_dashboard]`) handles operations. Vendor Public Profile is the public read-only view a customer sees when they click "view vendor" on a vehicle card or land via search/share.

Three rendering surfaces share a single canonical renderer (Render Parity contract):

| Surface | Identifier |
| :--- | :--- |
| Shortcode | `[rentiva_vendor_profile]` |
| Gutenberg block | `mhm-rentiva/vendor-profile` (titled "MHM Vendor Profile") |
| Elementor widget | `mhm_rentiva_vendor_profile` (titled "MHM Vendor Profile") |

The block and widget delegate to the shortcode via `do_shortcode()`. Whatever the shortcode renders, the block and widget render identically — no double codepath.

In addition to manual placement, the module registers a **rewrite rule** that serves a full-page wrapper at `/{base}/{slug}/` automatically. Once a vendor has a slug assigned (manual or auto-generated), the page is reachable without you creating a WordPress page for it.

## URL structure

The base segment is translatable:

| Locale | URL |
| :--- | :--- |
| EN (default) | `/vendor/{slug}/` |
| TR | `/bayi/{slug}/` (`.po` translation of `_x('vendor', 'URL slug', ...)`) |
| Custom | Override with the `mhm_rentiva_vendor_profile_url_base` filter |

The slug is always ASCII (Latin) — `sanitize_title(remove_accents($display_name))`. Türkçe diacritics in the display name (e.g., "Akif Ötömötiv Şirketi") are folded to ASCII (`akif-otomotiv-sirketi`) so the URL is safe in every browser, e-mail client, and legacy share target.

Slug changes generate a permanent **301 redirect** from the old URL — the previous slug is appended to a history meta capped at 10 entries, and `VendorProfileRewrite::handle_request()` matches old slugs and redirects to the current one.

## Admin workflow

### 1. Slug & avatar — vendor user profile

Go to **Users → Edit user** for the vendor. Three new fields appear under "MHM Rentiva Vendor Settings":

- **Default Branch/Location** — operational, unrelated to the public profile.
- **Vendor Avatar** — custom upload via the WP media library. When empty, the public profile falls back to Gravatar (matching e-mail) and finally to a deterministic SVG initials avatar derived from the display name (so every vendor gets distinct, theme-agnostic, mystery-man-free identity art).
- **Public Profile URL Slug** — manually set or leave blank for auto-generation from display name. Changing it creates a 301 redirect from the old URL automatically.

The save path is routed through `VendorSlugManager::change_slug()` (since [v4.38.1](/blog/rentiva-v4.38.1-release)) so collision suffixes (`-2`, `-3`, ...) are applied automatically when two vendors submit the same raw slug.

### 2. Badge eligibility — automated

The "✓ Verified Vendor" badge is fully threshold-driven. A vendor is verified when **all three** conditions are met:

| Threshold | Default | Setting key |
| :--- | :--- | :--- |
| Account age (days since approval) | 180 | `vendor_badge_min_age_days` |
| Reliability score (0-100) | 80 | `vendor_badge_min_score` |
| Completed bookings (lifetime) | 10 | `vendor_badge_min_completed_bookings` |

Tune them under **MHM Rentiva → Settings → Vendor Marketplace** (or override per-vendor with the `mhm_rentiva_vendor_badge_eligibility` filter, see Developer extension points).

Vendors who haven't reached all three thresholds get a "Yeni Bayi" tag instead — positive framing for new accounts, no negative signal in either direction.

### 3. Bio, city — copied from onboarding

The "About" section reads from `_rentiva_vendor_bio` (collected during onboarding). The hero "📍 City · Member YYYY" line reads from `_rentiva_vendor_city` and `_rentiva_vendor_approved_at`. Vendors can update both via their dashboard at any time — changes invalidate the 1-hour transient cache automatically.

## Frontend usage

### Manual placement (page or post)

Most installations let the rewrite rule do the work: a vendor's slug is enough, no page needs to be created. But you can also drop the shortcode anywhere:

```shortcode
[rentiva_vendor_profile slug="akif-otomotiv"]
```

Configured example:

```shortcode
[rentiva_vendor_profile
    slug="akif-otomotiv"
    show_badge="yes"
    show_about="yes"
    show_vehicles="yes"
    max_vehicles="6"
    vehicle_sort="rating-newest"
    show_reviews="yes"
    max_reviews="10"
    show_location="no"]
```

When `slug` is empty AND the page is rewrite-routed, the slug is read from the `mhm_rentiva_vendor_slug` query var automatically.

### Gutenberg block

Add the **MHM Vendor Profile** block from the inserter (category: Widgets). Inspector controls expose every shortcode attribute via Inspector panels.

### Elementor widget

Add the **MHM Vendor Profile** widget from the Elementor panel (category: MHM Rentiva). Auto-parity controls match shortcode attributes; standard Elementor wrapper styling controls (margin, padding, color, typography) wrap the rendered HTML.

## Attribute reference

All 12 attributes accept the canonical snake_case form (used by the shortcode) and a camelCase alias (used by the block / widget). The plugin's CAM (Canonical Attribute Mapper) normalizes both to the same internal form.

| Attribute | Default | Type | Purpose |
| :--- | :--- | :--- | :--- |
| `slug` | empty | string | Vendor slug. Empty + rewrite-routed page reads from query var. |
| `show_badge` | `yes` | bool | Show the "✓ Verified Vendor" / "Yeni Bayi" tag in the hero. |
| `show_rating` | `yes` | bool | Show the aggregate rating bar (★★★★½ 4.6) and review count in the hero. |
| `show_about` | `yes` | bool | Render the About section (hidden if `_rentiva_vendor_bio` is empty). |
| `show_vehicles` | `yes` | bool | Render the active-vehicles grid section. |
| `max_vehicles` | `6` | int (1-50) | Maximum vehicle cards rendered. Clamped to range. |
| `vehicle_sort` | `rating-newest` | enum | Sort order for the vehicle grid. Currently a single mode (rating DESC, then `post_date` DESC). |
| `show_reviews` | `yes` | bool | Render the recent reviews section. |
| `max_reviews` | `10` | int (1-50) | Maximum review entries rendered. Each review links back to the source vehicle. |
| `show_location` | `no` | bool | Render the dedicated Location section. **Default flipped to `no` in v4.37.2** — the hero already shows the city. The dedicated section is reserved for the v4.40.0+ Transfer Map enrichment; until then it duplicates the hero meta. |
| `empty_vehicles_message` | empty | string | Override the "This vendor is not currently listing any vehicles." copy. |
| `empty_reviews_message` | empty | string | Override the "No reviews yet — be the first to leave one." copy. |
| `class` | empty | string | Extra CSS class(es) on the wrapper. Multiple tokens accepted; each is sanitized individually. |

### Privacy contract

The following user_meta keys are **never** rendered on the public profile, even with extreme attribute combinations:

- `_rentiva_vendor_phone` — collected for vendor onboarding, kept admin-only (anti-spam scraping).
- `_rentiva_vendor_iban` — financial.
- `_rentiva_vendor_account_holder` — financial.
- `_rentiva_vendor_tax_number` — financial.

The `VendorProfileProvider` class allowlists exactly the fields that feed the render array; sensitive fields are not read. The `mhm_rentiva_vendor_profile_data` filter docblock warns that injecting sensitive values via this filter would leak them to the 1-hour transient — keep filter callbacks read-only.

## Schema.org `LocalBusiness` JSON-LD + SEO plugin probe

The module emits a `<script type="application/ld+json">` block with a `LocalBusiness` schema in `<head>` for every active vendor profile page. Fields populated:

- `@type: LocalBusiness`
- `name` (display name, hex-encoded against `</script>` injection — JSON_HEX_TAG flag)
- `url` (canonical profile URL)
- `address.addressLocality` (vendor city, when set)
- `aggregateRating` (vendor-level weighted average + review count, when ≥1 review exists)

JSON encoding uses `JSON_HEX_TAG | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES` — Türkçe characters preserved (`Ö` literal), hostile `</script>` injections hex-encoded.

The page title (`{vendor name} — {site name}`) and meta description (vendor bio, trimmed to 155 chars at a word boundary) are emitted **only when no SEO plugin is active**. The probe set covers Yoast SEO, Rank Math, AIOSEO, SEOPress, The SEO Framework, and SmartCrawl; if any of these are active, our title/description emission is inert (Google forbids duplicate metadata, and these plugins have richer settings UIs).

The Schema.org JSON-LD output also yields to the SEO plugin's canonical-tag filter via `wpseo_canonical` (Yoast) and `rank_math/frontend/canonical` (Rank Math) at priority `PHP_INT_MAX - 10`, so the canonical URL stays consistent.

## Developer extension points

### `mhm_rentiva_vendor_profile_url_base`

Override the URL base segment. Useful when you want a custom slug like `/dealers/` or `/firmalar/` regardless of locale.

```php
add_filter('mhm_rentiva_vendor_profile_url_base', function ($base) {
    return 'firmalar';
});
```

The locale-change watcher will detect the new value and flush rewrite rules automatically.

### `mhm_rentiva_vendor_profile_data`

Filter the full render data array (identity, badge state, vehicles list, reviews aggregate, schema data) before the template runs. Use it to inject extra fields a custom template partial reads, or to redact fields per page.

```php
add_filter('mhm_rentiva_vendor_profile_data', function (array $data) {
    $data['custom_extra_text'] = 'Member of Antalya Tourism Association';
    return $data;
});
```

**Read-only by convention.** Injecting sensitive values here would leak them to the 1-hour transient cache.

### `mhm_rentiva_vendor_badge_eligibility`

Override the per-vendor badge result. Typical use: bypass thresholds for "featured" vendors, or temporarily revoke the badge for a vendor under review.

```php
add_filter('mhm_rentiva_vendor_badge_eligibility', function (bool $eligible, int $vendor_id, array $context) {
    if (in_array($vendor_id, get_option('featured_vendor_ids', []), true)) {
        return true;
    }
    return $eligible;
}, 10, 3);
```

`$context` carries `age_days`, `score`, `completed_bookings`.

### `mhm_rentiva_vendor_completed_bookings_count`

Override the lifetime completed-bookings count used by `VendorBadgeEligibility`. Default callback delegates to `ReliabilityScoreCalculator::count_completed_bookings()`. Replace it for a custom counting strategy (e.g., count only certain product categories).

### `mhm_rentiva_vendor_profile_view_all_url`

Filter the "View all vehicles →" link target on the vehicles section. When empty, the link is hidden — useful for installations that don't have a search-results page yet.

### `mhm_rentiva_vendor_profile_seo_disable`

Global kill switch for the title + meta description emission. Returns `false` by default; set to `true` to opt out entirely (typically because your theme handles vendor metadata its own way).

```php
add_filter('mhm_rentiva_vendor_profile_seo_disable', '__return_true');
```

## Lite vs Pro behavior

Vendor Public Profile is a **Pro-only feature** — it requires the `vendor_marketplace` flag. Lite users see:

- The rewrite rule is registered but `template_redirect` dispatches a 404 for Lite (`Mode::canUseVendorMarketplace()` returns false).
- Manual shortcode usage on a page returns an empty string.
- Block and Elementor widget render nothing (delegating to the shortcode).

Upgrade prompts live on `/pricing` and the existing `[mhm_rentiva_pricing_table]` shortcode.

## Empty states

| State | Render |
| :--- | :--- |
| Vendor not found / suspended / missing slug | WordPress 404 (status header 404, theme's 404 template) |
| 0 active vehicles | "This vendor is not currently listing any vehicles." (overridable via `empty_vehicles_message`) |
| 0 reviews | "No reviews yet — be the first to leave one." (overridable via `empty_reviews_message`) |
| 0 vehicles + 0 reviews (new vendor) | Both empty states render. Hero still shows. The "Yeni Bayi" tag adds context. |

## See also

- [v4.37.0 release notes](/blog/rentiva-v4.37.0-release) — original feature introduction
- [v4.37.1 release notes](/blog/rentiva-v4.37.1-release) — badge wiring hotfix + review meta fallback
- [v4.37.2 release notes](/blog/rentiva-v4.37.2-release) — UX polish (avatar, vehicle thumbnails, SEO probe, mobile breakpoint)
- [v4.38.1 release notes](/blog/rentiva-v4.38.1-release) — admin slug edit collision fix
- [Vendor directory shortcode](./vendor-directory) — the catalogue page that lists every active vendor
- [Vendor application form shortcode](./vendor-apply) — the onboarding form
- [Vendor onboarding](/docs/vendor/onboarding) — operational guide for vendor approval
