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


| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST         | /api/v1/peliculas | -            | ``{ "title": , "duration": , "language": , "Rating": , "Genre":  }``| ``{ "movieId": , "title": , "duration": , "language": , "Rating": , "Genre":  }`` | 201  Created</br> 400 Bad Request  </br> 500 Internal Server Error                |
| POST         | /api/v1/salas | -            | ``{ "occupancy": , "name": , "seats":[]}``|``{ "venueId": ,"occupancy": , "name": , "seats":[]}`` | 201  Created</br> 400 Bad Request  </br> 500 Internal Server 
| POST         | /api/v1/usuarios | -            | ``{ "name": , "e-mail": , "password": , "birthday": , "address": }``|``{ "userId": , "name": , "e-mail": , "birthday": , "address": }``| 201  Created</br> 400 Bad Request  </br> 500 Internal Server Error                |
| PUT         | /api/v1/peliculas/{movieId} | -            | ``{ "title": , "duration": , "language": , "Rating": , "Genre":  }``| ``{ "movieId": , "title": , "duration": , "language": , "Rating": , "Genre":  }`` | 200  Ok</br> 400 Bad Request  </br> 404 Not Found  </br>500 Internal Server Error                |
| PATCH         | /api/v1/salas/{venueId} | -            | ``{ "occupancy": , "name": }``|``{"venueId": , "occupancy": , "name": }`` | 200  Ok</br> 400 Bad Request  </br> 404 Not Found  </br>500 Internal Server Error  |
| PATCH        | /api/v1/usuarios/{userId} | -            | ``{ "name": , "e-mail": , "password": , "birthday": , "address": }``|``{ "userId": , "name": , "e-mail": , "birthday": , "address": }`` | 200  Ok</br> 400 Bad Request  </br> 404 Not Found  </br>500 Internal Server Error  |
| POST         | /api/v1/usuarios/{userId}/{venueId}/{movieId}/reservas | -            | ``{ "amount": , "date": , "time": }``|``{ "bookingId": , "amount": , "date": , "time": }``| 201  Created</br> 400 Bad Request  </br> 404 Not Found  </br> 500 Internal Server Error                |
| DELETE         | /api/v1/usuarios/{userId}/{venueId}/{movieId}/reservas/{bookingId} | -            | -|-| 200  OK </br> 404 Not Found  </br> 500 Internal Server Error                |
| PUT         | /api/v1/usuarios/{userId}/{venueId}/{movieId}/reservas/{bookingId} | -            | ``{ "amount": , "date": , "time": }``|``{ "bookingId": , "amount": , "date": , "time": }``| 200  OK</br> 400 Bad Request  </br> 404 Not Found  </br> 500 Internal Server Error                |
| POST         | /api/v1/usuarios/{userId}/{venueId}/{movieId}/reservas/{bookingId}/pagos | -            | ``{ "amount": , "date": , "time": , "method": , "transactionId": }``|``{ "amount": , "date": , "time": , "method": , "transactionId": }``| 201  Created</br> 400 Bad Request  </br> 500 Internal Server Error                |
