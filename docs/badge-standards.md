---
id: badge-standards
title: Badge Standards & Usage Guide
sidebar_label: Badge Standards
sidebar_position: 120
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-standard_v2-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This guide defines the standards, color codes, and usage rules for the visual badges used across MHM Rentiva documentation pages.
:::

# 🏷️ Badge Standards & Usage Guide

`Shields.io`-based badges are used to quickly visualize the currency and technical level of each documentation page.

---

## 🔝 1. Current Badge Format (v4.27.2)

The standard sequence that must appear at the top of every page:

```markdown
![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)
```

---

## 🏛️ 2. Badge Components

### Version Badge
- **Color:** Blue (`blue`)
- **Format:** `version-{plugin_version}`
- **Usage:** Indicates which major plugin version this page is compatible with.

### Security & Compliance Badges
- **Color:** Green (`green`) or Dark Green (`0f766e`)
- **Values:**
  - `WPCS Compliant`: Compliant with WordPress Coding Standards.
  - `Security Hardened`: Security hardening applied.
  - `SQL Safe`: Protected against SQL Injection.

### Updated Badge
- **Color:** Orange (`orange`)
- **Format:** `last updated-DD.MM.YYYY`
- **Usage:** Shows when the page was last reviewed or updated.

---

## 🎨 3. Style Parameters

All badges must use the following parameters for visual consistency:
- **`style=flat-square`**: Provides a modern, square-edged appearance.
- **`logo=...`**: Brand logos can be added where required.

---

## 📏 4. Usage Rules

1. **Position:** Badges must be placed immediately after the YAML frontmatter and before the main heading (`#`).
2. **Order:** The standard order is: **Version** → **Doc Type / Security** → **Last Updated**.
3. **Spacing:** Leave a single space between badges.
4. **Accuracy:** The updated date must always reflect the date the change was made.

---

## 📝 5. Example

```markdown
---
id: sample-page
title: Sample Page
---
![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

# Sample Title
Content goes here...
```

## Section Summary
- Consistent badge usage gives the documentation a professional appearance.
- All pages have been normalized to the new format as of v4.21.2.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | v4.21.2 standards and new color codes added. |
