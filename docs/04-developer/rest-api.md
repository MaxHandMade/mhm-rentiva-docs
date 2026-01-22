---
sidebar_position: 2
title: REST API
description: MHM Rentiva REST API Dokümantasyonu
---

# REST API Dokümantasyonu

MHM Rentiva eklentisi; araç müsaitlik kontrolleri, mesaj yönetimi ve üçüncü parti uygulamalarla entegrasyon için kapsamlı bir REST API sunar.

## 🛡️ Güvenlik ve Hız Sınırlama (Rate Limiting)

:::warning Güvenlik Uyarısı
Bu API, WordPress Yönetim Paneli'nde yapılandırılan **Entegrasyon Ayarları** (`Rentiva > Settings > Integration`) tarafından korunmaktadır.
:::

*   **Hız Sınırlama (Rate Limiting):** IP tabanlı hız sınırlaması aktiftir. Yapılandırılan limitin (varsayılan: 60/dakika) aşılması durumunda `429 Too Many Requests` yanıtı döner.
*   **IP Kısıtlamaları:** Ayarlarda **IP Beyaz Listesi** veya **IP Kara Listesi** yapılandırılmışsa, yetkisiz IPlerden gelen istekler `403 Forbidden` hatası ile reddedilir.
*   **HTTPS Zorunluluğu:** Etkinleştirilmişse, SSL olmayan istekler reddedilir.

---

## Müsaitlik Sorgu Noktaları (Availability Endpoints)

Bu uç noktalar **herkese açıktır (public)** ancak sıkı bir şekilde hız sınırlamasına tabidir ve izlenir. Araç müsaitlik kontrolü ve fiyat hesaplaması için kullanılırlar.

### Müsaitlik Kontrolü (Check Availability)
Belirli bir araç için fiyat ve müsaitlik durumunu hesaplar.

*   **Endpoint:** `GET /mhm-rentiva/v1/availability`
*   **Yöntem:** `GET` veya `POST`
*   **Erişim:** Herkese Açık (Hız Sınırlı)

| Parametre | Tip | Zorunlu | Açıklama |
| :--- | :--- | :--- | :--- |
| `vehicle_id` | Integer | Evet | Kontrol edilecek aracın ID'si. |
| `pickup_date` | String | Evet | Alış tarihi (YIL-AY-GÜN). |
| `pickup_time` | String | Evet | Alış saati (SA:DK). |
| `dropoff_date` | String | Evet | İade tarihi (YIL-AY-GÜN). |
| `dropoff_time` | String | Evet | İade saati (SA:DK). |

### Müsaitlik Kontrolü (Alternatifli)
Müsaitlik durumunu kontrol eder ve seçilen araç müsait değilse alternatif araçlar önerir.

*   **Endpoint:** `GET /mhm-rentiva/v1/availability/with-alternatives`
*   **Yöntem:** `GET` veya `POST`
*   **Erişim:** Herkese Açık (Hız Sınırlı)

| Parametre | Tip | Zorunlu | Açıklama |
| :--- | :--- | :--- | :--- |
| `vehicle_id` | Integer | Evet | Kontrol edilecek aracın ID'si. |
| `pickup_date` | String | Evet | Alış tarihi (YIL-AY-GÜN). |
| `pickup_time` | String | Evet | Alış saati (SA:DK). |
| `dropoff_date` | String | Evet | İade tarihi (YIL-AY-GÜN). |
| `dropoff_time` | String | Evet | İade saati (SA:DK). |
| `limit` | Integer | Hayır | Maksimum alternatif sayısı (Varsayılan: 5). |

---

## Mesajlaşma Uç Noktaları (Yönetici)

Bu uç noktalar, yöneticilerin müşteri mesajlarını yönetmesini sağlar. `manage_options` yetkisi (Admin) gerektirir.

### Mesajları Listele
Mesajların aktif listesi.

*   **Endpoint:** `GET /mhm-rentiva/v1/messages`
*   **Erişim:** Admin

| Parametre | Tip | Zorunlu | Açıklama |
| :--- | :--- | :--- | :--- |
| `status` | String | Hayır | Duruma göre filtrele (new, read, replied, closed). |
| `category` | String | Hayır | Kategoriye göre filtrele (general, booking, support). |
| `per_page` | Integer | Hayır | Sayfa başına öğe (Varsayılan: 20). |
| `page` | Integer | Hayır | Sayfa numarası. |

### Mesaj Detayını Getir
*   **Endpoint:** `GET /mhm-rentiva/v1/messages/{id}`
*   **Erişim:** Admin

### Mesaja Yanıt Ver
*   **Endpoint:** `POST /mhm-rentiva/v1/messages/{id}/reply`
*   **Erişim:** Admin

| Parametre | Tip | Zorunlu | Açıklama |
| :--- | :--- | :--- | :--- |
| `message` | String | Evet | Yanıt içeriği. |
| `close_thread` | Boolean | Hayır | Yanıttan sonra konuyu kapat? (Varsayılan: false). |

### Mesaj Durumunu Güncelle
*   **Endpoint:** `POST /mhm-rentiva/v1/messages/{id}/status`
*   **Erişim:** Admin

| Parametre | Tip | Zorunlu | Açıklama |
| :--- | :--- | :--- | :--- |
| `status` | String | Evet | Yeni durum (new, read, replied, closed). |

---

## Mesajlaşma Uç Noktaları (Müşteri)

Yetkili müşteriler için mesajlaşma işlemleri.

### Konu Oluştur (Create Thread)
*   **Endpoint:** `POST /mhm-rentiva/v1/messages`
*   **Erişim:** Giriş Yapmış Kullanıcı

| Parametre | Tip | Zorunlu | Açıklama |
| :--- | :--- | :--- | :--- |
| `subject` | String | Evet | Mesaj konusu. |
| `message` | String | Evet | Mesaj içeriği. |
| `category` | String | Hayır | Kategori (general, booking, support). |
| `booking_id` | Integer | Hayır | İlgili rezervasyon ID'si. |

### Konuya Yanıt Ver
*   **Endpoint:** `POST /mhm-rentiva/v1/messages/{id}/reply`
*   **Erişim:** Konu Sahibi

| Parametre | Tip | Zorunlu | Açıklama |
| :--- | :--- | :--- | :--- |
| `message` | String | Evet | Yanıt içeriği. |
