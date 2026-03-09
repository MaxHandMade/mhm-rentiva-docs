---
id: financial-analytics-metrics
title: Analytics ve Finansal Metrikler
sidebar_label: Analytics Metrikleri
slug: /developer/financial/financial-analytics-metrics
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa ledger tabanlı finansal metriklerin nasıl hesaplandığını açıklar.
:::

# Analytics ve Finansal Metrikler

## İçindekiler
- Gelir Hesabı
- Metrikler
- Önemli Detaylar

`AnalyticsService`, yalnızca ledger tablosunu okur.

## Gelir Hesabı
- `vendor_id = `
- `status = cleared`
- `type IN (commission_credit, commission_refund)`

## Metrikler
- `get_revenue_period()`
- `get_growth_rate()`
- `get_avg_booking_value()`
- `get_sparkline_data()`

## Önemli Detaylar
- Önceki dönem `0` ise growth sonucu `null` döner.
- Ortalama booking değeri sadece `commission_credit` kayıtlarından hesaplanır.

![Diyagram: financial-analytics-metrics](/img/docs/financial/fin-fin-img-analytics-001.svg)

## Bölüm Sonu Özeti
- Metrikler ledger odaklı, UTC normalize ve denetlenebilir şekilde hesaplanır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 2026-02-26 | 4.21.0-docs | Karakter/encoding düzeltmesi ve içerik standardizasyonu. |

