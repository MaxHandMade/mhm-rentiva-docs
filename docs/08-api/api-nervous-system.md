---
id: api-nervous-system
title: Sinir Sistemi (Internal Communication)
sidebar_label: Sinir Sistemi
sidebar_position: 10
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
MHM Rentiva, kullanıcı etkileşimlerini yönetmek ve modüller arası veriyi senkronize etmek için üç katmanlı bir haberleşme mimarisi ("Sinir Sistemi") kullanır: **AJAX**, **REST API (v1)** ve **Interactivity API**.
:::

# 🧠 Sinir Sistemi: Haberleşme Kanalları

Eklentinin içsel haberleşme mimarisi, yüksek performans ve düşük gecikme süresi (low latency) için optimize edilmiştir.

---

## ⚡ 1. AJAX Katmanı (admin-ajax.php)

Tedarikçi paneli ve ön yüzdeki form etkileşimleri için kullanılan ana kanaldır.

| Kanca (Action) | Sorumlu Controller | İşlev |
| :--- | :--- | :--- |
| `mhm_fetch_vendor_stats` | `AnalyticsController` | Dashboard KPI ve Sparkline verilerini çeker. |
| `mhm_request_payout` | `PayoutAjaxController` | Para çekme taleplerini atomik olarak başlatır. |
| `mhm_rentiva_filter_results` | `SearchResults` | Araç listesini sayfayı yenilemeden filtreler. |
| `mhm_approve_iban` | `VendorOnboardingController` | Admin panelinden IBAN değişikliklerini onaylar. |

---

## 🌐 2. REST API v1 (mhm-rentiva/v1)

Dış servislerle (ödeme sağlayıcılar, mobil uygulamalar) ve karmaşık konfigürasyonlarla haberleşen mimaridir.

### Temel Uç Noktalar (Endpoints):
- **`/locations`:** Transfer ve rezervasyon modülleri için coğrafi konum verilerini sağlar.
- **`/health`:** Veritabanı tablolarını, lisans durumunu ve PHP ortamını denetler.
- **`/payouts/{id}/callback`:** Ödeme sistemlerinden gelen imzasız talepleri reddetmek için HMAC doğrulaması kullanır.
- **`/availability`:** Anlık takvim doluluk kontrolü ve fiyat hesaplama (Pricing Engine) yapar.

---

## 🧪 3. Interactivity API (WP 6.5+)

WordPress'in yeni standartlarına uygun olarak, blok tabanlı ve reaktif arayüzler için kullanılır.

- **`mhmLive.endpoint`:** Sunucu tarafındaki bir state değişimini frontend tarafında anlık yansıtmak için kullanılır (Örn: Favori Sayacı).
- **Filtreleme:** `data-wp-context` kullanarak asenkron veri yükleme sağlar.
- **Micro-interactions:** Buton animasyonları ve form doğrulama geri bildirimleri bu katmanı kullanır.

---

## 🛡️ 4. Güvenlik ve Doğrulama

Tüm haberleşme kanallarında aşağıdaki güvenlik katmanları zorunludur:
- **Nonce (CSRF):** Her AJAX isteğinde `_wpnonce` alanının doğrulanması.
- **Capability:** `current_user_can` ile rol tabanlı erişim kontrolü.
- **AuthHelper:** API anahtarı tabanlı dış erişim doğrulaması.

## Bölüm Sonu Özeti
- AJAX, kullanıcı paneli etkileşimleri için optimize edilmiştir.
- REST API v1, sistem bütünlüğü ve dış dünyaya açılan kapıdır.
- Interactivity API, modern ve sıvı kullanıcı deneyimi için reaktif yöntemler sunar.

## Değişiklik Günlüğü
| Tarih | Süm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Interactivity API ve AJAX denetim detayları eklendi. |
