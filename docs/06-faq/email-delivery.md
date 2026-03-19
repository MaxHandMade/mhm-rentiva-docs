---
id: email-delivery
title: E-posta Gönderim ve Teslimat Sorunları
sidebar_label: E-posta Teslimi
sidebar_position: 20
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
MHM Rentiva, rezervasyon onayları ve tedarikçi bildirimleri için e-posta sistemine yoğun olarak dayanır. Bu sayfa, e-posta gönderim hatalarını teşhis etme ve çözme süreçlerini kapsar.
:::

# 📧 E-posta Gönderim ve Teslimat Sorunları

Sistem e-postaları (`Mailer::send`), varsayılan WordPress `wp_mail()` fonksiyonunu kullanır. Teslimat sorunları genellikle sunucu yapılandırması veya e-posta servis sağlayıcısı ile ilgilidir.

---

## ❌ 1. E-posta Hiç Gönderilmiyor (Sistem Hataları)

### Log Kontrolü
- **Teşhis:** Rentiva > Sistem Günlükleri (AdvancedLogger) sekmesinden e-posta hatalarını kontrol edin. `EmailLog` post tipi, her gönderim denemesini kaydeder.
- **Çözüm:** `Mailer` sınıfının döndürdüğü hata mesajına göre SMTP ayarlarınızı güncelleyin.

### SMTP Yapılandırması
- **Neden:** PHP `mail()` fonksiyonu birçok modern sunucuda engellenmiştir.
- **Çözüm:** "WP Mail SMTP" gibi eklentilerle veya Rentiva ayarlarından doğrudan bir SMTP sağlayıcısı (SendGrid, Mailgun vb.) kullanarak yapılandırma yapın.

---

## 📂 2. E-posta Spam Klasörüne Düşüyor

### SPF, DKIM ve DMARC Kayıtları
- **Neden:** Alan adınızın (domain) e-posta gönderme yetkisi doğru tanımlanmamış olabilir.
- **Çözüm:** DNS ayarlarınızdan aşağıdaki kayıtları doğrulayın:
    - **SPF:** E-posta gönderen sunucunun IP adresini içermelidir.
    - **DKIM:** E-postaların dijital olarak imzalanmasını sağlar.
    - **DMARC:** Sahte e-postalara karşı politika belirler.

### Gönderici Adresi Uyumsuzluğu
- **Neden:** Ayarlardaki "Gönderici E-postası" ile SMTP hesabındaki e-posta uyuşmuyor olabilir.
- **Çözüm:** Gönderici adresi (`From:`) ile yetkilendirilmiş SMTP adresini aynı yapın.

---

## 🕒 3. Gecikmeli Teslimat ve Kuyruk Sorunları

### WordPress Cron (WP-Cron) Durumu
- **Neden:** Sistem toplu e-postaları veya gecikmeli bildirimleri WP-Cron üzerinden işler. Sitenize ziyaret gelmiyorsa Cron çalışmayabilir.
- **Çözüm:** Gerçek bir sunucu Cron (Server-side Cron) kurarak her dakikada bir `wp-cron.php` tetiklenmesini sağlayın.

### Servis Sağlayıcı Limitleri
- **Neden:** Paylaşımlı sunucu paketleri saatlik e-posta limiti uyguluyor olabilir.
- **Çözüm:** Limitleri kontrol edin veya profesyonel bir e-posta dağıtım servisine geçin.

---

## 🛠️ 4. Test Modu ve Debugging

### E-posta Test Modu
- **Kontrol:** `mhm_rentiva_email_test_mode` ayarı açıksa, e-postalar gerçek alıcılara gitmek yerine sadece `AdvancedLogger`'a kaydedilir.
- **Çözüm:** Canlıya alırken test modunun kapalı olduğundan emin olun.

### Şablon Hataları
- **Neden:** Özel bir HTML şablonu (`EmailTemplates`) kullanılıyorsa, hatalı PHP kodları gönderimi durdurabilir.
- **Çözüm:** Varsayılan şablonu kullanarak gönderimi test edin.

## Denetim Listesi
1. `EmailLog` post tipini kontrol et.
2. SMTP bağlantısını test et.
3. Alan adı DNS kayıtlarını (SPF/DKIM) doğrula.
4. Test modunun kapalı olduğunu onayla.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | SMTP, DNS (SPF/DKIM) ve Test Modu detayları eklendi. |
