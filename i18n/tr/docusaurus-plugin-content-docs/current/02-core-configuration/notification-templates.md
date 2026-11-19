---
id: notification-templates
title: Bildirim Şablonları
sidebar_label: Bildirim Şablonları
sidebar_position: 9
slug: /core-configuration/notification-templates
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Bildirim Şablonları sekmesi, müşterilere ve yöneticilere giden tüm e-posta içeriklerini (HTML) özelleştirebileceğiniz, test edebileceğiniz ve "Altın Standart" (Gold Standard) tasarımına geri dönebileceğiniz merkezdir. **MHM Rentiva > Ayarlar > Bildirim şablonları** altından ulaşılır. Bir alan boşsa sistem Altın Standart düzenini kullanır.

---

## 🛠️ Yönetim Araçları

Sayfanın sağ üst kısmında iki kritik buton bulunur:
- **E-posta ayarları:** Gönderen ismi ve renk gibi global ayarlara hızlı geçiş sağlar.
- **Gold Standard'ı geri yükle:** Şablonlarda yapılan hataları düzeltmek veya orijinal profesyonel tasarıma dönmek için kullanılır.

---

## 📂 Şablon Kategorileri

Bildirimler sekmeler altında gruplanmıştır:

### 1. Rezervasyon bildirimleri
Müşterinin kiralama süreciyle ilgili temel mesajlar. Her birinin kendi **Etkin** anahtarı (uygun olduğunda), **Konu** ve **İçerik (HTML)** alanı vardır:
- **Yeni rezervasyon e-postası:** Rezervasyon oluşturulduğunda müşteriye gider. Varsayılan konusu "Rezervasyon alındı: #…" şeklindedir — rezervasyon alınmıştır, henüz onaylanmış değildir; onay, ödeme geldiğinde durum e-postasıyla müşteriye ulaşır.
- **Rezervasyon durumu değişikliği e-postası:** Onaylandı, Beklemede gibi durum güncellemeleri.
- **Yönetici bildirim e-postası:** Yeni rezervasyon geldiğinde size giden uyarı (alıcı adresini siz seçersiniz).
- **Otomatik iptal e-postası:** Ödeme süresi dolduğunda gider.
- **Manuel iptal e-postası:** Personel bir rezervasyonu iptal ettiğinde gider.
- **Teslim alma hatırlatma e-postası:** Teslim almadan kısa süre önce gider; teslim alma ve dönüşü listeler.
- **Müşteri karşılama e-postası:** Müşterinin ilk rezervasyonundan sonra gider.

Bu alanlarda gördüğünüz konu ve içerik, gönderilenin kendisidir. Ayarlar ekranını eski bir varsayılan konuyla kaydettiyseniz yeni varsayılan konu görünür ve kullanılır; kendi yazdığınız konu korunur.

### 2. İade e-postaları
İade süreçlerine özel şablonlar:
- **Müşteri iade e-postası:** İade edilen tutar, rezervasyon numarası ve paranın müşteriye nasıl ulaşacağı.
- **Yönetici iade e-postası:** Muhasebe ve operasyon takibi için yöneticiye giden bilgi.

İade havale ya da nakit gibi yollarla elle geri ödendiğinde müşteri, WooCommerce'in "siparişiniz iade edildi" e-postası yerine Rentiva'nın "iade size manuel olarak aktarılacaktır" e-postasını alır. Rentiva e-postası kapalıysa ya da rezervasyonda geçerli bir adres yoksa WooCommerce'inki eskisi gibi gönderilir. Ödeme ağ geçidinin kendisinin geri verdiği iadede WooCommerce e-postası değişmez. İadenin elden transferini onayladığınızda müşteriye ikinci bir e-posta gider: "… tutarındaki iadeniz size aktarıldı"; bir referans yazdıysanız aktarım referansı da eklenir.

### 3. Mesaj ve Bayi bildirimleri (Pro)
> Bu sekmeler **MHM Rentiva Pro** etkin olduğunda görünür.

- **Mesaj Bildirimleri:** Personele yeni mesaj uyarısı, müşteriye yanıt e-postası ve otomatik teyit.
- **Bayi Bildirimleri:** Bayi pazaryeri için e-postalar.

### 4. E-posta ön izleme
Aşağıya bakın.

---

## 🔍 E-posta Önizleme ve Test

Şablonların canlı halini kontrol etmek için **E-posta ön izleme** sekmesini kullanın:
- **Canlı Önizleme:** E-postanın müşterinin gelen kutusunda nasıl görüneceğini gösterir.
- **Test Gönderimi:** Belirli bir şablonu seçip istediğiniz bir adrese "Test e-postası" göndererek gönderimi doğrulayabilirsiniz.

---

## 🏷️ Kullanılabilir Dinamik Etiketler (Placeholders)

Şablon içeriklerine `{}` parantezleri içinde aşağıdaki kodları ekleyerek verilerin otomatik gelmesini sağlayabilirsiniz. Etiket listesi her sekmenin üstünde de yazılıdır. Tam liste [E-posta ve Bildirimler](./emails.md) sayfasındadır:
- `{booking_id}`: Rezervasyon numarası.
- `{vehicle_title}`: Araç adı.
- `{pickup_date}` / `{dropoff_date}`: Tarihler.
- `{pickup_time}` / `{return_time}`: Saatler.
- `{pickup_datetime}` / `{return_datetime}`: Tarih ve saat birlikte (saat kayıtlı değilse yalnızca tarih).
- `{total_price}`: Toplam tutar.
- `{contact_name}` / `{salutation_name}`: Müşteri adı; ikincisi selamlama içindir ve ad yoksa "değerli müşterimiz" yazar.
- `{site_name}`: Sitenizin adı.

---

## ✉️ Rezervasyondan müşteriye e-posta gönderme

Bir rezervasyonun düzenleme ekranındaki **Müşteriye e-posta gönder** kutusunda bir tür seçersiniz: Rezervasyon onayı, Rezervasyon hatırlatması, Rezervasyon iptali veya Özel ileti. Konu ve gövde buradaki şablondan dolar ve göndermeden önce değiştirebilirsiniz. Değiştirilmemiş şablon otomatik e-postayla aynı gider; konuyu değiştirirseniz e-postanın başlığı o olur. Gönderim kapalıysa ya da test kipindeyse kutu bunu söyler; müşteri bildirimleri kapattıysa bir not düşülür. Gönderim rezervasyon geçmişine yazılır.

---

![Ayarlar > Bildirim Şablonları sekmesi](/img/docs/screens/settings-email-templates.webp)

*Ayarlar > Bildirim şablonları sekmesi, şablon listesi ve önizleme aracı*

---

### Bölüm Özeti
- **Gold Standard** ile profesyonel bir e-posta tasarımıyla başlayın.
- **Dinamik Etiketler** ile mesajları kişiselleştirin.
- **Önizleme Aracı** ile hataları yayına girmeden önce düzeltin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Şablon türleri, tarih-saat etiketleri, `{salutation_name}`, yeni rezervasyon konusu "Rezervasyon alındı", elle yapılan iadelerde iade e-postaları ve "Müşteriye e-posta gönder" kutusu belgelendi. |
| 19.03.2026 | 4.21.2 | Bildirim Şablonları dökümanı 4 farklı sekme ve önizleme aracı detaylarıyla oluşturuldu. |
