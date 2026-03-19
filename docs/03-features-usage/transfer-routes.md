---
id: transfer-routes
title: Transfer Güzergâhları ve Rota Yönetimi
sidebar_label: Transfer Güzergâhları
sidebar_position: 8
slug: /features-usage/transfer-routes
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

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

- **Sabit Ücret (Flat Fee):** Rota başına belirlenen net bir tutar.
- **Km Bazlı Fiyatlandırma:** Mesafe arttıkça artan fiyat tarifesi.
- **Yolcu/Bagaj Limiti:** Aracın kapasitesine (örn: 8 kişi) göre fiyatın değişmesi veya arama sonuçlarında çıkıp çıkmaması.
- **Gece Tarifi:** Belirli saatler arasında (örn: 00:00 - 06:00) uygulanan ek çarpan (Örn: 1.25x).

---

### 🖼️ GÖRSEL: TRANSFER ROTA YÖNETİMİ
*(Rota listesi, fiyat tablosu ve kapasite kısıtlamaları)*

---

## 🛒 VIP Transfer Müşteri Deneyimi

Müşteri önyüzde arama yaparken bu rotalar üzerinden araçları listeler.
1. **Güzergâh Seçimi:** Başlangıç ve bitiş noktalarını seçer.
2. **Kişi Sayısı:** Grup büyüklüğüne göre uygun (VIP Vito, Minibüs vb.) araçlar listelenir.
3. **Rezervasyon:** Onaylandığı an operasyon paneline "Transfer" tipinde rezervasyon düşer.

---

### Bölüm Özeti
- **Noktadan Noktaya** hizmetlerinizi tanımlayın.
- **Dinamik Fiyatlandırma** ile kârlılığınızı koruyun.
- **Kapasite Denetimi** ile yanlış araç rezervasyonlarının önüne geçin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Transfer Güzergâhları (Rota Yönetimi) kullanım rehberi oluşturuldu. |
