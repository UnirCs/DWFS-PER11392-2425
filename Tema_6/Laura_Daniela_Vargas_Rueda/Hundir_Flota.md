# Ejercicio 3 (⭐⭐⭐⭐): API del Juego Hunde la Flota

En este ejercicio vamos a diseñar la API REST que podría usar la App del juego 'Hundir la flota' o 'Juego de los barcos'.
Si no conoces este juego puedes echar un vistazo al PDF de instrucciones que se encuentra en esta misma ruta, o descarga una App existente para jugar una partida. La aplicación gestionará principalmente partidas entre usuarios registrados o invitados (es decir, sin registro, anónimos). Cada partida tiene asociadas dos cuadrículas de 10x10 cuadrados, una por cada jugador, y estos jugadores deben poner sobre dicha cuadrícula las localizaciones de sus barcos. Tal como se indica en las instrucciones, deberá haber:
- 1 barco de 4 cuadrados.
- 2 barcos de 3 cuadrados.
- 3 barcos de 2 cuadrados.
- 4 barcos de 1 cuadrado.

También es necesario que, como dicen las instrucciones, se respeten dos reglas:
- Los barcos se colocan enteramente en horizontal o enteramente en vertical, es decir, no puede haber un barco en forma de L.
- Siempre debe haber un cuadrado de distancia entre cualquier punto de cualquier barco, y se pueden pegar al borde de la cuadrícula.

El objetivo del ejercicio es diseñar una API REST que será implementada (en otros ejercicios) por un microservicio o aplicación que se encargará de tratar todos los datos de las diferentes partidas. En este ejercicio nos centraremos únicamente en el diseño de la API y no trataremos ningún detalle de la implementación.

Las operaciones que la API debe soportar son las siguientes:
- Crear una partida.
- Eliminar una partida.
- Modificar datos de una partida.
- Iniciar una partida.
- Finalizar una partida.
- Consultar todos los datos (jugadores asociados, barcos de cada jugador, disparos realizados, ganador...) de una partida.
- Añadir un barco a la cuadrícula de un jugador en una partida.
- Eliminar un barco de la cuadrícula de un jugador en una partida.
- Consultar todos los barcos de un jugador de una partida.
- Registrar un disparo de un jugador a otro en una partida.
- Crear un usuario.
- Obtener datos de un usuario.
- Eliminar un usuario.

Ten en cuenta que podría no ser necesario definir un endpoint por cada una de las operaciones que se han listado. No obstante, dichas operaciones deben ser satisfechas por la API diseñada. Las primeras preguntas que deberás hacerte son:
- ¿Qué recursos tiene que manejar la API?
- ¿Cómo se relacionan entre sí?
- ¿Qué información (atributos) guarda cada recurso?

## Recursos Identificados

1. **Partidas**
   - Descripción: Gestión de partidas de juego.
   - URI base: `/api/v1/games`
   - Métodos: GET, POST, PUT, DELETE

2. **Jugadores**
   - Descripción: Gestión de jugadores (registrados y anónimos).
   - URI base: `/api/v1/players`
   - Métodos: GET, POST, DELETE

3. **Barcos**
   - Descripción: Gestión de barcos en las cuadrículas de los jugadores.
   - URI base: `/api/v1/games/{gameId}/players/{playerId}/ships`
   - Métodos: GET, POST, DELETE

4. **Disparos**
   - Descripción: Gestión de disparos entre jugadores.
   - URI base: `/api/v1/games/{gameId}/shots`
   - Métodos: POST

## Endpoints

### Partidas

| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST        | /api/v1/games | -            | ``{ "player1": "playerId1", "player2": "playerId2", "status": "pending"}`` | ``{ "gameId": 1, "player1": "playerId1", "player2": "playerId2", "status": "pending", "createdAt": "timestamp" }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| GET         | /api/v1/games | -            | -            | ``[ { "gameId": 1, "player1": "playerId1", "player2": "playerId2", "status": "pending", "createdAt": "timestamp" } ]`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| GET         | /api/v1/games/{gameId} | -            | -            | ``{ "gameId": 1, "player1": "playerId1", "player2": "playerId2", "status": "pending", "createdAt": "timestamp", "winner": "playerId1" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| PUT         | /api/v1/games/{gameId}/start | -            | -            | ``{ "gameId": 1, "status": "started", "createdAt": "timestamp" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| PUT         | /api/v1/games/{gameId}/end | -            | ``{ "winner": "playerId1" }`` | ``{ "gameId": 1, "status": "finished", "winner": "playerId1" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| DELETE      | /api/v1/games/{gameId} | -            | -            | ``{ "message": "Game deleted successfully" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |

### Jugadores

| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST        | /api/v1/players | -            | ``{ "name": "Jugador 1", "type": "registered"}`` | ``{ "playerId": 1, "name": "Jugador 1", "type": "registered", "createdAt": "timestamp" }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| GET         | /api/v1/players | -            | -            | ``[ { "playerId": 1, "name": "Jugador 1", "type": "registered", "createdAt": "timestamp" } ]`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| GET         | /api/v1/players/{playerId} | -            | -            | ``{ "playerId": 1, "name": "Jugador 1", "type": "registered", "createdAt": "timestamp" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| DELETE      | /api/v1/players/{playerId} | -            | -            | ``{ "message": "Player deleted successfully" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |

### Barcos

| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST        | /api/v1/games/{gameId}/players/{playerId}/ships | -            | ``{ "type": "carrier", "position": { "row": 1, "column": 1 }, "orientation": "horizontal"}`` | ``{ "shipId": 1, "type": "carrier", "position": { "row": 1, "column": 1 }, "orientation": "horizontal", "status": "active" }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| GET         | /api/v1/games/{gameId}/players/{playerId}/ships | -            | -            | ``[ { "shipId": 1, "type": "carrier", "position": { "row": 1, "column": 1 }, "orientation": "horizontal", "status": "active" } ]`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |
| DELETE      | /api/v1/games/{gameId}/players/{playerId}/ships/{shipId} | -            | -            | ``{ "message": "Ship removed successfully" }`` | 200 OK<br>404 Not Found<br>500 Internal Server Error |

### Disparos

| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST        | /api/v1/games/{gameId}/shots | -            | ``{ "shooter": "playerId1", "target": "playerId2", "position": { "row": 1, "column": 1 } }`` | ``{ "shotId": 1, "shooter": "playerId1", "target": "playerId2", "position": { "row": 1, "column": 1 }, "result": "hit/miss" }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |

## Consideraciones Especiales

1. **Validación de Datos**
   - Para barcos:
     - Verificar que el barco se coloca completamente dentro de la cuadrícula (10x10)
     - Verificar que el barco está en orientación horizontal o vertical
     - Verificar que hay al menos un cuadrado de distancia entre barcos
     - Verificar que no hay más de:
       * 1 barco de 4 cuadrados
       * 2 barcos de 3 cuadrados
       * 3 barcos de 2 cuadrados
       * 4 barcos de 1 cuadrado
   - Para disparos:
     - Verificar que la posición es válida dentro de la cuadrícula
     - Verificar que no se dispara a la misma posición dos veces
     - Verificar que es el turno del jugador que dispara

2. **Manejo de Errores**
   - 400 Bad Request: Cuando los datos de entrada no son válidos
   - 404 Not Found: Cuando el recurso no existe
   - 403 Forbidden: Cuando no es el turno del jugador
   - 500 Internal Server Error: Cuando ocurre un error inesperado en el servidor
   - 200 OK/201 Created: Cuando la operación se realiza correctamente