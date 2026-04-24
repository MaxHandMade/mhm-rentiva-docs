---
id: email-configuration
title: E-posta Yapılandırması
sidebar_label: E-posta Yapılandırması
sidebar_position: 8
slug: /core-configuration/email-configuration
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

E-posta Yapılandırması sekmesi, sistemden gönderilen otomatik bildirimlerin kimlik bilgilerini, tasarım detaylarını ve gönderim modlarını belirlediğiniz alandır. **MHM Rentiva > Ayarlar > E-posta Yapılandırması** altından ulaşılır.

:::info WooCommerce Entegrasyonu
Sistemde WooCommerce yüklü ise, ana işlem e-postaları (sipariş onayı vb.) WooCommerce üzerinden yönetilir. Buradaki ayarlar, eklentiye özgü iç bildirimler (Yönetici uyarıları, özel müşteri mesajları vb.) için geçerlidir.
:::

---

## 📧 Gönderici ve Tasarım Ayarları

E-postaların müşteriye nasıl görüneceğini buradan belirleyin:

- **Gönderen Adı:** E-postanın "Kimden" kısmında görünecek isim (Örn: Rentiva Filo).
- **Gönderen E-postası:** Mesajın hangi adresten çıkış yapacağı (Örn: info@site.com).
- **Cevap Adresi:** Müşteri e-postayı yanıtladığında mesajın gideceği adres.
- **Temel Renk:** E-posta şablonlarındaki buton, başlık ve vurgu renklerini belirler.
- **Alt Bilgi Metni (Footer):** E-postaların en altında yer alacak telif ve iletişim notu.

---

## 🛠️ Gönderim ve Test Araçları

- **Test Bağlantısı E-postası Gönder:** Yapılandırmanızın doğru çalışıp çalışmadığını anlamak için kendinize anlık bir test mesajı gönderir.
- **Giden E-postaları Etkinleştir:** Sistemin otomatik e-posta gönderme yetkisini açar/kapatır.
- **Üretim Sandbox (Test Modu):** Aktif edildiğinde hiçbir e-posta müşteriye gitmez, tüm mesajlar belirlenen "Test E-posta Adresi"ne yönlendirilir.

---

## ⚙️ Gelişmiş Teknik Ayarlar

- **Şablon Geçersiz Kılma Yolu:** E-posta tasarımlarını temanız üzerinden özelleştirmek isterseniz kullanacağınız klasör yolu (Varsayılan: `mhm-rentiva/emails/`).
- **Otomatik Arka Plan Gönderme:** Sayfa hızını etkilememek için e-postaları arka planda (asenkron) sıraya alır.
- **İletişim Günlükleri:** Gönderilen tüm e-postaların bir kopyasını veritabanında saklar.
- **Günlük Saklama Süresi:** Kayıtların kaç gün sonra otomatik silineceğini belirler (Örn: 30 Gün).

---

### 🖼️ GÖRSEL: E-POSTA YAPILANDIRMA PANELİ
*(Ayarlar > E-posta Yapılandırması sekmesi, gönderici ve günlük ayarları alanı)*

---

### Bölüm Özeti
- **Marka Kimliği** için gönderen adı ve renkleri kurumsal yapınıza göre ayarlayın.
- **Test Modu** ile canlıya geçmeden önce bildirimleri güvenle kontrol edin.
- **Arka Plan Gönderimi** ile sitenizin performansını koruyun.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | E-posta Yapılandırması dökümanı panel ekran görüntüsü ve kod analizine göre oluşturuldu. |
