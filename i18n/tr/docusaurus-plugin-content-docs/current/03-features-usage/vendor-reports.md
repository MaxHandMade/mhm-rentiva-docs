---
id: vendor-reports
title: Bayi Raporları & İtirazlar
sidebar_label: Bayi Raporları
sidebar_position: 12
slug: /features-usage/vendor-reports
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Bayi Rapor sistemi bayilere platform yöneticisine sorun iletmeleri ve otomatik aksiyonlara (örn. çekme cezaları) itiraz etmeleri için yapılandırılmış bir kanal sunar. Tek custom table, tek paylaşılan modal, tek admin sayfası — beş farklı bağlam tetikliyor. **Pro lisans gerektirir.**

[v4.35.0](/blog/rentiva-v4.35.0-release) ile tanıtıldı.

---

## Bayi raporu nedir?

Bayi raporu, bir bayiden platform yöneticisine giden yapılandırılmış bir mesajdır. Müşteriye yönelik **değildir** ve herkese açık inceleme **değildir**. Sistem beş farklı bağlamı destekler:

| Bağlam | Kullanım | Tetikleme yeri |
| :--- | :--- | :--- |
| `booking` | Müşteri sorunları (no-show, hasar, anlaşmazlık) | Her bayi rezervasyon kartında "Sorun Bildir" butonu |
| `vehicle` | Durdurulmuş/çekilmiş araca itiraz | Listings sayfasında "İtiraz Et" butonu (sadece paused/withdrawn durumlarda) |
| `vehicle_action` | Çekme/durdurma sırasında sebep yakalama — ceza askıya alınır | Bayi Çek veya Durdur tıkladığında modal otomatik açılır |
| `penalty` | Halihazırda uygulanmış ceza ledger satırına itiraz | Puan geçmişi tablosunun her satırında "İtiraz" butonu |
| `general` | "Yöneticiye Yaz" — direkt admin hattı | Her bayi panel sayfasının altbilgisinde link |

Beşi de aynı veri yapısını paylaşır (`wp_mhm_rentiva_vendor_reports`'ta tek satır) ve aynı admin UI'ı kullanır. Çözümleme yan etkileri bağlama göre değişir.

---

## Bayi akışı — rapor gönderme

### Rezervasyon kartından

1. Bayi **Hesabım → Rezervasyonlar**'ı açar
2. Her rezervasyon kartında "Detayları Göster"in yanında "Sorun Bildir" butonu var
3. Tıklayın → modal başlık ve açıklama alanları ile açılır
4. Gönder → rapor `context_type=booking`, `context_id=<booking_id>`, `status=open` ile kaydedilir
5. Platform yöneticisine e-posta gider

### Araç çekme (Not 2 augment)

Çekme akışı en kritik bağlam. Varsayılan olarak araç çekmek bayinin güvenilirlik puanından 10 puan düşürüyor ve finansal ledger'a debit kaydı yazıyor (büyüklük bayinin çekme geçmişine bağlı — birincisi ücretsiz, sonra aylık ortalama gelirin %10 / %25'i).

v4.35.0 ile bayi çekerken sebebini yakalayabilir:

