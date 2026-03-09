---
id: controller-audit
title: Controller Denetimi ve İş Mantığı Ayrıştırma
sidebar_label: Controller Denetimi
---

# Controller Yapısı ve Servis Katmanları Denetimi

MHM Rentiva v4.21.0 mimarisi, "Fat Controller" (Şişman Denetleyici) anti-desenini engellemek için iş mantığını (Business Logic) servis sınıflarına aktarmayı hedefler.

## 1. AJAX Denetleme Raporu

### A. AnalyticsController (Thin Controller)
- **Konum:** `src/Core/Dashboard/AnalyticsController.php`
- **İşlev:** AJAX taleplerini karşılar, yetki kontrolü yapar ve `AnalyticsService` sınıfına veriyi paslar.
- **Mantık Ayrıştırması:** Gelir hesaplamaları, doluluk oranları ve sparkline verisi tamamen `AnalyticsService` sınıfındadır. Controller sadece sunum (Presentation) ve doğrulama (Validation) yapar.
- **Puanlama:** ✅ **Başarılı** (İnce Denetleyici).

### B. PayoutAjaxController (Thin Controller)
- **Konum:** `src/Core/Financial/PayoutAjaxController.php`
- **İşlev:** Para çekme taleplerini doğrular.
- **Mantık Ayrıştırması:** Ödeme oluşturma ve veritabanı işlemleri `PayoutService` üzerinden yürütülür.
- **Puanlama:** ✅ **Başarılı** (İnce Denetleyici).

## 2. REST Controller Denetleme Raporu

### A. HealthController
- **Konum:** `src/Api/REST/HealthController.php`
- **Görev:** Sistem sağlığı denetimi.
- **Mantık Ayrıştırması:** Veritabanı sorgularının bir kısmı doğrudan controller içerisinde yer almaktadır. Gelecekte `HealthService` katmanına aktarılması önerilir.
- **Puanlama:** ⚠️ **Kısmi Başarılı** (Daha fazla ayrıştırma gerekiyor).

### B. PayoutCallbackController
- **Konum:** `src/Api/REST/PayoutCallbackController.php`
- **Görev:** Finansal ödeme geri dönüşleri.
- **Mantık Ayrıştırması:** HMAC imza doğrulaması ve ledger (defter) kayıt işlemleri controller içinde başlatılır ancak asıl kayıt `PayoutService` veya `LedgerService` üzerinden yapılır.
- **Puanlama:** ✅ **Başarılı**.

## 3. İyileştirme Önerileri
1. **Merkezi Hata Yönetimi (`ErrorHandler`):** Tüm controller sınıfları, hataları `wp_send_json_error` ile değil, merkezi bir `ErrorHandler::format_error()` metoduyla döndürmelidir.
2. **DTO (Data Transfer Object) Kullanımı:** Büyük JSON verilerini dönerken `Array` yerine `DTO` sınıfları kullanılmalı, böylece veri yapısı (Contract) kesinleşmelidir.
3. **Kapasite ve Yetki Sınıfı (`SecurityHelper`):** Yetki kontrolleri controller başında `current_user_can` ile değil, `SecurityHelper::validate_capability()` ile merkezi olarak yapılmalıdır.
