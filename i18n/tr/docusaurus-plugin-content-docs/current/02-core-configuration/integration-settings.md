---
id: integration-settings
title: Entegrasyon Ayarları (REST API)
sidebar_label: Entegrasyon Ayarları
sidebar_position: 13
slug: /core-configuration/integration-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Entegrasyon Ayarları sekmesi, MHM Rentiva'nın dış uygulamalarla (Mobil uygulamalar, harici web siteleri vb.) konuşmasını sağlayan REST API altyapısını yönettiğiniz bölümdür. **MHM Rentiva > Ayarlar > Entegrasyon Ayarları** altından ulaşılır.

---

## ⚡ REST API Yapılandırması

Sistemin performansını ve güvenliğini korumak için gerekli API parametreleri:

### 1. Hız Sınırlama (Rate Limiting)
- **API Hız Sınırlaması:** Kötü niyetli kullanımı engellemek için istek frekansını kısıtlar.
- **Genel Talep Sınırı:** Kimliği doğrulanmış kullanıcılar için dakikalık maksimum istek (Örn: 60).
- **Kamusal Talep Sınırı:** Anonim ziyaretçiler için dakikalık maksimum istek (Örn: 10).

### 2. Jeton (Token) Ayarları
- **Jeton Süresi (Saat):** Verilen API anahtarlarının geçerlilik süresi (Örn: 24 saat).
- **Jeton Yenilenmesi:** Eski jetonların yenisiyle değiştirilmesine izin vererek oturum sürekliliği sağlar.

### 3. Güvenlik Ayarları
- **Zorunlu HTTPS:** Tüm API iletişiminin SSL ile şifrelenmesini zorunlu kılar.
- **Kullanıcı Aracısı Filtresi:** `curl`, `wget` gibi bot ve kazıma araçlarını engeller.
- **IP Beyaz Listesi:** Sadece belirli IP adreslerinden erişime izin verir (Virgülle ayrılmış liste).

### 4. API Önbellekleme
- Veritabanı yükünü azaltmak için API yanıtlarının belirlenen süre (saniye cinsinden) boyunca saklanmasını sağlar.

---

## 🔑 Güvenli API Erişim Jetonları

Dış uygulamaların verilerinize erişebilmesi için buradan özel erişim anahtarları oluşturabilirsiniz:

- **Müşteri Kimliği:** Anahtarı hangi uygulama için oluşturduğunuzu belirten isim (Örn: "Android App").
- **Yetki Düzeyi:**
    - **OKUMA:** Verileri sadece listeleyebilir.
    - **YAZMA:** Rezervasyon oluşturabilir veya güncelleyebilir.
    - **ADMİN:** Tam yetki sağlar.

---

### 🖼️ GÖRSEL: API YÖNETİM PANELİ
*(Ayarlar > Entegrasyon Ayarları sekmesi, hız sınırlama ve API anahtar yönetim alanı)*

---

## 📚 Geliştirici Uç Nokta Referansı

Bu bölümde, eklentinin sunduğu tüm API uç noktaları (Endpoints) listelenir. Her uç nokta için şu bilgiler yer alır:

- **Metot:** GET, POST vb.
- **Uç Nokta:** API adresi (Örn: `mhm-rentiva/v1/vehicles`).
- **Namespace:** Varsayılan olarak `mhm-rentiva/v1`.

:::note Gelişmiş Teşhis
Geliştirme aşamasında "Hata Günlüğünü Etkinleştir" seçeneğini açarak API hatalarını detaylı olarak takip edebilirsiniz. Canlı sitelerde güvenlik nedeniyle kapalı tutulmalıdır.
:::

---

### Bölüm Özeti
- **API Güvenliği** ile verilerinizi dış yetkisiz erişimlere karşı koruyun.
- **Erişim Anahtarları** ile kendi mobil uygulamalarınızı eklentiye bağlayın.
- **Uç Nokta Listesi** ile yazılımcılarınız için hazır bir teknik döküman sunun.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Entegrasyon Ayarları (REST API) dökümanı tüm güvenlik ve anahtar yönetimi detaylarıyla oluşturuldu. |