1. Bayi **Hesabım → İlanlar**'ı açar
2. Aktif bir araçta "Çek" tıklar
3. **Sebep yakalama modalı açılır** (önceki tarayıcı `confirm()` dialog'unun yerine)
4. Bayi sebebini girer — minimum 20 karakter zorunlu
5. Gönder → sırayla iki şey olur:
   - `vehicle_action` raporu `status=open` ile oluşturulur
   - Çekme AJAX'ı çağrılır
6. `VehicleLifecycleManager::withdraw()` içinde yeni `mhm_rentiva_before_apply_penalty` filtresi çalışır. `PenaltySuspensionHook` callback'i açık raporu görür ve `false` döndürür. **Puan düşüşü ve ledger debiti atlanır.**
7. Araç hâlâ `withdrawn`'a geçer (post status, lifecycle meta, cooldown tarihi hepsi set), ama finansal ceza admin incelemesine kadar askıda kalır.

Aynı akış pause aksiyonları için de geçerli.

### Geçmiş cezaya itiraz

1. Bayi **Hesabım → Güvenilirlik & Cezalar → Puan Geçmişi**'ni açar
2. Bir araca bağlı negatif delta gösteren her satırda "İtiraz" butonu var
3. Tıklayın → modal açılır, başlık `Appeal: <event> on <vehicle>` olarak önceden doldurulur
4. Gönder → rapor `context_type=penalty`, `context_id=<ledger_uuid>` ile kaydedilir

Not: ceza itirazları şu an uygulanmış ledger satırını geri almıyor — bunun için v4.36.0+'da gelen compensating-entry helper gerek. Çözümleme rapor durumunu günceller, bayiye e-posta gönderir ve itirazın kabul edildiğini kayıt için işaretler.

### Yöneticiye yaz

Her bayi panel sayfasının altbilgisinde "Yöneticiye Yaz" linki var. Bu modalı `context_type=general` (context_id yok) ile açar ve bayiye admin'e serbest formlu mesaj göndermesine izin verir. Diğer dört bağlama uymayan özellik önerileri, hesap soruları veya başka şeyler için kullanın.

---

## Admin akışı — raporu çözümleme

### Liste sayfası

**Yönetim → MHM Rentiva → Bayi Raporları** durum (varsayılan: `open`) ve bağlam ile filtrelenmiş sayfalı liste açar. Sütunlar:

- Rapor ID
- Bayi adı + ID
- Bağlam etiketi (Rezervasyon / Araç / Araç işlemi / Ceza itirazı / Genel)
- Başlık (detay linki)
- Durum etiketi
- Oluşturma tarihi
- Aksiyon butonu (Detay aç)

### Detay sayfası

Bir rapora tıklamak detay görünümünü açar:

- Rapor başlığı (heading)
- Durum, bayi, bağlam (geçerliyse context_id linki)
- Gönderilme zaman damgası
- Stillendirilmiş blokta tam açıklama
- Mevcut yönetici notu (varsa)
- Aksiyon formu (sadece terminal olmayan raporlar için):
  - İsteğe bağlı yönetici notu textarea'sı
  - Üç gönder butonu: **Çözüldü Olarak İşaretle**, **Reddet**, **İncelemeye Al**

### Çözümleme yan etkileri

| Bağlam | "Çözüldü Olarak İşaretle" | "Reddet" |
| :--- | :--- | :--- |
| `booking` | Durum güncelleme + bayiye e-posta | Aynı |
| `vehicle` | Aynı | Aynı |
| `vehicle_action` | **No-op** — ceza zaten çekme zamanında askıya alınmıştı, bayi puanını korur | **`apply_deferred_penalty()` çalışır** — `ReliabilityScoreCalculator::update()` yeniden hesaplar (geri çekilme state'te olduğu için puan düşer) ve `PenaltyRecorder::record_penalty()` ertelenmiş ledger debitini yazar |
| `penalty` | (v4.36.0+ — ledger compensating entry helper) | No-op (ceza zaten uygulanmış; reddetme sadece itirazı kapatır) |
| `general` | Durum güncelleme + e-posta | Aynı |

İki çözümleme de bayiye e-posta gönderir (`vendor_report_resolved` template'i) yönetici notu ve yeni durumla birlikte.

### İncelemeye Al

`status=in_review` olarak işaretler. Ceza askıya alma aktif kalır (in_review filter callback için "open" sayılır). Bayiye e-posta yok — bu sıralama için iç bayrak.

---

## Ceza filtresi — `mhm_rentiva_before_apply_penalty`

İki filter hook noktası puan düşüşünü ve ledger girişini sarmalıyor. Eklentiler veya temalar bu filtreyi hook'layarak bayi raporlarının ötesinde ek askıya alma sebepleri tanıtabilir:

```php
/**
 * @param bool   $apply      Cezanın uygulanıp uygulanmayacağı. Varsayılan true.
 * @param int    $vehicle_id Araç post ID.
 * @param int    $vendor_id  Bayi user ID.
 * @param string $reason     Ceza sebebi ('withdrawal').
 * @param float  $penalty    Hesaplanmış ceza miktarı.
 */
add_filter('mhm_rentiva_before_apply_penalty', function ($apply, $vehicle_id, $vendor_id, $reason, $penalty) {
    if ($reason === 'withdrawal' && my_holiday_freeze_active()) {
        return false; // platform-wide freeze sırasında cezaları askıya al
    }
    return $apply;
}, 20, 5);
```

Eklentinin kendi `PenaltySuspensionHook`'u priority 10'da kayıtlı. `false` döndüren herhangi bir filter callback'i o hook çağrısı için cezayı bloklar; açık vendor_action raporu birden fazla olası sebebten sadece biri.

---

## Veritabanı

Yeni custom table `{prefix}mhm_rentiva_vendor_reports`:

| Sütun | Tip | Notlar |
| :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED AUTO_INCREMENT | Primary key |
| `vendor_id` | BIGINT UNSIGNED | İndeksli |
| `context_type` | VARCHAR(20) | `booking` / `vehicle` / `vehicle_action` / `penalty` / `general` |
| `context_id` | VARCHAR(64) | Integer ID, ledger UUID, veya NULL |
| `title` | VARCHAR(255) | |
| `description` | LONGTEXT | Servis katmanında min 20 karakter zorlanır |
| `status` | VARCHAR(20) | `open` / `in_review` / `resolved` / `rejected` |
| `admin_note` | LONGTEXT | İlk admin aksiyonuna kadar NULL |
| `admin_user_id` | BIGINT UNSIGNED | İlk admin aksiyonuna kadar NULL |
| `created_at` | DATETIME | |
| `updated_at` | DATETIME | |
| `resolved_at` | DATETIME | Status terminal'e (resolved/rejected) geçtiğinde set edilir |

İndeksler: `vendor_id`, `context_type`, `context_id`, `status`, composite `(vendor_id, status)`, composite `(context_type, context_id, status)` (açık-rapor lookup hot path'i), `created_at`.

Migration sınıfı: `src/Core/Database/Migrations/VendorReportsMigration.php`. `DatabaseMigrator::run_migrations()` içine kayıtlı. `DatabaseMigrator::CURRENT_VERSION` 3.5.0 → 3.6.0 bump (mevcut kurulumlarda migration tetiklenmesi için).

---

## Lite ve Pro

Tüm bayi rapor sistemi `Mode::canUseVendorMarketplace()` ile gate'li. Lite planlarında:

- Admin "Bayi Raporları" alt menüsü kayıtlı değil.
- AJAX handler 403 döndürüyor.
- Paylaşılan modal enqueue edilmiyor.
- Ceza filtresi callback'i hâlâ kayıtlı ama her zaman `apply`'ı değiştirmeden döndürüyor (açık rapor olamaz çünkü bayi dosyalayamaz).

Etkili olarak, Lite bayiler araçları eski yöntemle çekiyorlar — direkt ceza, sebep yakalama yok, itiraz yolu yok. Pro yükseltmesi tam sistemi açar.

Gerçek Pro token olmadan yerel test için `wp-config.php`'ye `define('MHM_RENTIVA_DEV_PRO', true);` ekleyin (sadece `WP_DEBUG=true` iken çalışır).

---

## Geliştirici uzantı noktaları

| Hook / Sınıf | Amaç |
| :--- | :--- |
| `mhm_rentiva_before_apply_penalty` | Filter — puan düşüşünü ve ledger girişini gate'ler. 5 argümanlı imza. |
| `mhm_rentiva_vendor_report_created` | Action — bir rapor kaydedildikten sonra ateşlenir. E-posta alt sistemi dinler. 3 arg. |
| `mhm_rentiva_vendor_report_resolved` | Action — durum terminal'e değiştikten sonra ateşlenir. 3 arg (report_id, vendor_id, new_status). |
| `VendorReportRepository` | Public API: `create()`, `find()`, `update_status()`, `find_by_vendor()`, `has_open_report_for()`, `reset_has_open_cache()` |
| `VendorReportService` | Public API: `create_report()`, `resolve_report()`, `reject_report()` |

---

## Ayrıca bakın

- [v4.35.0 sürüm notları](/blog/rentiva-v4.35.0-release) — özellik tanıtımı
- [Vehicle Lifecycle](./vehicle-lifecycle) — `vehicle_action` bağlamının entegre olduğu pause/withdraw/expire akışı
- [Bayi Başvuru](./shortcodes/vendor-apply) — bayilerin pazaryerine ilk olarak nasıl katıldığı
