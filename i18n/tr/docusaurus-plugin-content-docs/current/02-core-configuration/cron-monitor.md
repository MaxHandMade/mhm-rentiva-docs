---
id: cron-monitor
title: Cron İş Monitörü
sidebar_label: Cron İş Monitörü
sidebar_position: 15
slug: /core-configuration/cron-monitor
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Cron İş Monitörü sekmesi, MHM Rentiva'nın arka planda yürüttüğü otomatik görevlerin (zamanlanmış işlemler) durumunu canlı olarak izlediğiniz yönetim alanıdır. **MHM Rentiva > Ayarlar > Cron İş Monitörü** altından ulaşılır.

Eklenti, e-posta gönderimi, rezervasyon iptalleri ve veri temizliği gibi işlemler için WP-Cron sistemini kullanır.

---

## 🕒 Takip Edilen Temel Görevler

Bu panelden eklentiye özel tüm kuyrukları (Queues) ve zamanlanmış işleri görebilirsiniz:

- **Otomatik Rezervasyon İptali:** Ödemesi beklenen ancak zaman aşımına uğramış rezervasyonları sistemden otomatik kaldırır.
- **E-posta Kuyruğu:** Müşterilere gitmesi gereken onay, hatırlatma veya teşekkür mesajlarını sıraya alır ve gönderir.
- **Veri Saklama Politikaları:** Ayarlarda belirlenen sürelere göre eski günlükleri (Logs) ve geçici verileri (Transients) temizler.
- **Lisans ve Güncelleme Kontrolü:** Eklenti lisansının periyodik doğrulamasını ve yeni sürüm kontrollerini yapar.

---

### 🖼️ GÖRSEL: CRON İŞ MONİTÖRÜ PANELİ
*(Ayarlar > Cron İş Monitörü sekmesindeki aktif görevler listesi ve 'Şimdi Çalıştır' butonları)*

---

:::tip Manuel Müdahale
Eğer bir işlem "Zamanlanmış" görünmesine rağmen takılmışsa veya anında çalışmasını istiyorsanız, ilgili görevin yanındaki **"Şimdi Çalıştır"** butonuna basarak işlemi manuel olarak tetikleyebilirsiniz.
:::

---

### Bölüm Özeti
- **Arka Plan Şeffaflığı** ile sistemin hangi işleri ne zaman yapacağını görün.
- **Hata Tespitini** kolaylaştırın; çalışmayan bir cron işi e-posta gönderimini durdurabilir.
- **Operasyonel Kontrol** sağlayarak kritik görevleri (İptal vb.) istediğiniz an manuel çalıştırın.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Cron İş Monitörü dökümanı ayrı bir sayfa olarak oluşturuldu. |
