---
id: vehicle-lifecycle
title: "Gestión del ciclo de vida de los vehículos"
sidebar_label: "Ciclo de vida"
sidebar_position: 4
slug: /features-usage/vehicle-lifecycle
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones: Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

La gestión del ciclo de vida de los vehículos controla toda la vida útil de cada vehículo en la plataforma (desde la activación hasta la caducidad, desde la retirada hasta la nueva publicación) mediante una máquina de estados basada en reglas. **Requiere una licencia Pro.**

---

## Máquina de estados

Cada vehículo se encuentra en uno de los siguientes 5 estados:

| Estado | Descripción |
|-------|-------------|
| `pending_review` | Vehículo pendiente de revisión, aún no publicado |
| `active` | El vehículo está activo; los clientes pueden verlo y alquilarlo |
| `paused` | El vendedor lo ha pausado temporalmente; el vehículo está oculto |
| `expired` | Ha transcurrido el periodo de publicación de 90 días; el vehículo ya no está publicado |
| `withdrawn` | El vendedor lo ha retirado; el vehículo ha salido de la plataforma |

### Transiciones permitidas

```
pending_review → active         (admin approval)
active         → paused         (vendor pause)
active         → withdrawn      (vendor withdraw)
paused         → active         (vendor resume)
paused         → withdrawn      (vendor withdraw)
expired        → active         (vendor renew)
withdrawn      → active         (vendor re-list)
```

Las transiciones no definidas son rechazadas por `VehicleLifecycleManager`.

---

## Periodo de publicación de 90 días

- Cuando un vehículo pasa a `active`, comienza una **cuenta atrás de 90 días**.
- Un cron diario identifica los vehículos cuyo plazo ha vencido y los pasa a `expired`.
- Se envían automáticamente correos electrónicos de aviso al vendedor:
  - **10 días** antes de la caducidad
  - **3 días** antes de la caducidad

> Un vendedor puede iniciar un nuevo periodo de 90 días para un vehículo caducado mediante la acción **"Renovar"**.

---

## Acciones de autoservicio del vendedor

Los vendedores pueden gestionar sus vehículos sin intervención del administrador:

### Pausar
El vehículo activo deja de estar publicado temporalmente. Esto no afecta a las reservas pendientes; simplemente, el vehículo no puede recibir nuevas reservas.

### Reanudar
El vehículo pausado se reactiva. El tiempo de publicación restante continúa (el tiempo no se descuenta mientras el vehículo está pausado).

### Retirar
El vehículo se elimina de forma permanente de la plataforma. **Puede aplicarse una penalización** (consulta más abajo).

### Renovar
Un vehículo caducado se reactiva y comienza un nuevo periodo de 90 días.

### Volver a publicar
Un vehículo retirado se vuelve a añadir a la plataforma. Se conserva el contador histórico de penalizaciones.

---

## Sistema de penalización por retirada

Se aplica una penalización escalonada para disuadir a los vendedores de retirar vehículos de forma arbitraria:

| Número de retiradas | Porcentaje de penalización |
|------------------|--------------|
| 1.ª retirada | Gratuita |
| 2.ª retirada | **10 %** de los ingresos medios mensuales |
| 3.ª y siguientes | **25 %** de los ingresos medios mensuales |

**Ventana móvil de 12 meses:** el contador de penalizaciones cuenta las retiradas de los últimos 12 meses. Las retiradas con más de 12 meses de antigüedad se excluyen del recuento.

Las deducciones se registran automáticamente en el libro contable y se restan del cálculo de la siguiente liquidación.

### Registro del motivo de retirada y recurso (v4.35.0)

Desde la [v4.35.0](/blog/rentiva-v4.35.0-release), los vendedores pueden indicar un motivo al retirar un vehículo. El anterior cuadro de diálogo `confirm()` del navegador se ha sustituido por la **ventana modal compartida de informes del vendedor**, que solicita un motivo (mínimo 20 caracteres). Cuando se proporciona un motivo:

1. Se registra un informe `vehicle_action` con `status=open` antes de que se ejecute la petición AJAX de retirada.
2. Dentro de `VehicleLifecycleManager::withdraw()`, el nuevo filtro `mhmrentiva_before_apply_penalty` comprueba si existe el informe abierto. La función de retorno `PenaltySuspensionHook` devuelve `false`, **suspendiendo tanto la deducción de puntuación como el cargo en el libro contable**.
3. El vehículo sigue pasando a `withdrawn` (se establecen el estado de la entrada, los metadatos del ciclo de vida y la fecha de enfriamiento), pero la penalización económica queda en pausa a la espera de la revisión del administrador.

