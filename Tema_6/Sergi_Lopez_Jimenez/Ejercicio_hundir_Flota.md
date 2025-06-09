# API del juego hunde la flota

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
1. Crear una partida. --> crea una partida con datos vacíos
2. Eliminar una partida. 
3. Modificar datos de una partida. 
4. Iniciar una partida. --> no hace falta implementar, es como parte de la creación
5. Finalizar una partida. --> no hace falta implementar, se declara winner cuando la condición de victoria se consigue, entonces es partida finalizada
6. Consultar todos los datos (jugadores asociados, barcos de cada jugador, disparos realizados, ganador...) de una partida. --> nos da los datos enteros, en ello tambien resolvemos el punto 9, ya que podemos devolver sólo los barcos del jugador
7. Añadir un barco a la cuadrícula de un jugador en una partida. --> tanto 7, 8 y 10 se gestionan mediante PATCH a la partida, donde modificamos los arrays "ships" y "shots".
8. Eliminar un barco de la cuadrícula de un jugador en una partida. --> tanto 7, 8 y 10 se gestionan mediante PATCH a la partida, donde modificamos los arrays "ships" y "shots".
9. Consultar todos los barcos de un jugador de una partida. --> nos da los datos enteros, en ello tambien resolvemos el punto 9, ya que podemos devolver sólo los barcos del jugador
10. Registrar un disparo de un jugador a otro en una partida. --> tanto 7, 8 y 10 se gestionan mediante PATCH a la partida, donde modificamos los arrays "ships" y "shots".
11. Crear un usuario.
12. Obtener datos de un usuario.
13. Eliminar un usuario.

Ten en cuenta que podría no ser necesario definir un endpoint por cada una de las operaciones que se han listado. No obstante, dichas operaciones deben ser satisfechas por la API diseñada. Las primeras preguntas que deberás hacerte son:
- ¿Qué recursos tiene que manejar la API?
- ¿Cómo se relacionan entre sí?
- ¿Qué información (atributos) guarda cada recurso?


|Operación| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|---|-------------|----------------|--------------|--------------|------------------|-------------------------|
|11 |POST         | /api/v1/usuarios | -            | ``{ "name": , "e-mail": , "password": , "birthday": , "address": }``|``{ "userId": , "name": , "e-mail": , "birthday": , "address": }``| 201  Created</br> 400 Bad Request  </br> 500 Internal Server Error                |
|12 |GET         | /api/v1/usuarios/{userId} | -            | - |``{ "userId": , "name": , "e-mail": , "birthday": , "address": }``| 200  OK</br> 404 Not Found  </br> 500 Internal Server Error                |
|13 |DELETE         | /api/v1/usuarios/{userId} | -            | - |-| 200  OK</br> 404 Not Found  </br> 500 Internal Server Error                |
|1 |POST         |/api/v1/usuarios/{userId}/matches </br> /api/v1/usuarios/anonymous/matches | -            | ``{ "date": , "rivalId": , "ships": [], "shipsRival":[], "shots":[], "shotsRival":[], "winner": }``|``{ "matchId": , "date": , "rivalId": , "ships": [], "shipsRival":[], "shots":[], "shotsRival":[], "winner": }``| 201  Created</br> 400 Bad Request  </br> 500 Internal Server Error                |
|2 |DELETE         | /api/v1/usuarios/{userId}/matches/{matchId} </br> /api/v1/usuarios/anonymous/matches/{matchId} | -            | - |- | 200  OK</br> 404 Not Found  </br> 500 Internal Server Error                |
|3 |PUT         | /api/v1/usuarios/{userId}/matches/{matchId} </br> /api/v1/usuarios/anonymous/matches/{matchId}| -            | ``{ "date": , "rivalId": , "ships": [], "shipsRival":[], "shots":[], "shotsRival":[], "winner": }``|``{ "matchId": , "date": , "rivalId": , "ships": [], "shipsRival":[], "shots":[], "shotsRival":[], "winner": }``| 200  OK</br> 400 Bad Request  </br> 404 Not Found  </br> 500 Internal Server Error                |
|6 & 9|GET         | /api/v1/usuarios/{userId}/matches/{matchId} </br> /api/v1/usuarios/anonymous/matches/{matchId}| -            | - |``{ "matchId": , "date": , "rivalId": , "ships": [], "shipsRival":[], "shots":[], "shotsRival":[], "winner": }``| 200  OK</br> 404 Not Found  </br> 500 Internal Server Error                |
|7 & 8 & 10|PATCH         | /api/v1/usuarios/{userId}/matches/{matchId} </br> /api/v1/usuarios/anonymous/matches/{matchId}| -            | ``{ "ships": [], "shots:"[] }`` |``{ "matchId": , "date": , "rivalId": , "ships": [], "shipsRival":[], "shots":[], "shotsRival":[], "winner": }``| 200  OK</br> 400 Bad Request  </br> 404 Not Found  </br> 500 Internal Server Error                |