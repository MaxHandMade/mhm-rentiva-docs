---
slug: rentiva-pro-v6.5.0-release
title: "Rentiva Pro 6.5.0 — Komisyon doğru bayiye yazılıyor, gizlilik talepleri e-postayla, çalışan bayi sözleşmesi ve site saat dilimine göre raporlar"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, privacy, security]
date: 2026-11-18T22:30
---

6.5.0 bayi parasının, iptallerin ve kişisel verilerin ele alınışını düzeltiyor. Komisyon artık rezervasyon yapılan aracın sahibi olan bayiye yazılıyor; önceden rezervasyonu yapan müşteriye yazılabiliyordu. İade yalnızca gerçekten yazılmış bir komisyonu geri alıyor. İletiler, bayi verileri ve onay kayıtları WordPress gizlilik araçlarında görünüyor; Hesabım'daki "Veri Dışa Aktarma Talebi" ve "Veri Silme Talebi" düğmeleri e-postayla onaylanan bir gizlilik talebi başlatıyor. "Bayi sözleşmesini zorunlu kıl" açıldığında artık her zaman bir sözleşme gösteriliyor; metin boşsa hazır bir şablon çıkıyor. Raporlar ve bayi analizleri site saat dilimini izliyor. **Pro 6.5.0, WordPress 7.0 ve üstünü ile Rentiva (Lite) 6.4.0 ve üstünü gerektiriyor: önce Lite'ı, sonra Pro'yu güncelleyin.**

<!--truncate-->

:::caution Bu güncellemeden önce yazılmış komisyon satırları düzeltilmez
Komisyon artık rezervasyon yapılan aracın sahibine yazılıyor ve sitenin kendi araçları komisyon satırı yazmıyor. Bu güncellemeden önce yazılmış satırlar düzeltilmez.
:::

:::caution Hesabım'daki gizlilik düğmeleri artık hemen işlem yapmıyor
"Veri Dışa Aktarma Talebi" ve "Veri Silme Talebi" artık müşterinin e-postayla onayladığı bir WordPress gizlilik talebi açıyor. Düğmeden hiçbir şey indirilmiyor ya da silinmiyor.
:::

## Komisyon doğru bayiye gidiyor

- **Komisyon, aracın sahibi olan bayiye yazılıyor.** Önceden rezervasyonu yapan müşteriye (ya da kimseye) yazılıyordu; sitenin kendi aracındaki bir iade de müşteriyi borçlandırıyordu. Artık iade, geri aldığı alacağın bayisini borçlandırıyor; bayi panelindeki kazanç ve "son 30 gündeki rezervasyonlar" doğru rezervasyonları sayıyor.
- **İade yalnızca var olan bir alacağa karşı satır oluşturuyor.** Siparişin ödemesinden önce gelen bir iade (örneğin işlemdeyken iade edilen bir havale), bayide hiç alacak yazılmamış para için borç bırakıyordu. Bekleyen iade artık ödeme tamamlandığında o alacağın komisyon oranıyla yazılıyor.
- **İptal kilidi yalnızca bayi araçlarında.** Yöneticinin kendi aracındaki bir rezervasyonu rezervasyon düzenleme ekranından iptal etmesi, o aracın tarihlerini 30 gün kilitliyordu. Kilit artık yalnızca bayinin listelediği araçlarda uygulanıyor.
- **Güvenilirlik puanı doğru iptalleri sayıyor.** Bayinin kullanıcı kimliğini taşıyan her iptali sayıyordu; sonradan bayi olan bir yöneticinin ya da kendi kiralamasını Hesabım'dan iptal eden bayinin iptali de buna dahildi. Ayrıca rezervasyonun oluşturulma tarihine bakıyordu; yedi ay önce yapılıp dün iptal edilen rezervasyon sayılmıyordu. Artık yalnızca bayi olarak yapılan iptaller, iptal tarihine göre ve site saat diliminde sayılıyor. Bayi kendi kiralamasını Hesabım'dan iptal ettiğinde tarihler artık kilitlenmiyor.
- **Gizlenen ayarlar:** "İptal Edilen Rezervasyon Yeniden Engelleme Süresi (Gün)" ve "İptal Başına Düşülen Puan" ayarları Bayi Pazar Yeri ayarlarından gizlendi; çünkü bayinin müşteri rezervasyonunu iptal edebileceği bir ekran henüz yok. Kayıtlı değerler korunuyor ve geçerli olmaya devam ediyor.
- **Ceza günleri:** bayi iptali ceza günleri artık araç aramasında dolu sayılıyor ve 30 gün sonra (iptal günü artı 29) kendiliğinden kalkıyor. "Tümüne uygula" ve "Tümünden kaldır" ceza günlerini artık kopyalamıyor ya da silmiyor. Elle kilitlediğiniz günler korunuyor.

