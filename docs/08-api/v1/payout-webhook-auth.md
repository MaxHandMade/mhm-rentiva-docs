---
id: payout-webhook-auth
title: Payout Webhook Kimlik Doğrulama
sidebar_label: Payout Webhook Auth
slug: /api/v1/payout-webhook-auth
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, `PayoutWebhookAuth` ve ilgili callback güvenlik modelini özetler.
:::

# Payout Webhook Kimlik Doğrulama

## İçindekiler
- Kimlik Doğrulama Modeli
- İmza Doğrulama
- Replay/Rate Koruması
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Kimlik Doğrulama Modeli
`PayoutWebhookAuth`, webhook isteğinin güvenilir kaynaktan geldiğini doğrular.

## İmza Doğrulama
- Header tabanlı imza alınır.
- Payload ile birlikte doğrulama yapılır.
- Hatalı imza istekleri güvenli şekilde reddedilir.

## Replay/Rate Koruması
- `WebhookRateLimiter` ile aşırı istek engellenir.
- İdempotent callback stratejisi ile tekrar gönderimler güvenli işlenir.

## Bölüm Sonu Özeti
- Webhook güvenliği için `PayoutWebhookAuth` doğrulaması zorunludur.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | `PayoutWebhookAuth` dokümanı eklendi. |


