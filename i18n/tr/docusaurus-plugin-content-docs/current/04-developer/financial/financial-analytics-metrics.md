---
id: financial-analytics-metrics
title: Finansal ve Analitik Metrikler
sidebar_label: Analytics Metrikleri
sidebar_position: 4
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, `AnalyticsService` tarafından hesaplanan finansal ve operasyonel metriklerin arkasındaki mantığı ve veri kaynaklarını açıklar.
:::

# 📊 Analytics ve Finansal Metrikler

MHM Rentiva, "Tek Doğruluk Kaynağı" (**Single Source of Truth**) olarak finansal metriklerde sadece `mhm_rentiva_ledger` tablosunu kullanır. Operasyonel metrikler (doluluk oranı vb.) ise rezervasyon meta verileriyle harmanlanır.

## 🛠️ Temel Prensipler

- **Ledger-Only Truth:** Gelir hesaplamaları asla sipariş (Order) tablosundan değil, her zaman defter (Ledger) tablosundan yapılır.
- **UTC Normalization:** Tüm zaman pencereleri UTC formatında normalize edilir ve çakışmayan (Non-overlapping) pencereler kullanılır.
- **Sanitizasyon:** Metrik sorguları her zaman `status = 'cleared'` ve `type IN ('commission_credit', 'commission_refund')` filtrelerini içerir.

---

## 📈 Finansal Metrikler

Sistem tarafından hesaplanan temel finansal göstergeler:

| Metrik | Metod | Hesaplama Mantığı |
| :--- | :--- | :--- |
| **Net Gelir** | `get_revenue_period()` | `Sum(commission_credit) - Sum(commission_refund)` |
| **Büyüme Oranı** | `get_growth_rate()` | `((Mevcut - Önceki) / Önceki) * 100` |
| **Ort. Rezervasyon** | `get_avg_booking_value()` | `Toplam_Net / Tekil_Rezervasyon_Sayısı` |
| **Sparkline** | `get_sparkline_data()` | Günlük bazda normalize edilmiş bakiye noktaları. |

---

## ⚙️ Operasyonel Metrikler

Araç ve Vendor bazlı performans analizi için kullanılan metrikler:

### 1. Doluluk Oranı (Occupancy Rate)
`get_vehicle_performance()` metodu ile hesaplanır. Belirlenen zaman penceresindeki toplam gün sayısının, aracın rezerve edildiği (completed, confirmed, in_progress) gün sayısına oranıdır.

### 2. İptal Oranı (Cancellation Rate)
Toplam rezervasyonlar içindeki `cancelled` ve `refunded` durumundaki kayıtların yüzdesel oranıdır.

---

## 🔄 Metrik Hesaplama Akışı

```mermaid
graph TD
    A[Ledger Filtreleri: cleared + audited] --> B[get_revenue_period]
    B --> C[get_growth_rate]
    B --> D[get_sparkline_data]
    C --> E[Dashboard KPI: Revenue, Growth, Sparkline]
    D --> E
    
    F[Booking Meta: active_dates] --> G[get_vehicle_performance]
    G --> H[Occupancy vs Cancellation Rate]
```

---

## 🛡️ Kritik Detaylar

- **NULL vs 0.0:** `get_growth_rate()` metodunda önceki dönem verisi 0 ise sonuç `NULL` döner. Bu, "değişim yok" (0.0) ile "yeterli veri yok" (NULL) durumlarını finansal raporlamada ayırmak içindir.
- **Sparkline Backfilling:** Aktivite olmayan günler için sistem otomatik olarak `0.0` değeri basar, böylece grafiklerde kopukluk oluşmaz.
- **Banker-Safe Rounding:** Tüm yüzdesel hesaplamalarda `PHP_ROUND_HALF_UP` kullanılarak finansal hassasiyet korunur.

## Bölüm Sonu Özeti
- Finansal metrikler sadece **Ledger** tablosuna dayanır.
- Operasyonel metrikler zaman penceresi (Window Intersection) guard'ları ile korunur.
- Tüm veriler UTC bazlı ve tutarlı (Idempotent) şekilde üretilir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, AnalyticsService'in Ledger ve Operasyonel metrik yapısına göre güncellendi. |
