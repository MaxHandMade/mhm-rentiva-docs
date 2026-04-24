---
id: dashboard-widgets
title: Dashboard Widget Mimarisi (UI & Analytics)
sidebar_label: Dashboard Widget'ları
sidebar_position: 2
---

![Version](https://img.shields.io/badge/version-4.23.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-27.03.2026-orange?style=flat-square)

:::info Amac
Bu sayfa, hem WordPress yönetim panelinde (Admin) hem de on yuz (Frontend) kullanıcı panellerinde kullanilan KPI kartlarinin, widget'larin ve analitik bileşenlerin mimarisini açıklar.
:::

# Dashboard Widget Mimarisi

Rentiva dokumantasyonunda "Widget", veriyi görsellestiren ve etkilesim sunan bagimsiz UI bloklarini ifade eder. Bu bloklar iki ana katmanda çalışır: **Frontend (Elementor)** ve **Admin (Custom List Tables)**.

---

## 1. Frontend Widget Katmani (Elementor)

On yuz panellerindeki (Müşteri/Satici) tum görsel bileşenler `ElementorIntegration` sınıfı üzerinden yonetilir.

### Temel KPI Widget'lari
Tum KPI kartlari verisini `TrendService` üzerinden asenkron olarak ceker:
- **My Bookings Widget:** Aktif rezervasyon sayilarini ve buyume trendini gösterir.
- **Payment History Widget:** Satiçinin hakedis ve odeme gecmisini tablo olarak sunar.
- **My Messages Widget:** Okunmamis mesaj sayısını anlik (Real-time) yansitir.

---

## 2. Admin Widget Katmani

Yönetim panelindeki widget'lar `DashboardPage.php`, `Reports.php`, `Messages.php` ve `RevenueReport.php` siniflari tarafından yonetilir.

### İstatistik Widget'i (Stats)
- **Tasarim:** 2x2 grid düzeninde, ikonlar ve renklerle zenginlestirilmis inline CSS.
- **Cache:** Cache key prefix `mhm_rentiva_dashboard_stats` (v4.23.0'da düzeltildi; önceki hatali prefix: `mhm_dashboard_stats`).
- **Dosya:** `Reports.php`

### Gelir Grafigi (Revenue Chart)
- **Tarih formati:** `date_i18n(get_option('date_format'))` ile yerellestirilmis tarihler.
- **Iptal dataset'i:** Kırmızı kesikli cizgiyle iptal edilen rezervasyonlar ayri gosterilir.
- **Timezone:** `gmdate('Y-m-01')` yerine `wp_date('Y-m-01')` kullanılır (aylik gelir tarihleri için).
- **Dosyalar:** `RevenueReport.php` + `reports-charts.js`

### Yaklasan Operasyonlar (Upcoming Ops)
- **Saat bilgisi:** `start_date + start_time` birlestirilerek gosterilir (önceki 00:00 hatasi düzeltildi).
- **Display ID:** `mhm_rentiva_get_display_id()` ile WC order ID gösterimi + tıklanabilir link.
- **Dosya:** `Reports.php`

### Son Rezervasyonlar (Recent Bookings)
- **ID gösterimi:** `mhm_rentiva_get_display_id()` ile WC order ID uyumu.
- **Dosyalar:** `recent-bookings.php` + `transfer-widget.php`

### Mesajlar Widget'i (Messages)
- **Tasarim:** Self-contained inline CSS, okunmamis mesaj badge'i, avatar initials ve "time ago" formati.
- **Dosya:** `Messages.php`

### Takvim Popup
- **Saat bilgisi:** `get_post_meta()` ile `_mhm_start_time`/`_mhm_end_time` alanları (SQL JOIN yerine).
- **Dosya:** `BookingColumns.php`

### Payout List Table (`PayoutListTable.php`)
Finansal operasyonlarin kalbi olan bu tablo sunlari icerir:
- **Analitik Kolonlar:** Mevcut Bakiye, Talep Edilen Tutar ve İşlem Durumu.
- **Toplu İşlemler (Bulk Actions):** Onay Bekleyen (Pending) odemelerin tek tikla toplu onaylanmasi.
- **Banka Uyumlulugu:** İşlem durumlarini (Confirmed / Failed) Processor katmanindan gelen verilerle anlik günceller.

---

## 3. Lite / Pro Widget Erişim Kontrolu

Bazi widget'lar yalnızca Pro sürümde kullanilabilir:

| Widget | Erişim | Guard |
|---|---|---|
| İstatistik Widget'i | Lite + Pro | — |
| Son Rezervasyonlar | Lite + Pro | — |
| Mesajlar | Lite + Pro | — |
| **Gelir Grafigi** | **Yalnızca Pro** | `Mode::canUseAdvancedReports()` |
| **Yaklasan Operasyonlar** | **Yalnızca Pro** | `Mode::canUseAdvancedReports()` |

---

## 4. Timezone ve Tarih İşlemleri

v4.23.0 itibariyle tum dashboard widget'lari WordPress timezone'unu kullanir:

| Önceki (hatali) | Guncel (dogru) | Açıklama |
|---|---|---|
| `time()` | `current_time('timestamp')` | Geri sayim hesaplamalari |
| `strtotime('today')` | `strtotime(wp_date('Y-m-d'))` | Gün baslangici |
| `gmdate('Y-m-01')` | `wp_date('Y-m-01')` | Aylik gelir tarihleri |

**Dosyalar:** `DashboardPage.php`, `upcoming-operations.php`, `Reports.php`

---

## 5. Status Senkronizasyonu

`update_post_meta` cagrisi `save_post` hook'unu tetiklemez. Bu nedenle dashboard'un durumu dogru yansitmasi için ek hook'lar eklenmiştir:
- `updated_post_meta` — mevcut meta degistiginde
- `added_post_meta` — yeni meta eklendiğinde

**Dosya:** `DashboardPage.php`

---

## 6. WooCommerce Entegrasyonu

- **Email araç görseli:** `woocommerce_order_item_thumbnail` filter'i ile WC siparis email'lerine araç görseli eklenir.
- **Dosya:** `WooCommerceBridge.php`

---

## 7. Veri Akisi ve Performans

Widget'lar, veritabanı yukunu minimize etmek için **Tier-1 Cache** katmani kullanir:

```mermaid
graph TD
    A[Widget Render] --> B{Cache Var mi?}
    B -- Evet --> C[Hizli Render]
    B -- Hayir --> D[TrendService::get_trend]
    D --> E[WP_Query / Ledger Sum]
    E --> F[Cache Kaydet - 1 Saat]
    F --> C
```

---

## 8. Güvenlik Kuralları

- **Data Isolation:** Bir satici sadece kendi verisini (`post_author` eslesmesi) gorebilir.
- **Capability Check:** `PayoutListTable` uzerindeki toplu onay butonu sadece `mhm_rentiva_approve_payout` yetkisine sahip kullanıcılara gorunur.
- **Nonce Security:** Elementor widget'lari üzerinden yapilan tum AJAX istekleri `mhm_rentiva_elementor` nonce anahtarıyla dogrulanir.

## Bölüm Sonu Özeti
- Frontend widget'lari **Elementor** tabalidir ve `TrendService` kullanir.
- Admin widget'lari `DashboardPage`, `Reports`, `Messages` ve `RevenueReport` siniflari tarafından yonetilir.
- Gelir Grafigi ve Yaklasan Operasyonlar **yalnızca Pro** sürümde kullanilabilir (`Mode::canUseAdvancedReports()`).
- Tum widget'lar WordPress timezone'unu kullanir (`current_time`, `wp_date`).
- Cache key prefix: `mhm_rentiva_dashboard_stats`.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 27.03.2026 | 4.23.0 | 12 dashboard widget düzeltmesi dokumante edildi: timezone, status sync, takvim saat, ID uyumu, WC email görseli, mesajlar tasarimi, gelir grafigi, stats cache, Lite/Pro gating. |
| 19.03.2026 | 4.21.2 | Sayfa, Elementor entegrasyonu ve TrendService KPI yapısına gore güncellendi. |

