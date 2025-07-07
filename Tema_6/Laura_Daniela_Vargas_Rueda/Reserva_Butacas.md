# Ejercicio 2 (⭐⭐⭐): API de un sistema de reserva de butacas de cine

En este ejercicio vamos a diseñar la API REST para el cine en el que venimos trabajando en los ejercicios de los anteriores temas.

Las operaciones que la API debe soportar son las siguientes:
- Crear, eliminar y modificar películas.
- Crear, eliminar y modificar (parcialmente) salas.
- Crear, eliminar y modificar (parcialmente) usuarios.
- Crear una reserva para un usuario en una sala.
- Cancelar una reserva para un usuario en una sala.
- Modificar una reserva para un usuario en una sala.
- Registrar un pago de una reserva.

## Recursos Identificados

1. **Películas**
   - Descripción: Gestión de información de películas.
   - URI base: `/api/v1/movies`
   - Métodos: GET, POST, PUT, DELETE

2. **Salas**
   - Descripción: Gestión de información de salas de cine.
   - URI base: `/api/v1/rooms`
   - Métodos: GET, POST, PATCH, DELETE

3. **Usuarios**
   - Descripción: Gestión de información de usuarios.
   - URI base: `/api/v1/users`
   - Métodos: GET, POST, PATCH, DELETE

4. **Reservas**
   - Descripción: Gestión de reservas de butacas.
   - URI base: `/api/v1/bookings`
   - Métodos: POST, DELETE, PATCH

5. **Pagos**
   - Descripción: Gestión de pagos de reservas.
   - URI base: `/api/v1/payments`
   - Métodos: POST

## Endpoints

### Películas

| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST        | /api/v1/movies | -            | ``{ "title": "Pelicula 1", "duration": "120", "genre": "Acción"}`` | ``{ "movieId": 1, "title": "Pelicula 1", "duration": "120", "genre": "Acción" }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| GET         | /api/v1/movies | -            | -            | ``[ { "movieId": 1, "title": "Pelicula 1", "duration": "120", "genre": "Acción" } ]`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| GET         | /api/v1/movies/{movieId} | -            | -            | ``{ "movieId": 1, "title": "Pelicula 1", "duration": "120", "genre": "Acción" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| PUT         | /api/v1/movies/{movieId} | -            | ``{ "title": "Pelicula 1", "duration": "120", "genre": "Acción"}`` | ``{ "movieId": 1, "title": "Pelicula 1", "duration": "120", "genre": "Acción" }`` | 200 OK<br>400 Bad Request<br>404 Not Found<br>500 Internal Server Error |
| DELETE      | /api/v1/movies/{movieId} | -            | -            | ``{ "message": "Movie deleted successfully" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |

### Salas

| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST        | /api/v1/rooms | -            | ``{ "name": "Sala 1", "capacity": 100, "rows": 10, "columns": 10}`` | ``{ "roomId": 1, "name": "Sala 1", "capacity": 100, "rows": 10, "columns": 10 }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| GET         | /api/v1/rooms | -            | -            | ``[ { "roomId": 1, "name": "Sala 1", "capacity": 100, "rows": 10, "columns": 10 } ]`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| GET         | /api/v1/rooms/{roomId} | -            | -            | ``{ "roomId": 1, "name": "Sala 1", "capacity": 100, "rows": 10, "columns": 10 }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| PATCH       | /api/v1/rooms/{roomId} | -            | ``{ "name": "Sala 1", "capacity": 100 }`` | ``{ "roomId": 1, "name": "Sala 1", "capacity": 100, "rows": 10, "columns": 10 }`` | 200 OK<br>400 Bad Request<br>404 Not Found<br>500 Internal Server Error |
| DELETE      | /api/v1/rooms/{roomId} | -            | -            | ``{ "message": "Room deleted successfully" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |

### Usuarios

| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST        | /api/v1/users | -            | ``{ "name": "Usuario 1", "email": "usuario1@email.com"}`` | ``{ "userId": 1, "name": "Usuario 1", "email": "usuario1@email.com" }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| GET         | /api/v1/users | -            | -            | ``[ { "userId": 1, "name": "Usuario 1", "email": "usuario1@email.com" } ]`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| GET         | /api/v1/users/{userId} | -            | -            | ``{ "userId": 1, "name": "Usuario 1", "email": "usuario1@email.com" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| PATCH       | /api/v1/users/{userId} | -            | ``{ "name": "Usuario 1" }`` | ``{ "userId": 1, "name": "Usuario 1", "email": "usuario1@email.com" }`` | 200 OK<br>400 Bad Request<br>404 Not Found<br>500 Internal Server Error |
| DELETE      | /api/v1/users/{userId} | -            | -            | ``{ "message": "User deleted successfully" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |

### Reservas

| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST        | /api/v1/bookings | -            | ``{ "userId": 1, "roomId": 1, "movieId": 1, "seat": "A1"}`` | ``{ "bookingId": 1, "userId": 1, "roomId": 1, "movieId": 1, "seat": "A1", "status": "active" }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| DELETE      | /api/v1/bookings/{bookingId} | -            | -            | ``{ "message": "Booking cancelled successfully" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| PATCH       | /api/v1/bookings/{bookingId} | -            | ``{ "seat": "B1" }`` | ``{ "bookingId": 1, "userId": 1, "roomId": 1, "movieId": 1, "seat": "B1", "status": "active" }`` | 200 OK<br>400 Bad Request<br>404 Not Found<br>500 Internal Server Error |

### Pagos

| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST        | /api/v1/payments | -            | ``{ "bookingId": 1, "amount": 10.50, "method": "credit_card"}`` | ``{ "paymentId": 1, "bookingId": 1, "amount": 10.50, "method": "credit_card", "status": "completed" }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |

## Consideraciones Especiales

1. **Validación de Datos**
   - Se debe validar que los datos de entrada sean válidos para cada recurso
   - Para reservas: Verificar que el asiento no esté ocupado
   - Para pagos: Verificar que la reserva exista y no haya sido pagada previamente

2. **Manejo de Errores**
   - 400 Bad Request: Cuando los datos de entrada no son válidos
   - 404 Not Found: Cuando el recurso no existe
   - 500 Internal Server Error: Cuando ocurre un error inesperado en el servidor
   - 200 OK/201 Created: Cuando la operación se realiza correctamente