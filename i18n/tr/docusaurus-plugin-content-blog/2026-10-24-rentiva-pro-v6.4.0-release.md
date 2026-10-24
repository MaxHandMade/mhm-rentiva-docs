---
slug: rentiva-pro-v6.4.0-release
title: "Rentiva Pro 6.4.0 — Transferler belirlediğiniz kaporayı alıyor, transfer sepeti sunucuda fiyatlanıyor, editörde güvenli önizleme"
authors: [maxhandmade]
tags: [release, rentiva, pro, transfer, payments, elementor, security]
date: 2026-10-24T06:30
---

6.4.0 transferlerin ayarların söylediği tutarı almasını sağlıyor. Transfer sepeti her transferi artık sunucuda fiyatlıyor ve Ayarlar > Transfer'de belirlenen kaporayı alıyor; önceden tarayıcının gönderdiği fiyatı alıyor ve her zaman tutarın tamamını tahsil ediyordu. Pro bileşenleri editörlerde güvenli önizleme gösteriyor, Pro e-postaları çevrilmiş adlar ve site dilini kazanıyor. Güncellemede veritabanı adımı çalışmıyor. **Önce MHM Rentiva'yı (Lite) 6.3.0'a, sonra Pro'yu güncelleyin.** Rentiva Pro 6.4.0, Rentiva 6.2.1 ve öncesiyle birlikte Rentiva güncellenene kadar özelliklerini kapatıyor; iki güncellemeyi art arda yapın.

<!--truncate-->

:::caution Transfer kaporalarınızı kontrol edin
Transferler artık tutarın tamamı yerine **Ayarlar > Transfer**'de belirlediğiniz kaporayı alıyor. **Aracın kendi kapora oranı önce gelir:** kendi oranını saklayan araç (eski varsayılan 10 yazıyordu), transfer ayarı "Tam ödeme gerekli" olsa bile transferde de bu kaporayı alıyor. Aracın transfer ayarını izlemesi için kapora alanını boşaltın. **Bayi komisyonu çevrim içi tahsil edilen tutar üzerinden hesaplanır**; bu yüzden böyle bir transferde komisyon kapora üzerinden hesaplanıyor, çevrim dışı tahsil edilen kalan tutar komisyon kaydı oluşturmuyor.
:::

## Transferler ayarlarınızın söylediğini alıyor

- **Transfer kapora ayarı uygulanıyor.** Ayarlar > Transfer'de ne seçilmiş olursa olsun ("Ödeme türü" / "Kapora oranı (%)") transferlerde tutarın tamamı alınıyordu; sepet artık ayarladığınız kaporayı alıyor.
- **Aracın kendi kapora oranı**, kiralamada olduğu gibi transfer ayarının da önüne geçiyor — yukarıdaki kutuya bakın.
- **Bayilerin eklediği araçlara** artık sabit %20 kapora yazılmıyor; site geneli ayarı izliyorlar.
- Ayarlar > Transfer'de kapora oranı alanı 1'den başlıyor (kapora istemiyorsanız "Tam ödeme gerekli"yi seçin) ve ekran, aracın kendi oranının önce geldiğini söylüyor.
- Transfer sekmesinde kaydedilen özel konum türleri artık uygulanıyor; eski kayıtlı bir değer onları gizlemiyor.

## Sunucuda fiyatlanan transfer sepeti

- **Her transfer sunucuda fiyatlanıyor.** Tarayıcının gönderdiği fiyat yok sayılıyor.
- **Transfer aramasının o rota için sunmadığı araç sepete eklenemiyor** — transfer için sunulmuyor, dolu, rota atanmamış ya da kapasitesi yetmiyor.
- **Bayi araç formu, formda görünmeyen bir kapora değerini artık kabul etmiyor.** Bayi elle değer göndererek hem kaporayı hem komisyon tabanını düşürebiliyordu.
- **Sepet ve sipariş satırları "VIP Transfer: A ➝ B" adını taşıyor**: blok sepeti, mini sepet ve kaydedilen sipariş genel rezervasyon adını artık kullanmıyor. Her ek hizmet fiyatıyla bir kez listeleniyor, fazladan "Ek hizmetler toplamı" satırı kalktı, dönüş tarihi satırı her site dilinde gizleniyor ve siparişlerdeki "Süre" satırı sepetteki gibi "Tahmini süre" oldu.

## Elementor ve editörler

