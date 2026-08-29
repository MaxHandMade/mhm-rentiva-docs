---
slug: rentiva-pro-v6.0.0-release
title: "Rentiva Pro 6.0.0 — Her şey tutarlı adlandırıldı ve askıya alma artık gerçekten askıya alıyor"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendors, security, breaking]
date: 2026-08-29T05:00
---

Bu bir ana sürüm ve temmuz sonundaki 5.2.3'ten bu yana yayınlanan ilk Pro paketi. Çoğu site sahibi için iki cümle yeter: **önce MHM Rentiva'yı 6.1.3'e, sonra Pro'yu güncelleyin**; verileriniz yönetim panelini bir sonraki açışınızda kendiliğinden taşınır. Geri kalan herkes — yani Pro'nun hook'larına bağlı özel kodu olanlar — önce kısa bir listeyi okumalı, çünkü 62 hook adı değişti ve bunlardan biri ateşlemeyi bıraktığında sizi hiçbir şey uyarmıyor.

<!--truncate-->

## Özel kodunuz varsa önce burayı okuyun

Pro'nun tanımlayıcıları, tıpkı ücretsiz eklentinin kendi 6.0.0'ında yaptığı gibi, tek ve tutarlı bir öneke taşındı. Bir kez yapılması iyi, kazara keşfedilmesi kötü bir iş — o yüzden tamamı burada.

**Hook kuralı tek adım.** `mhm_rentiva_` yerine `mhmrentiva_` yazın. Yani `mhm_rentiva_payout_approved` artık `mhmrentiva_payout_approved`. Üç mesaj hook'u düz `mhm_` öneki kullanıyordu, aynı kural onlar için de geçerli: `mhm_message_created`, `mhm_message_read` ve `mhm_message_status_changed`.

**Bir filtre yeniden adlandırılmadı, kaldırıldı.** `mhm_rentiva_vendor_apply_endpoint_slug` de diğerleri gibi yeni öneke süpürülmüştü; şimdi tümden kaldırıldı — çünkü hiç çalışmıyordu. Yalnızca gönderim sonrası yönlendirmenin kurulduğu yerde uygulanıyordu; bayi başvuru ucunu *kaydeden* kod ise onu ne bu sürümde ne de 5.2.3'te okuyordu. Onu ayarlayan herkes, WordPress'in haberi olmayan bir adrese yönlendiriliyor ve 404 alıyordu. Uca bağlamak yerine kaldırdık, çünkü buradaki uç adresi başka bir kodun yeniden yazacağı bir etiket değil, sitenizin diline sabitlenmiş bir tanımlayıcıdır.

**İnsanları asıl yakalayan kısım bizim hook adlarımız değil.** Pro'nun üç içerik türü yeniden adlandırıldı ve bu, onlardan türeyen WordPress hook'larını değiştiriyor:

| Eskiden | Şimdi |
| --- | --- |
| `mhm_message` | `mhmrentiva_message` |
| `mhm_payout` | `mhmrentiva_payout` |
| `mhm_vendor_app` | `mhmrentiva_vendor` |

Yani `save_post_mhm_payout` artık `save_post_mhmrentiva_payout`; aynısı `add_meta_boxes_*` ve `manage_*_posts_columns` aileleri için de geçerli. Eski türü anan her `WP_Query`, `get_posts` ya da `pre_get_posts` kontrolü artık sessizce hiçbir şeyle eşleşmiyor.

Üçüncü satıra dikkat. `mhm_vendor_app`, `mhmrentiva_vendor_app` **olmadı** — o ad 21 karakter ve WordPress içerik türünü 20 karakterlik bir sütunda tutuyor, dolayısıyla kayıt doğrudan reddedilir ve içerik türü tümden var olmaktan çıkardı. Adı `mhmrentiva_vendor`.

**Güncellemeden önce özel kodunuzda şunları arayın:** `mhm_rentiva`, `mhm_message_`, `save_post_mhm_payout` ve tırnak içindeki `'mhm_message'`, `'mhm_payout'`, `'mhm_vendor_app'` değerleri.

**Kısa kodlarınıza bilerek dokunulmadı.** `rentiva_vendor_profile`, `rentiva_vendor_directory`, `rentiva_vendor_ledger`, `rentiva_transfer_search`, `rentiva_transfer_results`, `rentiva_popular_routes` ve `rentiva_messages` hep taşıdıkları adı koruyor, çünkü o adlar sayfalarınızın içeriğinin içinde kayıtlı. Onları yeniden adlandırmak yayındaki sayfaları boşaltırdı. Bunlarla kurulmuş sayfalar ilginizi gerektirmiyor.

## Verileriniz kendiliğinden taşınıyor

Yirmi ayar, dört veritabanı tablosu — komisyon defteri, komisyon politikası, bayi raporları ve arka plan iş kuyruğu — on zamanlanmış görev ve Pro'nun içerik türlerine iliştirdiği özel alanların hepsi, güncellemeden sonra siteye ulaşan ilk yönetici, WP-CLI ya da zamanlanmış görev isteğinde bir kez çalışan bir göç işlemiyle yeni adlarına taşınıyor. Hiçbir şey silinmiyor, hiçbir şeyi yeniden girmeniz gerekmiyor.

## Önce ücretsiz eklentiyi güncelleyin

Pro, MHM Rentiva'nın hangi sürümüne ihtiyaç duyduğunu hep beyan ediyordu. Bugüne kadar hiç kontrol etmedi: tek test ücretsiz eklentinin kurulu olup olmadığını soruyordu, yeterince yeni olup olmadığını değil.

