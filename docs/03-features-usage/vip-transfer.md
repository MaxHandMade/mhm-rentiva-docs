---
id: vip-transfer
title: VIP Transfer Modülü
sidebar_label: VIP Transfer
slug: /features-usage/vip-transfer
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, VIP Transfer modülünün işletme tarafı kurulumunu, kullanıcı akışını ve temel teknik davranışlarını açıklar.
:::

# VIP Transfer Modülü

## İçindekiler
- Genel Bakış
- Kurulum Adımları
- Kullanım Akışı
- İş Kuralları
- Teknik Notlar
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Genel Bakış
VIP Transfer modülü, A noktasından B noktasına şoförlü transfer rezervasyonu üretmek için tasarlanmıştır.

- Rota bazlı fiyatlandırma (`fixed` / mesafe bazlı)
- Yolcu ve bagaj kapasitesine göre araç eşleme
- WooCommerce sepet/ödeme akışıyla tam entegrasyon

## Kurulum Adımları
1. `MHM Rentiva > Transfer Locations` altında konumları tanımlayın.
2. `MHM Rentiva > Transfer Routes` altında rota ve fiyat modelini belirleyin.
3. `MHM Rentiva > Settings > Transfer` altında ödeme politikasını ayarlayın.

## Kullanım Akışı
1. Frontend arama formunda rota + tarih + yolcu/bagaj bilgisi girilir.
2. Sistem uygun araçları listeler.
3. Kullanıcı aracı sepete ekler.
4. Checkout sonrası transfer meta alanları rezervasyona kaydedilir.

Kullanılan shortcode:

```html
[rentiva_transfer_search]
```

![Placeholder: transfer-search-flow](/img/docs/placeholders/transfer-search-flow.svg)

## İş Kuralları
- Çakışma kontrolü rezervasyon saat aralığı ve buffer mantığı ile yapılır.
- Araç kapasitesi yolcu/bagaj puanına göre filtrelenir.
- Depozito veya tam ödeme politikası ayarlardan okunur.

## Teknik Notlar
- Rota/konum verileri transfer tablolarından alınır.
- Sepete ekleme transfere özel AJAX akışı ile yürütülür.
- Rezervasyon tipi `transfer` olarak işaretlenir.

## Bölüm Sonu Özeti
- VIP Transfer akışı, rota + kapasite + ödeme politikası üçlüsüyle çalışır.
- Operasyonel doğruluk için rota verisi ve ayarların güncel tutulması kritiktir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa güncel transfer modülü davranışına göre yeniden yazıldı. |