## Gizlilik araçları

- **WordPress gizlilik araçlarında üç Pro girdisi.** Araçlar > Kişisel veriyi dışa aktar ve Kişisel veriyi sil artık İletiler (müşterinin yazışmaları), Bayi verileri (başvurular, profil, ödemeler, raporlar ve güvenilirlik puanı; reddedilen başvuranlar dahil) ve Onay kayıtlarını içeriyor. Lisansın süresi dolsa da çalışıyorlar. Banka hesapları yalnızca son dört haneyle dışa aktarılıyor. Silme sırasında bayi kayıtları saklanıyor (yasal saklama) ve sonuç bunu söylüyor. Önerilen gizlilik politikası metnine bir Pro bölümü eklendi.
- **Bayi dışa aktarımı eksiksiz.** Artık her başvuruyu, ödemeyi ve raporu sayfa sayfa veriyor; önceden 20 başvuru ve 500 ödeme ya da raporda duruyor ve her zaman bitti diyordu, reddedilen ödemeler de dışarıda kalıyordu.
- **Hesabım talepleri e-postayla onaylanıyor** (yukarıdaki kutuya bakın). Aynı hesap ve eylem için onay e-postası 10 dakika içinde yeniden gönderilmiyor; oturum anahtarlarını ve şifreli IBAN'ı da içeren eski dışa aktarım kaldırıldı.
- **Tek onay yanıtı.** Hesabım'daki gizlilik onayı kartı ile rezervasyon denetimi farklı yanıtları okuyordu; kartı kabul eden müşteri yine de onay vermemiş sayılabiliyordu. İkisi de artık tek bir yanıtı okuyor.
- **Türkçe:** onay bildirimi GDPR yerine 6698 sayılı KVKK'yı anıyor.

## Her zaman görünen bayi sözleşmesi

