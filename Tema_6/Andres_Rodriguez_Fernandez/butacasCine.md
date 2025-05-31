# API de un sistema de reserva de butacas de cine

En este ejercicio vamos a diseñar la API REST para el cine en el que venimos trabajando en los ejercicios de los anteriores temas.

Las operaciones que la API debe soportar son las siguientes:
- Crear, eliminar y modificar películas.
- Crear, eliminar y modificar (parcialmente) salas.
- Crear, eliminar y modificar (parcialmente) usuarios.
- Crear una reserva para un usuario en una sala.
- Cancelar una reserva para un usuario en una sala.
- Modificar una reserva para un usuario en una sala.
- Registrar un pago de una reserva.

**Recursos identificados:**
- **Peliculas (peliculas)**: catálogo de películas que tiene la compañía
- **Salas de cine (salas)**: las diferentes salas de las que se compone un cine
- **Calendario de programación (proyecciones)**: son las diferentes proyecciones de películas en una sala para una fecha determinada
- **Usuarios (usuarios)**: los clientes del cine
- **Reservas (reservas)**: gestionar las reservas de bútacas de los clientes en salas
- **Pagos (pagos)**: realiza el pago de una reserva


## Operaciones
| Método HTTP | URI                    | Query Params | Request Body                                                                                                | Response Body                                                                                                          | Códigos de Respuesta |
|:------------|:-----------------------|:-------------|:------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------|:---------------------|
| POST        | /peliculas             |              | { "titulo": "Amanecer", "director": "Pedro Almodovar", "duracion": 175, "genero": "Drama" }                 | { "id": "1", "mensaje": "Película creada" }                                                                            | 200, 400             |
| DELETE      | /peliculas/{id}        |              |                                                                                                             | { "mensaje": "Película eliminada" }                                                                                    | 200, 400             |
| PUT         | /peliculas/{id}        |              | { "titulo": "Amanecer", "director": "Pedro Almodovar", "duracion": 175, "genero": "Drama" }                 | { "id": "1", "mensaje": "Película creada" }                                                                            | 200, 400             |
| GET         | /peliculas/{id}        |              |                                                                                                             | {"id": "1", "titulo": "Amanecer", "director": "Pedro Almodovar", "duracion": 175, "genero": "Drama" }                  | 200, 400             |
| POST        | /salas                 |              | { "nombre": "Sala 01", "butacas": 200 }                                                                     | { "id": "1", "mensaje": "Sala creada" }                                                                                | 200, 400             |
| DELETE      | /salas/{id}            |              |                                                                                                             | { "mensaje": "Sala eliminada" }                                                                                        | 200, 400             |
| PATCH       | /salas/{id}            |              | { "nombre": "Sala 01", "butacas": 200 }                                                                     | { "id": "25", "mensaje": "Modificación realizada" }                                                                    | 200, 400             |
| GET         | /salas/{id}            |              |                                                                                                             | { "id": "25", "nombre": "Sala 01", "butacas": 200 }                                                                    | 200, 400             |
| POST        | /proyecciones          |              | { "pelicula": "1", "sala": "1", "fecha": 15-05-2025, "horario": 10:00 }                                     | { "id": "101", "Proyección planificada" }                                                                              | 200, 400             |
| DELETE      | /proyecciones/{id}     |              |                                                                                                             | { "mensaje": "Proyección eliminada" }                                                                                  | 200, 400             |
| POST        | /usuarios              |              | { "nombre": "Pepito", "apellidos": "Pérez Muñoz", "email": "pepito@yahoo.es", "telefono": "+34654987321"  } | { "id": "12", "mensaje": "Usuario creado" }                                                                            | 200, 400             |
| DELETE      | /usuarios/{id}         |              |                                                                                                             | { "mensaje": "Usuario eliminado" }                                                                                     | 200, 400             |
| PATCH       | /usuarios/{id}         |              | { "nombre": "Pepito", "apellidos": "Pérez Muñoz", "email": "pepito@yahoo.es", "telefono": "+34654987321"  } | { "id": "12", "mensaje": "Usuario modificado" }                                                                        | 200, 400             |
| GET         | /usarios/{id}          |              |                                                                                                             | { "id": "12", "nombre": "Pepito", "apellidos": "Pérez Muñoz", "email": "pepito@yahoo.es", "telefono": "+34654987321" } | 200, 400             |
| POST        | /reservas/             |              | { "usuario": "23", "proyeccion": "1", "butacas": [16A, 16B, 15A] }                                          | { "id": "90", "mensaje": "Se ha reservado 3 butacas" }                                                                 | 200, 400             |
| DELETE      | /reservas/{id}         |              |                                                                                                             | { "mensaje": "Reserva cancelada" }                                                                                     | 200, 400             |
| PATCH       | /reservas/{id}         |              | { "butacas": [12A, 12B] }                                                                                   | { "mensaje": "Modificada la reserva, ahora son 2 butacas" }                                                            | 200, 400             |
| GET         | /reservas/{id}         |              |                                                                                                             | { "id": "90","usuario": "23", "proyeccion": "1", "butacas": [16A, 16B, 15A], "estado": "Pendiente pago" }              | 200, 400             |
| POST        | /pagos			       |              | { "reserva": "90", "importe": "90", "moneda": "EUR", "método": "Bizum", "concepto": "Cine Unir" }           | { "id": "987", "Mensaje": "Pago realizado correctamente" }                                                             | 200, 400             |       

