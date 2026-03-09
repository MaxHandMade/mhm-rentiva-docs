---
title: Badge Standards Reference
sidebar_label: Badge Standards
---
# Badge Standards - Reference

## İçindekiler
- Current Badge Format (v4.9.8)
- Badge Components
- Style Parameters
- Usage Rules
- Example Implementation
- Files Requiring Badge Updates

## Current Badge Format (v4.9.8)

```markdown
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)
```

:::info Amaç
Bu sayfa, Badge Standards Reference konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

## Badge Components

### Version Badge
- **Color:** Blue
- **Format:** `version-{version}`
- **Example:** `version-4.9.8`

### Security Badge
- **Color:** Green
- **Format:** `security-{status}`
- **Possible Values:** 
  - `WPCS Compliant`
  - `Nonce Hardened`
  - `SQL Safe`

### Updated Badge
- **Color:** Orange
- **Format:** `last updated-{date}`
- **Date Format:** DD.MM.YYYY
- **Example:** `last updated-22.01.2026`

## Style Parameters
- `style=flat-square` - Makes badges square with flat design
- All badges use the same style for consistency

## Usage Rules

1. **Placement:** Add badges immediately after the frontmatter (YAML block)
2. **Order:** Version → Security → Updated
3. **Spacing:** No extra spaces between badges
4. **Date:** Always use current date when updating

## Example Implementation

```markdown
---
id: setup-wizard
title: Kurulum Sihirbazı
sidebar_label: Kurulum Sihirbazı
slug: /getting-started/setup-wizard
---

![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

# Kurulum Sihirbazı (Setup Wizard)

Content starts here...
```

## Files Requiring Badge Updates

All `.md` files in `website/docs/` directory should have this badge format applied.

## Bölüm Sonu Özeti
- Badge Standards Reference sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa, tek şablon standardına normalize edildi. |

