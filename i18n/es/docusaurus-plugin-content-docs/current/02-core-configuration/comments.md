---
id: comments
title: "Reseñas y valoraciones (Ajustes)"
sidebar_label: "Reseñas"
sidebar_position: 7
slug: /core-configuration/comments
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

La pestaña Reseñas es el centro para gestionar las opiniones de los clientes, las valoraciones y la protección contra spam tras una experiencia de alquiler de vehículos. Accede a ella desde **MHM Rentiva > Ajustes > Reseñas**.

---

## ⚙️ Configuración general

Aquí se establecen las reglas básicas de funcionamiento del sistema de reseñas:

- **Aprobar reseñas automáticamente:** Si está marcada, las reseñas se publican de inmediato sin pasar por la moderación del administrador.
- **Requiere iniciar sesión:** Limita el envío de reseñas solo a usuarios que hayan iniciado sesión.
- **Permitir reseñas de invitados:** Permite que los usuarios no registrados envíen una reseña con su nombre y correo electrónico.

---

## 🎨 Ajustes de visualización

Preferencias de visualización en la parte pública:

- **Reseñas por página:** Cuántas reseñas se muestran en una sola página (p. ej., 10).
- **Mostrar valoraciones:** Activa o desactiva el sistema de valoración con estrellas.
- **Mostrar avatares:** Muestra las fotos de perfil de los usuarios (Gravatar).
- **Editar y eliminar:** Permite a los usuarios editar o eliminar sus propias reseñas dentro de un periodo de tiempo determinado (minutos).

---

## 🛡️ Spam y seguridad

Protege el sistema frente a contenido malicioso y bots:

- **Protección contra spam:** Activa el sistema de filtrado inteligente.
- **Activar límite de frecuencia:** Impide que un mismo usuario envíe demasiadas reseñas en poco tiempo (p. ej., un límite de 1 reseña por minuto).
- **Palabras bloqueadas:** Una lista negra de palabras que bloquean automáticamente el contenido si aparecen en una reseña. Añade las entradas separadas por comas (p. ej., spam, casino, viagra).

---

### 🖼️ IMAGEN: PANEL DE AJUSTES DE RESEÑAS
*(Ajustes > pestaña Reseñas, grupos de ajustes con estructura de acordeón)*

---

## ⚡ Caché y rendimiento

Se utiliza para reducir la carga de la base de datos en sitios con mucho tráfico:

- **Activar caché de reseñas:** Guarda las listas de reseñas en memoria temporal.
- **Duración de la caché (minutos):** Cuánto tiempo permanecen actualizadas las listas (p. ej., 5 min).

---

### Resumen de la sección
- Usa el **proceso de aprobación** para supervisar la calidad del contenido.
- Usa los **filtros de spam** para mantener limpia la zona de opiniones.
- Usa el **sistema de valoración** para ofrecer prueba social a otros clientes.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se ha creado la documentación de Reseñas (Ajustes) a partir de la captura de pantalla del panel y del análisis del código. |
