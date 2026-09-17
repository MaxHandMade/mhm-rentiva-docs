---
slug: rentiva-pro-v6.2.0-release
title: "Rentiva Pro 6.2.0 — Bayilere ait bir panel, tek para birimli defter ve komisyonu birebir geri alan iadeler"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, payouts, money, security]
date: 2026-09-17T06:30
---

Bayiler kendilerine ait bir panele kavuşuyor ve arkasındaki para tek bir zemine oturuyor: defterde tek para birimi ve alacak yazılan komisyonu birebir geri alan iadeler. **Önce MHM Rentiva'yı 6.1.5'e, sonra Pro'yu güncelleyin.** Pro daha eski bir Rentiva bulursa bir bildirimle kendini kapatır ve hiçbir şey oluşturmaz.

<!--truncate-->

## Bayilerin çalışabileceği bir panel

Pro, `satici-panel` adresinde bir **Bayi Paneli** sayfasını kendiliğinden oluşturuyor. Sayfada beş bölüm var: Panel, İlanlarım, Rezervasyonlar, Kazanç ve ödemeler, Değerlendirmeler. Hesabım altındaki eski bayi alanı artık kalıcı olarak buraya yönlendiriyor.

- **İlanlarım**'dan bayi bir ilanı duraklatıyor, sürdürüyor, geri çekiyor, yeniliyor ve yeniden yayınlıyor. Yalnızca ilanın o anki durumunun izin verdiği eylemler gösteriliyor; hiç onaylanmamış bir ilan hiçbirini göstermiyor, ilan ücretini bekleyen ilan *Ödemeyi tamamla* gösteriyor. Reddedilen ilan ret notunu gösteriyor, geri çekilen ilan rezervasyon geçmişini koruyor.
- **Kazanç ve ödemeler**'den bayi ödeme talep ediyor. Bir talep beklerken panel formun yerine o talebi gösteriyor.
- Yönetici, bayilerin ne gördüğünü görmek için paneli açabiliyor. Askıya alınmış bir bayi erişiminin neden durduğunu görüyor; başvurusu hâlâ bekleyen bir aday da başvuru formuna geri gönderilmek yerine başvurusunun durumunu görüyor.

## Defterde tek para birimi

Bayi defteri artık her tutarı **mağazanın ana para biriminde**, mağazanın kendi ondalık hassasiyetiyle kaydediyor — ziyaretçi Currency Switcher üzerinden başka bir para biriminde ödemiş olsa bile. Böyle bir siparişin komisyonu **o siparişe kaydedilen döviz kuruyla** çevriliyor. Bu sürümün Rentiva 6.1.5 gerektirmesinin sebebi de bu: 6.1.5, Rentiva'nın veritabanı temizliğinin tam da o kayıtlı kuru silmesini durduruyor.

Bakiyeler ve toplamlar yalnızca ana para birimindeki tutarları sayıyor. Bir bayinin başka bir para biriminde tuttuğu bakiye, sessizce eklenmek yerine Kullanılabilir bakiye kartında ayrıca adıyla gösteriliyor. Defterin para sütunları tek seferlik bir veritabanı güncellemesiyle dört ondalığa genişletiliyor; mevcut her defter satırının denetim özeti (hash) değişmiyor.

## İadeler, alacak yazılanı birebir geri alıyor

Bir iade artık komisyonu, ait olduğu komisyon satırına bağlı olarak **kümülatif** biçimde geri alıyor. Herhangi bir kısmi iade dizisi — komisyonun kendisinden önce kaydedilmiş bir iade dahil — alacak yazılanı birebir, o komisyonun para biriminde geri alıyor. Aynı siparişin iadeleri sırayla işleniyor; birlikte gelen iki iade artık komisyonun tamamını iki kez geri alamıyor.

## Gerçek bir ödemeden sonra "Toplam ödenen" 0 görünüyordu

Ödemeler ekranından onaylanan ödemeler, toplamların tanımadığı bir türle ve ödendi yerine *ayrılmış* olarak kaydediliyordu — hiçbir şeyin onları çıkarmadığı bir durum. Bayinin "Toplam ödenen" değeri 0 okunuyor, kazanç ödemeyi eksi olarak sayıyordu. Ödemeler artık ödendi olarak kaydediliyor; bu sürümden önce o yoldan onaylananlar da bir sonraki yönetim sayfası yüklemesinde düzeltiliyor.

## Güncellemeden önce okuyun

- **Güvenlik.** İlan ücreti açıkken, yenileme ya da yeniden yayınlama isteği ilanı **ilanın talep eden bayiye ait olup olmadığını kontrol etmeden önce** onun sepetine koyuyordu — etkin bir bayi başka bir bayinin ilanını yenileyebiliyor ya da yeniden yayınlayabiliyordu. Artık önce sahiplik kontrol ediliyor.
- İlan ücreti açıkken, ücretli bir yenileme ya da yeniden yayınlama ücreti, ilanın yenilenip yenilenemeyeceğini sormadan **önce** alıyordu: süre aşımını geçmiş bir yenilemenin ücreti ödeniyor ve ilan süresi dolmuş olarak kalıyordu, yeniden yayınlama da bekleme süresini atlıyordu. Kurallar artık ödeme adımından önce ve ödeme tamamlanınca yeniden kontrol ediliyor.
- Rentiva'nın Pro'dan önce etkinleştirildiği bir sitede — Pro'nun izin verdiği tek sıra budur — Pro'nun kendi tabloları (bayi defteri, ödeme denetimi, anahtar kaydı, komisyon politikası, bayi raporları ve transfer tabloları) hiç oluşturulmuyordu; yani **komisyon kaydedilmiyor ve hiçbir şey nedenini söylemiyordu**. Pro artık eksik her tabloyu bir sonraki yönetim sayfası yüklemesinde oluşturuyor ve hepsi var olana kadar denemeye devam ediyor.
- Defter bütünlük kontrolü kararını kendi salt okunur veritabanı işleminin içine yazıyordu; tespit edilen bir uyuşmazlık bu yüzden hiç saklanmıyordu. Artık saklanıyor.

## Bu sürümde ayrıca

Defter tarihleri UTC yerine sitenizin saat diliminde gösteriliyor. WooCommerce eklenti ekranının dışında kapatıldığında bayi paneli artık hata vermiyor, ilk yüklemede birlikte gelen iki ziyaret de artık iki ayrı Bayi Paneli sayfası oluşturamıyor. Bayi Yönetimi ve Bayi Raporları ekranlarında yönetici bildirimleri ekran ilk göründüğünde yerinde. Bayi paneli ve ilan ücreti mesajları Türkçeye çevrildi.

---

**Nereden alınır.** Pro 6.2.0, GitHub'da `v6.2.0` olarak yayınlandı ve wpalemi.com üzerindeki Rentiva Pro indirmesiyle sunuluyor. Önce [Rentiva'yı 6.1.5'e](/blog/rentiva-v6.1.5-release) güncelleyin. Tam sürüm notu eklentiyle birlikte iki dilde geliyor.
