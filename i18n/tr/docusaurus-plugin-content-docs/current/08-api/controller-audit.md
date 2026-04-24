---
id: controller-audit
title: Denetleyici (Controller) Mimarisi ve İş Mantığı
sidebar_label: Controller Denetimi
sidebar_position: 20
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
MHM Rentiva, "Fat Controller" (Şişman Denetleyici) anti-desenini engellemek için iş mantığını (Business Logic) servis sınıflarına aktarmayı hedefler. Bu sayfa, mevcut denetleyicilerin teknik denetim raporudur.
:::

# 🧬 Denetleyici ve Servis Katmanı Mimarisi

Eklentinin mimarisi, denetleyicilerin (Controllers) sadece istekleri karşılamasını, yetki kontrolü yapmasını ve işi ilgili servis sınıflarına (Services) devretmesini esas alır.

---

## 🏗️ 1. Denetleyici Tasarım Kalıpları

Tüm `*Controller.php` sınıfları şu kuralları takip etmelidir:
- **Presentation-Only:** Veri hesaplaması yapmamalıdır.
- **Validation:** İstek verilerini (Input) doğrulamalıdır.
- **Authorization:** `current_user_can` veya `SecurityHelper` ile yetki kontrolü yapmalıdır.

---

## 📊 2. AJAX Denetleyicileri Raporu

### A. AnalyticsController (Thin Controller)
- **Dosya:** `src/Core/Dashboard/AnalyticsController.php`
- **Görev:** İstatistik taleplerini karşılar.
- **İş Mantığı:** Gelir, doluluk ve grafik verileri tamamen `AnalyticsService` içindedir.
- **Sonuç:** ✅ **Standartlara Uygun.**

### B. PayoutAjaxController (Thin Controller)
- **Dosya:** `src/Core/Financial/PayoutAjaxController.php`
- **Görev:** Para çekme talebi başlatır.
- **İş Mantığı:** `PayoutService` ve `AtomicPayoutService` (Transaction) sınıfları işlemi yürütür.
- **Sonuç:** ✅ **Standartlara Uygun.**

---

## 🌐 3. REST Denetleyicileri Raporu

### A. HealthController (Audit Status)
- **Dosya:** `src/Api/REST/HealthController.php`
- **Gözlem:** Veritabanı sağlık sorgularının bir kısmı doğrudan controller içindedir.
- **Öneri:** Bu mantığın `SystemHealthService` sınıfına aktarılması planlanmaktadır.
- **Sonuç:** ⚠️ **İyileştirme Bekliyor.**

### B. PayoutCallbackController (Transaction Controller)
- **Dosya:** `src/Api/REST/PayoutCallbackController.php`
- **Görev:** Ödeme geri bildirimlerini kanıtlarıyla (evidence) işler.
- **Güvenlik:** HMAC imza kontrolü `AuthHelper` ile merkezi olarak yapılır.
- **Sonuç:** ✅ **Standartlara Uygun.**

---

## 🛠️ 4. Mimari Standartlar ve Tavsiyeler

Hata yönetimini standartlaştırmak için şu yöntemler kullanılır:
1. **`ErrorHandler::format_error()`:** Tüm hata yanıtları bu metot üzerinden standardize edilir.
2. **DTO Sınıfları:** Büyük JSON verileri dönerken dizi (array) yerine DTO sınıfları kullanılarak veri kontratı (contract) garanti altına alınır.
3. **`Sanitizer::*`:** Gelen tüm değişkenler ham veri olarak değil, sanitizasyon katmanından geçirilerek işlenir.

## Bölüm Sonu Özeti
- Denetleyiciler "İnce" (Thin) yapıda tutulur.
- İş mantığı "Servis" sınıflarında merkezileştirilmiştir.
- API güvenliği `AuthHelper` ve `SecurityHelper` ile sağlanır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Controller denetim raporu ve tasarım kalıpları eklendi. |
