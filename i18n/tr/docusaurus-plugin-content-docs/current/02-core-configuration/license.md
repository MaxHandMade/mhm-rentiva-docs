---
id: license-management
title: Lisans Yönetimi
sidebar_label: Lisans Yönetimi
sidebar_position: 8
slug: /core-configuration/license
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva (Lite) ücretsizdir ve lisans anahtarı istemez. **Rentiva Pro** ayrı bir eklentidir; onun özellikleri (VIP Transfer, Mesajlaşma, Gelişmiş Raporlar, bayi pazaryeri ve diğerleri) geçerli bir lisans anahtarıyla açılır. Pro kuruluysa anahtarınızı **MHM Rentiva > Lisans** menüsünden yönetirsiniz.

---

## 💻 Yerel ve staging ortamları

**Lisans anahtarı her ortamda gereklidir** — yerel ve staging siteleri dahil.

Önceki sürümlerde `.dev`, `.local`, `.test`, `.staging` veya `.localhost` ile biten adreslerde Pro kendiliğinden açılıyordu ("Geliştirici Modu"). Bu davranış **5.0.0**'da kaldırıldı: `.dev` gerçek ve herkese açık kayıt edilebilir bir alan adı uzantısıdır, dolayısıyla bir üretim sitesi ücretli özellikleri kazara açabiliyordu. Artık bir özelliği yalnızca doğrulanan imzalı lisans token'ı açar; bunu atlayan hiçbir sabit, ayar veya filtre yoktur.

Yerel ya da staging kopyada çalışmak için lisansınızı orada da normal şekilde etkinleştirin. Anahtara aynı anda birden fazla sitede ihtiyacınız varsa, işiniz biten sitede önce devre dışı bırakın (aşağıya bakın).

---

## 🟢 Lisans Durumu ve Etkinleştirme

Sayfanın yönetim paneli üç ana bloğa bölünmüştür:

1. **Lisans Durumu:**
   Mevcut lisansın geçerliliğini gösterir. Lisans etkinse sayfada **"✅ Pro Lisans Etkin"** yazar; altındaki satır, lisansınızın gerçekten açtığı Pro özelliklerini sayar. Örneğin: *"Aktif Pro özellikler: Bayi ve Ödeme, Gelişmiş Raporlar, Mesajlar, Genişletilmiş Dışa Aktarım"*. Etkin lisans yoksa **"⚠️ Lite Sürüm Aktif"** yazar ve anahtarınızı ister.

2. **Lisans Etkinleştirme:**
   Satın aldığınız lisans anahtarını `XXXX-XXXX-XXXX-XXXX` formatındaki kutuya yapıştırıp **"Lisansı Etkinleştir"** butonuna basmanız yeterlidir. API anında doğrulama yapar.

3. **Lisans Yönetimi (Serbest Bırakma):**
   Eklentiyi başka bir web sitesine (domaine) taşımak isterseniz veya gerçek bir lisansı test/iptal etmek isterseniz, alttaki **"Lisansı Devre Dışı Bırak"** düğmesini kullanmalısınız. Aksi takdirde yeni domainde aktivasyon hatası (Too many activations) alabilirsiniz.

---

## 💎 Lite'ta neler var, Pro neler ekler

Lite'ta **araç, rezervasyon, müşteri ya da ek hizmet sınırı yoktur; süreli özellik ya da kilitli ekran da yoktur**. Pro, Lite'taki hiçbir sınırı kaldırmaz, çünkü kaldırılacak sınır yoktur; kendi modüllerini ekler. Her Pro modülü yalnızca lisansınız onu kapsıyorsa açılır.

| Alan | Lite'ta var | Pro ile eklenir |
| :--- | :--- | :--- |
| **Araç, rezervasyon, müşteri, ek hizmet** | İstediğiniz kadar, sınır yok | Ek bir şey yok (kaldırılacak sınır yok) |
| **Araç galerisi** | Ayarlarda belirlenen görsel sayısına kadar (varsayılan araç başına 50) | Ek bir şey yok |
| **Pano** | İstatistik kartları, gelir grafiği, son rezervasyonlar, yaklaşan operasyonlar, durum ve ödeme özetleri | Ek bir şey yok |
| **Raporlar** | Yalnız pano metrikleri | **Raporlar** ekranı: gelir, rezervasyon ve müşteri raporları |
| **Dışa aktarma** | Müşteri listesi CSV olarak | **Genişletilmiş Dışa Aktarım**: rezervasyonlar, araçlar ve günlükler CSV ya da JSON olarak, filtreli |
| **E-posta** | Düzenlenebilir 14 şablon (rezervasyon, durum, iptal, hatırlatma, iade, hoş geldin, çevrimdışı dekont, kalan ödeme) | Pro'nun kendi modülleri için ek şablonlar (bayi, ilan, ödemeler, mesajlar) |
| **Mesajlaşma** | İletişim formu ve İletişim Mesajları ekranı | **Mesajlar**: müşteri ile yönetici arasındaki yazışmalar, müşterinin Hesabım sayfasında da |
| **Bayi pazaryeri ve ödemeler** | — | Bayi başvuruları, bayi paneli, komisyonlar, bayi ödemeleri ve bayi raporları |
| **VIP Transfer** | — | Lokasyonlar, rotalar, transfer arama ve rezervasyon (herhangi bir etkin Pro lisansıyla açılır) |
| **Gizlilik / KVKK** | WordPress gizlilik araçlarında kişisel veri dışa aktarma ve silme (rezervasyonlar, iletişim mesajları, e-posta günlüğü, hesap bilgileri, uygulama günlüğü) ve politika rehberi metni | Hesabım onay kartı ve veri talepleri, Pro'nun mesajları, bayi verileri ve onay kayıtları için dışa aktarma ve silme, saklama süresi temizliği (bkz. [Gizlilik ve Kişisel Veriler](../03-features-usage/privacy-personal-data.md)) |

