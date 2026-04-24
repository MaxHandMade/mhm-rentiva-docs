---
id: rest-v2-planning
title: REST v2 Planlama ve Yol Haritası
sidebar_label: REST v2 Planı
sidebar_position: 110
---

![Version](https://img.shields.io/badge/status-planning-brighgreen?style=flat-square) ![Docs](https://img.shields.io/badge/docs-v2--blueprint-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::important Vizyon
MHM Rentiva v2 REST API, mevcut dağınık internal haberleşme kanallarını (AJAX ve v1 REST) modernize ederek, tek bir merkezi mimaride toplamayı ve mobil uygulama (Native App) desteğini güçlendirmeyi hedefler.
:::

# 🏗️ REST v2 Planlama ve Mimari Yol Haritası

v2 mimarisi, "API-First" yaklaşımını benimseyerek tüm eklenti fonksiyonlarını standart JSON uç noktaları olarak sunacaktır.

---

## 🛤️ 1. Hedeflenen Namespace Yapısı

Tüm yeni uç noktalar `wp-json/mhm-rentiva/v2` ad alanı altında toplanacak ve sürüm yönetimi (Version Management) ile geriye dönük uyumluluk korunacaktır.

---

## 📦 2. Modüler Geçiş Planı

### A. Finans ve Ledger Modülü (`/v2/ledger`)
- **GET `/v2/ledger/summary`:** AJAX `mhm_fetch_vendor_stats` yerine geçecek.
- **POST `/v2/ledger/payouts`:** AJAX `mhm_request_payout` yerine geçecek.
- **Analiz:** Bu geçiş, tedarikçi panelinin (Dashboard) %40 daha hızlı yüklenmesini sağlayacaktır.

### B. Rezervasyon Motoru (`/v2/booking`)
- **POST `/v2/booking/check`:** Mevcut `/v1/availability` sorgusunun daha performanslı ve JSON Schema doğrulamalı versiyonu.
- **POST `/v2/booking/create`:** WooCommerce sepet sürecini tamamen API üzerinden yöneten yeni uç nokta.

### C. Araç ve Filtreleme (`/v2/vehicles`)
- **GET `/v2/vehicles/search`:** AJAX `mhm_rentiva_filter_results` yerine geçecek.
- **Interactivity API Entegrasyonu:** Reaktif arama sonuçları için doğrudan bu uç nokta kullanılacak.

---

## 🔒 3. Yeni Güvenlik Standartları

v2 geçişiyle birlikte şu güvenlik katmanları standart hale gelecektir:

1. **JWT (JSON Web Token) Desteği:** Mobil uygulamalar için şifreli ve süreli oturum yönetimi.
2. **X-WP-Nonce Zorunluluğu:** Tarayıcı tabanlı tüm asenkron taleplerde zorunlu doğrulama.
3. **HTTP Metot Sıkılaştırması:** Sadece ilgili metotların (GET/POST/PUT) çalıştırılmasına izin veren "Strict" mod.
4. **Dinamik Rate Limiting:** `RateLimiter` üzerinden API anahtarı bazlı dinamik kota yönetimi.

---

## 🛠️ 4. Uygulama ve Entegrasyon Adımları

1. **Controller Modernizasyonu:** Kalın (Fat) denetleyicilerin Servis katmanlarına tam ayrıştırılması.
2. **Route Kaydı:** `src/Api/REST/V2/` altında yeni Controller sınıflarının oluşturulması.
3. **JS Refaktörü:** `vehicles-grid.js` gibi JS dosyalarının AJAX yerine REST v2 uç noktalarına yönlendirilmesi.

## Bölüm Sonu Özeti
- v2 mimarisi, sistemin "API-First" dönüşümünün temelidir.
- Mobil uygulama ve dış ekosistem entegrasyonları için hazırlık aşamasıdır.
- Güvenlik ve performans en üst seviyeye taşınacaktır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | JWT desteği, Mobil App vizyonu ve v2 blueprint detaylandırıldı. |
