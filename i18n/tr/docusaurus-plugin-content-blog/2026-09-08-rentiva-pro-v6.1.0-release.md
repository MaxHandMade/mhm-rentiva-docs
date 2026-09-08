---
slug: rentiva-pro-v6.1.0-release
title: "Rentiva Pro 6.1.0 — Yalnızca müşterinin basabildiği bir silme düğmesi"
authors: [maxhandmade]
tags: [release, rentiva, pro, privacy, gdpr, security, money]
date: 2026-09-08T02:00
---

Bu sürüm büyük ölçüde tek bir soruyu ele alıyor: bir hesap silindiğinde ne oluyor. 6.0.0'daki yanıt, birbirinden ayrı üç yerde olması gerekenden kötüydü — ve bunlardan biri, uyumluluk özelliğini hiç satın almamış sitelerde müşterinin mesajlarını yok ediyordu. **Önce MHM Rentiva'yı 6.1.4'e, sonra Pro'yu güncelleyin.** Bu sürümde veri taşıma ve hook yeniden adlandırması yok.

<!--truncate-->

## Kendi verisini silme düğmesi herkese açıktı

Pro'nun GDPR araçları, müşteri hesap alanına bir "verilerimi sil" düğmesi koyuyor. Bu düğme yalnızca oturum açmış olmaya bakıyordu; başka hiçbir şeye değil.

Oturum açmış her kullanıcı ona erişiyordu — bir editör, bir mağaza yöneticisi, **bir yönetici**. DELETE yazıp onaylamak, WordPress'in hesap silme işlemini o oturumun kendi hesabında çalıştırıyordu. O hesabın yazarı olduğu her şey onunla birlikte gidiyordu; ekler ise site açıkça izin vermedikçe çöp kutusuna gitmez, yani yüklenen dosyalar geri alınabilir değil, doğrudan yok ediliyordu. Hesabın yazarı olduğu diğer içerik türleri de — Elementor şablonları dahil — aynı yoldan siliniyordu.

İşlem artık yalnızca müşteri rolü taşıyan, başka rolü olmayan hesapları kabul ediyor. Düğmeye basan bir yöneticiye, hesabının self-servis yolla silinemeyeceği söyleniyor.

## Yanlış lisansın ardında duran bir veri kaybı siperi

Pro, bayileri, ödemeleri ve mesajları hesap silmenin dışında tutar. Bu koruma GDPR araçları özelliğinin içinde bağlanıyordu — oysa en çok koruduğu içerik türü olan **mesajlar**, başka bir lisans özelliğiyle kaydediliyor.

Yani mesajlaşma lisanslı ama GDPR araçları lisanssız bir site, mesaj içerik türünü kaydediyor ve korumayı hiç bağlamıyordu. Bir mesajın yazarı vardır ve ne yazı ne sayfadır; bu da WordPress'in onu çöpe atmak yerine doğrudan silmesi demektir. O müşteriyi ücretsiz eklentinin Müşteriler ekranından silmek, katıldığı her yazışmanın müşteriye ait yarısını yok ediyor, geri alınacak hiçbir şey bırakmıyor ve karşı tarafın yanıtlarını artık yazışma olarak okunmayan bir dizinin içinde bırakıyordu.

Koruma artık Pro her yüklendiğinde, lisans ne derse desin bağlı. Bu bir özellik değil, veri kaybı siperi — Pro'nun kendi başlatmadığı silmeleri de kapsamak zorunda.

## Saklama temizliği, hesabın kime ait olduğunu sormuyordu

Pro, hareketsiz müşteri verisini saklama süresi dolduğunda silebilir. 6.0.0'da hesapları seçen sorgu üç şey soruyordu: bu hesap yeterince uzun süredir hareketsiz mi, yeterince eskiden mi kayıtlı ve rezervasyonu yok mu. **Hesabın kime ait olduğunu sormuyordu** ve döngüde de hiçbir rol kontrolü yoktu.

Dolayısıyla rezervasyonu olmayan hareketsiz bir hesap, ne olursa olsun adaydı: bir bayi, bir mağaza yöneticisi, bir yönetici.

Sorgu artık aynı şekilde daraltıyor, ikinci bir geçiş ise yalnızca müşteri rolü taşıyan, başka rolü olmayan hesapları bırakıyor. Hatayı silmeme yönüne yapıyor ki işi veri yok etmek olan bir kod için doğru eğilim budur.

Aynı altsistemde üç şey daha:

- **Saklama süresi bir yıldan kısa olamaz.** Ayarlanmış ya da dışarıdan geçirilmiş daha küçük her değer 365 güne yükseltiliyor ve bu değiştirme günlüğe yazılıyor.
- **Zamanlanmış silme artık gerçekten siliyor.** WordPress'in hesap silme fonksiyonu yalnızca yönetici tarafında yüklenen bir dosyada yaşıyor ve zamanlanmış bir koşum o dosyayı hiç yüklemiyor; yani cron yolunda silme adımı sessizce hiçbir şey yapmıyordu. Gerçek bir cron bağlamında ölçüldü: düzeltmeden önce fonksiyon yoktu, sonra vardı.
- **Silinen müşterinin e-posta adresi artık günlüğe yazılanların içinde değil.** Yalnızca hesap kimliği kaydediliyor. Ayrıca iki güvenlik uyarısı — biri hesabın silinemeyip anonimleştirildiğinde ateşlenen uyarı — varsayılan yapılandırmanın attığı bir seviyede yazılıyordu. İkisi de artık hata seviyesinde, yani gerçekten kaydediliyorlar.

