---
id: payment-troubleshooting
title: Ödeme ve Finansal Sorun Giderme
sidebar_label: Ödeme Sorun Giderme
sidebar_position: 30
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Ödeme süreçleri (WooCommerce, Iyzico, Stripe vb.) ve finansal defter (Ledger) arasındaki uyumsuzlukları teşhis etmek ve gidermek için teknik bir rehberdir.
:::

# 💳 Ödeme ve Finansal Sorun Giderme

Ödeme hataları genellikle API bağlantıları, statü eşleşmeleri (Mapping) veya veritabanı kilitleri kaynaklıdır.

---

## 🛑 1. Yaygın Hata Kodları ve Çözümleri

### HTTP 400 / 401 (Hatalı İstek / Yetkisiz Erişim)
- **Neden:** API anahtarları (Public/Private Key) yanlış girilmiş veya Test/Live modu uyumsuz.
- **Çözüm:** Rentiva > Ödeme Ayarları sekmesinden anahtarların doğruluğunu ve "Çalışma Modunu" konfirme edin.

### HTTP 403 (Erişim Engellendi)
- **Neden:** Ödeme sağlayıcısının IP adresleri sunucu güvenlik duvarı (WAF/Cloudflare) tarafından engelleniyor olabilir.
- **Çözüm:** Ödeme sağlayıcısının (Örn: Iyzico, Stripe) IP aralıklarını beyaz listeye (Whitelist) ekleyin.

### HTTP 500 (Sunucu Hatası)
- **Neden:** Callback işlemi sırasında bir PHP hatası veya veritabanı çakışması.
- **Çözüm:** `wp-content/debug.log` dosyasını inceleyin ve `WooCommerceBridge::handle_webhook()` metodundaki hataları ayıklayın.

---

## 🔄 2. Statü Eşleşme (Status Mapping) Sorunları

### Ödeme "Tamamlandı" ama rezervasyon hala "Beklemede"?
- **Kontrol:** WooCommerce sipariş statüsünün `processing` veya `completed` olduğundan emin olun.
- **Teknik Detay:** Rentiva, WooCommerce status hook'larını (`woocommerce_order_status_changed`) dinler. Eğer otomatik tetiklenme olmuyorsa, eklenti çakışması olabilir.
- **Çözüm:** Manuel sipariş güncellemesi yaparak Rentiva statüsünün senkronize olup olmadığını test edin.

---

## 📖 3. Ledger (Defter) Tutarsızlıkları

### "Double-Spending" (Mükerrer Ödeme) Denemeleri
- **Durum:** Bir ödeme talebi (Payout) onaylanmış görünüyor ama bakiye düşmemiş.
- **Neden:** `AtomicPayoutService` transaction kilidine takılmış olabilir.
- **Çözüm:** `mhmrentiva_ledger` tablosunda ilgili `UUID` ile bir kayıt olup olmadığını SQL üzerinden doğrulayın.

### Commission Credit Oluşmuyor?
- **Neden:** Komisyon motoru (`CommissionEngine`), rezervasyonu sadece `completed` (Seyahat Bitti) statüsünde işler.
- **Çözüm:** Rezervasyonun gerçekten sona erdiğini ve statüsünün `completed` olduğunu konfirme edin.

---

## 🛠️ 4. API Bağlantı Testi (Idempotency)

Tüm API çağrılarında `idempotency` anahtarı kullanılır:
- **Teşhis:** Aynı ödeme isteğinin birden fazla kez gitmesi engellenmiştir.
- **Çözüm:** Eğer bir callback hatası alıyorsanız, ödeme sağlayıcısından gelen `transaction_id` değerini `AdvancedLogger` üzerinden aratın ve mükerrer kayıt olup olmadığını kontrol edin.

## 🙋 5. Sepet, Ödeme Sayfası ve Misafirler: Sık Sorulanlar

### Sepet/Ödeme bloğu kullanıyorum, sepetim ya da ödeme sayfam neden klasik görünüyor?
Sepette bir kiralama varken Rentiva, rezervasyon adımları, kapora ve kalan tutar görünsün diye WooCommerce'in klasik sepetini ve klasik ödeme sayfasını gösterir. Yalnızca mağaza ürünü olan sepet Sepet bloğunu korur. Sepet bloğunu korumak için MHM Rentiva > Ayarlar > Ödeme sekmesinde **Klasik sepet sayfası** seçeneğini kapatın; bkz. [Ödeme Ayarları](../02-core-configuration/payments.md).

### Kiralamada kapıda ödeme neden yok?
Rezervasyonda hiçbir zaman sunulmaz: kapıda ödenen kapora kapora sayılmaz, kalan tutar zaten teslimde ödenir. Yalnızca mağaza ürünü içeren siparişlerde kullanılmaya devam eder. Kapıda ödeme etkin tek yönteminizse WooCommerce > Ayarlar > Ödemeler bölümünden kart ya da havale yöntemini etkinleştirin. Yine de seçilirse (örneğin klasik sepet ayarı kapalıyken Ödeme bloğunda) listelenir ama seçilince "Rezervasyonlarda kapıda ödeme kullanılamaz. Lütfen başka bir ödeme yöntemi seçin." iletisiyle reddedilir.

### Sepette aynı araç için neden iki satır var ya da bir satır neden değişti?
Aynı aracı çakışan tarihlerle yeniden seçmek (örneğin tarayıcının geri tuşundan sonra) eski satırın yerine geçer ve müşteriye "Sepetinizde ... zaten vardı. Sepet artık son seçiminizi tutuyor" denir. Tutar ikiye katlanmaz. Farklı araç ya da art arda tarihler ayrı satır kalır. Sepet yine de aynı aracı çakışan tarihlerle iki kez tutuyorsa ödeme sayfası "Sepetinizde ... çakışan tarihler için birden fazla kez var. Devam etmek için fazla satırı kaldırın." der; müşteri fazla satırı kaldırır.

### Müşteri ödemede aracın müsait olmaktan çıktığını söylüyor.
O tarihleri başka bir müşteri önce rezerve etmiştir. Müşteri, aracın o tarihlerde artık müsait olmadığını söyleyen tek bir ileti görür; sepet sayfasında satır bu neden gösterilerek kaldırılır. Farklı tarihler ya da başka bir araç seçebilir.

### "Anladım, bunu bir daha gösterme" düğmesi ne yapar?
Blok tabanlı sepet ya da ödeme sayfası bilgi notunu yalnızca sizin için gizler; diğer yöneticiler notu görmeye devam eder. Not yalnızca Rentiva ekranlarında ve Eklentiler sayfasında görünür.

### Müşteri misafir. Rezervasyonunu nasıl görür?
Sepette kiralama varken misafir, ödeme sayfasında WooCommerce'in **Hesap oluştur?** kutusunu görür. Hesap açarsa rezervasyon **Hesabım**'da görünür. Hesap açmayan misafirin Hesabım sayfası olmaz; rezervasyon bilgilerini teşekkür sayfası ve e-postalar taşır.

## Denetim Listesi
1. API anahtarlarının doğruluğu (Test vs Live).
2. Güvenlik duvarı (WAF) blokları.
3. Webhook/Callback URL'inin doğruluğu.
4. WooCommerce statü senkronizasyonu.
5. Kiralamalar için kapıda ödeme dışında bir ödeme yöntemi etkin mi.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 18.11.2026 | 6.4.0 | Sepet, ödeme sayfası ve misafir soruları eklendi. |
| 19.03.2026 | 4.21.2 | API Hata Kodları, Status Mapping ve Ledger tutarlılık detayları eklendi. |
