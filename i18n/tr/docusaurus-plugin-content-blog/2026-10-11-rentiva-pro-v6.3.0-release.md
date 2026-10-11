---
slug: rentiva-pro-v6.3.0-release
title: "Rentiva Pro 6.3.0 — Bayi IBAN'ları ve belgeleri şifreli saklanıyor, mesajlar konuşma olarak yeniden kuruldu, bayi ayarları tek yerde"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, security, messages, admin]
date: 2026-10-11T06:30
---

6.3.0 bayilerin teslim ettiklerini koruyor: IBAN'lar, kimlik belgeleri ve araç belgeleri şifreleniyor ve medya kütüphanesinin dışında tutuluyor. Mesajlar konuşma olarak yeniden kuruldu; Bayi Yönetimi bir bayi ayrıntı sayfası ve bütün bayi ayarları için tek bir yer kazandı. **Önce MHM Rentiva'yı (Lite) 6.2.0'a, sonra Pro'yu güncelleyin.** Rentiva Pro 6.1.0 ve öncesi Rentiva 6.2.0 ile birlikte bayi panelinde hatayla duruyor; iki güncellemeyi art arda yapın.

<!--truncate-->

## Bayi IBAN'ları ve belgeleri şifreli saklanıyor

- **IBAN'lar ve kimlik belgeleri** (kimlik, ehliyet, adres belgesi) şifreleniyor ve medya kütüphanesinin dışında saklanıyor. Belgeler yalnızca JPG, PNG ya da PDF olarak kabul ediliyor, türü ve boyutu denetleniyor. Yöneticiler IBAN'ı Göster / Kopyala / Gizle ile açıyor, belgeleri kimin baktığını kaydeden yollardan görüyor; ödeme dökümleri IBAN'ı maskeli gösteriyor.
- **Araç ruhsatı ve sigorta belgeleri** de herkese açık medya kütüphanesinden çıkıyor. Araç düzenleme ekranında, kimin baktığını kaydeden bir Araç Belgeleri kutusu var; bir bayi belgesini yenileyince yönetici e-posta alıyor.
- **Güncellemede mevcut IBAN'lar ve belgeler dönüştürülüyor; eski belge ekleri şifreli depoya kopyalandıktan sonra medya kütüphanesinden siliniyor.** Böyle bir dosyayı gösteren galeri ya da kapak girdileri kaldırılıyor.

**Önerilen:** ek bir ayar yapılmazsa şifreleme anahtarları `wp-config.php`'deki WordPress anahtarlarından türetiliyor; bu anahtarlar değişirse saklanan IBAN'lar ve belgeler okunamıyor. Verinin kendine ait bir anahtarı olsun diye `wp-config.php`'ye `MHM_RENTIVA_SENSITIVE_KEY` tanımlayın — yönetici uyarısı bunu öneriyor, nereye yazılacağını anlatıyor ve yeni bir anahtarla hazır bir `define()` satırı basıyor.

:::caution Bilinen sınır
Güncellemeden sonra IBAN'ı okunamayan bir bayi — örneğin bayi onaylandıktan sonra `wp-config.php`'deki WordPress anahtarları değiştirildiyse — **IBAN yeniden girilene kadar ödeme talep edemiyor ve 6.3.0'da IBAN'ı yeniden girmek için bir form yok.** Yönetici uyarısı bu bayilerin her birini adıyla ve bağlantısıyla gösteriyor.
:::

## Mesajlar konuşma olarak yeniden kuruldu

Bir konuşma, bir ilk mesaj ve onun yanıtlarından oluşuyor. Yeni bir yönetici gelen kutusu ve konuşma görünümü var — öncelik, son etkinlik, müşteri, durum ve ilgili rezervasyon — katlanıp durumunu hatırlayan yan kartlarla. Müşteriler yalnızca kendi konuşmalarını, düz metin olarak görüyor. E-posta kuralları açık: durum e-postası yalnızca yöneticinin tek bir değişikliği için, her yönetici yanıtı için tam bir e-posta, toplu işlemlerde ve güncellemede hiç e-posta yok, otomatik yanıt yalnızca yeni bir konuşma için. Mesajların kendi yetkileri var. Mevcut mesajlar güncellemede, e-posta gönderilmeden bir kez dönüştürülüyor. Mesajlar e-posta bildirimleri artık gerçekten kapatılabiliyor.

