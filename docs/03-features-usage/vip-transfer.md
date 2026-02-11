---
id: vip-transfer
title: VIP Transfer Modülü
sidebar_label: VIP Transfer
slug: /features-usage/vip-transfer
---

![Version](https://img.shields.io/badge/version-4.9.8-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-11.02.2026-orange?style=flat-square)

# VIP Transfer Modülü (Yeni)

MHM Rentiva v4.5.3 ile gelen **VIP Transfer Modülü**, kullanıcılarınızın A noktasından B noktasına şoförlü araç transferi hizmeti almasını ve rezervasyon yapmasını sağlar. Bu modül; mesafe bazlı veya sabit fiyatlandırma, araç kapasitesi yönetimi ve WooCommerce entegrasyonu ile esnek bir altyapı sunar.

## Temel Özellikler

*   **Rota Yönetimi:** Nereden (Origin) Nereye (Destination) tanımları.
*   **Fiyatlandırma Stratejileri:**
    *   **Fixed:** Rota için sabit fiyat.
    *   **Calculated (KM Bazlı):** Rota mesafesi * Km Başına Ücret.
*   **Araç Kapasitesi:** Yolcu (Pax) ve Bagaj puanlarına göre araç eşleştirme.
*   **Müsaitlik Kontrolü:** Araçların diğer rezervasyonlarıyla (Rental veya Transfer) çakışma kontrolü (Buffer süresi dahil).
*   **WooCommerce Entegrasyonu:** Sepete ekleme ve ödeme süreçleri.

---

## Kurulum ve Ayarlar

Modülü kullanmaya başlamadan önce temel ayarları yapmanız gerekir.

### 1. Konumlar (Locations)
Transferin başlayacağı ve biteceği noktaları tanımlayın.
*   **Yol:** Admin Panel > MHM Rentiva > Transfer Locations
*   **Tipler:** Havalimanı (Airport), Otel (Hotel), Genel (Generic).

### 2. Rotalar (Routes)
İki konum arasındaki rotayı ve fiyatlandırmayı belirleyin.
*   **Yol:** Admin Panel > MHM Rentiva > Transfer Routes
*   **Alanlar:**
    *   **Origin & Destination:** Başlangıç ve Bitiş noktaları.
    *   **Distance & Duration:** Mesafe (km) ve tahmini süre (dk).
    *   **Pricing Method:** Fixed veya Distance Based.
    *   **Price / Min Price:** Taban ücret veya KM fiyatı.

### 3. Ödeme Ayarları
Transfer hizmeti için ödeme politikasını belirleyin.
*   **Yol:** Admin Panel > MHM Rentiva > Transfer Settings (veya Locations/Routes altındaki sekme).
*   **Seçenekler:**
    *   **Full Payment Required:** Müşteri toplam tutarı öder.
    *   **Deposit (Percentage):** Belirlenen oranda (%20 vb.) ön ödeme alınır, kalanı araçta tahsil edilir.

---

## Kullanım

### Frontend Arama Formu
Transfer arama formunu sitenizin herhangi bir yerine eklemek için aşağıdaki shortcode'u kullanın:

```html
[rentiva_transfer_search]
```

Bu shortcode; kalkış yeri, varış yeri, tarih, saat, yolcu sayısı ve bagaj bilgisini alan bir form oluşturur ve AJAX ile sonuçları listeler.

### Rezervasyon Süreci
1.  Kullanıcı arama yapar.
2.  Sistem uygun araçları (Kapasite ve Müsaitlik kontrolü yaparak) listeler.
3.  Kullanıcı "Book Now" butonuna tıklar.
4.  Araç, seçilen opsiyonlarla (Depozito veya Tam fiyat) sepete eklenir.
5.  Kullanıcı ödeme sayfasına yönlendirilir.

---

## Teknik Mimarisi

Geliştiriciler için modülün teknik yapısı:

### Tablo Yapısı
*   `wp_mhm_rentiva_transfer_locations`: Konum tanımları.
*   `wp_mhm_rentiva_transfer_routes`: Rota ve fiyatlandırma kuralları.

### Temel Sınıflar
*   **`TransferSearchEngine`**: Arama motoru mantığı. SQL filtreleme, müsaitlik (`Util::has_overlap`) ve fiyat hesaplamasını yönetir.
*   **`TransferCartIntegration`**: Sepete ekleme işlemi (`mhm_transfer_add_to_cart`). Fiyatı ve kalan tutarı hesaplayıp `WooCommerceBridge`'e iletir.
*   **`TransferBookingHandler`**: Sipariş oluşturulduğunda (`mhm_rentiva_booking_created`), transfer'e özgü meta verilerin (`_mhm_transfer_origin_id` vb.) kaydedilmesini sağlar.

### Veri Akışı
1.  **Arama:** `TransferSearchEngine::search($criteria)`
2.  **Sepet:** `TransferCartIntegration::handle_add_to_cart_ajax()` -> `WooCommerceBridge::add_booking_data_to_cart()`
3.  **Kayıt:** WooCommerce Checkout -> `WooCommerceBridge::create_booking_from_order()` -> `TransferBookingHandler::save_transfer_booking_meta()`
