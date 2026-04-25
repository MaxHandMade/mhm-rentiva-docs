---
slug: license-security-sprint-v4.30.x
title: "License Security Hardening Sprint: Rentiva v4.30.0 → v4.30.2 (with mhm-license-server v1.9.0–v1.9.3 and CS v0.5.x)"
authors: [maxhandmade]
tags: [release, security, license, hardening, mhm-rentiva, mhm-license-server, mhm-currency-switcher]
date: 2026-04-25T22:00
---

A two-day cross-plugin sprint that hardened the Rentiva (and Currency Switcher) Pro licensing layer against source-edit bypass attacks. **Three Rentiva client releases** (v4.30.0 / v4.30.1 / v4.30.2) shipped alongside **four license-server releases** (v1.9.0 → v1.9.3) and **three Currency Switcher releases** (v0.5.0 / v0.5.1 / v0.5.2). Live-deployed and verified end-to-end on mhmrentiva.com + wpalemi.com.

<!--truncate-->

## Why this sprint happened

The Rentiva plugin source ships on a **public GitHub repository**. A motivated attacker can clone, patch `Mode::canUseVendorMarketplace()` to `return true;`, and unlock Pro features without ever calling the license server. v1.8.0 closed *cross-product* key reuse (Currency Switcher key on Rentiva) but did nothing about source-edit bypass. **v4.30.x raises the cost: a crack now has to forge an HMAC signature, host a fake validator, AND keep emitting fresh feature tokens — and even then, tokens expire within 24 hours.**

Five attack scenarios were used as the design target:

| Attack | Mechanism | Defended by |
|---|---|---|
| Source-edit `isActive() { return true; }` | Patch local Pro gate | Layer 4 (feature token) |
| Cross-product key reuse | Use CS key on Rentiva | Layer 1 (slug binding, v1.8.0) |
| Empty `product_slug` body | Strip the line, ride legacy compat | Layer 1 hardened in v1.9.3 |
| Fake activate POST from script | No control over claimed site | Layer 3 (reverse site validation) |
| Pirated key + fake server | DNS hijack to lookalike | Layer 2 (response signing) |

## v4.30.0 — Phase B Client (the foundation, 2026-04-24)

Companion to **mhm-license-server v1.9.0** (Phase A — server-side three-layer defense).

### Four new helpers under `src/Admin/Licensing/`

- **`ClientSecrets`** — resolves three new wp-config constants (`MHM_RENTIVA_LICENSE_RESPONSE_HMAC_SECRET`, `MHM_RENTIVA_LICENSE_FEATURE_TOKEN_KEY`, `MHM_RENTIVA_LICENSE_PING_SECRET`).
- **`ResponseVerifier`** — HMAC-SHA256 verification of every signed activate/validate response. Mirrors the server's recursive ksort + JSON_UNESCAPED_SLASHES|UNICODE canonicalization byte-for-byte — drift = legitimate responses look tampered.
- **`FeatureTokenVerifier`** — verifies `{base64(json)}.{hmac}` tokens issued by the server. 24h TTL. `hasFeature($payload, $flag)` accessor used by Mode gates.
- **`VerifyEndpoint`** — public REST route `/wp-json/mhm-rentiva-verify/v1/ping` answering the server's `X-MHM-Challenge` during reverse validation.

### Mode gate refactor

`canUseVendorMarketplace()`, `canUseMessages()`, `canUseAdvancedReports()`, `canUseVendorPayout()` now route through a single `featureGranted()` private helper that:

