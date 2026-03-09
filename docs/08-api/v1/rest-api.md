---
sidebar_position: 2
title: REST API
description: MHM Rentiva REST API dokümantasyonu
slug: /api/v1/rest-api
---

![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Rentiva REST API uç noktalarýnýn kullaným ve güvenlik çerçevesini açýklar.
:::

# REST API Dokümantasyonu

## Ýçindekiler
- Güvenlik
- Availability Endpoints
- Mesajlaþma Endpoints (Admin)
- Mesajlaþma Endpoints (Müþteri)

## Güvenlik
- Rate limiting
- IP whitelist/blacklist
- HTTPS zorunluluðu
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

## Mesajlaþma Endpoints (Admin)
- `GET /mhm-rentiva/v1/messages`
- `GET /mhm-rentiva/v1/messages/{id}`
- `POST /mhm-rentiva/v1/messages/{id}/reply`
- `POST /mhm-rentiva/v1/messages/{id}/status`

## Mesajlaþma Endpoints (Müþteri)
- `POST /mhm-rentiva/v1/messages`
- `POST /mhm-rentiva/v1/messages/{id}/reply`

## Bölüm Sonu Özeti
- API kullanýmýnda hýz limiti ve yetki modeli birlikte ele alýnmalýdýr.
- Uç noktalar, servis katmaný kurallarýyla uyumlu kullanýlmalýdýr.

## Deðiþiklik Günlüðü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa, tek þablon standardýna normalize edildi. |


