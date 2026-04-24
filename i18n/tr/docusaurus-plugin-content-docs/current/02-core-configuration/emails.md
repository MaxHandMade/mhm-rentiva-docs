---
id: emails
title: E-posta ve Bildirimler
sidebar_label: E-posta Yapılandırması
sidebar_position: 5
slug: /core-configuration/emails
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva, rezervasyon sürecinin her adımında hem yöneticiyi hem de müşteriyi bilgilendiren gelişmiş bir e-posta bildirim sistemine sahiptir. **MHM Rentiva > Settings > Emails** sekmesinden bu şablonları tamamen özelleştirebilirsiniz.

---

## 📧 Genel E-posta Yapılandırması

Tüm e-postaların profesyonel görünmesi için temel ayarları yapın:
- **Gönderici Adı & Adresi:** Müşterilerinizin gelen kutusunda göreceği isim ve e-posta.
- **E-posta Logosu:** Şablonların en üstünde yer alacak şirket logosu.
- **Ana Renk:** Butonlar ve başlıklar için markanıza uygun bir HEX kodu belirleyin.

:::important SMTP Tavsiyesi
WordPress'in varsayılan `mail()` fonksiyonu genellikle e-postaların "Spam" klasörüne düşmesine neden olur. Kesintisiz bildirimler için **WP Mail SMTP** gibi bir eklenti kullanarak SendGrid, Mailgun veya kendi SMTP sunucunuzu bağlamanızı şiddetle öneririz.
:::

---

## 📝 Şablon Değişkenleri (Placeholders)

Şablonları kişiselleştirmek için aşağıdaki dinamik etiketleri kullanabilirsiniz. Sistem, e-postayı gönderirken bu etiketleri gerçek verilerle değiştirir:

| Etiket | Açıklama |
| :--- | :--- |
| `{customer_name}` | Müşterinin tam adı. |
| `{booking_id}` | Benzersiz rezervasyon numarası. |
| `{vehicle_name}` | Kiralanan aracın başlığı. |
| `{total_price}` | Toplam kiralama bedeli (Para birimi simgesiyle). |
| `{pickup_date}` | Aracın alınacağı tarih ve saat. |
| `{site_title}` | Web sitenizin ismi. |

---

## 🧪 Test ve Önizleme

Şablonlarda yaptığınız değişiklikleri canlıya almadan önce mutlaka kontrol edin:
1. **Preview:** Şablon düzenleme ekranındaki "Preview" butonu ile tasarımı tarayıcıda inceleyin.
2. **Send Test Email:** Belirlediğiniz bir e-posta adresine gerçek bir deneme mesajı göndererek mobil uyumluluğu kontrol edin.

---

### 🖼️ GÖRSEL: E-POSTA ŞABLON DÜZENLEYİCİ
*(MHM Rentiva > Ayarlar > E-posta sekmesindeki görsel şablon editörü ekranı)*

---

---

## Teknik Not: E-posta Logları

Eklenti, gönderilen tüm e-postaları `EmailLog` özel yazı tipi (CPT) altında kayıt altına alır. Eğer bir müşteri "E-posta gelmedi" diyorsa, WordPress panelinden e-postanın çıkış yapıp yapmadığını bu loglardan doğrulayabilirsiniz.

```php
// Programatik e-posta gönderimi için Mailer sınıfı kullanılır:
Mailer::send($to, $subject, $template_id, $data);
```

---

### Bölüm Özeti
- **SMTP kullanımı** başarılı teslimat için kritiktir.
- Şablonlar **dinamik etiketlerle** kişiselleştirilebilir.
- Tüm gönderimler **Email Log** altında takip edilebilir.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.03.2026 | 4.21.2 | İçerik hibrit modele göre güncellendi ve SMTP notları eklendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