1. Hard-checks `isPro()` first
2. If `FEATURE_TOKEN_KEY` is unset → legacy `isPro()` fallback (existing customers don't break)
3. Otherwise verifies the locally-stored feature token's HMAC
4. Reads the specific flag from the payload (`vendor_marketplace`, `messaging`, `advanced_reports`, etc.)

A `return true;` patch on `isActive()` no longer unlocks anything because the gate independently asks for a server-granted flag.

### LicenseManager wiring

- `activate()` request body now includes `client_version = MHM_RENTIVA_VERSION`. Server uses this for per-version reverse-validation enforcement (≥4.30.0 floor for Rentiva).
- Successful response's `feature_token` field is persisted alongside the existing license record.
- Daily verification cron refreshes the token on every tick.

### Test coverage

6 new test files, **36 new tests** across `tests/Unit/Licensing/` and `tests/Integration/Licensing/`. Total: 776 / 2715, PHPCS clean, 3 new TR translations.

## v4.30.1 — Reverse Validation UX Fix (2026-04-25 morning)

v4.30.0 made `MHM_RENTIVA_LICENSE_PING_SECRET` **mandatory** — without it, `VerifyEndpoint` returned 503 `ping_secret_not_configured`, and the license server then rejected activation with `site_unreachable`. **Every customer site needed an operator-pinned secret in `wp-config.php`** — unworkable for an end-customer product.

### Fix

`VerifyEndpoint::handle_ping()` falls back to the per-activation `site_hash` (computed the same way `LicenseManager::siteHash()` does — `sha256(home_url + site_url)` JSON-encoded) when `ClientSecrets::getPingSecret()` returns empty. Server-side `mhm-license-server v1.9.1+` applies the matching fallback in `Security\SiteVerifier`, so the HMAC challenge stays verifiable even though `site_hash` is technically not secret.

### Why it's still safe

`site_hash` is publicly derivable, but tampering still fails because the reverse ping targets the claimed `site_url`. An attacker that doesn't control that domain cannot intercept the GET and reply with a forged HMAC, regardless of whether the HMAC key is private.

### Backward compatibility

When `MHM_RENTIVA_LICENSE_PING_SECRET` IS defined, `VerifyEndpoint` still uses it — v4.30.0 deploys with operator config baked in keep working unchanged.

## v4.30.2 — License Notice Defensive Fix (2026-04-25 afternoon)

Two layered bugs in `LicenseAdmin::admin_notices()`:

### Bug A — Empty error_message rendered "License activation failed: " (with empty trailing space)

Stale URL state (`?license=error` without `&message=...`, e.g. browser back/forward, bookmark, truncated copy-paste) leaked through the `match`'s default arm into a `sprintf("...: %s", '')` call. Visible at the top of the License page even though the customer hadn't pressed anything.

### Bug B — Missing match arms for v1.8.0+/v1.9.x server error codes

`site_unreachable`, `site_verification_failed`, `tampered_response`, `product_mismatch`, `product_slug_required` had no friendly translations. They fell through to the same default arm, leaking raw technical codes to end users ("License activation failed: site_unreachable").

### Fix (three layers)

1. **Defensive guard:** `if ('' === $error_message) { break; }` skips the notice entirely when there's no actionable code.
2. **Five new match arms** with customer-friendly EN strings + Turkish translations.
3. **Generic default + `data-error-code` attribute:** unknown future codes render "License activation failed. Please try again." with the technical code exposed via a `data-error-code` HTML attribute (debug / support only — never inline text).

### Stable tag drift caught

While bumping the version, an audit caught that `readme.txt` Stable tag had been stuck at `4.30.0` — the v4.30.1 release accidentally skipped the bump. v4.30.2 corrects to `4.30.2`.

### Test coverage

`tests/Unit/Licensing/LicenseAdminAdminNoticesTest.php` — 5 new tests covering empty defense, `site_unreachable` mapping, generic default + data attribute, and two regression cases (`activated`, no-license-query). Total: **781 / 2726**, PHPCS clean.

### Live verification

Chrome DevTools MCP scripted a tour of mhmrentiva.com after v4.30.2 deployment:

| URL | Expected | Live result |
|---|---|---|
| `?license=error` | No notice (defensive guard) | ✅ 0 notice elements |
| `?license=error&message=site_unreachable` | Friendly EN message + `data-error-code="site_unreachable"`, no raw code in inline text | ✅ confirmed via DOM script |
| `?license=error&message=imaginary_code_42` | Generic message + `data-error-code="imaginary_code_42"`, no raw code in inline text | ✅ confirmed |

## Companion server releases (mhm-license-server, on wpalemi.com)

- **v1.9.0** — Phase A: HMAC response signing, reverse site validation, feature token issuer (24h TTL).
- **v1.9.1** — `site_hash` fallback inside `Security\SiteVerifier::verify()` (paired with v4.30.1 client).
- **v1.9.2** — `SecretManager::getPingSecret()` opt-in only (no file fallback) — closed an asymmetric HMAC bug where the server auto-generated `wp-uploads/mhm-license-secrets/ping.key` while customers ran zero-config and the two paths produced different HMAC keys.
- **v1.9.3 (CRITICAL)** — `LicenseActivator::activate()` now hard-rejects empty `product_slug` against a slug-bound license row. The previous code path let a single source edit drop the slug from the request body and slide through both v1.8.0 binding AND v1.9.0 reverse validation (because `REVERSE_VALIDATION_FLOOR[''] === null` took the legacy-pass branch).

Combined: **143 PHPUnit, 398 assertions, PHPCS clean** on the server side.

Three live attack scenarios were curl-verified against `wpalemi.com` after v1.9.3 deployment:

| Scenario | Expected | Live result |
|---|---|---|
| `product_slug` removed from body | `product_slug_required` reject | ✅ confirmed |
| Cross-product slug swap (CS slug + Rentiva site) | `site_unreachable` (CS verify endpoint absent on Rentiva site) | ✅ confirmed |
| Correct flow regression | 200 active | ✅ confirmed |

## Companion Currency Switcher releases

`mhm-currency-switcher v0.5.0` (Phase C client) → `v0.5.1` (CI hotfix: `str_ends_with` PHP 7.4 compat + `OrderFilterTest` `WC_Order` stub) → `v0.5.2` (`VerifyEndpoint` `site_hash` fallback). Same five-attack-surface defense applied to CS Mode gates with eight feature flags (`fixed_pricing`, `nav_menu_switcher`, `flag_library`, `geolocation`, `payment_restrictions`, `auto_rate_update`, `multilingual`, `rest_api_filter`).

## Customer-facing impact

After this sprint, customers on Rentiva v4.30.1+ (and CS v0.5.2+):

- **Just enter the license key and click Activate.** No `wp-config.php` edits.
- Server-side three-layer defense (slug binding + response signing + reverse validation) is fully active.
- License notice messages are friendly and locale-aware; no raw technical jargon visible.
- Existing v4.27.x installs keep working unchanged through legacy fallback paths until they upgrade.

## Known limitation (deferred)

A sufficiently determined attacker running a cracked plugin binary on **their own** site with **their own** product-matching license can still patch `Mode::canUse*()` directly when the customer has not defined `MHM_RENTIVA_LICENSE_FEATURE_TOKEN_KEY` in `wp-config.php` (zero-config deployment intentionally accepts this trade-off).

Closing the source-edit + zero-config gap requires **asymmetric crypto** (RSA-signed feature tokens, public key embedded in the plugin source — open-source-safe). This is deferred to **mhm-license-server v1.10.0 + mhm-rentiva v4.31.0 + mhm-currency-switcher v0.6.0**, planned post-launch.

## 🎓 Lessons captured (memory + KB)

- **`patterns/license-defense-in-depth-stack.md`** — five-layer defense documentation, attack matrix, asymmetric crypto roadmap.
- **`patterns/admin-notice-url-state-defense.md`** — three-layer defense for redirect-after-action notices (empty guard + generic default + data attribute).
- **`patterns/release-zip-audit.md`** — three audits before tag/release; caught three ZIP leaks during this sprint (`drafts/`, `bin/`, `*.po~`).
- **`standards/i18n-workflow.md`** — updated with `.po~` msgmerge backup pattern + `.l10n.php` deploy mandate.
- **`wp-conductor` skill** — new "Long Session / Chained Release Discipline" gate with per-release verification requirements (8 release chain on 2026-04-25 was the baseline failure that motivated this).

---

*GitHub Releases:*
- *Rentiva: [v4.30.0](https://github.com/MaxHandMade/mhm-rentiva/releases/tag/v4.30.0) · [v4.30.1](https://github.com/MaxHandMade/mhm-rentiva/releases/tag/v4.30.1) · [v4.30.2](https://github.com/MaxHandMade/mhm-rentiva/releases/tag/v4.30.2)*
- *License Server: [v1.9.0](https://github.com/MaxHandMade/mhm-license-server/releases/tag/v1.9.0) · [v1.9.1](https://github.com/MaxHandMade/mhm-license-server/releases/tag/v1.9.1) · [v1.9.2](https://github.com/MaxHandMade/mhm-license-server/releases/tag/v1.9.2) · [v1.9.3](https://github.com/MaxHandMade/mhm-license-server/releases/tag/v1.9.3)*
- *Currency Switcher: [v0.5.0](https://github.com/MaxHandMade/mhm-currency-switcher/releases/tag/v0.5.0) · [v0.5.1](https://github.com/MaxHandMade/mhm-currency-switcher/releases/tag/v0.5.1) · [v0.5.2](https://github.com/MaxHandMade/mhm-currency-switcher/releases/tag/v0.5.2)*
