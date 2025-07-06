# Ejercicio 1 (⭐⭐️): API de una calculadora online

En este ejercicio vamos a diseñar la API REST de una calculadora.

Las operaciones que la API debe soportar son las siguientes:
- Sumar N elementos (2+2, 2+2+2).
- Restar N elementos (2-2, 2-2-2).
- Multiplicar 2 elementos (2x2).
- Dividir 2 elementos (2/2).
- Raiz N-ésima de un número (Raíz cuadrada de 4, Raíz cúbica de 8).
- Potencia N-ésima de un número (2^2, 3^3, 4^4).
- Detalle de operacion

Nuestra calculadora tendrá memoria y siempre se podrán consultar los datos de operaciones realizadas, a través de un ID de operación.

## Recursos Identificados

1. **Operaciones Matemáticas**
   - Descripción: Endpoints para realizar operaciones matemáticas básicas y avanzadas.
   - URI base: `/api/v1/operations`
   - Métodos: POST

2. **Historial de Operaciones**
   - Descripción: Sistema de memoria para almacenar y recuperar operaciones previas.
   - URI base: `/api/v1/operations/{operationId}`
   - Métodos: GET

## Endpoints

### Operaciones Matemáticas

| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| POST        | /api/v1/operations/sum | -            | ``{ "numbers":[1,3]}`` | ``{ "operationId": 1, "operation": "sum", "numbers":[1,3], "result":4 }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| POST        | /api/v1/operations/subtract | -            | ``{ "numbers":[1,3]}`` | ``{ "operationId": 1, "operation": "subtract", "numbers":[1,3], "result":-2 }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| POST        | /api/v1/operations/multiply | -            | ``{ "numbers":[1,3]}`` | ``{ "operationId": 1, "operation": "multiply", "numbers":[1,3], "result":3 }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| POST        | /api/v1/operations/divide | -            | ``{ "numbers":[1,3]}`` | ``{ "operationId": 1, "operation": "divide", "numbers":[1,3], "result":0.3333 }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| POST        | /api/v1/operations/sqrt | -            | ``{ "numbers":[2,16]}`` | ``{ "operationId": 1, "operation": "sqrt", "numbers":[2,16], "result":4 }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| POST        | /api/v1/operations/pow | -            | ``{ "numbers":[2,3]}`` | ``{ "operationId": 1, "operation": "pow", "numbers":[2,3], "result":8 }`` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |

### Ejemplos de Uso

1. **Suma**
```json
Request:
POST /api/v1/operations/sum
{
  "numbers": [2, 3, 4]
}

Response:
{
  "operationId": 1,
  "operation": "sumar",
  "numbers": [2, 3, 4],
  "result": 9
}
```

2. **Resta**
```json
Request:
POST /api/v1/operations/subtract
{
  "numbers": [10, 5, 2]
}

Response:
{
  "operationId": 2,
  "operation": "subtract",
  "numbers": [10, 5, 2],
  "result": 3
}
```

3. **Multiplicación**
```json
Request:
POST /api/v1/operations/multiply
{
  "numbers": [2, 3]
}

Response:
{
  "operationId": 3,
  "operation": "multiply",
  "numbers": [2, 3],
  "result": 6
}
```
4. **División**
```json
Request:
POST /api/v1/operations/divide
{
  "numbers": [10, 2]
}

Response:
{
  "operationId": 4,
  "operation": "divide",
  "numbers": [10, 2],
  "result": 5
}
```

7. **Raíz N-ésima**
```json
Request:
POST /api/v1/operations/sqrt
{
  "numbers": [2, 16]  // 2 raíces de 16
}

Response:
{
  "operationId": 5,
  "operation": "sqrt",
  "numbers": [2, 16],
  "result": 4
}
```

6. **Potencia N-ésima**
```json
Request:
POST /api/v1/operations/pow
{
  "numbers": [2, 3]  // 2 elevado a 3
}

Response:
{
  "operationId": 6,
  "operation": "pow",
  "numbers": [2, 3],
  "result": 8
}
```

### Historial de Operaciones

| Método HTTP | URI            | Query Params | Request Body | Response Body    | Códigos HTTP de respuesta |
|-------------|----------------|--------------|--------------|------------------|-------------------------|
| GET        | /api/v1/operations/{operationId} | -            | ``{"operationId": "1", "operation": "sum", "numbers": [2, 3, 4], "result": 9, "timestamp": "2025-06-06T13:30:00Z"}`` | ``{"operationId": "1", "result": 9}`` | 200 Ok<br>404 Not Found<br>500 Internal Server Error |
