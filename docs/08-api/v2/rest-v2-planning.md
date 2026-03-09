---
id: rest-v2-planning
title: REST v2 Planlama ve Yol Haritası
sidebar_label: REST v2 Planı
---

# Merkezi REST API v2 Mimarisine Geçiş Planı

MHM Rentiva'nın dağınık internal haberleşme kanallarını (AJAX ve v1 REST) merkezi bir yapıda toplamak ve Pro modüller için esnek bir API temeli oluşturmak hedeflenmektedir.

## 1. Hedeflenen Namespace Yapısı
Yeni uç noktalar `wp-json/mhm-rentiva/v2` altında toplanacak ve sürüm yönetimi (Version Management) uygulanacaktır.

## 2. Taşınacak Modüller ve Yeni Uç Noktalar

### A. Finansal Modül (`/v2/ledger`)
- **GET `/v2/ledger/summary`:** AJAX `mhm_fetch_vendor_stats` yerine geçecek.
- **POST `/v2/ledger/payouts`:** AJAX `mhm_request_payout` yerine geçecek.
- **GET `/v2/ledger/history`:** Geçmiş finansal hareketleri JSON olarak dönecek.

### B. Müsaitlik ve Rezervasyon Modülü (`/v2/booking`)
- **POST `/v2/booking/check`:** Mevcut `/v1/availability` sorgusunu bir üst seviyeye taşıyacak (Daha hızlı ve JSON Schema doğrulamalı).
- **POST `/v2/booking/create`:** WooCommerce Bridge ile entegre rezervasyon oluşturma işlemini yönetecek.

### C. Araç ve Arama Modülü (`/v2/vehicles`)
- **GET `/v2/vehicles/search`:** AJAX `mhm_rentiva_filter_results` yerine geçecek (Interactivity API dostu).
- **GET `/v2/vehicles/{id}`:** Araç detaylarını döndüren zengin API yapısı.

## 3. Güvenlik ve Kimlik Doğrulama
V2 geçişinde uygulanacak yeni güvenlik standartları:

1. **Nonce Zorunluluğu (`X-WP-Nonce`):** Tüm asenkron taleplerde (Public dahil) kontrol edilecek.
2. **API Anahtarı (API Key) Desteği:** Mobilleşme ve harici entegrasyonlar için `X-MHM-API-KEY` başlık doğrulama.
3. **HTTP Metot Sıkılaştırması:** Sadece ilgili metotların (GET/POST/PUT) çalıştırılmasına izin verilecek.
4. **Hız Sınırlama (Rate Limiting):** IP bazlı dinamik throttling (`RateLimiter` sınıfı üzerinden).

## 4. Uygulama Adımları
1. **Controller Modernizasyonu:** `AnalyticsController` ve `PayoutAjaxController` içindeki iş mantığı (Service metodları) korunarak REST sarmalayıcıları (Wrappers) yazılacak.
2. **Route Kaydı:** `src/Admin/REST/V2/` klasörü altında yeni `Controller` yapısı oluşturulacak.
3. **JS Refaktörü:** `vehicles-grid.js` ve `search-results.js` dosyasındaki AJAX çağrıları REST v2 uç noktalarına yönlendirilecek.
