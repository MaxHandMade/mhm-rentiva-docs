---
id: emails
title: E-posta Şablonları
sidebar_label: E-posta Ayarları
slug: /core-configuration/emails
---

![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Rentiva e-posta şablonlarının yönetimini ve güvenli kullanımını açıklar.
:::

# E-posta Şablonları

## İçindekiler
- Genel Yapılandırma
- Bildirim Şablonları
- Önizleme ve Test
- Sıfırlama
- Bölüm Sonu Özeti

## Genel Yapılandırma
- Gönderen adı (`From Name`)
- Gönderen adresi (`From Address`)
- Test modu
- Tasarım alanları (başlık görseli, ana renk, altbilgi)

## Bildirim Şablonları
- Yeni rezervasyon (yönetici)
- Rezervasyon onayı (müşteri)
- Manuel iptal
- Otomatik iptal
- İade bildirimi
- Mesajlaşma bildirimleri

Her şablonda `subject` ve `body` ayrı düzenlenir. Değişkenler (`{customer_name}`, `{booking_total}` vb.) desteklenir.

## Önizleme ve Test
- Şablonları kaydetmeden önce önizleyin.
- Test e-postasını doğrulanmış bir adrese gönderin.
- Üretim öncesi SMTP akışını kontrol edin.

## Sıfırlama
- Genel ayarları sıfırlama
- Tüm şablonları varsayılanlara döndürme

> Bu işlem geri alınamaz; özel şablonlar için yedek alın.

## Bölüm Sonu Özeti
- Şablonlar sürümlenmeli ve değişken kullanım standardı korunmalıdır.
- Test modu ve önizleme, yanlış gönderimi önler.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa, tek şablon standardına normalize edildi. |

