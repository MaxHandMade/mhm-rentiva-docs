---
id: financial-rest-callbacks
title: Payout Callback API
sidebar_label: Payout Callback API
slug: /api/v1/financial-rest-callbacks
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Payout Callback API konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# Payout Callback API

## İçindekiler
- Güvenlik
- Payload
- İş Kuralları

Endpoint: `POST /mhm-rentiva/v1/payouts/{id}/callback`

## Güvenlik
- `X-MHM-Timestamp`
- `X-MHM-Signature`
- HMAC SHA256
- Tolerans: `300 sn`
- Rate limit: `20/60 sn`

## Payload
```json
{
  "status": "confirmed",
  "external_reference": "PROC_TRX_123"
}
```

## İş Kuralları
- `confirmed`: ledger değişmez.
- `failed`: `payout_reversal` ledger satırı eklenir.
- `_mhm_payout_status` doluysa idempotent 200 döner.

![Diyagram: financial-rest-callbacks](/img/docs/financial/fin-fin-img-callback-001.svg)

## Bölüm Sonu Özeti
- Payout Callback API sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa, tek şablon standardına normalize edildi. |


