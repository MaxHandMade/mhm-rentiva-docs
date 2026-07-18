---
id: commission-rates
title: Komisyon Oranı Yapılandırması
sidebar_label: Komisyon Oranları
sidebar_position: 11
slug: /vendor/commission-rates
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro özelliği
Bu sayfa **MHM Rentiva Pro** eklentisinin bir yeteneğini anlatır. WordPress.org'daki ücretsiz
Lite sürümünün parçası değildir; Lite'ın yanına kurulu Pro ve geçerli bir lisans gerektirir.
Tam ayrım için: [Sürümler — Lite ve Pro farkı](/docs/). Pro'yu edinmek için: [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Amaç
Bu doküman, MHM Rentiva'nın bir rezervasyona **hangi komisyon oranını** uygulayacağına nasıl karar verdiğini ve bu dört yapılandırma ekranının wp-admin içinde nerede bulunduğunu açıklar. Oluşan `commission_credit` defter (ledger) kaydının nasıl oluşturulup kesinleştirildiği ve ödendiği için [Ödemeler ve Finansal Defter](/docs/vendor/payouts-ledger) sayfasına bakın.
:::

# 💰 Komisyon Oranı Yapılandırması

Tamamlanan her rezervasyon, bayi için bir komisyon kaydı (credit) oluşturur. Bu hesaplamada kullanılan **oran**, 4 katmanlı bir hiyerarşi üzerinden çözümlenir — en spesifik değeri olan katman kazanır; boş bırakılan herhangi bir katman basitçe bir alttaki katmana devredilir.

---

## 🏗️ 1. Oran Hiyerarşisi

| Öncelik | Katman | Nerede ayarlanır | Kimi etkiler |
|---|---|---|---|
| 1 (en yüksek) | **Araç Geçersiz Kılma** | Araç düzenleme ekranı → "Komisyon Oranı Geçersiz Kılma" kutusu | Tek bir araç |
| 2 | **Bayi Geçersiz Kılma** | Bayi Yönetimi → bayi detay sayfası → "Komisyon Oranı Geçersiz Kılma" alanı | Bir bayinin tüm rezervasyonları (araç geçersiz kılması yoksa) |
| 3 | **Hacim İndirimi Kademesi** | Bayi Yönetimi → Komisyon sekmesi → "Hacim İndirimi Kademeleri" | Son 30 günlük onaylanmış geliri bir eşiği aşan bayiler |
| 4 (en düşük) | **Genel Oran** | Bayi Yönetimi → Komisyon sekmesi → geçerli oran | Platform genelindeki varsayılan; her zaman tanımlıdır |

:::tip "Boş" ne anlama gelir?
Araç veya Bayi Geçersiz Kılma alanını boş bırakmak "**%0 komisyon**" anlamına GELMEZ — "burada geçersiz kılma yok, bir alt katmana bak" anlamına gelir. Gerçek bir `0` değeri ise bilinçli bir geçersiz kılmadır (o araç/bayi için %0 komisyon).
:::

---

## 🚗 2. Araç Bazlı Geçersiz Kılma

**Konum:** Herhangi bir aracı düzenle → yan panel → **Komisyon Oranı Geçersiz Kılma** kutusu.

Bir yüzde değeri (0–100 arası, ondalıklı, örn. `4.5`) girerek, bayinin kendi oranından veya platformun kademe/genel oranından bağımsız olarak o aracın rezervasyonlarına sabit bir komisyon oranı uygulayabilirsiniz. Bayi seviyesindeki (veya daha alt) orana dönmek için alanı boş bırakın.

Bu en spesifik katmandır — özel bir ticari anlaşması olan tek bir araç için kullanın (örn. promosyonlu bir ilan, özel oranlı bir ortak aracı).

---

## 🧑‍💼 3. Bayi Bazlı Geçersiz Kılma

**Konum:** Bayi Yönetimi → **Aktif Bayiler** → bir bayiye tıklayın → bayi detay sayfasındaki **Komisyon Oranı Geçersiz Kılma** alanı.

