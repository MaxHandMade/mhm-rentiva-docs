---
id: governance-controls
title: Governance ve Güvenlik Kontrolleri
sidebar_label: Governance Kontrolleri
sidebar_position: 7
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, finansal ödeme (Payout) sürecindeki risk analizini, onay hiyerarşisini ve denetim (Audit) mekanizmalarını açıklar.
:::

# ⚖️ Governance Kontrolleri

`GovernanceService`, finansal işlemlerin doğruluğunu ve güvenliğini sağlamak için tasarlanmış bir akıllı yönetişim katmanıdır. Finansal mekaniklerden bağımsız olarak, sadece "Kim, neyi, hangi riskle onaylayabilir?" sorusuna yanıt verir.

## 🛡️ Temel Güvenlik Katmanları

### 1. Freeze (Blokaj) Kontrolleri
Sistem, herhangi bir işlem başlatılmadan önce iki aşamalı blokaj kontrolü yapar:
- **Global Freeze:** `mhm_rentiva_global_payout_freeze` ayarı aktifse tüm ödemeler anında durur.
- **Vendor Freeze:** `_mhm_vendor_payout_freeze` metasını içeren satıcıların talepleri reddedilir.

### 2. Risk Engine (Deterministik Risk Analizi)
Sistem, her ödeme talebi için şu kriterlere göre bir risk puanı üretir:
- **Vendor Yaşı:** Yeni satıcılar daha yüksek risk puanı alır.
- **İptal Oranı:** Yüksek iade/iptal oranına sahip satıcılar takibe alınır.
- **Tutar Limiti:** Belirli eşiklerin üzerindeki ödemeler otomatik olarak "High Risk" işaretlenir.

### 3. Maker-Checker (Çift Onay Prensibi)
Dolandırıcılığı önlemek için hiçbir yönetici kendi başlattığı veya oluşturduğu bir ödemeyi tek başına onaylayamaz:
- **Maker:** Talebi oluşturan veya ilk incelemeyi yapan kişi.
- **Checker:** Nihai onayı veren farklı bir yetkili.
- *İstisna:** Sadece `mhm_rentiva_override_maker_checker` yetkisine sahip üst düzey yöneticiler bu kuralı bypass edebilir (ve bu işlem forensic loguna düşer).

---

## 🔄 Yönetişim İş Akışı

```mermaid
graph TD
    A[Ödeme Talebi] --> B{Freeze Kontrolü}
    B -- Aktif --> Error[İşlem Reddedildi]
    B -- Pasif --> C[Risk Engine: Score Context]
    
    C --> D{Risk Seviyesi?}
    D -- High Risk --> E[Auto-Flag & Freeze]
    D -- Mid/Low --> F{Seviye 1 Onay}
    
    F --> G{Maker == Checker?}
    G -- Evet --> H{Bypass Yetkisi?}
    H -- Hayır --> Error
    H -- Evet --> I[Seviye 2 Final Onay]
    G -- Hayır --> I
    
    I --> J[Time-Lock: Soğutma Süresi]
    J --> K[Atomic Execute]
```

---

## 🏛️ Audit Trail (Denetim İzi)

Tüm yönetişim kararları `wp_mhm_rentiva_payout_audit` tablosunda **Immutable (Değiştirilemez)** olarak saklanır:
- **IP Hash:** Gizlilik korunarak işlem yapanın IP izi SHA-256 ile saklanır.
- **Action Constants:** `submit_payout`, `review_payout`, `finalize_payout`, `bypass_time_lock` gibi aksiyonlar kaydedilir.
- **Metadata JSON:** O anki risk puanı, iş akışı durumu ve bağlamsal detaylar her olayda damgalanır.

---

## ⏳ Time-Locks (Zaman Kilidi)
Onaylanan yüksek tutarlı ödemeler, `STATE_TIME_LOCKED` aşamasına alınır. Bu süreçte para rezerve edilir ancak ödeme kanalına (Webhook) hemen gönderilmez. Bu "soğutma süresi", hatalı veya şüpheli işlemleri geri çekmek için son güvenlik duvarıdır.

## Bölüm Sonu Özeti
- Güvenlik hiyerarşisi: **Freeze > Risk Engine > Maker-Checker > Time-Lock**.
- Tüm kararlar **payout_audit** tablosunda kalıcı olarak izlenebilir.
- `GovernanceService`, finansal hataları değil, süreç suistimallerini engeller.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, GovernanceService'in risk motoru ve Maker-Checker yapısına göre güncellendi. |
