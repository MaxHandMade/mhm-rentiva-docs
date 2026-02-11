---
title: Badge Standards Reference
sidebar_label: Badge Standards
---

# Badge Standards - Reference

## Current Badge Format (v4.9.8)

```markdown
![Version](https://img.shields.io/badge/version-4.9.8-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-11.02.2026-orange?style=flat-square)
```

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

![Version](https://img.shields.io/badge/version-4.9.8-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-11.02.2026-orange?style=flat-square)

# Kurulum Sihirbazı (Setup Wizard)

Content starts here...
```

## Files Requiring Badge Updates

All `.md` files in `website/docs/` directory should have this badge format applied.
