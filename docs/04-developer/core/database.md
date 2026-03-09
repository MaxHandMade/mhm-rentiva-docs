---
id: database
title: Veritabanı Yapısı
sidebar_label: Veritabanı
slug: /developer/core/database
---

![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, MHM Rentiva veritabanı yapısını ve meta key standardını açıklar.
:::

# Veritabanı Dokümantasyonu

## İçindekiler
- Dosyalar
- Meta Key Kategorileri
- Standart Format
- Kullanım Örneği

## Dosyalar
- `MetaKeysDocumentation.php`
- `DatabaseInitialization.php`
- `DatabaseCleanupPage.php`

## Meta Key Kategorileri
- Araç: `_mhm_vehicle_*`
- Rezervasyon: `_mhm_booking_*`
- Müşteri: `_mhm_customer_*`
- Ödeme: `_mhm_payment_*`
- Makbuz: `_mhm_receipt_*`

## Standart Format
```text
_mhm_[category]_[field_name]
```

## Kullanım Örneği
```php
register_post_meta('vehicle', '_mhm_vehicle_availability', [
    'type'              => 'string',
    'single'            => true,
    'sanitize_callback' => 'sanitize_text_field',
    'show_in_rest'      => true,
]);
```

## Bölüm Sonu Özeti
- Standardizasyon bakım maliyetini azaltır.
- Sanitizasyon ve tip disiplini zorunludur.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa, tek şablon standardına normalize edildi. |

