---
id: privacy-personal-data
title: Gizlilik ve Kişisel Veriler
sidebar_label: Gizlilik ve Kişisel Veriler
sidebar_position: 17
slug: /features-usage/privacy-personal-data
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva, WordPress'in kendi kişisel veri araçlarına bağlanır. Bir müşteri hakkında neler tuttuğunuzu sorduğunda ya da verilerinin silinmesini istediğinde talebi **Araçlar > Kişisel Verileri Dışa Aktar** ve **Araçlar > Kişisel Verileri Sil** ekranlarından yürütürsünüz; Rentiva verilerini ikisine de ekler. Ayrıca gizlilik politikası rehberinize hazır bir bölüm ekler.

> **(Pro)** ile işaretli kısımlar **MHM Rentiva Pro** gerektirir. Lisans bittikten sonra da çalışmaya devam ederler; çünkü veriler ve müşterinin bu veriler üzerindeki hakları sürer.

---

## Kişisel Verileri Dışa Aktar

Müşterinin e-posta adresini girin; dışa aktarma şunları toplar (WordPress hesabını WordPress'in kendi araçları, fatura alanlarını WooCommerce dışa aktarır):

| Grup | Neler dahil |
| :--- | :--- |
| **MHM Rentiva rezervasyonları** | Kişinin tüm rezervasyonları, misafir rezervasyonları dahil (e-posta adresiyle eşleşir): numara, durum, araç, alış ve dönüş tarihleri, ad, e-posta, telefon, notlar, toplam, ödeme durumu, iptal ve iade bilgileri, dekont bağlantısı ve notu, **Kiralama sözleşmesi kabul edildi** satırı (tarih ve metin sürümü) ve rezervasyon geçmişi notları (personel notları dahil). İptali kimin yaptığı ve dahili işlem günlüğü dışarıda kalır. |
| **MHM Rentiva iletişim mesajları** | Tarih, tür, ad, e-posta, telefon, şirket, mesaj, onay, IP adresi, tarayıcı ve ek dosya adı. |
| **MHM Rentiva e-posta günlüğü** | Gönderilen e-postaların tarihi ve konusu. |
| **MHM Rentiva hesap bilgileri** | Telefon, adres, favori araçlar, karşılaştırılacak araçlar, son giriş ve etkinlik ile bildirim tercihleri (hoş geldin e-postası, rezervasyon bildirimleri, pazarlama e-postaları). |
| **MHM Rentiva Pro mesajları (Pro)** | Kişinin mesaj yazışmaları. |
| **MHM Rentiva Pro bayi verileri (Pro)** | Bayi profili, tüm başvurular, tüm ödemeler (reddedilenler dahil, durumuyla) ve raporlar; sayfa sayfa. Banka hesabı (IBAN) yalnızca **son 4 hanesiyle** görünür. |
| **MHM Rentiva Pro onay kayıtları (Pro)** | Gizlilik onayının ne zaman verildiği ya da geri çekildiği. |

---

## Kişisel Verileri Sil

Silme şu kurallara göre çalışır:

- **Rezervasyonlar:** tamamlanmış, iptal edilmiş, iade edilmiş ve gelmedi rezervasyonlar **anonimleştirilir**: ad, iletişim bilgileri ve notlar kaldırılır; tarih, araç ve tutar muhasebeniz için kalır, bağlı WooCommerce sipariş satırındaki kopya da anonimleştirilir. Bekleyen, onaylı ve devam eden rezervasyonlar **tutulur** ve sonuçta listelenir; çünkü süren bir kiralamada kişiye ulaşılabilmesi gerekir. Bunlar bittikten sonra silmeyi yeniden çalıştırın. Bir rezervasyon tam anonimleştirilemezse sonuç bunu söyler; 15 dakika sonra yeniden çalıştırın.
- **İletişim mesajları, e-posta günlüğü ve uygulama günlüğü:** silinir.
- **Hesap bilgileri:** Rentiva'nın hesap bilgileri silinir. WordPress kullanıcı hesabı **silinmez**; gerekirse **Kullanıcılar**'dan silin. Müşteri bir e-posta bildirimini **kapatmışsa** bu tercih korunur; böylece silinen hesap yeniden e-posta almaya başlamaz.
- **Bağlı WooCommerce siparişleri** fatura bilgilerini WooCommerce gizlilik ayarınıza göre korur.
- **Mesajlar (Pro):** kişinin yazışmaları, sizin yanıtlarınız dahil tümüyle silinir.
- **Bayi verileri (Pro):** başvurular, ödemeler, defter ve raporlar yasal saklama için **tutulur**; sonuç bunu belirtir.
- **Onay kayıtları (Pro):** silinir. Sonuç ayrıca rapor önbelleklerindeki kopyaların 24 saat içinde yenilendiğini hatırlatır.

---

## Politika rehberi metni

**Ayarlar > Gizlilik** altındaki politika rehberine Rentiva iki öneri ekler; kendi gizlilik politikanıza kopyalarsınız. Sitenize uyanları tutun ve saklama sürelerini kendinize göre düzenleyin:

- **MHM Rentiva:** **Rezervasyonlar**, **İletişim formu**, **E-postalar ve günlükler** ve **Hesabınız** bölümleri; ayrıca Rentiva'nın veritabanı araçlarıyla alınan yedeklerin bu verileri içerdiği ve silme talebiyle değişmediği, eski yedekleri kendinizin silmesi gerektiği hatırlatması.
- **MHM Rentiva Pro (Pro):** **Mesajlar**, **Bayiler** ve **Onay** bölümleri; ayrıca rapor önbelleklerinin müşteri adı ve e-posta kopyalarını en fazla 24 saat tuttuğu, `uploads/mhm-rentiva-exports/` içine kaydedilen rapor CSV dosyalarının otomatik silinmediği (artık gerekmediğinde silin) ve hangi personelin banka ya da belge bilgisine baktığını kaydeden yönetici denetim günlüğünün tutulduğu hatırlatması.

---

## Hesabım gizlilik denetimleri (Pro)

Müşteriler bunları **Hesabım**'da görür:

- **Onay kartı:** müşteri henüz onay vermemişken Hesabım panosunun üstünde, sayfanın içinde **Kabul et** ve **Reddet** düğmeli bir kart çıkar. Artık diğer sayfaların üstünde açılan bir kutu değildir. Kartın metni KVKK'yı anar: "Kişisel verilerinizi 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında işlemek için onayınıza ihtiyacımız var."
- **Gizlilik denetimleri** bölümü: **Veri Dışa Aktarma Talebi**, **Veri Silme Talebi** ve yalnız müşteri onay verdikten sonra **Onayı geri çek**.

**Veri Dışa Aktarma Talebi** ve **Veri Silme Talebi**, müşterinin e-postayla onayladığı standart bir WordPress talebi açar (yeni onay e-postası 10 dakikada bir gönderilebilir). Onaylandıktan sonra talebi yukarıdaki **Araçlar** ekranlarından işlersiniz. Kartta verilen onay, rezervasyon formunun onay denetiminin okuduğu yanıtla aynıdır.

:::info 6.4.0'da değişti
Kişisel veri dışa aktarma ve silme, politika rehberi metni ve Hesabım talepleri 6.4.0 ile geldi. **Onayı geri çek** artık yalnız müşteri onay verdikten sonra görünür; onay kartı sayfanın üstünde bir kutu olarak açılmak yerine Hesabım panosunun üstünde durur.
:::

---

### Bölüm Özeti
- **Araçlar > Kişisel Verileri Dışa Aktar / Sil** kullanın; Rentiva rezervasyonları, iletişim mesajlarını, e-posta günlüğünü, hesap bilgilerini ve uygulama günlüğünü (yalnız silme) ekler. Pro; mesajları, bayi verilerini ve onay kayıtlarını ekler.
- Kapanmış rezervasyonlar anonimleştirilir, süren rezervasyonlar tutulur.
- Politika rehberi bölümlerini gizlilik politikanıza kopyalayın.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 / Pro 6.5.0 | Sayfa oluşturuldu: kişisel veri dışa aktarma ve silme, politika rehberi metni, Hesabım gizlilik denetimleri. |
