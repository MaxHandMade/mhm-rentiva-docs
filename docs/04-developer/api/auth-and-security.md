---
id: auth-and-security
title: API Kimlik Doğrulama ve Güvenlik
sidebar_label: Auth ve Güvenlik
slug: /developer/api/auth-and-security
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, API Kimlik Doğrulama ve Güvenlik konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# API Kimlik Doğrulama ve Güvenlik

## İçindekiler
- Kimlik doğrulama
- İstek güvenliği
- Taşıma güvenliği

## Kimlik doğrulama
- WordPress yetki modeli ve token yaklaşımı birlikte kullanılmalıdır.

## İstek güvenliği
- Nonce/CSRF koruması
- Sanitizasyon ve escape
- Yetki kontrolü (`current_user_can`)

## Taşıma güvenliği
- HTTPS zorunlu
- Anahtarların `.env`/sunucu değişkenlerinde tutulması

## Bölüm Sonu Özeti
- API Kimlik Doğrulama ve Güvenlik sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa, tek şablon standardına normalize edildi. |

