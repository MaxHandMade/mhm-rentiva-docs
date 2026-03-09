---
id: trend-service-and-metrics
title: TrendService ve Metrik Altyapısı
sidebar_label: TrendService ve Metrikler
slug: /developer/financial/trend-service-and-metrics
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, `TrendService`, `MetricRegistry` ve `UpcomingPickupsMetric` bileşenlerinin nasıl birlikte çalıştığını açıklar.
:::

# TrendService ve Metrik Altyapısı

## İçindekiler
- TrendService Rolü
- MetricRegistry Yapısı
- UpcomingPickupsMetric
- Dashboard Entegrasyonu
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## TrendService Rolü
`TrendService`, belirli dönemlerdeki metrik eğilimlerini hesaplar ve dashboard katmanına taşır.

## MetricRegistry Yapısı
`MetricRegistry`, metrik sınıflarını merkezi olarak kayıt eder ve çağırır.

- Metrik ekleme standardı
- Ortak cache/hesaplama davranışı
- Yetki ve kapsam kontrolü

## UpcomingPickupsMetric
`UpcomingPickupsMetric`, ileri tarihli pickup sayısını üretir ve kullanıcı/vendor panelinde KPI olarak sunar.

## Dashboard Entegrasyonu
- Dashboard provider sınıfları metrikleri registry üzerinden çeker.
- Trend hesaplamaları görsel bileşenlerde sparkline olarak gösterilebilir.

## Bölüm Sonu Özeti
- Trend ve metrik sistemi, finans/operasyon kararlarında tek bir hesaplama standardı sağlar.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | `TrendService`, `MetricRegistry`, `UpcomingPickupsMetric` dokümanı eklendi. |

