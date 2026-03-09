---
id: api-key-manager
title: API Key Manager
sidebar_label: API Key Manager
slug: /developer/api/api-key-manager
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, `APIKeyManager` bileşeninin anahtar üretimi, saklama ve döndürme süreçlerini açıklar.
:::

# API Key Manager

## İçindekiler
- Bileşen Rolü
- Anahtar Yaşam Döngüsü
- Güvenlik Kuralları
- Operasyon Önerileri
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Bileşen Rolü
`APIKeyManager`, REST entegrasyonlarında kullanılacak anahtarların yönetiminden sorumludur.

## Anahtar Yaşam Döngüsü
- Üretim
- Aktivasyon
- Rotasyon
- İptal

## Güvenlik Kuralları
- Anahtarlar açık metin olarak loglanmamalıdır.
- Periyodik anahtar rotasyonu yapılmalıdır.
- Eski anahtarların geri dönüşsüz iptali uygulanmalıdır.

## Operasyon Önerileri
- Ortam bazlı anahtar ayrımı (dev/stage/prod)
- Anahtar değişimlerinde kısa süreli çift anahtar geçiş stratejisi

## Bölüm Sonu Özeti
- `APIKeyManager`, entegrasyon güvenliğinin temel bileşenidir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | `APIKeyManager` teknik dokümanı eklendi. |

