---
id: transfer-api-and-webhooks
title: Transfer API ve Webhook Akışları
sidebar_label: Transfer API ve Webhook
slug: /developer/api/transfer-api-and-webhooks
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, transfer rezervasyon akışındaki API temas noktaları ve payout callback webhook güvenliğini özetler.
:::

# Transfer API ve Webhook Akışları

## İçindekiler
- Transfer Uç Noktaları
- Payout Callback
- Health Endpoint
- Rate Limiting
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Transfer Uç Noktaları
Transfer modülü frontend tarafında kısa kod + AJAX yaklaşımıyla çalışır.

- AJAX aksiyonu: `rentiva_transfer_add_to_cart`
- Nonce doğrulaması: `rentiva_transfer_nonce`
- Sepet veri modeli: `booking_type=transfer`

## Payout Callback
`PayoutCallbackController` ödeme sağlayıcı callback'ini alır.

- Route: `/mhm-rentiva/v1/payouts/{id}/callback`
- Kimlik doğrulama: imza tabanlı doğrulama
- Replay/rate koruması: `WebhookRateLimiter`
- Idempotent işleme: aynı callback tekrarında veri bütünlüğü korunur

## Health Endpoint
`HealthController` servis sağlık durumunu döner.

- Route: `/mhm-rentiva/v1/health`
- Kullanım: monitoring, smoke test, deploy sonrası canlılık kontrolü

## Rate Limiting
- REST tarafında genel hız sınırları `RateLimiter` ile uygulanır.
- Callback tarafında ayrı kimlik tabanlı limit stratejisi kullanılır.

![Placeholder: webhook-security-flow](/img/docs/placeholders/webhook-security-flow.svg)

## Bölüm Sonu Özeti
- Transfer ve finans callback akışları farklı güvenlik katmanlarıyla korunur.
- Webhook güvenliği için imza + rate + idempotency birlikte zorunludur.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Transfer API ve webhook teknik sayfası eklendi. |