## Çok siteli ağlarda silme artık dürüstçe başarısız oluyor

WordPress bir ağ hesabını tek bir sitenin içinden kaldıramaz — silme çağrısı kullanıcıyı yalnızca o siteden çıkarır; hesap ve adresi ağ genelinde yaşamaya devam eder.

Talep, yerine getirilmiş gibi yanıtlanıyordu. Artık "bu kurulumda hesap silme kullanılamıyor" diyen bir hatayla reddediyor.

Bu bir davranış değişikliği: önceden "Veri silme tamamlandı" gören biri şimdi hata görecek. Dürüst yanıt o hatadır; önceden de zaten hiçbir şey silinmiyordu.

**Değişmeyen ve bilinmesinde yarar olan bir şey:** bir müşteri kendini sildiğinde kendi rezervasyonları da hesapla birlikte gider. Onlar talebin konusudur, bu yüzden korunmaz silinirler — çöpe değil, kalıcı olarak. Yukarıdaki koruma bayileri, ödemeleri ve mesajları kapsar, talebi yapanın kendi rezervasyonlarını değil. 6.1.0'da bunun site başına bir anahtarı yok. Rezervasyonu silmek yerine anonimleştiren sürüm bu işin bir sonraki dilimi.

## Para birimi için tek otorite

Pro'da on yer, WooCommerce kullanılamadığında para birimini kendi başına belirliyordu — ve birbirleriyle çelişiyorlardı. Altısı TRY, biri USD diyordu; simge iki kez lira, bir kez dolar yazılmıştı.

Bunlar yedek yollardır, yani tam da korudukları koşul doğruyken çalışırlar: zamanlanmış bir koşum, devre dışı bırakılmış bir mağaza, WooCommerce açılmadan gelen bir ödeme geri çağrısı. O aralıkta tek bir ödeme USD damgası alırken, aynı parayı anlatan CSV dışa aktarımı, ceza defteri kaydı, webhook geri çağrısı ve basılı hesap özetinin üçü de TRY diyebiliyordu.

Onunun onu da artık aynı yardımcıya soruyor: o da WooCommerce etkinken ona, değilken eklentinin kendi para birimi ayarına bakıyor. Sürüm öncesi denetim aynı sınıftan beş yer daha buldu — bayi analiz paneli, basılı hesap özetinin kendi eksik-para-birimi yedeği, ceza iptalinin defter kaydı, hesap özeti hazır e-postası ve bayi araç formundaki fiyat ipucu — onlar da yardımcıya bağlandı.

Bu arada iki para hatası düzeltildi ve ikisi de bayiye ulaşıyordu:

- **Bayiye e-postayla giden bir ceza, alacak gibi okunuyordu.** WooCommerce kullanılamadığında bildirim tutarı kendisi biçimlendiriyor ve mutlak değerini alıyordu. Cezalar negatif taşındığı için bayiye kesintinin büyüklüğü işaretsiz gidiyordu — bir ödemenin ürettiği dizgenin aynısı.
- **Basılı ödeme hesap özeti bin kat yanlış olabiliyordu.** Rakamları saklanan veriden geliyor ve `1.234.567,89` biçimine sokulmuş bir değer doğrudan sayıya çevriliyordu; bu da `1.234` verir — sessizce, hem de bayinin sakladığı belgenin üzerinde.

## Dört kısayol panele geri döndü

Raporlar, Bayiler, Mesajlar ve Dışa Aktarım, ücretsiz eklentinin WordPress.org ayrışmasıyla 8 Ağustos'ta panelden gitmişti ve ücretsiz eklenti bunun için bir dikiş açana kadar geri konulamıyordu. Sayfalar bu süre boyunca yönetim menüsünde duruyordu; yalnızca kısayolları yoktu.

Her biri lisans özelliğine göre ekleniyor, yani bir ekranı açamayan lisansa o ekranın bağı verilmiyor; lisanssız kurulum hiçbirini almıyor. Transfer bilerek aralarında değil — o, bir kez ayarlanıp bırakılan konumlara ve rotalara götürüyor.

**Pro'nun artık MHM Rentiva 6.1.4 veya sonrasını istemesinin** sebebi de bu; sürüm öncesi denetimde 6.1.3'ten yükseltildi: kısayollar, ücretsiz eklentinin 6.1.4'e kadar açmadığı bir filtreye bağlanıyor. 6.1.3'lük bir sitede eşleşme kabul edilir ve kısayollar hiç görünmezdi, üstelik sebebini söyleyen hiçbir şey olmadan. Pro daha eski bir ücretsiz eklenti bulursa hiçbir veriye dokunmadan bir uyarıyla kendini kapatır.

## Bu sürümde ayrıca

İzleme altsistemi kaldırıldı — bir mesaj günlükçüsü, bir izleme yöneticisi ve bir performans izleyicisi; hiçbir kod yolunun ulaşamadığı yaklaşık 1.400 satır. Paylaşılan MHM arayüz kütüphanesi, ücretsiz eklentiyle birlikte 0.4'ten 0.9.4'e geçti.

---

Tam sürüm notu eklentiyle birlikte iki dilde geliyor.
