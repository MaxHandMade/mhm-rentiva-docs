---
id: payments
title: Ödeme Yapılandırması
sidebar_label: Ödeme Ayarları
sidebar_position: 4
slug: /core-configuration/payments
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva, finansal işlemlerini dünyanın en popüler e-ticaret altyapısı olan **WooCommerce** üzerine inşa eder. Bu sayede yüzlerce ödeme ağ geçidini (Stripe, PayPal, iyzico vb.) ek bir geliştirme yapmadan kullanabilirsiniz.

---

## 💳 Ödeme Akış Senaryoları

Sistem, ödemeleri iki temel kanal üzerinden yönetir:

### 1. Frontend (Müşteri) Ödemeleri
Web siteniz üzerinden müşterilerin yaptığı tüm kiralama işlemleri **WooCommerce** sepeti üzerinden döner.
- **Süreç:** Müşteri aracı seçer > Tarih belirler > "Hemen Kirala" der > Ürün sepete eklenir > Ödeme sayfasında kart bilgileri girilir.
- **Kritik Not:** Müşteri ödemeyi tamamladığında WooCommerce siparişi "Processing" veya "Completed" olur; buna bağlı olarak Rentiva rezervasyonu da otomatik "Confirmed" olur.
- **Misafirler:** Giriş yapmamış bir ziyaretçi hesap açmadan rezervasyon yapabilir. Rezervasyon formu ek bilgi istemez; ödeme sayfasındaki fatura bilgilerinden ad, e-posta ve telefon rezervasyona yazılır.

### 2. Sepet ve Ödeme Sayfası Görünümü

Sepet ve ödeme sayfaları, WooCommerce formunun üstünde rezervasyon adımlarını ve kiralamanın özetini (araç, tarihler, fiyat dökümü) gösterir. Tutarlar müşterinin ne ödediğine göre adlandırılır:

| Nerede | Etiket | Anlamı |
| :--- | :--- | :--- |
| Sepet ve ödeme sayfası | **Şimdi ödenecek** | Şimdi tahsil edilen tutar (kapora ya da tam fiyat). |
| Rezervasyon özeti | **Teslimde ödenecek** | Araç teslim edilirken ödenen kalan tutar. |
| Teşekkür sayfası | **Kapora ödendi** / **Gönderilecek kapora** | Kapora satırı paranın durumunu izler: ödeme alındı ya da havale henüz gönderilecek. |

### 3. Klasik Sepet Sayfası

Sepette bir kiralama varken, sayfalarınız Sepet veya Ödeme bloğu kullansa bile Rentiva WooCommerce'in **klasik** sepet ve ödeme sayfalarını gösterir; böylece rezervasyon adımları, kapora ve kalan tutar görünür. Yalnızca mağaza ürünü olan sepet Sepet bloğunu korur, rezervasyonsuz bir sipariş yine Ödeme bloğunu kullanır.

- **Ayar:** MHM Rentiva > Ayarlar > Ödeme sekmesi > **Klasik sepet sayfası** (varsayılan olarak açık). Bunu yalnızca Sepet bloğunun içinde yaptığınız özelleştirmeleri korumak istiyorsanız kapatın.
- Klasik sepet, o sepet boşaltılana kadar yerinde kalır.
- Sepet veya ödeme sayfanız bir blok kullanıyorsa, yöneticiye Rentiva ekranlarında ve Eklentiler sayfasında bunu anlatan bir bilgi notu gösterilir. Notu gizlemek için **Anladım, bunu bir daha gösterme** düğmesine tıklayın; seçim yönetici başına kaydedilir.
- Ayar kapalıyken Ödeme bloğu bir kiralama için de tüm ödeme yöntemlerini listeleyebilir; ancak kiralamalarda izin verilmeyen bir yöntem (aşağıya bakın) seçilince reddedilir.

### 4. Kiralamada Kapıda Ödeme Sunulmaz

WooCommerce'in **Kapıda ödeme** yöntemi kiralamada hiçbir zaman sunulmaz: kapıda ödenen kapora kapora sayılmaz, kalan tutar zaten teslimde ödenir. Bu, rezervasyon içeren her sepet için geçerlidir; karışık sepet de dahildir (bir siparişin tek ödeme yöntemi olur). Mağazanızın kendi kapıda ödeme ayarı değişmez; yalnızca mağaza ürünü içeren siparişlerde kullanılmaya devam eder.

- Kapıda ödeme etkin tek yöntemse müşteri şunu görür: "Kiralamalarda kapıda ödeme sunulmuyor ve henüz başka bir ödeme yöntemi tanımlanmadı. Rezervasyonunuzu tamamlamak için lütfen bizimle iletişime geçin." WooCommerce > Ayarlar > Ödemeler bölümünden başka bir yöntem (kart, havale) etkinleştirin.
- Yine de seçilirse (örneğin klasik sepet ayarı kapalıyken Ödeme bloğunda) "Rezervasyonlarda kapıda ödeme kullanılamaz. Lütfen başka bir ödeme yöntemi seçin." iletisiyle reddedilir ve rezervasyon yapılmaz.

### 5. Misafire Hesap Önerisi

