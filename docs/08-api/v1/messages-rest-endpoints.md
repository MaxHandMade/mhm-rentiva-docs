---
id: messages-rest-endpoints
title: Mesajlaşma ve İletişim API (Messages REST)
sidebar_label: Mesajlaşma REST
sidebar_position: 70
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Mesajlaşma API'si, müşteriler, tedarikçiler ve sistem yöneticileri arasındaki iletişimi yönetmek için kullanılan uç noktaları (endpoints) açıklar.
:::

# 💬 Mesajlaşma ve İletişim API'si

Rentiva mesajlaşma sistemi, asenkron bir "Thread" (Konu) mimarisi üzerine kuruludur. Tüm uç noktalar `Messages` servis sınıfı ve `MessageFormatter` yardımcılarını kullanır.

---

## 🏗️ 1. Modül Mimarisi

Kayıt noktası: `MHMRentiva\Admin\Messages\REST\Messages::register()`

Sistem iki ana ad alanı üzerinden hizmet verir:
- **Admin Endpoints:** `/v1/admin/messages/*`
- **Customer/Vendor Endpoints:** `/v1/portal/messages/*`

---

## 👨‍💼 2. Admin Uç Noktaları

Sistem yöneticilerinin tüm iletişim trafiğini denetlediği ve yanıtladığı bölümdür.

| Endpoint | Metot | İşlev |
|---|---|---|
| `/admin/messages` | `GET` | Tüm mesaj konularını (threads) listeler. |
| `/admin/messages/{id}` | `GET` | Belirli bir konunun tüm mesaj geçmişini döner. |
| `/admin/messages/{id}/reply` | `POST` | Yönetici adına konuya yanıt gönderir. |
| `/admin/messages/{id}/status`| `PUT` | Konuyu "Kapatıldı" veya "Çözüldü" olarak işaretler. |

---

## 👤 3. Müşteri ve Tedarikçi Uç Noktaları

Kullanıcıların kendi aralarında veya destek ekibiyle iletişim kurduğu bölümdür.

| Endpoint | Metot | İşlev |
|---|---|---|
| `/portal/messages/create` | `POST` | Yeni bir mesaj konusu başlatır. |
| `/portal/messages/threads` | `GET` | Kullanıcının dahil olduğu aktif konuları listeler. |
| `/portal/messages/reply` | `POST` | Mevcut bir konuya yeni mesaj ekler. |

---

## 🛡️ 4. Yetki ve Güvenlik (Ownership)

Mesajlaşma sisteminde kimlik doğrulamanın ötesinde **Sahiplik (Ownership)** kontrolü uygulanır:

1. **Sahiplik Kontrolü:** Bir konunun mesajları çekilmeden önce, isteği yapan kullanıcının o konunun tarafı (Gönderen veya Alıcı) olup olmadığı `Messages::verify_access()` ile denetlenir.
2. **Rol Doğrulaması:** Admin uç noktaları sadece `manage_options` kapasitesine sahip kullanıcılara açıktır.
3. **İçerik Arındırma:** Tüm mesaj içerikleri kaydedilmeden önce `wp_kses()` ile zararlı HTML etiketlerinden arındırılır.

---

## 📤 5. Yanıt Örneği (Formatted Message)

```json
{
  "success": true,
  "data": {
    "thread_id": 45,
    "subject": "Araç Rezervasyonu Hakkında",
    "messages": [
      {
        "author_name": "Ahmet Y.",
        "content": "Araçta bebek koltuğu mevcut mu?",
        "created_at": "2026-03-19 14:30:00",
        "is_read": true
      }
    ]
  }
}
```

## Bölüm Sonu Özeti
- Mesajlaşma API'si, thread tabanlı bir iletişim modeli sunar.
- Admin ve portal/müşteri sorumlulukları kesin sınırlarla ayrılmıştır.
- `verify_access()` katmanı ile veri güvenliği ve gizliliği en üst seviyede tutulur.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Thread mimarisi, Sahiplik (Ownership) kontrolü ve formatlanmış yanıt yapısı eklendi. |
