---
id: transfer-and-webhook-testing
title: Transfer ve Webhook Test Stratejisi
sidebar_label: Transfer/Webhook Testleri
slug: /developer/testing/transfer-and-webhook-testing
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, transfer akışı ve payout callback webhook hattı için minimum test kapsamını tanımlar.
:::

# Transfer ve Webhook Test Stratejisi

## İçindekiler
- Transfer Test Kapsamı
- Webhook Test Kapsamı
- Negatif Senaryolar
- CI/CD Kontrolleri
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Transfer Test Kapsamı
- Rota bulunamadığında boş sonuç davranışı
- Kapasite filtresi ve bagaj skoru doğruluğu
- Çakışma kontrolü (`has_overlap`) doğrulaması
- Sepete ekleme ve booking meta yazımı

## Webhook Test Kapsamı
- Geçerli imza ile callback kabulü
- Geçersiz imza ile reddetme
- Rate limit aşımlarında doğru HTTP yanıtı
- Idempotent callback tekrarlarının güvenli işlenmesi

## Negatif Senaryolar
- Eksik parametre
- Yanlış rota kimliği
- Hatalı tarih/saat kombinasyonu
- Tekrarlanan callback payload'ı

## CI/CD Kontrolleri
- PR seviyesinde unit + integration koşuları
- Deploy öncesi health endpoint smoke testi
- Deploy sonrası örnek transfer rezervasyon e2e doğrulaması

![Placeholder: transfer-test-matrix](/img/docs/placeholders/transfer-test-matrix.svg)

## Bölüm Sonu Özeti
- Transfer ve webhook hatlarının aynı sprint içinde birlikte test edilmesi gerekir.
- Negatif senaryolar olmadan canlı güvenilirliği sağlanamaz.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Transfer/webhook test stratejisi dokümanı eklendi. |
