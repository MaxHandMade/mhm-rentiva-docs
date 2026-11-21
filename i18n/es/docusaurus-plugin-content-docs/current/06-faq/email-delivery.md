---
id: email-delivery
title: "Problemas de envío y entrega de correos electrónicos"
sidebar_label: "Entrega de correos"
sidebar_position: 20
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
MHM Rentiva depende en gran medida del sistema de correo electrónico para las confirmaciones de reserva y las notificaciones a vendedores. Esta página explica cómo diagnosticar y resolver los fallos en el envío de correos electrónicos.
:::

# 📧 Problemas de envío y entrega de correos electrónicos

Los correos electrónicos del sistema (`Mailer::send`) utilizan la función predeterminada de WordPress `wp_mail()`. Los problemas de entrega suelen estar relacionados con la configuración del servidor o con el proveedor del servicio de correo electrónico.

---

## ❌ 1. Los correos electrónicos no se envían en absoluto (errores del sistema)

### Comprobación de registros
- **Diagnóstico:** Revisa los errores de correo electrónico en la pestaña Rentiva > Registros del sistema (AdvancedLogger). El tipo de contenido `EmailLog` registra cada intento de envío.
- **Solución:** Actualiza tus ajustes de SMTP según el mensaje de error devuelto por la clase `Mailer`.

### Configuración de SMTP
- **Motivo:** La función de PHP `mail()` está bloqueada en muchos servidores modernos.
- **Solución:** Configura un proveedor SMTP (SendGrid, Mailgun, etc.) mediante un plugin como «WP Mail SMTP» o directamente desde los ajustes de Rentiva.

---

## 📂 2. Los correos electrónicos llegan a la carpeta de spam

### Registros SPF, DKIM y DMARC
- **Motivo:** Es posible que la autorización de envío de correo electrónico de tu dominio no esté definida correctamente.
- **Solución:** Verifica los siguientes registros en tus ajustes de DNS:
    - **SPF:** Debe incluir la dirección IP del servidor que envía los correos electrónicos.
    - **DKIM:** Permite la firma digital de los correos electrónicos.
    - **DMARC:** Establece una política contra los correos electrónicos suplantados.

### Discrepancia en la dirección del remitente
- **Motivo:** Es posible que el «Correo electrónico del remitente» de los ajustes no coincida con el correo electrónico de la cuenta SMTP.
- **Solución:** Haz que la dirección del remitente (`From:`) coincida con la dirección SMTP autorizada.

---

## 🕒 3. Retrasos en la entrega y problemas de cola

### Estado del Cron de WordPress (WP-Cron)
- **Motivo:** El sistema procesa los correos electrónicos masivos o las notificaciones diferidas mediante WP-Cron. Si tu sitio no recibe tráfico, es posible que el Cron no se ejecute.
- **Solución:** Configura una tarea Cron real en el servidor que ejecute `wp-cron.php` cada minuto.

### Límites del proveedor de servicios
- **Motivo:** Los planes de alojamiento compartido pueden imponer límites de correos electrónicos por hora.
- **Solución:** Comprueba tus límites o cámbiate a un servicio profesional de entrega de correo electrónico.

---

## 🛠️ 4. Modo de prueba y depuración

### Modo de prueba de correo electrónico
- **Comprobación:** Si el ajuste `mhmrentiva_email_test_mode` está activado, los correos electrónicos solo se registran en `AdvancedLogger` en lugar de enviarse a los destinatarios reales.
- **Solución:** Asegúrate de que el modo de prueba esté desactivado antes de pasar a producción.

### Errores de plantilla
- **Motivo:** Si se utiliza una plantilla HTML personalizada (`EmailTemplates`), un código PHP defectuoso puede impedir la entrega.
- **Solución:** Prueba el envío con la plantilla predeterminada.

## Lista de comprobación
1. Revisa el tipo de contenido `EmailLog`.
2. Prueba la conexión SMTP.
3. Verifica los registros DNS del dominio (SPF/DKIM).
4. Confirma que el modo de prueba está desactivado.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido detalles sobre SMTP, DNS (SPF/DKIM) y el modo de prueba. |
