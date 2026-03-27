---
id: transfer-admin-panels
title: Transfer Admin Panelleri (UI & Dashboards)
sidebar_label: Transfer Admin Panelleri
sidebar_position: 7
---

![Version](https://img.shields.io/badge/version-4.23.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-27.03.2026-orange?style=flat-square)

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

## Lokasyon Tipleri (Location Types)

Sistem asagidaki dahili tipleri destekler ve bu tipler Dashboard uzerinde ikonografiyi degistirir:
- **Airport:** Havalimani noktalari.
- **Hotel:** Konaklama tesisleri.
- **Port:** Liman ve Cruise terminalleri.
- **Station:** Tren ve Otobus terminalleri.
- **City Center:** Şehir merkezi noktalari.

### Lokasyon Formu Alanları

v4.23.0 itibariyle lokasyon formuna **city** (şehir) alani eklenmiştir. Bu alan, vendor marketplace entegrasyonunda şehir bazli filtreleme için kullanılır:

| Alan | Tip | Açıklama |
|---|---|---|
| `name` | VARCHAR(255) | Lokasyon adi |
| `type` | ENUM | airport, hotel, port, station, city_center |
| `city` | VARCHAR(100) | Lokasyonun bulundugu şehir (v4.23.0) |
| `lat` / `lng` | DECIMAL | Koordinatlar |

---

## Rota Formu ve Fiyatlandırma Alanları

Rota formuna v4.23.0 ile **max_price** alani eklenmiştir. Vendor marketplace'de vendor'lar kendi fiyatlarini admin tarafından belirlenen `min_price`/`max_price` araligi içinde belirler:

| Alan | Tip | Açıklama |
|---|---|---|
| `origin_id` | BIGINT | Baslangic lokasyonu |
| `destination_id` | BIGINT | Varis lokasyonu |
| `base_price` | DECIMAL(10,2) | Temel fiyat |
| `min_price` | DECIMAL(10,2) | Minimum vendor fiyati |
| `max_price` | DECIMAL(10,2) | Maksimum vendor fiyati (v4.23.0) |
| `distance_km` | FLOAT | Mesafe (km) |
| `duration_min` | INT | Tahmini sure (dk) |

---

## Vendor Araç Meta Kutusu (`VehicleTransferMetaBox.php`)

Admin panelinde bir vendor aracıni düzenlerken, `VehicleTransferMetaBox` vendor'in şehir bilgisini gösterir. Bu sayede admin, vendor'in hangi şehirdeki rotalara erisebilecegini gorebilir.

---

## Veri Kaydi ve Güvenlik

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
- Transfer panelleri **Stats-first** yaklasimi ile tasarlanmistir.
- Lokasyon formunda **city** alani vendor marketplace entegrasyonu için zorunludur.
- Rota formunda **min_price/max_price** alanları vendor fiyat araligi belirler.
- `VehicleTransferMetaBox` vendor araç düzenlemesinde şehir bilgisi gösterir.
- Tum veri girişleri `TransferAdmin` sınıfı üzerinden atomik olarak yapilir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 27.03.2026 | 4.23.0 | Lokasyon formuna city alani, rota formuna max_price alani, VehicleTransferMetaBox vendor şehir bilgisi eklendi. |
| 19.03.2026 | 4.21.2 | Sayfa, TransferAdmin stats cards ve modern lokasyon yapısına gore güncellendi. |
