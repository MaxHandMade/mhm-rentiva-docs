---
id: api-key-manager
title: "Gestión de claves API (API Key Manager)"
sidebar_label: "API Key Manager"
sidebar_position: 30
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
`APIKeyManager` es el centro de gestión de claves que permite a MHM Rentiva comunicarse de forma segura con el exterior. Esta página explica el ciclo de vida de las claves y los estándares de seguridad que las rigen.
:::

# 🔑 Gestión de claves API

Las claves API son identidades digitales que permiten a software de terceros (aplicaciones móviles, sistemas ERP, software de contabilidad, etc.) acceder a los datos de Rentiva.

---

## 🏗️ 1. Función y arquitectura del componente

La clase `APIKeyManager` trabaja en coordinación con `AuthHelper` para encargarse de las siguientes tareas:
- **Unicidad:** garantiza que cada clave sea única en todo el sistema.
- **Asignación de permisos:** asigna permisos de `read_only` o `read_write` a las claves.
- **Supervisión:** registra qué clave se ha usado, cuándo y desde qué IP, mediante `AdvancedLogger`.

---

## 🔄 2. Ciclo de vida de las claves

### Generación
- Las claves se generan a partir de cadenas aleatorias criptográficamente seguras (`wp_generate_password`).
- En la base de datos se almacena la versión con hash de la clave generada.

### Activación y uso
- Una clave pasa a estar activa en el momento en que se genera.
- Se envía mediante la cabecera `X-Rentiva-API-Key` durante las peticiones.

### Rotación
- **Política de seguridad:** se recomienda rotar las claves cada 90 días.
- **Periodo de gracia:** cuando se genera una clave nueva, la anterior puede seguir funcionando durante 24 horas «hasta que se invalide» (según la configuración).

---

## 🛡️ 3. Reglas de seguridad y privacidad

- **Prohibido registrar en logs:** el valor en texto plano de las claves API nunca debe escribirse en los archivos de registro (`debug.log`).
- **Seguridad de la base de datos:** las claves se almacenan en la base de datos con hash mediante `MD5` o `SHA-256` (según los estándares de WP).
- **Restricción por IP:** se pueden restringir determinadas claves API para que solo acepten peticiones desde direcciones IP definidas.

---

## 🛠️ 4. Recomendaciones operativas

1. **Separación de entornos:** usa siempre claves distintas para los entornos de pruebas (staging) y de producción.
2. **Mínimo privilegio:** si una integración solo lee datos, nunca le asignes el permiso `read_write`.
3. **Revocación inmediata:** ante la sospecha de una filtración, revoca la clave correspondiente con un solo clic desde el panel de administración.

## Resumen de la sección
- `APIKeyManager` es el núcleo de toda la seguridad REST.
- Las claves nunca se almacenan ni se comparten en texto plano.
- La rotación periódica y la restricción por IP se consideran buenas prácticas.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido detalles sobre el ciclo de vida de las claves, el periodo de gracia y la restricción por IP. |
