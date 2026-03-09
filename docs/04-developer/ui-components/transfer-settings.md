---
id: transfer-settings
title: Transfer Settings Teknik Rehberi
sidebar_label: Transfer Settings
slug: /developer/ui-components/transfer-settings
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, `TransferSettings` ve ilgili renderer katmanının ayar sözleşmesini açıklar.
:::

# Transfer Settings Teknik Rehberi

## İçindekiler
- Ayar Grupları
- TransferSettings Sınıfı
- Renderer Entegrasyonu
- Doğrulama Kuralları
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Ayar Grupları
- Ödeme davranışı (tam ödeme/depozito)
- Fiyatlandırma varsayılanları
- Arama/form davranış seçenekleri

## TransferSettings Sınıfı
`TransferSettings`, transfer ayar alanlarını tanımlar ve sanitize/validation adımlarını uygular.

## Renderer Entegrasyonu
- `TransferSettingsRenderer` ayarları admin UI'da gösterir.
- `SettingsService`/`SettingsCore` ile kayıt/okuma akışı bütünleşir.

## Doğrulama Kuralları
- Sayısal alanlar min/max aralığında doğrulanmalıdır.
- Kritik ayarlar değiştiğinde örnek transfer aramasıyla smoke test önerilir.

## Bölüm Sonu Özeti
- `TransferSettings`, transfer modülünün davranışını merkezden yöneten ana ayar bileşenidir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | `TransferSettings` teknik dokümanı eklendi. |

