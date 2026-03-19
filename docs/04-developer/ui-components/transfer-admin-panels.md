---
id: transfer-admin-panels
title: Transfer Admin Panelleri (UI & Dashboards)
sidebar_label: Transfer Admin Panelleri
sidebar_position: 7
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Rentiva'nın araç transferi (Havalimanı VIP, Şehirlerarası vb.) operasyonlarını yöneten admin arayüzlerinin teknik mimarisini ve veri giriş kurallarını açıklar.
:::

# 🛣️ Transfer Admin Panelleri

Transfer modülü, standart araç kiralamadan farklı olarak lokasyon bazlı bir ağ yapısı üzerinde çalışır. `TransferAdmin` sınıfı, bu ağın yönetildiği ekranları (Locations, Routes, Stats) merkezi olarak kontrol eder.

---

## 🏗️ Mimari Bileşenler

Modül, veri girişi ve görselleştirme için üç ana bileşen kullanır:
1.  **Stats Cards:** Lokasyon, rota ve son işlem verilerini gösteren üst panel.
2.  **Location Manager:** Havalimanı, Otel, Liman gibi transfer noktalarının tanımı.
3.  **Route Configurator:** İki lokasyon arasındaki mesafe, süre ve fiyatlandırma kuralları.

---

## 📊 Transfer İstatistik Kartları (Stats)

Admin panelinin üst kısmında yer alan `render_transfer_stats()` metodu, anlık operasyonel veriyi sunar:

- **Total Locations:** `rentiva_transfer_locations` tablosundaki aktif transfer noktaları.
- **Active Routes:** Tanımlanmış ve fiyatlandırılmış geçerli rotalar.
- **Latest Operation:** En son yapılan `transfer` tipindeki rezervasyonun tarihi.

---

## 📍 Lokasyon Tipleri (Location Types)

Sistem aşağıdaki dâhili tipleri destekler ve bu tipler Dashboard üzerinde ikonografiyi değiştirir:
- 🛫 **Airport:** Havalimanı noktaları.
- 🏨 **Hotel:** Konaklama tesisleri.
- 🚢 **Port:** Liman ve Cruise terminalleri.
- 🚉 **Station:** Tren ve Otobüs terminalleri.
- 🏙️ **City Center:** Şehir merkezi noktaları.

---

## ⚡ Veri Kaydı ve Güvenlik

Tüm form işlemleri `admin_post` kancaları üzerinden asenkron ve güvenli (Nonce-protected) olarak işlenir:

```php
// Örnek: Rota kaydı sırasında tetiklenen kancalar
add_action('admin_post_mhm_save_route', array(self::class, 'handle_save_route'));
add_action('admin_post_mhm_delete_route', array(self::class, 'handle_delete_route'));
```

---

## 📦 Veritabanı Geri Uyumluluğu (DB Fallback)

Transfer tabloları, modern `rentiva_` öneki ile çalışır ancak eski sistemlerden gelen `mhm_` tablolarını da `resolve_table_name()` metoduyla otomatik olarak tespit edip veriyi korur.

## Bölüm Sonu Özeti
- Transfer panelleri **Stats-first** yaklaşımıyla tasarlanmıştır.
- Tüm veri girişleri `TransferAdmin` sınıfı üzerinden atomik olarak yapılır.
- Görsel tasarımda `stats-cards.css` bileşenleri kullanılır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, TransferAdmin stats cards ve modern lokasyon yapısına göre güncellendi. |