Artık kontrol ediyor ve **6.1.1 veya sonrasını** istiyor. Altındaki bir sürümde Pro hiçbir şey kaydetmiyor, hiçbir veriye dokunmuyor ve iki sürümü de adıyla anan bir uyarı gösteriyor — yanlış sırayla güncellemenin yıkıcı değil güvenli olmasının sebebi de bu. Yalnızca bekliyor. 5.2.3'te aynı uyumsuzluk, bir uyarı yerine bayi panelinde ölümcül hata üretiyordu.

## Askıya alma artık gerçekten askıya alıyor

Burada aynı anda üç şey birden yanlıştı ve birlikte, askıya alınmış bir bayiyi ekranın iddia ettiğinden daha az askıda bırakıyorlardı.

Askıya alınmış bir bayi, **kendi araç ilanlarını düzenleme ve silme yetkisini koruyordu**. Askıya alma bayi rolünü kaldırır ve o ilanları taslağa çeker, ama bir yetki filtresi, çağıranın yazarı olduğu her araçta düzenleme ve silme haklarını geri veriyordu. Rezervasyon geçmişi dahil. Filtrenin yetki veren yarısı artık bayinin etkin olup olmadığını soruyor; kısıtlayan yarısı olduğu kadar geniş kalıyor.

Askıya almak ayrıca **tek yönlü bir kapıydı**. İşliyordu, ama sonrasındaki her geri alma denemesi "bayi bulunamadı" ile — kalıcı olarak — başarısız oluyordu; ekran ise bayiyi askıda diye listelemeye ve düğmeyi sunmaya devam ediyordu. Beş uç, askıya almanın kaldırdığı bir rolü soruyordu. Operatör, askıdaki bir bayinin şehrini ya da komisyon oranını da düzeltemiyordu.

Ve askıya alınmış bir bayinin **bekleyen banka hesabı değişiklik talebi kayboluyordu** — operatörün sekmesinden de, sekmenin sayacından da, çünkü ikisi de role göre listeliyordu. Askıya almadan hemen önce gelmiş bir talep artık sonuçlandırılabiliyor.

Bundan ayrı olarak, iki eski form işleyicisi istekten gelen kullanıcı kimliğini doğrudan alıp üzerine bayi durumu yazıyordu — herhangi bir hesaba yöneltildiğinde biri, yabancı bir hesabı askıya alınmış bayi olarak işaretleyip o hesabın yazarı olduğu her şeyi taslağa çekebiliyordu. Eklentide bu işleyicilerin istediği jetonları üreten hiçbir şey yok, yani pratikte ulaşılamıyorlardı; ama gerçekten kullanılan rotalarla aynı işlemi daha zayıf bir kapının arkasında yapıyorlardı. İkisi de artık hedefi doğruluyor ve görünür biçimde reddediyor.

## Çalışmayan beş yönetim ekranı

Beş Pro yönetim ekranı, ücretsiz eklentinin REST uç listesini okuyordu; o liste ise Pro'nunkileri anlatmıyor — dolayısıyla her ekran yükleniyor ve ardından düşüyordu. Pro artık kendi haritasını sevk ediyor ve bir kontrol o haritayı gerçekten kayıtlı rotalarla karşılaştırıyor. Veri eksik olduğunda hata göstermek yerine bomboş kalan iki ekran daha çevrelendi, böylece sayfanın kalanı ayakta kalıyor.

Bayi panosu da düzeldi: geçerli lisansı olan bir bayi müşteri olarak çözümleniyordu — bu ona gezinmesine ve paneline mal oluyordu — panelin üstündeki finansal rakamlar da komisyon defterini okumak yerine sıfır gösteriyordu.

## Yeni bir Pro çıktığında artık haberiniz oluyor

Pro, WordPress.org dizininden değil wpalemi.com üzerinden dağıtılıyor; dolayısıyla WordPress'in kendi güncelleme kontrolünün onun hakkında söyleyecek bir sözü hiç olmadı — ve bugüne kadar bizim de olmadı. Eklentiler ekranı artık yeni bir sürüm çıktığında kendi satırımızı gösteriyor. WordPress'in güncelleme hattına katılmıyor; yalnızca size söylüyor.

## Ayrıca düzeltildi

Ücretsiz eklenti, Pro'nun ödünç aldığı kodu kaldırdığında bir grup ücretli yetenek çalışmayı bırakmıştı: ek hizmet bağlam kümesi, araç güvenilirlik ve ceza kümesi, mesaj bildirimi e-posta gövdeleri, yeri değişen e-posta şablonları ve onlar için kaydettiğiniz özelleştirmeler, ücretli kısa kodların öznitelik şemaları, transfer sonuçlarının premium stil dosyası ve bayi rolünün kendisi.

Pro ayrıca kendi çeviri kataloğunu yüklemiyordu, dolayısıyla Türkçesi hiç görünmüyordu. Yalnızca transfere ait ek hizmetler kiralama tarafında da sunuluyordu. Raporlar ekranı, bir rezervasyonun durum alanına çevrilmiş bir etiket yazıyordu. Veritabanı göçleri de artık MariaDB'nin yanı sıra MySQL 8'de çalışıyor.

---

Değişiklik günlüğünün tamamı eklentiyle birlikte iki dilde geliyor. 5.2.3'ten güncelliyorsanız, yukarıdakilerin hepsi arada oldu.