"Bayi sözleşmesini zorunlu kıl" açık ve metin boşken başvuranlar sözleşme görmüyor, yönetici de uyarı görmüyordu. Boş metin artık hazır, çevrilebilir bir şablon gösteriyor: ilanlar, rezervasyonlar, komisyon ve ödemeler, iptaller, hasar ve sigorta, kişisel veriler, askıya alma ve fesih, değişiklikler. Şablon gözden geçirilecek bir başlangıç noktasıdır, hukuki danışmanlık değildir. Sözleşme ayrıca ham işaretler yerine hafif biçimlendirmeyi (# başlıklar, **kalın**, - listeler, --- çizgiler) gösteriyor.

## Site saat dilimine göre raporlar

Müşteri ve Rezervasyon raporlarındaki rezervasyon tarihleri ve CSV dışa aktarımı, araç raporunun rezerve gün sayısı, varsayılan rapor aralıkları, iptal kilidinin bitişi ve bayi analizlerinin gün kovaları artık site saat dilimini izliyor; gece yarısına yakın bir rezervasyon yanlış güne düşmüyor.

## Düzeltmeler ve düzenlemeler

- **Ters bölü korunuyor.** Bayi araç formunda (başlık, açıklama, marka, model, renk, kilometre, plaka, şehir), bayi başvuru alanlarında ve ret notunda, ödemenin dış referansında ("BANK\6" "BANK6" olarak kaydediliyordu), transfer ek hizmet satırlarında ve bayi puan geçmişinde yazılan ters bölü kaydederken kayboluyordu.
- **Bayi tablosu:** 2. sayfadayken süzgeç değiştirmek önce yeni süzgeçle 2. sayfayı, sonra 1. sayfayı istiyordu; yavaş gelen bir yanıt daha yeni olanın üstüne yazabiliyordu. Sayfa ve süzgeçler artık tek istekte birlikte değişiyor, yüklenirken tablo ve sayfalama görünür kalıyor, "Yükleniyor…" yalnızca ilk yanıttan önce görünüyor.
- **Araç düzenleme ekranı.** Pro kutularını yeni tasarımın sırasıyla, Lite'ın yan kutularından sonra gösteriyor (kutuları kendiniz düzenlemediyseniz) ve her birinde "Pro" etiketi var. Yaşam döngüsü kutusu durumu renkli bir rozet olarak gösteriyor, 10 gün ya da daha az kaldığında uyarı veriyor ve renkleri beyaz üstünde okunuyor. Belgeler ve Transfer kutuları aynı stilleri kullanıyor, "yalnız kiralama" transfer alanlarını kayarak değil hemen gizliyor.
- **Yalnızca transfer için sunulan bir aracın kartında** artık karşılaştır düğmesi yok; karşılaştırma yalnızca kiralanabilen araçları tutuyor.
- **Lite 6.4.0 ile uyumlu.** Pro, Lite 6.4.0'daki yenilenen rezervasyon formu, Hesabım, karşılaştırma, takvim, iletişim ve yorumlarla uyumlu çalışıyor. Transfer ek hizmet penceresi site para birimi simgesini kendisi gösteriyor, bayi rezervasyonları sayfası kendi stillerini yüklüyor. Konumlar değiştiğinde ya da transfer içe aktarıldığında önbellekteki konum listesi yenileniyor.
- **Lisans hatırlatması.** Son 14 gündeki hatırlatma bitiş tarihini yazıyor, lisans sayfasına bağlantı veriyor ve "3 gün sonra hatırlat" seçeneği sunuyor; her yönetici sayfası yerine Rentiva ekranlarında, Eklentiler'de ve WordPress panosunda çıkıyor.
- **Türkçe:** "Details" her yerde Lite'taki gibi "Ayrıntı"; bayi dizininin süzgeç paneli başlığı "Filtre", bayi hesap dökümünün uygula düğmesi "Filtrele".

## Güncellemeden sonra neye bakmalı

- **Güncelleme sırası:** önce Rentiva (Lite) 6.4.0, sonra Pro 6.5.0. İkisi de WordPress 7.0 ve üstünü gerektiriyor (önceden 6.7).
- **Komisyon:** bu güncellemeden önce yazılmış satırlar düzeltilmez; geçmiş bayi kazançlarına bunu aklınızda tutarak bakın.
- **Bayi sözleşmesi:** "Bayi sözleşmesini zorunlu kıl" açıksa, özellikle metniniz boştuysa, başvuranların artık gördüğü metni okuyun.
- **Gizlilik talepleri:** müşterilerinize Hesabım düğmelerinin artık bir onay e-postası gönderdiğini söyleyin.
- **Bayi Pazar Yeri ayarları:** iki iptal ayarı gizli ama kayıtlı değerleri geçerli.

---

**Nereden alınır.** Pro 6.5.0, daha önce olduğu gibi lisans sahipleri için wpalemi.com üzerinden sunuluyor. Önce [Rentiva'yı 6.4.0'a](/blog/rentiva-v6.4.0-release) güncelleyin. Tam sürüm notu eklentiyle birlikte iki dilde geliyor.
