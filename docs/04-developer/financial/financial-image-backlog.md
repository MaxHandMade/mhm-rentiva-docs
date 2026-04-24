---
id: financial-image-backlog
title: Financial Image Backlog (Assets)
sidebar_label: Financial Image Backlog
sidebar_position: 10
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
This page tracks the current status of diagrams, technical drawings, and media assets used in the financial documentation.
:::

# 🖼️ Financial Image Backlog

The documentation system now uses **Dynamic Mermaid Diagrams** and **Static SVG** icons in a hybrid approach. The list below shows which technical page relies on which visual asset.

## 📊 Diagram and Image Inventory

| Code | File Path / Type | Status | Page Reference |
| :--- | :--- | :--- | :--- |
| **FIN-MERMAID-OVERVIEW** | `Mermaid Code` | ✅ Current | Financial Overview |
| **FIN-IMG-LEDGER-001** | `ledger-001.svg` | 🔄 Pending Revision | Ledger Model |
| **FIN-MERMAID-POLICY** | `Mermaid Code` | ✅ Current | Commission and Policy |
| **FIN-MERMAID-GOV** | `Mermaid Code` | ✅ Current | Governance Controls |
| **FIN-IMG-ANALYTICS-001** | `analytics-001.svg`| ✅ Current | Analytics Metrics |
| **FIN-IMG-DB-001** | `db-001.svg` | ⚠️ Missing (V4.21) | Database Architecture |
| **FIN-MERMAID-SIG** | `Mermaid Code` | ✅ Current | Audit Crypto & Integrity |

---

## 🛠️ Visual Standards

1. **Mermaid Usage:** Mermaid should always be preferred for architectural flows and sequence diagrams. This allows diagrams to be updated easily whenever the documentation is updated.
2. **SVG Format:** SVG files under `/static/img/docs/financial/` are used for fixed schemas and table relationships.
3. **Naming Convention:** Follow the `fin-fin-img-{category}-{index}.svg` format strictly.

---

## 📅 Upcoming Additions (TODO)

- [ ] **Payout Journey Map:** Sequence diagram showing the Payout request journey from end user to bank.
- [ ] **Crypto Hash Chain Visualizer:** Technical illustration showing how the SHA-256 chain links together.
- [ ] **Tax Flow Diagram:** Distribution diagram of tax line items (VAT, Withholding) across the Ledger.

## Section Summary
- The image backlog is the central checklist for dynamic and static assets.
- All newly added Mermaid diagrams must be registered in this list.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Image backlog modernized to reflect Mermaid migration and new asset structure. |
| 26.02.2026 | 4.21.0-docs | Page normalized to single template standard. |