Bir yüzde değeri girerek, o bayinin (kendi geçersiz kılması olmayan tüm araçlar dahil) tüm rezervasyonlarına sabit bir komisyon oranı uygulayabilirsiniz. Bayinin hacim indirimi kademesine veya genel orana dönmek için boş bırakın.

Her aracı tek tek değiştirmeden, bireysel olarak müzakere edilmiş bayi sözleşmeleri için kullanın.

---

## 📉 4. Hacim İndirimi Kademeleri

**Konum:** Bayi Yönetimi → **Komisyon** sekmesi → **Hacim İndirimi Kademeleri** bölümü.

Manuel geçersiz kılması olmayan bayiler, son 30 günlük **net onaylanmış geliri** bir eşiği aştığında genel orandan otomatik olarak bir indirim alır. Her zaman tam olarak **3 kademe** vardır — eşikler ve indirim miktarları (yüzde puanı olarak) düzenlenebilir, ancak kademe eklenip çıkarılamaz.

| Varsayılan Kademe | 30 Günlük Gelir Eşiği | İndirim |
|---|---|---|
| 1 | 30.000 | −6 puan |
| 2 | 15.000 | −4 puan |
| 3 | 5.000 | −2 puan |

Örnek: yukarıdaki varsayılan değerlerle, son 30 günlük onaylanmış geliri 18.000 olan bir bayi, genel orandan kademe-2 indirimini (−4 puan) alır.

---

## 🌐 5. Genel Oran

**Konum:** Bayi Yönetimi → **Komisyon** sekmesi → üst bölüm.

Platform genelindeki varsayılan orandır. Hiçbir araç geçersiz kılması, bayi geçersiz kılması veya kademe indirimi geçerli olmadığında her rezervasyonun döndüğü tek katman budur — her zaman bir değere sahiptir. Değiştirildiğinde yeni bir oran politikası sürümü oluşturulur; zaten komisyonu hesaplanmış mevcut rezervasyonlar orijinal oranlarını korur (oran anlık görüntülerinin geçmiş işlemleri sonraki oran değişikliklerinden nasıl koruduğunu görmek için [Ödemeler ve Finansal Defter](/docs/vendor/payouts-ledger) sayfasına bakın).

---

## 📐 6. Uygulamalı Örnek

Bayisinin bayi seviyesinde geçersiz kılması olmayan, ama aracın kendisinde `%4` geçersiz kılma bulunan bir araç için ödeme alınıyor:

1. **Araç Geçersiz Kılma** → `%4` mevcut → **bu oran kullanılır**, daha alt katmana bakılmaz.

Aynı aracın geçersiz kılması olmasaydı, ama bayinin `%10` geçersiz kılması olsaydı:

2. **Araç Geçersiz Kılma** → boş → bir alta geç.
3. **Bayi Geçersiz Kılma** → `%10` mevcut → **bu oran kullanılır**.

Ne araçta ne de bayide geçersiz kılma olmasaydı ve bayinin 30 günlük onaylanmış geliri 20.000 olsaydı (15.000 kademesini aşan):

4. **Araç Geçersiz Kılma** → boş → bir alta geç.
5. **Bayi Geçersiz Kılma** → boş → bir alta geç.
6. **Hacim İndirimi Kademesi** → kademe 2 ile eşleşir → genel oran eksi 4 puan kullanılır.

---

## Bölüm Özeti
- Hiyerarşi her zaman bir değere çözümlenir — boş bir alan "%0" değil, "bir alt katmana bak" anlamına gelir.
- **Araç** ve **Bayi** geçersiz kılmaları, tek seferlik/müzakere edilmiş anlaşmalar içindir.
- **Kademeler**, yüksek hacimli bayileri manuel bayi-bazlı işlem gerektirmeden otomatik olarak ödüllendirir.
- **Genel Oran**, kalıcı yedek değerdir ve asla boş olamayan tek katmandır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 07.07.2026 | Yayınlanmadı | İlk sürüm — Araç Geçersiz Kılma, Bayi Geçersiz Kılma ve Hacim İndirimi Kademesi admin ekranlarını belgeler. |
