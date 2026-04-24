---
id: vehicle-lifecycle
title: Araç Yaşam Döngüsü Yönetimi
sidebar_label: Yaşam Döngüsü
sidebar_position: 4
slug: /features-usage/vehicle-lifecycle
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/lisans-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Araç Yaşam Döngüsü Yönetimi, her aracın platformdaki tüm ömrünü — aktifleşmeden sona ermeye, geri çekilmeden yeniden listelemeye kadar — kural tabanlı bir durum makinesi üzerinden yönetir. **Pro lisans gerektirir.**

---

## 🔄 Durum Makinesi

Her araç aşağıdaki 5 durumdan birinde bulunur:

| Durum | Açıklama |
|-------|----------|
| `pending_review` | Araç inceleme bekliyor, henüz yayında değil |
| `active` | Araç aktif, müşteriler görebilir ve kiralayabilir |
| `paused` | Vendor geçici olarak duraklattı, araç gizlendi |
| `expired` | 90 günlük listeleme süresi doldu, araç yayından kalktı |
| `withdrawn` | Vendor geri çekti, araç platformdan ayrıldı |

### İzin Verilen Geçişler

```
pending_review → active         (admin onayı)
active         → paused         (vendor duraklat)
active         → withdrawn      (vendor geri çek)
paused         → active         (vendor devam et)
paused         → withdrawn      (vendor geri çek)
expired        → active         (vendor yenile)
withdrawn      → active         (vendor yeniden listele)
```

Tanımlanmamış geçişler `VehicleLifecycleManager` tarafından reddedilir.

---

## ⏱️ 90 Günlük Listeleme Süresi

- Araç `active` durumuna geçtiğinde **90 günlük süre** başlar.
- Günlük cron süresi dolan araçları tespit eder ve `expired` durumuna geçirir.
- Vendor'a uyarı e-postaları otomatik gönderilir:
  - Süre dolumundan **10 gün önce**
  - Süre dolumundan **3 gün önce**

> Süresi dolan araç, vendor tarafından **"Yenile"** işlemi ile 90 günlük yeni süre başlatılabilir.

---

## 🎮 Vendor Self-Servis İşlemleri

Vendor'lar araçlarını admin müdahalesi olmadan yönetebilir:

### Duraklat
Aktif araç geçici olarak yayından kaldırılır. Araç, bekleyen rezervasyonları etkilemez — yalnızca yeni rezervasyon alınamaz.

### Devam Et
Duraklatılmış araç tekrar aktifleştirilir. Kalan listeleme süresi devam eder (süre duraklatma sırasında işlemez).

### Geri Çek
Araç platformdan kalıcı olarak çekilir. **Ceza sistemi uygulanabilir** (aşağıya bak).

### Yenile
Süresi dolmuş araç yeniden aktifleştirilir ve 90 günlük yeni süre başlar.

### Yeniden Listele
Geri çekilmiş araç tekrar platforma eklenir. Geçmiş ceza sayacı korunur.

---

## 💸 Geri Çekme Ceza Sistemi

Vendor'ların keyfi araç geri çekmesini caydırmak için kademeli ceza uygulanır:

| Geri Çekme Sayısı | Ceza Oranı |
|-------------------|-----------|
| 1. geri çekme | Ücretsiz |
| 2. geri çekme | Aylık ortalama gelirin **%10**'u |
| 3. ve sonrası | Aylık ortalama gelirin **%25**'i |

**12 aylık kayan pencere:** Ceza sayacı, son 12 ay içindeki geri çekmeleri sayar. 12 ay geçen geri çekmeler sayaca dahil edilmez.

Kesintiler ledger'a otomatik kaydedilir ve bir sonraki payout hesabında düşülür.

---

## 🛡️ Anti-Gaming: Bloklu Tarih Koruması

Fiyat manipülasyonunu önlemek için:

- Vendor, aktif rezervasyonu olan bir aracı iptal edip aynı tarihlere daha yüksek fiyatla yeniden listeleyemez.
- Vendor tarafından iptal edilen rezervasyonların tarihleri **30 gün boyunca** yeniden rezervasyona kapalı kalır.
- `AntiGamingBlocker` bu blokları `_mhm_anti_gaming_blocks` meta key ile saklar.

---

## ⭐ Vendor Güvenilirlik Puanı

Her vendor için 0-100 arası bir güvenilirlik skoru hesaplanır:

- **Günlük cron** ile `ReliabilityScoreCalculator` tarafından yeniden hesaplanır.
- **Formüle dahil faktörler:**
  - Tamamlanan rezervasyon oranı (pozitif)
  - İptal oranı (negatif)
  - Geri çekme sıklığı (negatif)
  - Duraklatma süresi (hafif negatif)

| Puan | Yorum |
|------|-------|
| 80–100 | Güvenilir vendor |
| 60–79 | Ortalama |
| 40–59 | Dikkat gerektiriyor |
| 0–39 | Yüksek riskli |

Admin, kullanıcı listesinde her vendor'un güncel puanını görür.

---

## 📧 Yaşam Döngüsü E-posta Bildirimleri

Tüm durum geçişleri için otomatik e-posta şablonları mevcuttur:

| Olay | Alıcı |
|------|-------|
| Araç aktifleştirildi | Vendor |
| Araç duraklatıldı | Vendor |
| Duraklatma devam etti | Vendor |
| Araç geri çekildi | Vendor + Admin |
| 10 gün kala uyarı | Vendor |
| 3 gün kala uyarı | Vendor |
| Listeleme süresi doldu | Vendor + Admin |
| Araç yenilendi | Vendor |
| Araç yeniden listelendi | Vendor |

---

## 📊 Admin Arayüzü

### Araç Listesi Sütunu
Her aracın yaşam döngüsü durumu renk kodlu rozet ile görüntülenir:
- 🟢 Aktif
- 🟡 Duraklatılmış
- 🔴 Süresi Dolmuş
- ⚫ Geri Çekilmiş

### Araç Düzenleme Meta Kutusu
Araç düzenleme ekranında **"Yaşam Döngüsü"** meta kutusu:
- Mevcut durum göstergesi
- Durum geçiş butonu (izin verilen geçişler)
- Listeleme süresi bitiş tarihi
- Geri çekme ceza sayacı

### Kullanıcı Listesi
Vendor satırlarında güvenilirlik puanı sütunu eklendi.

---

## 🔍 Frontend Aktif Filtre

6 frontend shortcode artık bakımdaki ve pasif araçları otomatik filtreler:

- `[rentiva_vehicles_grid]`
- `[rentiva_vehicles_list]`
- `[rentiva_featured_vehicles]`
- `[rentiva_vehicle_details]`
- `[rentiva_search_results]`
- `[rentiva_transfer_results]`

`expired` veya `withdrawn` durumdaki araçlar, `MetaQueryHelper` aracılığıyla sorgulardan otomatik hariç tutulur.

---

> **Not:** Araç Yaşam Döngüsü Yönetimi **Pro** lisans gerektirir. Lite sürümde araçlar yalnızca WordPress post durumu (`publish`/`draft`) ile yönetilir; durum makinesi, ceza sistemi ve güvenilirlik puanı özellikleri kullanılamaz.
