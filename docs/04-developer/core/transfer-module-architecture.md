---
id: transfer-module-architecture
title: Transfer Modülü Mimarisi
sidebar_label: Transfer Mimarisi
slug: /developer/core/transfer-module-architecture
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, transfer modülünün çekirdek sınıflarını, veri akışını ve sorumluluk sınırlarını açıklar.
:::

# Transfer Modülü Mimarisi

## İçindekiler
- Sınıf Haritası
- Veri Akışı
- Veri Modeli
- Kritik Hook/Aksiyonlar
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Sınıf Haritası
- `TransferSearchEngine`: Uygun transfer araçlarını arar ve fiyatlar.
- `TransferShortcodes`: Transfer arama formunu ve frontend varlıklarını yönetir.
- `TransferResults`: Sonuç render akışını yönetir.
- `TransferCartIntegration`: Sepet/checkout aşamasında transfer verisini işler.
- `TransferBookingHandler`: Siparişten rezervasyona transfer meta alanlarını taşır.
- `LocationProvider`: Konum verisini servis eder ve cache katmanı uygular.

## Veri Akışı
1. Kullanıcı arama kriterlerini gönderir.
2. `TransferSearchEngine::search()` rota + kapasite + müsaitlik filtrelerini uygular.
3. Seçilen seçenek `TransferCartIntegration` ile sepete yazılır.
4. Checkout tamamlandığında `TransferBookingHandler` meta alanları rezervasyona kaydeder.

![Placeholder: transfer-architecture-diagram](/img/docs/placeholders/transfer-architecture-diagram.svg)

## Veri Modeli
- `*_transfer_locations`: Konum kaydı
- `*_transfer_routes`: Rota/fiyat/mesafe/süre kaydı
- Rezervasyon meta: `transfer_origin_id`, `transfer_destination_id`, `transfer_distance_km`, `transfer_duration_min`

## Kritik Hook/Aksiyonlar
- AJAX: `rentiva_transfer_add_to_cart`
- Domain akışı: `mhm_rentiva_booking_created`
- WooCommerce: `woocommerce_checkout_create_order_line_item`

## Bölüm Sonu Özeti
- Transfer modülü, arama motoru + sepet entegrasyonu + booking meta kaydı üç katmanından oluşur.
- Servis sınırları korunarak geliştirildiğinde bakım ve test maliyeti düşer.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Transfer mimarisi sayfası eklendi. |