Sepette kiralama varken misafir, mağaza ayarınızda ödemede hesap oluşturma kapalı olsa bile ödeme sayfasında WooCommerce'in "Hesap oluştur?" kutusunu görür. Mağaza ayarının kendisi değişmez, diğer sepetler ona uymaya devam eder. Hesap açan misafir rezervasyonunu **Hesabım**'da görür; açmayan misafirin Hesabım sayfası olmadığı için rezervasyonu teşekkür sayfasından ve e-postalardan takip eder.

### 6. Aynı Aracı Yeniden Seçmek

Aynı araç çakışan tarihlerle sepete yeniden gönderilirse (örneğin müşteri tarayıcının geri tuşuna basıp yeniden "Hemen Kirala" derse), yeni seçim eski satırın yanına eklenmez, onun **yerine geçer**. Müşteri şunu görür: "Sepetinizde "Araç" çakışan tarihler için zaten vardı. Sepet artık son seçiminizi tutuyor (tarih - tarih)." Tutar ikiye katlanmaz. Farklı bir araç ya da art arda tarihler (biri teslim edilirken diğeri alınıyorsa) ayrı satır olarak kalır.

Sepet yine de aynı aracı çakışan tarihlerle iki kez tutuyorsa ödeme sayfası bunu başka bir müşteriye yüklemez; şunu der: "Sepetinizde "Araç" çakışan tarihler için birden fazla kez var. Devam etmek için fazla satırı kaldırın."

İki müşteri aynı tarihler için yarışırsa kaybeden müşteri, aracın o tarihlerde artık müsait olmadığını söyleyen tek bir ileti görür. Sepet sayfasında satır, bu neden gösterilerek kaldırılır.

### 7. Backend (Yönetici) ve Offline Ödemeler
Yönetim panelinden manuel oluşturulan rezervasyonlar için kullanılır.
- **Elden Tahsilat:** Aracı teslim ederken nakit ödeme alıyorsanız, rezervasyon detayından "Offline Payment" olarak işaretleyebilirsiniz.
- **Banka Havalesi:** WooCommerce üzerindeki "BACS" (Banka Havalesi) yöntemiyle entegre çalışır. Havale siparişinden sonra teşekkür sayfasında, sipariş numarasını referans olarak, gönderilecek tutarı (WooCommerce'in tahsil ettiği sipariş toplamı; vergi, kupon ve ücretler dahil) ve teslimde ödenecek tutarı gösteren **Havaleniz** kartı çıkar. Giriş yapmış müşteri dekontu Hesabım'daki rezervasyondan yükler (**Dekont yükle**); misafirden dekontu sipariş numarasıyla birlikte mağazanın e-posta adresine göndermesi istenir. Ödemeyi onayladığınızda rezervasyon kesinleşir.
- **Ödenmemiş siparişler:** Arkasında rezervasyon olmayan bir sipariş (örneğin yarıda kesilen bir ödeme sayfası) ödenemez; böylece rezervasyonsuz para gelmez.

---

## 💰 Depozito Sistemi

MHM Rentiva, gelişmiş bir depozito (ön ödeme) mantığına sahiptir. 
- **Ayarlama:** Kaporayı araç bazında ya da MHM Rentiva > Ayarlar > Ödeme sekmesinden tüm site için belirleyin: **Kiralama ödeme türü** (*Tam ödeme gerekli* ya da *Kapora (yüzde)*) ve **Kapora oranı (%)**. Kendi kapora oranı olan araç bu ayar yerine o oranı kullanır. Site genelindeki varsayılan kapora %10'dur.
- **Çalışma Biçimi:** Araç toplam kirası 1000 TL ise ve %20 depozito aktifse, WooCommerce sepetine sadece 200 TL yansıtılır. Kalan 800 TL **Teslimde ödenecek** olarak görünür.

:::tip Geliştirici Notu
Depozito hesaplamaları için `DepositCalculator::calculate_deposit()` sınıfı kullanılır. Bu sınıf, ekstraları ve vergileri de hesaba katar.
:::

---

## 🛠️ Desteklenen Ödeme Yöntemleri

WooCommerce ile uyumlu tüm eklentiler Rentiva ile çalışır. En sık kullanılanlar:
- **Global:** Stripe, PayPal, Square.
- **Yerel (Türkiye):** iyzico, PayTR, Param.

---

### 🖼️ GÖRSEL: ÖDEME AYARLARI EKRANI
*(MHM Rentiva > Ayarlar > Ödeme sekmesindeki depozito ve diğer ayarları gösteren ekran)*

---

---

### Bölüm Özeti
- Frontend ödemeleri için **WooCommerce zorunludur**.
- Kiralamalarda klasik sepet ve ödeme sayfaları kullanılır; **kapıda ödeme** kiralamada sunulmaz.
- **Depozito** özelliği ile ön ödeme alabilirsiniz.
- Manuel rezervasyonlar için **Offline** ödeme desteği mevcuttur.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Klasik sepet sayfası ayarı, ödeme sayfası etiketleri, kapıda ödeme kuralı, misafire hesap önerisi ve havale kartı eklendi. |
| 18.03.2026 | 4.21.2 | İçerik hibrit modele göre güncellendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

