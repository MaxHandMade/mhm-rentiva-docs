---
id: financial-governance-controls
title: Governance Kontrolleri
sidebar_label: Governance Kontrolleri
slug: /developer/financial/financial-governance-controls
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa payout onay sürecindeki yetki, freeze ve audit kurallarını özetler.
:::

# Governance Kontrolleri

## İçindekiler
- Yetkiler
- Freeze
- Audit

## Yetkiler
- `mhm_rentiva_approve_payout`
- `mhm_rentiva_freeze_payouts`
- `mhm_rentiva_view_financial_audit`

## Freeze
- Global: `mhm_rentiva_global_payout_freeze`
- Vendor: `_mhm_vendor_payout_freeze`

## Audit
Tablo: `${wpdb->prefix}mhm_rentiva_payout_audit`

- `payout_id`, `actor_user_id`, `action`, `tx_uuid`, `ip_hash`, `created_at`
- Tekillik: `UNIQUE (payout_id, action, tx_uuid)`

![Diyagram: financial-governance-controls](/img/docs/financial/fin-fin-img-gov-001.svg)

## Bölüm Sonu Özeti
- Governance katmanı finansal onayı policy + audit + capability ile güvenceye alır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 2026-02-26 | 4.21.0-docs | Karakter/encoding düzeltmesi ve içerik standardizasyonu. |

