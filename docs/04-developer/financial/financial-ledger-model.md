---
id: financial-ledger-model
title: Ledger Veri Modeli
sidebar_label: Ledger Modeli
slug: /developer/financial/financial-ledger-model
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa ledger tablosunun alanlarını, tiplerini ve finansal etki kurallarını tanımlar.
:::

# Ledger Veri Modeli

## İçindekiler
- Kritik Alanlar
- Ledger Tipleri
- Domain Kuralları

Tablo: `${wpdb->prefix}mhm_rentiva_ledger`

## Kritik Alanlar
- `transaction_uuid` (UNIQUE)
- `vendor_id`
- `type`
- `amount`
- `status`
- `created_at` (UTC)
- `policy_id`, `policy_version_hash`

## Ledger Tipleri
- `commission_credit`
- `commission_refund`
- `payout_debit`
- `payout_reversal`

## Domain Kuralları
- `payout_debit` negatif tutar.
- `payout_reversal` pozitif tutarla ters kayıt üretir.
- Bakiye hesabı sadece `status='cleared'` kayıtları ile yapılır.

![Diyagram: financial-ledger-model](/img/docs/financial/fin-fin-img-ledger-001.svg)

## Bölüm Sonu Özeti
- Ledger tablosu immutable ve denetlenebilir bir kayıt katmanıdır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 2026-02-26 | 4.21.0-docs | Karakter/encoding düzeltmesi ve içerik standardizasyonu. |

