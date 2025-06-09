# API de un sistema de reserva de butacas de cine
## Las operaciones que la API debe soportar son las siguientes:

- Crear, eliminar y modificar películas. Lineas 1, 2 y 3
- Crear, eliminar y modificar (parcialmente) salas. Líneas 4, 5 y 6.
- Crear, eliminar y modificar (parcialmente) usuarios. Lineas 7, 8 y 9.
- Crear una reserva para un usuario en una sala. Linea 10
- Cancelar una reserva para un usuario en una sala. Linea 11.
- Modificar una reserva para un usuario en una sala. Linea 12
- Registrar un pago de una reserva. Linea 13

## Se presumen las siguientes condiciones:
- Las películas se identifican por movie. Sus atributos son el titulo y la categoría
- las salas se identifican por room. Como atributo tienen el número.
- los usuarios se identifican por user.
- Las reservas se identifican por reservation.
- Los usuarios existen por sí mismos como entidad. Solamente pondremos como entidad el nombre.
- Las películas existen por sí mismas como entidad.
- Las salas existen por si mismas como entidad.
- Las reservas corresponden a un usuario y deben contener información de la película y la sala.
- El pago está asociado a la reserva (del usuario). Como atributo contiene el importe (no incluyo tarjeta).

|  Método HTTP  | URI                                                   | Query Params  |  Cuerpo de la Petición | Cuerpo de la Respuesta  | Códigos de Respuesta  |
| ------------ |-------------------------------------------------------| ------------ | ------------ | ------------ | ------------ |
| POST  | /movies                                               |  N/A | {"titulo": "El Padrino", "categoria": "drama"} | {"movieId": 1, "titulo": "El Padrino", "categoria:":"drama"}  | 201 Created 400 bad request 500 Internal Server Error  |
| DELETE | /movies/{movieId}                                     | N/A  | N/A  | {"message": "Pelicula eliminada"}  | 200 OK 400 Bad request 404 Not Found 500 Internal Server Error  |
| PUT (NO es parcialmente) | /movies/{movieId}                                     | N/A  | {"titulo": "El Padrino II", "categoria": "drama / historica"}  | {"movieId": 1, "titulo": "El Padrino II", "categoria:":"drama /  historica"}  | 200 OK 400 Bad request 404 Not Found 500 Internal Server Error  |
| POST  | /rooms                                                |  N/A | {"numero": 7} | {"roomId": 1, "numero": 7}  | 201 Created 400 bad request 500 Internal Server Error  |
| DELETE | /rooms/{roomId}                                       | N/A  | N/A  | {"message": "Sala eliminada"}  | 200 OK 400 Bad request 404 Not Found 500 Internal Server Error  |
| PATCH (parcialmente) | /rooms/{roomId}                                       | N/A  | {"numero": 3}  | {"roomId": 1, "numero:": 3}  | 200 OK 400 Bad request 404 Not Found 500 Internal Server Error  |
| POST  | /users                                                |  N/A | {"nombre": "Alberto Hevia"} | {"userId": 1, "nombre": "Alberto Hevia"}  | 201 Created 400 bad request 500 Internal Server Error  |
| DELETE | /users/{userId}                                       | N/A  | N/A  | {"message": "Usuario eliminada"}  | 200 OK 400 Bad request 404 Not Found 500 Internal Server Error  |
| PATCH (parcialmente) | /users/{userId}                                       | N/A  | {"nombre": "Alberto Hevia López"}  | {"userId": 1, "nombre:": "Alberto Hevia López"}  | 200 OK 400 Bad request 404 Not Found 500 Internal Server Error  |
| POST  | /users/{userId}/reservations                          |  N/A | {"movieId": 1, "roomId": 1} | {"userId": 1, "reservationId": 1, "movieId": 1, "roomId": 1}  | 201 Created 400 bad request 500 Internal Server Error  |
| DELETE | /users/{userId}/reservations/{reservationId}          | N/A  | N/A  | {"message": "Reserva Elimina"}  | 200 OK 400 Bad request 404 Not Found 500 Internal Server Error  |
| PATCH (solamente modifica la pelicula no la sala) | /users/{userId}/reservations/{reservationId}          | N/A  | {"movieId": 2}  | {"userId": 1, "reservationId": 1, "movieId": 2, "roomId": 1}  | 200 OK 400 Bad request 404 Not Found 500 Internal Server Error |
| POST (pago de la reserva)  | /users/{userId}/reservations/{reservationId}/payments |  N/A | {"importe": 9.50} | {"userId": 1, "reservationId": 1, "paymentId": 1, "pago": 9.50}  | 201 Created 400 bad request 500 Internal Server Error  |
