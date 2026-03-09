---
id: api-nervous-system
title: Sinir Sistemi (Internal Communication)
sidebar_label: Sinir Sistemi
---

# MHM Rentiva Sinir Sistemi: İçsel Haberleşme Kanalları

MHM Rentiva v4.21.0, kullanıcı etkileşimlerini yönetmek için üç ana teknik katman kullanır: **AJAX**, **REST API (v1)** ve **Interactivity API**.

## 1. AJAX İzleme (AJAX Trace)
Eklenti, Dashboard ve ön yüz etkileşimleri için yoğun olarak `admin-ajax.php` kancalarını kullanır.

| Kanca (Hook) | Controller | İşlev |
| :--- | :--- | :--- |
| `wp_ajax_mhm_fetch_vendor_stats` | `AnalyticsController` | Vendor Dashboard için finansal KPI ve grafik verilerini çeker. |
| `wp_ajax_mhm_request_payout` | `PayoutAjaxController` | Para çekme taleplerini doğrular ve sıraya alır. |
| `wp_ajax_mhm_rentiva_filter_results` | `SearchResults` | Arama sonuçlarını (Araç Listesi) anlık olarak filtreler. |
| `wp_ajax_mhm_list_endpoints` | `RESTSettings` | Admin panelinde kayıtlı tüm API uç noktalarını listeler. |

## 2. REST API v1 (The Legacy Foundation)
Mevcut REST endpoints, `wp-json/mhm-rentiva/v1` namespace altında hizmet vermektedir.

- **Konum Servisi (`/locations`):** Transfer ve kiralama için dinamik konum listesini döner. `LocationProvider` sınıfını besleyerek UI'da select kutularını doldurur.
- **Sağlık Kontrolü (`/health`):** Veritabanı bağlantısı ve tablo bütünlüğünü denetler. Admin/Public olmak üzere iki katmanlı yanıt yapısına sahiptir.
- **Ödeme Webhook (`/payouts/{id}/callback`):** Ödeme işlemcilerinden gelen geri dönüşleri (Success/Fail) işler. HMAC doğrulama zorunludur.
- **Müsaitlik Sorgusu (`/availability`):** Takvim ve rezervasyon formu için anlık müsaitlik ve fiyat hesaplaması yapar.

## 3. Interactivity API (WP 6.5+)
Eklenti, özellikle blok tabanlı (FSE) arayüzlerde kullanıcıyı sayfadan çıkarmadan etkileşim kurmak için Interactivity API'yi devreye sokar.

- **`mhmLive.endpoint`:** Sunucu tarafındaki bir REST endpoint'e (`wp-json/mhm-rentiva/v1/interactivity`) bağlanarak verileri "reactive" bir şekilde günceller.
- **Ürün Filtreleme:** Arama sonuçları sayfasındaki yan panel filtreleri, `data-wp-context` ve `data-wp-on--change` direktiflerini kullanarak asenkron yenileme gerçekleştirir.
- **Sıvı UI Etkileşimleri:** Favori butonu ve "Hızlı Görünüm" (Quick View) modalleri bu mimariyi kullanır.
