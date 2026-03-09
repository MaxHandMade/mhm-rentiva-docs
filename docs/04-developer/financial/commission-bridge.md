---
id: commission-bridge
title: WooCommerce Commission Bridge
sidebar_label: Commission Bridge
slug: /developer/financial/commission-bridge
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, `CommissionBridge` bileşeninin WooCommerce siparişleri ile Rentiva finans çekirdeği arasındaki bağını açıklar.
:::

# WooCommerce Commission Bridge

## İçindekiler
- Görev Tanımı
- Veri Eşleme
- Hata ve Tutarlılık
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Görev Tanımı
`CommissionBridge`, sipariş verisini komisyon hesaplama ve ledger akışıyla uyumlu formata dönüştürür.

## Veri Eşleme
- Sipariş tutarı -> komisyon hesap girdileri
- Vendor/booking referansı -> finans kimlik alanları
- Sipariş olayları -> ledger/payout tetikleyicileri

## Hata ve Tutarlılık
- Köprü katmanı idempotent davranmalıdır.
- Mapping hatalarında güvenli fallback ve loglama zorunludur.

## Bölüm Sonu Özeti
- `CommissionBridge`, e-ticaret katmanı ile finans katmanı arasında tek doğruluk köprüsüdür.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | `CommissionBridge` teknik dokümanı eklendi. |

