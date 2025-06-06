# API de una calculadora online

En este ejercicio vamos a diseñar la API REST de una calculadora.

Las operaciones que la API debe soportar son las siguientes:
- Sumar N elementos (2+2, 2+2+2). </br>⚠️ the operation implementation will allow having N numbers in the numbers array
- Restar N elementos (2-2, 2-2-2). </br>⚠️the operation implementation will allow having N numbers in the numbers array
- Multiplicar 2 elementos (2x2). </br>⚠️ the operation implementation will allow only having 2 numbers, if not Bad Request
- Dividir 2 elementos (2/2). </br>⚠️ the operation implementation will allow only having 2 numbers, if not Bad Request
- Raiz N-ésima de un número (Raíz cuadrada de 4, Raíz cúbica de 8).
</br>⚠️ the operation implementation will allow only having 2 numbers, if not Bad Request
- Potencia N-ésima de un número (2^2, 3^3, 4^4).
</br>⚠️ the operation implementation will allow only having 2 numbers, if not Bad Request
- Detalle de operacion

Nuestra calculadora tendrá memoria y siempre se podrán consultar los datos de operaciones realizadas, a través de un ID de operación.


| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST         | /api/v1/operations | -            | ``{ "operation": "sumar/restar/multiplicar/dividir/raiz/potencia", "numbers":[1,3]}``            | ``{ "operationId": , "operation": , "numbers":[1,3], "result":54 }`` | 201  Created</br> 400 Bad Request  </br> 500 Internal Server Error                |
| GET         | /api/v1/operations/{operationId} | -            | - | ``{ "operationId": , "operation": , "numbers":[1,3], "result":54 }`` | 200  OK</br> 404 Not Found  </br> 500 Internal Server Error                |