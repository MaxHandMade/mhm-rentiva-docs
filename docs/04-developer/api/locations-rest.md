---
id: locations-rest
title: Locations REST Endpointi
sidebar_label: Locations REST
slug: /developer/api/locations-rest
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, `Admin\REST\Locations` endpointinin konum servisleme davranışını özetler.
:::

# Locations REST Endpointi

## İçindekiler
- Endpoint Tanımı
- Filtreleme Modeli
- Rate ve Güvenlik
- Operasyon Notları
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Endpoint Tanımı
- Kaynak: `Admin\REST\Locations`
- Amaç: Aktif konumların frontend ve entegrasyonlara güvenli şekilde servis edilmesi

## Filtreleme Modeli
- Servis tipi (`rental`, `transfer`, `both`) bazlı filtreleme
- Aktif/pasif konum ayrımı
- Gerektiğinde cache katmanı ile hızlandırma

## Rate ve Güvenlik
- İstek başına rate kontrolü uygulanır.
- Parametre doğrulaması ve güvenli çıktı standarttır.

## Operasyon Notları
- Konum veri kalitesi rota sonuçlarını doğrudan etkiler.
- Konum değişikliği sonrası arama senaryoları yeniden test edilmelidir.

## Bölüm Sonu Özeti
- Locations endpointi, arama ve transfer deneyiminin temel veri kaynağıdır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Locations REST teknik dokümanı eklendi. |