## Bayi yönetimi

- **Bir bayi ayrıntı sayfası:** rakamlar, iletişim (şehir düzenlenebilir), denetlenen IBAN gösterimiyle ödeme ve vergi bilgileri, onaylanmış başvuru ve belgeleri, güvenilirlik ve rozet, geçerli komisyon ve kaynağı, bayinin araçlarındaki rezervasyonlar ve yorumlar, askıya alma / yeniden etkinleştirme.
- **Bayi Yönetimi Aktif Bayiler ile açılıyor**; her bayi için e-posta, şehir, araç sayısı, geçerli komisyon ve puan, bir sayaç şeridi ve bir "Şehre göre gelir" kartı var. Onaylama, reddetme, IBAN ve askıya alma işlemleri tarayıcı açılır penceresi yerine sayfa içinde onay istiyor. Üç belgesi eklenmemiş bir başvuru reddediliyor.
- **Bütün bayi ayarları Eklenti Ayarları > Bayi Pazaryeri altına taşındı**; Bayi Yönetimi'nin Ayarlar sekmesi kalktı. Yeni "Yeni bayi başvurularını kabul et" anahtarı varsayılan olarak açık. İlan ücreti ayarları artık gerçekten kaydediliyor. Sekiz ayrı bayi seçeneği güncellemede oraya taşınıyor.
- Rentiva'nın **Müşteriler** ekranında bayiler "Bayi" ya da "Askıdaki bayi" rozeti taşıyor; **Rezervasyonlar** ekranına Bayi süzgeci ve sütunu eklendi.

## Düzeltmeler

- **Komisyon oranı kaydedilmemiş yeni bir kurulum artık WooCommerce ödemelerini, tamamlamalarını ve iadelerini bozmuyor.** Komisyon bir sipariş notuyla bekletiliyor ve sonradan kaydedilen oranla yazılıyor; bir yönetici uyarısı kaç komisyonun beklediğini gösteriyor.
- Tek bir bekleyen bayi başvurusu artık giriş yapmış diğer bütün müşterilerin panelini boşaltmıyor.
- Bayi e-postaları (13 şablon ve ödeme dökümü), bayileri Hesabım'a geri göndermek yerine Bayi Paneli'nin ilgili bölümüne bağlanıyor.
- Müşteri, araç ve gelir raporları yalnızca tamamlanmış ve onaylanmış rezervasyonları sayıyor; aynı anda yapılan genel oran değişiklikleri artık birbirini ezmiyor.
- Altı Pro Elementor bileşeninin hepsi içinde kaydedilen ayarları uyguluyor; kaydedilip yok sayılan ayarlar artık uygulanıyor — örneğin Transfer Arama'nın "Dikey" yerleşimi ve artık kayıtlı konum türlerinizi listeleyen Popüler Rotalar kalkış türü süzgeci. Hiçbir işe yaramayan ayarlar Mesajlar bloğundan, Transfer Sonuçları'ndan, Transfer Arama'dan ve Popüler Rotalar'dan kaldırıldı.

## Geliştiriciler için

Kaldırılanlar: `mhmrentiva_message_read` eylemi, `mhmrentiva_account_vendor_panel` filtresi, eski mesaj formu işleyicileri ve `Message::mark_as_read()`, `VendorApplicationManager::encrypt_iban()` / `decrypt_iban()` gibi yöntemler, `GET/POST /vendors/settings` REST yolları. `mhmrentiva_message_status_changed` artık konuşmanın ilk mesajının kimliğini ve `array( 'actor' => … )` geçiriyor. **Saklanan IBAN'ların biçimi değişti:** IBAN meta'sını doğrudan okuyan kod çalışmıyor. Güncellemede beş veritabanı adımı bir kez çalışıyor.

---

**Nereden alınır.** Pro 6.3.0, GitHub'da `v6.3.0` olarak yayınlandı ve wpalemi.com üzerindeki Rentiva Pro indirmesiyle sunuluyor. Önce [Rentiva'yı 6.2.0'a](/blog/rentiva-v6.2.0-release) güncelleyin. Tam sürüm notu eklentiyle birlikte iki dilde geliyor.
