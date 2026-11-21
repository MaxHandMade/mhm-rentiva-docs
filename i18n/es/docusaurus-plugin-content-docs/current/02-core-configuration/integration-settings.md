---
id: integration-settings
title: "Ajustes de integración (API REST)"
sidebar_label: "Ajustes de integración"
sidebar_position: 13
slug: /core-configuration/integration-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

La pestaña Ajustes de integración es la sección donde gestionas la infraestructura de la API REST que permite a MHM Rentiva comunicarse con aplicaciones externas (aplicaciones móviles, sitios web de terceros, etc.). Accede a ella desde **MHM Rentiva > Ajustes > Ajustes de integración**.

---

## ⚡ Configuración de la API REST

Parámetros esenciales de la API para mantener el rendimiento y la seguridad del sistema:

### 1. Limitación de frecuencia
- **Limitación de frecuencia de la API:** restringe la frecuencia de las solicitudes para evitar usos malintencionados.
- **Límite de solicitudes autenticadas:** número máximo de solicitudes por minuto para usuarios autenticados (p. ej., 60).
- **Límite de solicitudes públicas:** número máximo de solicitudes por minuto para visitantes anónimos (p. ej., 10).

### 2. Ajustes de tokens
- **Caducidad del token (horas):** periodo de validez de las claves de API emitidas (p. ej., 24 horas).
- **Renovación de tokens:** permite sustituir los tokens antiguos por otros nuevos, manteniendo la continuidad de la sesión.

### 3. Ajustes de seguridad
- **Requerir HTTPS:** obliga a usar cifrado SSL en toda la comunicación de la API.
- **Filtro de User-Agent:** bloquea bots y herramientas de extracción de datos como `curl` y `wget`.
- **Lista blanca de IP:** restringe el acceso solo a determinadas direcciones IP (lista separada por comas).

### 4. Caché de la API
- Almacena las respuestas de la API durante un periodo definido (en segundos) para reducir la carga de la base de datos.

---

## 🔑 Tokens de acceso seguro a la API

Crea aquí claves de acceso personalizadas para que las aplicaciones externas puedan acceder a tus datos:

- **ID de cliente:** un nombre que identifica a qué aplicación corresponde la clave (p. ej., "App Android").
- **Nivel de permiso:**
    - **READ:** solo puede listar datos.
    - **WRITE:** puede crear o actualizar reservas.
    - **ADMIN:** acceso completo.

---

### 🖼️ IMAGEN: PANEL DE GESTIÓN DE LA API
*(Ajustes > pestaña Ajustes de integración, área de limitación de frecuencia y gestión de claves de API)*

---

## 📚 Referencia de endpoints para desarrolladores

Esta sección enumera todos los endpoints de la API que ofrece el plugin. Para cada endpoint se proporciona la siguiente información:

- **Método:** GET, POST, etc.
- **Endpoint:** dirección de la API (p. ej., `mhm-rentiva/v1/vehicles`).
- **Espacio de nombres:** por defecto, `mhm-rentiva/v1`.

:::note Diagnóstico avanzado
Durante el desarrollo, activa "Registro de errores" para hacer un seguimiento detallado de los errores de la API. Por seguridad, mantenlo desactivado en sitios en producción.
:::

---

### Resumen de la sección
- Usa la **seguridad de la API** para proteger tus datos frente a accesos externos no autorizados.
- Usa los **tokens de acceso** para conectar tus propias aplicaciones móviles al plugin.
- Usa la **lista de endpoints** como referencia técnica lista para usar por tus desarrolladores.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se ha creado la documentación de Ajustes de integración (API REST) con todos los detalles de seguridad y gestión de claves. |