---

## ⏰ Yenileme hatırlatması ve bağlantı sorunları (Pro)

- **Yenileme hatırlatması:** Lisansın bitmesine son 14 günde, **bitiş tarihini** yazan ve Lisans sayfasını açan **Lisansı yönet** düğmeli bir bildirim görünür. Yalnız Rentiva ekranlarında, **Eklentiler**'de ve WordPress panosunda görünür; her yönetici sayfasında değil. **3 gün sonra hatırlat** bildirimi sizin için üç gün gizler; düğme yalnız bitişe en az dört gün varken sunulur ve son gün hatırlatma hep görünür.
- **Lisans sunucusu sorunları:** Lisans sunucusuna ulaşılamazsa, sunucu geçici bir hata (HTTP 5xx) ya da istek sınırı (HTTP 429) yanıtı verirse veya gelen yanıt sunucunun kendi yanıtı değilse (örneğin bir ağ giriş sayfası) Pro kapanmaz: son başarılı lisans denetiminden itibaren en fazla **yedi gün** çalışmaya devam eder ve **Bağlantı Uyarısı** bildirimi gösterir.
- **Yedi günden uzun sürerse:** Lisans yedi günün sonunda hâlâ doğrulanamıyorsa Pro özelliklerini **duraklatır** ve **Şimdi kontrol et** düğmeli bir bildirim gösterir. Etkinleştirme korunur: özellikler bir sonraki başarılı denetimde kendiliğinden geri gelir (zamanlanmış denetim altı saatte bir çalışır, Lisans sayfasını açmak da hemen denetler); lisansı yeniden etkinleştirmeniz gerekmez.
- **Gerçek bir ret:** Lisans sunucusundan gelen her ret (örneğin geçersiz, iptal edilmiş ya da bilinmeyen lisans) Pro'yu yine kapatır.

:::info Pro 6.5.0'da değişti
Yenileme hatırlatması bitiş tarihini yazar, Lisans sayfasına bağlantı verir ve artık her yönetici sayfasında görünmez.
:::

:::info Pro 6.5.1'de değişti
Lisans yedi günden uzun süre doğrulanamazsa Pro sitenin etkinleştirmesini silmek yerine duraklar ve bir sonraki başarılı denetimde kendiliğinden geri gelir.
:::

---

### Bölüm Özeti
- Lite lisanssız çalışır ve sınırı yoktur; lisans anahtarı yalnız Rentiva Pro'nun modüllerini açar.
- Lisansınız **MHM Rentiva > Lisans** menüsünden tek tuşla aktifleştirilir veya iptal edilir.
- Lisans her yerde gereklidir — yerel ve staging siteleri dahil; 5.0.0'dan itibaren Pro'yu lisanssız açan bir ortam yoktur.
- Domain taşıma öncesi eski lisans mutlaka **Devre Dışı Bırak** butonuyla serbest bırakılmalıdır.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.11.2026 | Pro 6.5.1 | Lisans yedi günden uzun doğrulanamadığında duraklama ve yeniden etkinleştirmeden geri gelme belgelendi. |
| 18.11.2026 | 6.4.0 / Pro 6.5.0 | Yenileme hatırlatması, lisans sunucusu sorunlarında yedi günlük ek süre ve Gizlilik / KVKK'nın Lite ile Pro arasındaki ayrımı belgelendi. |
| 09.11.2026 | 6.3.1 | Düzeltme: Lite'ta 5.2.0'dan beri araç, rezervasyon, müşteri ya da ek hizmet sınırı yok. Eski "Lite (Sınır) / Pro (Limitsiz)" tablosunun yerine, eklenti koduna karşı denetlenmiş "Lite'ta var / Pro ile eklenir" tablosu kondu. "Tam REST API" ve "E-posta Bildirimleri" Pro'ya özel kalemler arasından çıkarıldı. |
| 27.03.2026 | 4.23.0 | Lite limitleri güncellendi (araç: 3→5, müşteri: 3→10, galeri: 3→5). Pro-only özellikler ayrıştı: Vendor & Payout, GDPR, E-posta Bildirimleri. |
| 19.03.2026 | 4.21.2 | Lisans yönetimi rehberi görseller ve teknik notlarla modernize edildi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |
