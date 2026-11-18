---
id: emails
title: E-posta ve Bildirimler
sidebar_label: E-posta Yapılandırması
sidebar_position: 5
slug: /core-configuration/emails
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva, rezervasyon sürecinin her adımında hem yöneticiyi hem de müşteriyi bilgilendiren bir e-posta bildirim sistemine sahiptir. E-postaların gönderen bilgileri ve görünümü **MHM Rentiva > Ayarlar > E-posta** sekmesinden, her e-postanın içeriği ise **MHM Rentiva > Ayarlar > Bildirim şablonları** sekmesinden düzenlenir.

---

## 📧 Genel E-posta Yapılandırması

Tüm e-postaların profesyonel görünmesi için temel ayarları yapın (tüm alanlar için bkz. [E-posta Yapılandırması](./email-configuration.md)):
- **Gönderen adı ve Gönderen e-postası:** Müşterilerinizin gelen kutusunda göreceği isim ve e-posta.
- **Üst kısım görseli (logo adresi):** E-postaların en üstünde yer alacak şirket logosu.
- **Temel renk:** Butonlar ve başlıklar için markanıza uygun bir renk.

:::important SMTP Tavsiyesi
WordPress'in varsayılan `mail()` fonksiyonu genellikle e-postaların "Spam" klasörüne düşmesine neden olur. Kesintisiz bildirimler için **WP Mail SMTP** gibi bir eklenti kullanarak SendGrid, Mailgun veya kendi SMTP sunucunuzu bağlamanızı şiddetle öneririz.
:::

---

## 📝 Şablon Değişkenleri (Placeholders)

Şablonları kişiselleştirmek için aşağıdaki dinamik etiketleri kullanabilirsiniz. Sistem, e-postayı gönderirken bu etiketleri gerçek verilerle değiştirir:

| Etiket | Açıklama |
| :--- | :--- |
| `{salutation_name}` | Selamlamada kullanılan müşteri adı ("`Sayın {salutation_name},`"). Rezervasyonda ad yoksa "değerli müşterimiz" yazılır; müşteri hiçbir zaman "Sayın ," görmez. |
| `{contact_name}` / `{customer_name}` | Müşterinin tam adı. |
| `{contact_email}` | Müşterinin e-posta adresi. |
| `{booking_id}` | Müşteriye gösterilen rezervasyon numarası (varsa sipariş numarası). |
| `{vehicle_title}` | Kiralanan aracın başlığı. |
| `{pickup_date}` | Teslim alma tarihi. |
| `{dropoff_date}` / `{return_date}` | Dönüş tarihi. |
| `{pickup_time}` | Teslim alma saati. |
| `{return_time}` / `{dropoff_time}` | Dönüş saati. |
| `{pickup_datetime}` | Teslim alma tarihi ve saati birlikte, örneğin "01/07/2099, 10:00". Saat kayıtlı değilse yalnızca tarih yazılır. |
| `{return_datetime}` / `{dropoff_datetime}` | Dönüş tarihi ve saati birlikte; saat kayıtlı değilse yalnızca tarih. |
| `{total_price}` | Toplam kiralama bedeli (para birimi simgesiyle). |
| `{status}` | Rezervasyon durumu. |
| `{site_name}` | Web sitenizin ismi. |
| `{site_url}` | Web sitenizin adresi. |
| `{my_account_url}` | Müşterinin Hesabım sayfası. |

İade e-postaları ayrıca `{amount}`, `{currency}` ve `{reason}` etiketlerini de kabul eder.

:::info Tarih ve saatler
E-postalardaki tarih ve saatler sitenizin tarih biçimini, saat biçimini, saat dilimini ve dilini izler (WordPress'te **Ayarlar > Genel**); varsayılan rezervasyon e-postaları tarihin yanında saati de yazar. Hatırlatma e-postası hem teslim almayı hem dönüşü listeler, iptal e-postası da tarihleri yazar.
:::

---

## 🧪 Test ve Önizleme

Şablonlarda yaptığınız değişiklikleri canlıya almadan önce mutlaka kontrol edin:
1. **Önizleme:** Bildirim şablonları sayfasındaki **E-posta ön izleme** sekmesiyle tasarımı tarayıcıda inceleyin.
2. **Test e-postası gönder:** Belirlediğiniz bir e-posta adresine gerçek bir deneme mesajı göndererek mobil uyumluluğu kontrol edin.

---

### 🖼️ GÖRSEL: E-POSTA ŞABLON DÜZENLEYİCİ
*(MHM Rentiva > Ayarlar > Bildirim şablonları sekmesindeki şablon düzenleyici ekranı)*

---

## Teknik Not: E-posta Logları

**İletişim günlüklerini etkinleştir** açıkken eklenti, gönderilen e-postaları `EmailLog` özel yazı tipi (CPT) altında kayıt altına alır. Eğer bir müşteri "E-posta gelmedi" diyorsa, WordPress panelinden e-postanın çıkış yapıp yapmadığını bu loglardan doğrulayabilirsiniz.

```php
// Programatik e-posta gönderimi için Mailer sınıfı kullanılır:
Mailer::send($to, $subject, $template_id, $data);
```

---

### Bölüm Özeti
- **SMTP kullanımı** başarılı teslimat için kritiktir.
- Şablonlar **dinamik etiketlerle** kişiselleştirilebilir.
- Tüm gönderimler e-posta günlüğünden takip edilebilir.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Yer tutucu listesi eklentiyle uyumlu hale getirildi (`{salutation_name}`, saat ve tarih-saat etiketleri eklendi; `{vehicle_name}` ve `{site_title}` desteklenmediği için kaldırıldı); tarih ve saat sitenin biçimini izler; ayar adları düzeltildi. |
| 18.03.2026 | 4.21.2 | İçerik hibrit modele göre güncellendi ve SMTP notları eklendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |
