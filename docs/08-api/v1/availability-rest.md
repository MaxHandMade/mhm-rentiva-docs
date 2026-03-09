---
id: availability-rest
title: Availability REST Endpointi
sidebar_label: Availability REST
slug: /api/v1/availability-rest
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, `Admin\REST\Availability` endpointinin giriş/çıkış sözleşmesini açıklar.
:::

# Availability REST Endpointi

## İçindekiler
- Endpoint Tanımı
- Parametreler
- Validasyon
- Hata Durumları
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Endpoint Tanımı
- Kaynak: `Admin\REST\Availability`
- Amaç: Belirli tarih/saat aralığında araç müsaitlik kontrolü

## Parametreler
- `vehicle_id`
- `pickup_date`
- `pickup_time`
- `dropoff_date`
- `dropoff_time`

## Validasyon
- Tarih sıralaması doğrulanmalıdır.
- İstek hacmi `RateLimiter` ile korunmalıdır.
- Girdi sanitizasyonu zorunludur.

## Hata Durumları
- Geçersiz parametre (`400`)
- Yetki/kimlik sorunu (`401/403`)
- Sunucu işleme hatası (`500`)

## Bölüm Sonu Özeti
- Availability endpointi, rezervasyon kalitesi için kritik doğrulama noktasıdır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Availability REST teknik dokümanı eklendi. |