- **Transfer sonuçları (11 ayar) ve İletilerim (1 ayar)** Elementor bileşenlerinde, bloklarıyla aynı ayarları taşıyan bir "Ek ayarlar" bölümü var. Varsayılanlar bugünkü çıktıya eşit; kayıtlı sayfalar aynı görünüyor.
- **Güvenli önizleme.** Elementor ve blok editöründe Transfer sonuçları, Bayi profili, İletilerim, Transfer arama, Popüler rotalar ve Bayi dizini Rentiva bileşenleriyle aynı önizleme çerçevesinde çiziliyor. Arama konumu ya da bayi seçilmedikçe notlu örnek transferler, örnek bayi ve örnek ileti dizileri gösteriyorlar; seçilen konumlar gerçek arama yapıyor, seçilen bayinin profili gösteriliyor. Kendi iletileriniz hiç görünmüyor ve formlar etkisiz. Bayi profili bayi bulunamadığında boş kutu yerine açıklama gösteriyor.
- **Pro blokları çevrili** ve Rentiva bloklarıyla birlikte "Rentiva" kategorisinde. Pro bileşen ve blok adlarından "MHM " öneki kaldırıldı. İngilizce blok başlıklarından ikisi değişti ("Messages" → "My Messages", "Popular Transfer Routes" → "Popular Routes"); Türkçe başlıklar aynı kaldı ("İletilerim", "Popüler rotalar").

## E-postalar

- **E-posta önizlemesi 31 Pro şablonunun hepsini çevrilmiş adıyla listeliyor** ("Vendor approved", "Payout approved" gibi İngilizce görünüyordu); her önizleme boşluklar yerine örnek bayi, ödeme, komisyon, rapor ve ileti verisiyle doluyor.
- **Pro e-postaları site dilinde**, profil dili farklı bir yönetici çalışırken bile, Rentiva e-postalarıyla birlikte.

## Düzeltmeler

- Kişisel veri dışa aktarımı müşterinin favori araçlarını yeniden içeriyor.
- İletilerim ekranındaki hata iletileri metinlerini gösteriyor; dördü boş çıkıyordu.
- Ayarlar aynı saniye içinde iki kez değiştiğinde Transfer sonuçları artık eski önbellek sonucunu sunmuyor; `columns` ayarının en küçük değeri 1, böylece 0 ya da sayı olmayan bir değer boş ızgara üretmiyor.
- Transfer süresi birimi ("dk") çevriliyor.
- **Türkçe:** "Deposit Rate (%)" artık "Kapora oranı" ("Mevduat Oranı" yerine), "Full Payment Required" artık "Tam ödeme gerekli"; e-posta dizelerinde "aktif" yerine "etkin" kullanılıyor; teslim alma/bırakma ifadeleri "Teslim alma / Dönüş" yönünde düzenlendi.

:::caution Bilinen sınır (6.3.0'dan beri değişmedi)
6.3.0 güncellemesinden sonra IBAN'ı okunamayan bir bayi, IBAN yeniden girilene kadar ödeme talep edemiyor ve 6.4.0'da da IBAN'ı yeniden girmek için bir form yok. Yönetici uyarısı bu bayilerin her birini listeliyor.
:::

## Geliştiriciler için

MHM Rentiva 6.3.0 gerektiriyor (6.2.0'dan yükseltildi). Kaldırılanlar: hiçbir menünün ya da bağlantının ulaşmadığı eski bir Transfer ayar sayfası, kayıt işleyicisi ve `admin_post_mhmrentiva_save_transfer_settings` eylemi. Transfer sepeti yalnız Transfer sekmesinin `mhmrentiva_transfer_deposit_*` anahtarlarını okuyor, `rentiva_transfer_deposit_*` anahtarlarını artık okumuyor. Pro, Rentiva'nın `mhmrentiva_cart_item_name`, `mhmrentiva_email_template_labels`, `mhmrentiva_email_preview_context` ve `mhmrentiva_parity_labels` süzgeçlerine bağlanıyor. Bayi dizini, Bayi profili ve Popüler rotalar `_html` süzgeçleri erken boş çıktıları da normalleştirilmiş özniteliklerle alıyor.

---

**Nereden alınır.** Pro 6.4.0, GitHub'da `v6.4.0` olarak yayınlandı ve wpalemi.com üzerindeki Rentiva Pro indirmesiyle sunuluyor. Önce [Rentiva'yı 6.3.0'a](/blog/rentiva-v6.3.0-release) güncelleyin. Tam sürüm notu eklentiyle birlikte iki dilde geliyor.
