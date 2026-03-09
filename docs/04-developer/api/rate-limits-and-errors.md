---
id: rate-limits-and-errors
title: API Rate Limit ve Hata Kodları
sidebar_label: Rate Limit ve Hata Kodları
slug: /developer/api/rate-limits-and-errors
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, API Rate Limit ve Hata Kodları konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# API Rate Limit ve Hata Kodları

## İçindekiler
- Rate limit
- Yaygın kodlar
- Loglama

## Rate limit
- Varsayılan limit: ortam ayarına göre dakika bazlı istek limiti.
- Aşım durumunda: `429 Too Many Requests`.

## Yaygın kodlar
- `400`: Geçersiz parametre
- `401`: Kimlik doğrulama eksik/hatalı
- `403`: Yetkisiz işlem
- `404`: Kaynak bulunamadı
- `409`: Durum çakışması
- `500`: Sunucu hatası

## Loglama
- Her hata için correlation id üretin.
- Hata gövdesinde kullanıcıya güvenli, geliştiriciye anlamlı mesaj döndürün.

## Bölüm Sonu Özeti
- API Rate Limit ve Hata Kodları sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa, tek şablon standardına normalize edildi. |

