---
id: locations
title: Konum Yönetimi (Locations)
sidebar_label: Konum Yönetimi
sidebar_position: 7
slug: /features-usage/locations
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Konum Yönetimi, araç kiralama ve transfer operasyonlarınızın fiziksel noktalarını (Havalimanı, Ofis, Otel vb.) tanımladığınız bölümdür. **MHM Rentiva > Locations** menüsünden ulaşılır.

Sistemdeki araçlar ve transfer rotaları bu konumlar üzerine inşa edilir.

---

## 📍 Yeni Konum Ekleme ve Detaylar

Bir konum tanımlarken aşağıdaki bilgileri girmelisiniz:

- **Konum Adı:** Müşterinin göreceği başlık (Örn: İstanbul Havalimanı (IST)).
- **Konum Türü:** Havalimanı, Otel, Ofis gibi kategori seçimi.
- **Şehir (City):** Konumun ait olduğu şehir bilgisi. Bu alan, **Şehir → Nokta hiyerarşisi** için kritik öneme sahiptir. Vendor'lar yalnızca kendi şehirlerindeki konumları ve rotaları görebilir. *(v4.23.0 ile eklendi)*
- **Adres ve Koordinat:** Haritadaki tam yer (Google Maps entegrasyonu için gereklidir).
- **Çalışma Saatleri:** Bu konumun teslimat ve iade için açık olduğu zaman dilimleri.
- **Ek Ücretler:** Bu konuma özel teslimat/iade (Oneway) ücretleri varsa buradan belirlenir.

---

### 🖼️ GÖRSEL: KONUM YÖNETİM PANELİ
*(Locations listesi ve yeni konum ekleme formu)*

---

## 🚘 Araçlarla İlişkilendirme

Her aracı bir veya birden fazla konuma "Atayabilirsiniz". Böylece müşteri İstanbul Havalimanı'nı seçtiğinde, sadece o bölgede hizmet veren araçlar listelenir.

---

## 🗺️ Transfer Bağlantısı

Konumlar, VIP Transfer modülünün başlangıç (Pickup) ve bitiş (Dropoff) noktalarını oluşturur. Bir konum burada tanımlanmadığı sürece transfer rotası oluşturulamaz.

### Şehir → Nokta Hiyerarşisi (v4.23.0)

v4.23.0 ile birlikte her konum bir **şehir** alanına sahiptir. Bu hiyerarşi sayesinde:
- **Admin:** Tüm konumları ve rotaları görebilir ve düzenleyebilir.
- **Vendor:** Yalnızca kendi başvurusunda belirttiği şehirdeki konumları görebilir. Araç ekleme formunda sadece kendi şehrine ait lokasyonlar ve rotalar listelenir.
- **Arama Motoru:** Rota bazlı filtreleme ile müşteriye sadece ilgili şehirdeki aktif araçları sunar.

:::tip Veritabanı
Bu özellik `DatabaseMigrator v3.4.0` ile gelen `city` VARCHAR(100) sütunu üzerine inşa edilmiştir.
:::

---

### Bölüm Özeti
- **Nokta Belirleme:** Operasyon alanlarınızı netleştirin.
- **Çalışma Saatleri:** Mesaiden sonraki teslimatları engelleyin veya ek ücret tanımlayın.
- **Lokasyon Bazlı Envanter:** Araçlarınızı doğru bölgelerde listeleyin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 26.03.2026 | 4.23.0 | Şehir (city) alanı ve Şehir→Nokta hiyerarşisi dokümantasyonu eklendi. |
| 19.03.2026 | 4.21.2 | Konum Yönetimi (Locations) kullanım rehberi oluşturuldu. |
