---
id: system-performance
title: Sistem ve Performans Ayarları
sidebar_label: Sistem ve Performans
sidebar_position: 11
slug: /core-configuration/system-performance
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

Eklentinin hızı (caching) ve güvenliği (WAF - Web Application Firewall) bu merkezden yönetilir. **MHM Rentiva > Ayarlar > Sistem ve Performans** sekmesinden tüm koruma ve hız optimizasyonlarını yapılandırabilirsiniz.

---

## ⚡ Sistem ve Performans (Caching)

MHM Rentiva, veritabanı yükünü azaltmak için gelişmiş bir nesne önbellekleme (Object Cache) katmanı kullanır.

- **Nesne Önbelleğini Etkinleştir:** Aktif edildiğinde veritabanı sorguları belleğe alınır, sayfa açılış hızı ciddi oranda artar.
- **Önbellek TTL Süreleri:** 
    - **Varsayılan:** Genel veriler için saklama süresi (Saat).
    - **Listeler:** Araç ve rezervasyon listeleri için önbellek süresi (Dakika).
    - **Rapor & Grafikler:** İstatistiklerin ne sıklıkla güncelleneceği (Dakika).
- **Meta Sorgu Sınırı:** Bir istek başına maksimum meta sorgu sayısı. Düşük olması sistemi daha hafif tutar.

---

### 🖼️ GÖRSEL: SİSTEM VE PERFORMANS AYARLARI
*(Ayarlar > Sistem ve Performans sekmesi, cache ve TTL ayarları)*

---

## 🛡️ IP Kontrolü ve Güvenlik Duvarı

Kötü niyetli kullanıcıları ve spam botları sisteminizden uzak tutmak için IP bazlı ve ülke bazlı kısıtlamalar uygulayabilirsiniz.

- **Beyaz Liste (White List):** Ofisiniz veya yönetim ekibinizin IP adreslerini buraya ekleyerek asla engellenmemelerini sağlayın.
- **Kara Liste (Black List):** Bilinen saldırgan IP'leri kalıcı olarak engelleyin.
- **Ülke Kısıtlaması:** Sadece hizmet verdiğiniz ülkeleri (örn: TR, DE) izin verilenlere ekleyip diğer tüm dünyayı tek tıkla bloklayabilirsiniz.

---

## 🔓 Gelişmiş Koruma Kuralları (Security)

Sistemin maruz kalabileceği en yaygın saldırı tiplerine karşı yerleşik koruma kuralları mevcuttur:

- **Brute-Force Koruması:** Tekrar eden yanlış şifre denemelerine karşı hesabı geçici süreyle kilitler.
- **SQL Injection & XSS Koruması:** Formlardan gelen verileri temizleyerek veritabanı güvenliğini sağlar.
- **CSRF Koruması:** Sahte istekleri ve form manipülasyonlarını engeller.

---

### 🖼️ GÖRSEL: GÜVENLİK VE FIREWALL PANELİ
*(Ayar sekmesindeki IP kısıtlama ve koruma kuralları arayüzü)*

---

## 🚥 Trafik Sınırları ve İstek Kontrolü (Rate Limiting)

Sistem kaynaklarının istismar edilmesini önlemek için her IP için dakika bazlı limitler koyabilirsiniz.

| Limit Tipi | Açıklama |
| :--- | :--- |
| **Küresel İstek Sınırı** | Bir kullanıcının eklenti fonksiyonlarına yapacağı toplam çağrı limiti. |
| **Rezervasyon Talebi** | Bir IP'den dakikada kaç yeni rezervasyon denemesi yapılabilir? |
| **Ödeme Talebi** | Ödeme geçidi denemelerini sınırlandırarak fraud işlemlerini engeller. |

---

## 🩺 Sistem Bakımı ve Durumu

Sayfanın altında bulunan **"Sistem Durumu"** alanı üzerinden sunucunuzun temel bilgilerini anlık olarak görebilirsiniz:
- PHP / WordPress Sürümleri
- Server Tipi (Apache, Nginx vb.)
- **SQL Mode:** Yüksek performans için `High Performance` modunda olup olmadığınızı denetler.

### Bölüm Özeti
- **Object Cache** hızı artırır, veritabanını rahatlatır.
- **Rate Limiting** bot saldırılarını ve brute-force denemelerini durdurur.
- **WAF kuralları** yazılım düzeyinde güvenlik kalkanı sağlar.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Sistem, Performans ve Güvenlik (WAF) rehberi oluşturuldu. |
