---
id: transfer-routes
title: Transfer Güzergâhları ve Rota Yönetimi
sidebar_label: Transfer Güzergâhları
sidebar_position: 8
slug: /features-usage/transfer-routes
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Transfer Güzergâhları, VIP transfer hizmetini gerçekleştirdiğiniz ana rotaları ve bu rotaların fiyatlarını belirlediğiniz alandır. **MHM Rentiva > Transfer Güzergâhları** menüsünden ulaşılır.

Burada, daha önce [Konum Yönetimi](./locations.md) kısmında tanımladığınız noktalar arasındaki bağlantıları kurarsınız.

---

## 🗺️ Rota Oluşturma (Route Definition)

Bir rota, en az iki konum arasındaki ilişkiyi ifade eder:

- **Başlangıç Noktası (Pickup):** Aracın yolcuyu alacağı nokta.
- **Bitiş Noktası (Dropoff):** Yolcunun bırakılacağı ana nokta.
- **Dönüş Rotası:** Sisteme "Ters Rota" (Örn: Havalimanı-Otel ve Otel-Havalimanı) olarak kaydedilmesini sağlar.

---

## 💳 Fiyatlandırma ve Ek Ücretler (Pricing)

Rotanın kiralama bedeli müşteri taleplerine göre dinamik değişir:

- **Sabit Ücret (Flat Fee):** Rota başına belirlenen net bir tutar (`base_price`).
- **Maksimum Fiyat (v4.23.0):** Admin tarafından rota için belirlenen tavan fiyat (`max_price`). Vendor'lar bu aralık dahilinde kendi fiyatlarını belirleyebilir.
- **Km Bazlı Fiyatlandırma:** Mesafe arttıkça artan fiyat tarifesi.
- **Yolcu/Bagaj Limiti:** Aracın kapasitesine (örn: 8 kişi) göre fiyatın değişmesi veya arama sonuçlarında çıkıp çıkmaması.
- **Gece Tarifi:** Belirli saatler arasında (örn: 00:00 - 06:00) uygulanan ek çarpan (Örn: 1.25x).

### Vendor Fiyatlandırma Modeli (v4.23.0)

Çoklu tedarikçi (Multi-Vendor) yapısında her vendor, admin tarafından belirlenen `min_price` — `max_price` aralığında rota bazlı kendi fiyatını belirleyebilir:

- **Admin** rota oluştururken `base_price` ve `max_price` değerlerini tanımlar.
- **Vendor** araç ekleme formunda, hizmet verdiği rotalar için bu aralıkta fiyat girer.
- **Arama motoru** rota bazlı filtreleme yaparken vendor fiyatını kullanır; vendor fiyatı yoksa rotanın `base_price` değerine düşer (fallback).
- Vendor fiyatları `_mhm_rentiva_transfer_route_prices` meta key'inde JSON olarak saklanır.

---

### 🖼️ GÖRSEL: TRANSFER ROTA YÖNETİMİ
*(Rota listesi, fiyat tablosu ve kapasite kısıtlamaları)*

---

## 🔍 Transfer Arama Motoru (v4.23.0)

Transfer arama motoru v4.23.0 ile **rota bazlı araç filtreleme** ve **vendor fiyatı** desteğine kavuşmuştur:

- Arama sırasında seçilen başlangıç ve bitiş noktalarına uyan rotalar bulunur.
- Bu rotalara atanmış araçlar, yolcu ve bagaj kapasitesine göre filtrelenir.
- Sonuçlarda vendor'un rota için belirlediği fiyat gösterilir; vendor fiyatı tanımlanmamışsa rotanın `base_price` değeri kullanılır.

---

## 🛒 VIP Transfer Müşteri Deneyimi

Müşteri önyüzde arama yaparken bu rotalar üzerinden araçları listeler.
1. **Güzergâh Seçimi:** Başlangıç ve bitiş noktalarını seçer.
2. **Kişi Sayısı:** Grup büyüklüğüne göre uygun (VIP Vito, Minibüs vb.) araçlar listelenir.
3. **Fiyat Karşılaştırma:** Farklı vendor'ların aynı rota için sunduğu fiyatlar karşılaştırılabilir.
4. **Rezervasyon:** Onaylandığı an operasyon paneline "Transfer" tipinde rezervasyon düşer.

---

### Bölüm Özeti
- **Noktadan Noktaya** hizmetlerinizi tanımlayın.
- **Dinamik Fiyatlandırma** ile kârlılığınızı koruyun.
- **Kapasite Denetimi** ile yanlış araç rezervasyonlarının önüne geçin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 26.03.2026 | 4.23.0 | Vendor fiyatlandırma modeli, max_price, rota bazlı arama motoru ve Şehir→Nokta hiyerarşisi eklendi. |
| 19.03.2026 | 4.21.2 | Transfer Güzergâhları (Rota Yönetimi) kullanım rehberi oluşturuldu. |
