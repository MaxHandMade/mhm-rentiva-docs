---
id: vendor-analytics
title: Tedarikçi Analizleri (Vendor Analytics)
sidebar_label: Analytics
sidebar_position: 20
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
MHM Rentiva, tedarikçilere gerçek zamanlı iş zekası (Business Intelligence) sağlar. Bu doküman, KPI kartlarının hesaplanması, trend analizleri ve veritabanı seviyesindeki veri toplama stratejilerini açıklar.
:::

# 📊 Analiz ve Raporlama Sistemi

Sistemin finansal analizleri için **tek gerçeklik kaynağı (Source of Truth)** Ledger tablosudur. Operasyonel analizler ise rezervasyon statüleri üzerinden dinamik olarak hesaplanır.

---

## 🏗️ 1. Veri Toplama Stratejisi (`AnalyticsService`)

`AnalyticsService`, Ledger tablosu üzerinde `status = 'cleared'` ve `vendor_id` filtreleri ile çalışır.

### Finansal Metrikler
- **Net Gelir:** Belirli bir tarih aralığındaki `commission_credit` (artı) ve `commission_refund` (eksi) kayıtlarının toplamıdır.
- **Ortalama Rezervasyon Değeri (ABV):** Toplam net gelirin, benzersiz (distinct) `booking_id` sayısına bölünmesiyle elde edilir.

### Operasyonel Metrikler
- **Doluluk Oranı (Occupancy):** `(Kiralanan Gün Sayısı / Toplam Mevcut Gün Sayısı) * 100`.
- **İptal Oranı:** `(İptal Edilen Rezervasyonlar / Toplam Talep Sayısı) * 100`.

---

## 📉 2. Büyüme ve Trend Analizi

Sistem, seçilen tarih aralığını bir önceki benzer period ile karşılaştırarak büyüme oranlarını hesaplar.

### Hesaplama Modeli
`Büyüme = ((Mevcut Dönem - Önceki Dönem) / Önceki Dönem) * 100`

**Teknik Detaylar:**
- **Pencere Aynalama:** Eğer son 7 gün seçildiyse, önceki dönem olarak ondan önceki 7 gün (overlap olmadan) baz alınır.
- **Sıfır Bölme Koruması:** Önceki dönem geliri 0 ise, büyüme oranı `%0` yerine `NULL` döner. Bu durum arayüzde "—" olarak maskelenir.

---

## 📈 3. Sparkline Veri Yapısı

Dashboard üzerindeki trend grafikleri için `get_sparkline_data()` metodu kullanılır.

- **Backfilling:** Aktivite olmayan günler için veritabanından boş dönen tarihler, PHP tarafında otomatik olarak `0.0` ile doldurulur.
- **UTC Sabiti:** Zaman dilimi kaymalarını engellemek için tüm tarih gruplamaları MySQL `DATE()` fonksiyonuyla UTC üzerinden yapılır.

---

## ⚡ 4. Performans ve Caching (`MetricCacheManager`)

Analiz verileri pahalı SQL sorguları olduğu için çok katmanlı bir önbellekleme mekanizması kullanılır.

| Katman | Süre | Geçersiz kılma (Invalidation) |
|---|---|---|
| **Transients** | 15 Dakika | Yeni rezervasyon, ödeme onayı veya statü değişikliği. |
| **Object Cache** | Per-Session | Dashboard sekme geçişlerinde tekrar sorgulama yapılmaz. |
| **Bypass** | - | Özel tarih aralığı aramalarında (Custom Range) cache devre dışı bırakılır. |

---

## ⚙️ 5. Teknik API Referansı

### Gelir Hesaplama
```php
// AnalyticsService::get_revenue_period($vendor_id, $from_ts, $to_ts)
// PostgreSQL/MySQL uyumlu UTC normalization.
```

### Araç Bazlı Performans
```php
// AnalyticsService::get_vehicle_performance($vehicle_id, $from_ts, $to_ts)
// Belirli bir aracın özel doluluk ve gelir raporunu döner.
```

## Bölüm Sonu Özeti
- Finansal raporlarda sadece `cleared` durumundaki ledger kayıtları baz alınır.
- Büyüme oranları lineer zaman kaydırma algoritmasıyla hesaplanır.
- `MetricCacheManager` ile veritabanı yükü minimuma indirilmiştir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Ledger tabanlı analiz ve büyüme formülleri dökümante edildi. |
