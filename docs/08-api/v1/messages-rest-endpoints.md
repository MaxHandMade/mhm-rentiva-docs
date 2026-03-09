---
id: messages-rest-endpoints
title: Mesajlaşma REST Endpointleri
sidebar_label: Mesajlaşma REST
slug: /api/v1/messages-rest-endpoints
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, mesajlaşma modülündeki admin/müşteri REST endpoint yapısını ve yetki modelini açıklar.
:::

# Mesajlaşma REST Endpointleri

## İçindekiler
- Modül Yapısı
- Admin Endpointleri
- Müşteri Endpointleri
- Yetki ve Güvenlik
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Modül Yapısı
Kayıt noktası: `Admin\Messages\REST\Messages::register()`

- Admin namespace handler'ları
- Customer namespace handler'ları
- Ortak yardımcılar: `Auth`, `MessageQuery`, `MessageFormatter`

## Admin Endpointleri
- Mesaj listesi ve detay
- Durum güncelleme
- Yönetici yanıtı

## Müşteri Endpointleri
- Mesaj oluşturma
- Thread okuma
- Yanıt gönderme
- Mesaj kapatma

## Yetki ve Güvenlik
- Kullanıcı/rol doğrulaması endpoint seviyesinde zorunludur.
- Thread erişimi sahiplik kontrolü ile sınırlandırılır.
- Girdi sanitizasyonu ve güvenli çıktı kuralları uygulanır.

## Bölüm Sonu Özeti
- Mesajlaşma API'si admin ve müşteri sorumluluklarını net ayırır.
- Güvenli erişim için auth + sahiplik + validasyon birlikte uygulanmalıdır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Mesajlaşma REST endpointleri teknik dokümanı eklendi. |

