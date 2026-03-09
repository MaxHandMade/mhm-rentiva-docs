---
sidebar_position: 2
title: REST API
description: MHM Rentiva REST API dokümantasyonu
slug: /developer/api/rest-api
---

![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Rentiva REST API uç noktalarının kullanım ve güvenlik çerçevesini açıklar.
:::

# REST API Dokümantasyonu

## İçindekiler
- Güvenlik
- Availability Endpoints
- Mesajlaşma Endpoints (Admin)
- Mesajlaşma Endpoints (Müşteri)

## Güvenlik
- Rate limiting
- IP whitelist/blacklist
- HTTPS zorunluluğu
- Yetki kontrolü

## Availability Endpoints
### `GET /mhm-rentiva/v1/availability`
Parametreler:
- `vehicle_id`
- `pickup_date`
- `pickup_time`
- `dropoff_date`
- `dropoff_time`

### `GET /mhm-rentiva/v1/availability/with-alternatives`
Ek parametre:
- `limit`

## Mesajlaşma Endpoints (Admin)
- `GET /mhm-rentiva/v1/messages`
- `GET /mhm-rentiva/v1/messages/{id}`
- `POST /mhm-rentiva/v1/messages/{id}/reply`
- `POST /mhm-rentiva/v1/messages/{id}/status`

## Mesajlaşma Endpoints (Müşteri)
- `POST /mhm-rentiva/v1/messages`
- `POST /mhm-rentiva/v1/messages/{id}/reply`

## Bölüm Sonu Özeti
- API kullanımında hız limiti ve yetki modeli birlikte ele alınmalıdır.
- Uç noktalar, servis katmanı kurallarıyla uyumlu kullanılmalıdır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa, tek şablon standardına normalize edildi. |

