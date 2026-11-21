---
id: system-performance
title: "Ajustes de sistema y rendimiento"
sidebar_label: "Sistema y rendimiento"
sidebar_position: 11
slug: /core-configuration/system-performance
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

La velocidad del plugin (caché) y la seguridad (WAF — Web Application Firewall, cortafuegos de aplicaciones web) se gestionan desde este centro. Configura todas las protecciones y optimizaciones de velocidad desde la pestaña **MHM Rentiva > Ajustes > Sistema y rendimiento**.

---

## ⚡ Sistema y rendimiento (caché)

MHM Rentiva utiliza una capa avanzada de caché de objetos para reducir la carga de la base de datos.

- **Activar caché de objetos:** cuando está activa, las consultas a la base de datos se guardan en memoria, lo que aumenta considerablemente la velocidad de carga de las páginas.
- **Duraciones de TTL de la caché:**
    - **Predeterminado:** duración de almacenamiento de los datos generales (horas).
    - **Listas:** duración de la caché de las listas de vehículos y reservas (minutos).
    - **Informes y gráficos:** frecuencia con la que se actualizan las estadísticas (minutos).
- **Límite de meta consultas:** número máximo de meta consultas por solicitud. Mantenerlo bajo hace que el sistema sea más ligero.

---

### 🖼️ IMAGEN: AJUSTES DE SISTEMA Y RENDIMIENTO
*(Ajustes > pestaña Sistema y rendimiento, ajustes de caché y TTL)*

---

## 🛡️ Control de IP y cortafuegos

Aplica restricciones por IP y por país para mantener alejados de tu sistema a los usuarios malintencionados y a los bots de spam.

- **Lista blanca:** añade aquí las direcciones IP de tu oficina o de tu equipo de gestión para asegurarte de que nunca se bloqueen.
- **Lista negra:** bloquea de forma permanente las IP maliciosas conocidas.
- **Restricción por país:** añade a la lista de permitidos solo los países a los que das servicio (p. ej., TR, DE) y bloquea el resto del mundo con un solo clic.

---

## 🔓 Reglas de seguridad avanzadas

Reglas de protección integradas contra los tipos de ataque más comunes a los que puede enfrentarse el sistema:

- **Protección contra fuerza bruta:** bloquea temporalmente las cuentas ante intentos repetidos con contraseñas incorrectas.
- **Protección contra inyección SQL y XSS:** sanea los datos procedentes de los formularios para garantizar la seguridad de la base de datos.
- **Protección CSRF:** bloquea las solicitudes falsificadas y la manipulación de formularios.

---

### 🖼️ IMAGEN: PANEL DE SEGURIDAD Y CORTAFUEGOS
*(Pestaña Ajustes — interfaz de restricción de IP y reglas de seguridad)*

---

## 🚥 Límites de tráfico y control de solicitudes (Limitación de solicitudes)

Establece límites por IP y por minuto para evitar el uso abusivo de los recursos del sistema.

| Tipo de límite | Descripción |
| :--- | :--- |
| **Límite global de solicitudes** | Límite total de llamadas que un usuario puede hacer a las funciones del plugin. |
| **Solicitud de reserva** | ¿Cuántos intentos de nueva reserva se pueden hacer desde una IP por minuto? |
| **Solicitud de pago** | Limita los intentos en la pasarela de pago para evitar transacciones fraudulentas. |

---

## 🩺 Mantenimiento y estado del sistema

Consulta en tiempo real la información básica de tu servidor desde la sección **«Estado del sistema»** situada al final de la página:
- Versiones de PHP / WordPress
- Tipo de servidor (Apache, Nginx, etc.)
- **Modo SQL:** comprueba si estás funcionando en modo `High Performance` para un rendimiento óptimo.

### Resumen de la sección
- **La caché de objetos** aumenta la velocidad y reduce la carga de la base de datos.
- **La limitación de solicitudes** detiene los ataques de bots y los intentos de fuerza bruta.
- **Las reglas WAF** proporcionan un escudo de seguridad a nivel de software.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Añadida la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Creada la guía de sistema, rendimiento y seguridad (WAF). |
