---
id: transfer-admin-panels
title: Transfer Admin Panelleri
sidebar_label: Transfer Admin Panelleri
slug: /developer/ui-components/transfer-admin-panels
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, transfer modülündeki admin ekranlarının sorumluluklarını ve doğru kullanım modelini açıklar.
:::

# Transfer Admin Panelleri

## İçindekiler
- Ekranlar
- Veri Girişi Kuralları
- Export/Import
- UX Notları
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Ekranlar
- Transfer Locations
- Transfer Routes
- Transfer Settings
- Transfer araç meta alanları

## Veri Girişi Kuralları
- Konum adları benzersiz ve normalize edilmelidir.
- Rota tanımında origin/destination çifti net olmalıdır.
- Mesafe/süre/fiyat alanları tip doğrulaması ile kaydedilmelidir.

## Export/Import
`TransferExportImport` bileşeni, transfer yapılandırmasının taşınmasını sağlar.

- Import öncesi şema doğrulaması yapılmalıdır.
- Üretim ortamında import işlemi sonrası örnek arama testi zorunludur.

## UX Notları
- Operatör hatasını azaltmak için alan yardım metinleri açık olmalıdır.
- Kritik değişikliklerde onay ekranı gösterilmelidir.

![Placeholder: transfer-admin-screen-map](/img/docs/placeholders/transfer-admin-screen-map.svg)

## Bölüm Sonu Özeti
- Transfer admin panelleri veri kalitesini doğrudan etkiler.
- Input doğrulama + import kontrolü olmadan canlıya çıkılmamalıdır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Transfer admin panelleri teknik sayfası eklendi. |