El administrador revisa el recurso en **MHM Rentiva → Bayi Raporları**:

- **Resuelto** (se acepta el motivo del vendedor) → no se hace nada. La puntuación y el libro contable nunca se modificaron. El vendedor no pierde ningún punto ni ninguna TL.
- **Rechazado** (el administrador mantiene la penalización) → se ejecuta `apply_deferred_penalty()`: `ReliabilityScoreCalculator::update()` vuelve a calcular (la retirada consta en el estado, por lo que la puntuación baja) y `PenaltyRecorder::record_penalty()` registra el cargo diferido en el libro contable. La penalización se aplica con carácter retroactivo.

Los envíos sin el parámetro POST `reason` siguen siendo compatibles con versiones anteriores: aplican la penalización de inmediato, como antes. Consulta la página [Informes de vendedores](./vendor-reports) para ver la documentación completa del sistema.

---

## Antiabuso: protección de fechas bloqueadas

Para evitar la manipulación de precios:

- Un vendedor no puede cancelar un vehículo que tenga una reserva activa y volver a publicarlo para las mismas fechas a un precio más alto.
- Las fechas de las reservas canceladas por el vendedor permanecen cerradas a nuevas reservas durante **30 días**.
- `AntiGamingBlocker` almacena estos bloqueos mediante la clave meta `_mhmrentiva_anti_gaming_blocks`.

---

## Puntuación de fiabilidad del vendedor

Se calcula una puntuación de fiabilidad entre 0 y 100 para cada vendedor:

- `ReliabilityScoreCalculator` la recalcula a diario.
- **Factores incluidos en la fórmula:**
  - Tasa de reservas completadas (positivo)
  - Tasa de cancelaciones (negativo)
  - Frecuencia de retiradas (negativo)
  - Duración de las pausas (ligeramente negativo)

| Puntuación | Interpretación |
|-------|----------------|
| 80–100 | Vendedor fiable |
| 60–79 | Media |
| 40–59 | Requiere atención |
| 0–39 | Riesgo alto |

El administrador ve la puntuación actual de cada vendedor en la lista de usuarios.

---

## Notificaciones por correo electrónico del ciclo de vida

Existen plantillas de correo electrónico automáticas para todas las transiciones de estado:

| Evento | Destinatario |
|-------|-----------|
| Vehículo activado | Vendedor |
| Vehículo pausado | Vendedor |
| Pausa reanudada | Vendedor |
| Vehículo retirado | Vendedor + administrador |
| Aviso de 10 días | Vendedor |
| Aviso de 3 días | Vendedor |
| Periodo de publicación caducado | Vendedor + administrador |
| Vehículo renovado | Vendedor |
| Vehículo publicado de nuevo | Vendedor |

---

## Interfaz de administración

### Columna de la lista de vehículos
El estado del ciclo de vida de cada vehículo se muestra con una insignia de color:
- Verde: Activo
- Amarillo: Pausado
- Rojo: Caducado
- Negro: Retirado

### Caja meta de edición del vehículo
La caja meta **"Ciclo de vida"** de la pantalla de edición del vehículo muestra:
- Indicador del estado actual
- Botón de transición de estado (transiciones permitidas)
- Fecha de caducidad del periodo de publicación
- Contador de penalizaciones por retirada

### Lista de usuarios
Se ha añadido una columna de puntuación de fiabilidad a las filas de los vendedores.

---

## Filtro de activos en la parte pública

6 shortcodes de la parte pública filtran ahora automáticamente los vehículos en mantenimiento o en un estado pasivo:

- `[rentiva_vehicles_grid]`
- `[rentiva_vehicles_list]`
- `[rentiva_featured_vehicles]`
- `[rentiva_vehicle_details]`
- `[rentiva_search_results]`
- `[rentiva_transfer_results]`

Los vehículos en estado `expired` o `withdrawn` se excluyen automáticamente de las consultas mediante `MetaQueryHelper`.

---

> **Nota:** La gestión del ciclo de vida de los vehículos requiere una licencia **Pro**. En la edición Lite, los vehículos se gestionan únicamente mediante el estado de entrada de WordPress (`publish`/`draft`); las funciones de máquina de estados, sistema de penalizaciones y puntuación de fiabilidad no están disponibles.
