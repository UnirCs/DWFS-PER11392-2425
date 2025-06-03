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

**Recursos identificados:**
- **Partida (partidas)**: Es una partida del juego 'Hundir la flota'.
- **Barco (barcos)**: Es un barco que se coloca en la cuadrícula de un jugador.
- Turno: Es un disparo que un jugador realiza a otro en una partida.
- **Usuario (usuarios)**: Es un Jugador registrado.


| Método Http | URI                                       | Query Params | Request Body                                                                                                          | Response Body                                                                                                          | Códigos HTTP de respuesta posibles     |
|:------------|:------------------------------------------|:-------------|:----------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------|:---------------------------------------|
| POST        | /usuarios                                 |              | { "nombre": "Pepito", "apellidos": "Pérez Muñoz", "email": "pepito@yahoo.es", "telefono": "+34654987321"  }           | { "id": "12", "mensaje": "Usuario creado" }                                                                            | 200, 400                               |
| DELETE      | /usuarios/{id}                            |              |                                                                                                                       | { "mensaje": "Usuario eliminado" }                                                                                     | 200, 400                               |
| PATCH       | /usuarios/{id}                            |              | { "nombre": "Pepito", "apellidos": "Pérez Muñoz", "email": "pepito@yahoo.es", "telefono": "+34654987321"  }           | { "id": "12", "mensaje": "Usuario modificado" }                                                                        | 200, 400                               |
| GET         | /usuarios/{id}                            |              |                                                                                                                       | { "id": "12", "nombre": "Pepito", "apellidos": "Pérez Muñoz", "email": "pepito@yahoo.es", "telefono": "+34654987321" } | 200, 400                               |
| POST        | /partidas                                 |              | { "nombre": "Partida américana", "usuarios": ["2", "4"] }                                                             | { "id": "25", "mensaje": "Partida creada" }                                                                            | 200, 400                               |
| DELETE      | /partidas/{id}                            |              |                                                                                                                       | { "mensaje": "Partida eliminada" }                                                                                     | 200, 400                               |           
| PATCH       | /partidas/{id}                            |              | { "nombre": "Los del sur" }                                                                                           | { "id": "12", "mensaje": "Partida modificada" }                                                                        | 200, 400                               |           
| POST        | /partidas/{id}/usuarios/{id}/barcos       |              | { "barcos": ["A1", "A2", "A3"] }                                                                                      | { "id": "8", "mensaje": "Barco colodado" }                                                                             | 200, 400                               | 
| DELETE      | /partidas/{id}/usuarios/{id}/barcos/{id}  |              |                                                                                                                       | { "mensaje" : "Barco eliminado" }                                                                                      | 200, 400                               |
| GET         | /partidas/{id}/usuarios/{id}/barcos       |              |                                                                                                                       | { "barcos": [["A1", "A2", "A3"], ["B4", "C4"] ] }                                                                      | 200, 400                               |                                                                                                                                                           
| POST        | /partidas/{id}/usuarios/{id}/preparado    |              |                                                                                                                       | { "mensaje": "Jugador listo" }                                                                                         | 200, 400                               |
| POST        | /partidas/{id}/iniciar                    |              |                                                                                                                       | { "mensaje": "Partida iniciada" }                                                                                      | 200, 400                               |
| GET         | /partidas/{id}/turno                      |              |                                                                                                                       | { "id": "1", "mensaje": "El turno es del jugador 1" }                                                                  | 200, 400                               | 
| POST        | /partidas/{id}/usuarios/{id}/disparos     |              | { "posicion": "B3" }                                                                                                  | { "id": "99", "mensaje": "tocado" }                                                                                    | 200, 400                               |
| POST        | /partidas/{id}/finalizar                  |              |                                                                                                                       | { "mensaje": "Partida finalizada" }                                                                                    | 200, 400                               |               
| GET         | /partidas/{id}                            |              |                                                                                                                       | { "id": "25", "nombre": "Los del sur", "estado": "en curso", "ganador": "", "usuarios": [ { "usuario": { "id": "12", "nombre": "Pepito", "apellidos": "Pérez Muñoz", "email": "pepito@yahoo.es", "telefono": "+34654987321" } , { "barcos": [ ["A1", "A2", "A3"], ["B4", "C4"] ] }, { "disparos": { "id":"3", "turno":"3", "posicion": "B3", "resultado":"tocado" }, { "id":"4", "turno":"4", "posicion": "B4", "resultado":"hundido" } ] } } ], [{ "usuario": { "id": "14", "nombre": "Manolo", "apellidos": "Menéndez Brie", "email": "hola@yahoo.es", "telefono": "+34699987321" } , { "barcos": [ ["A1", "A2", "A3"], ["B4", "C4"] ] }, { "disparos": [ { "id":"2", "turno":"2", "posicion": "B6", "resultado":"agua" } ] } } ] }                             | 200, 400                               | 
                                                                                                                                                                                                    			
