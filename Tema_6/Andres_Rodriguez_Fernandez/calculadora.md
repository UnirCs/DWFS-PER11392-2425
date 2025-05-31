# API de una calculadora online

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

**Recursos identificados:**
- **Suma (suma)**: Recurso para operaciones de suma
- **Resta (resta)**: Recurso para operaciones de resta
- **Multiplica (multiplica)**: Recurso para operaciones de multiplicación
- **Divide (divide)**: Recurso para operaciones de división
- **RaizN-ésima (raizNesima)**: Recurso para cálculo de raíces
- **Potencia (elevaPotencia)**: Recurso para cálculo de potencias
- **Detalle (operacion)**: Recurso para obtener la información de una operación realizada previamente

## Operaciones
| Método HTTP | URI                    | Query Params | Request Body                  | Response Body                                                                                                    | Códigos de Respuesta |
|:------------|:-----------------------|:-------------|:------------------------------|:-----------------------------------------------------------------------------------------------------------------|:---------------------|
| POST        | /suma                  |              | { "numeros": [1, 2, 3] }      | { "id": "1", "numeros": [1, 2, 3], "resultado": 6, "mensaje": "Suma exitosa" }                                   | 200, 400             |
| POST        | /resta                 |              | { "numeros": [2, 4, 1] }      | { "id": "2", "numeros": [2, 4, 1], "resultado": -3, "mensaje": "Resta exitosa" }                                 | 200, 400             |
| POST        | /multiplica            |              | { "numeros": [2, 2] }         | { "id": "3", "numeros": [2, 2], "resultado": 4, "mensaje": "Multiplicacion exitosa" }                            | 200, 400             |
| POST        | /divide                |              | { "numeros": [2, 2] }         | { "id": "5", "numeros": [2, 2], "resultado": 1, "mensaje": "Division exitosa" }                                  | 200, 400             |
| POST        | /raizNesima            |              | { "numero": 4, "indice": 2 }  | { "id": "6", "numeros": [4, 2], "resultado": 2, "mensaje": "Raíz N-ésima exitosa" }                              | 200, 400             |
| POST        | /elevaPotencia         |              | { "base": 2, "exponente": 2 } | { "id": "7", "numeros": [2, 2], "resultado": 4, "mensaje": "Potencia exitosa" }                                  | 200, 400             |
| GET         | /operacion/{id}        |              |                               | { "id": "7", "operacion": "elevaPotencia", "numeros": [2, 2], "resultado": 4, "mensaje": "Operación encontrada" }| 200, 400             |
