# API de una calculadora online

Recursos identificados:

- Operaciones (operations): Representa una operación de la calculadora.

| Método HTTP | URI                                | Query Params | Cuerpo de la Petición                                          | Cuerpo de la Respuesta                            | Códigos de Respuesta                                      |
|-------------|------------------------------------|--------------|----------------------------------------------------------------|---------------------------------------------------|-----------------------------------------------------------|
| POST        | /operations/basic/{operationid}    | N/A          | `{"operationid": 1 (sumar) ó 2 (restar), "numbers": [2, 2, 2]}`| `{"operationid": 1 ó 2, "result": 6}`             | 201 OK<br/>400 Bad Request<br/>500 Internal Server Error  |
| POST        | /operations/advanced/{operationid} | N/A          | `{"operationid": 3 (multiplar) ó 4 (dividir)", "a": 2, "b": 2}`| `{"operationid": 3 ó 4, "result": 4}`             | 201 OK<br/>400 Bad Request<br/>500 Internal Server Error  |
| POST        | /operations/raiz                   | N/A          | `{"operationid": 5 (raiz), "degree": 2, "number": 4}`          | `{"operationid": 5, "result": 2}`                 | 201 OK<br/>400 Bad Request<br/>500 Internal Server Error  |
| POST        | /operations/potencia               | N/A          | `{"operationid": 6 (potencia), "base": 3, "exponent": 3}`      | `{"operationid": 6, "result": 27}`                | 201 OK<br/>400 Bad Request<br/>500 Internal Server Error  |
| GET         | /operations                        | operationid  | N/A                                                            | `{["operationid": 1, "data": [2, 2], "result": 4], ["operationid": 1, "data": [5, 3], "result": 8]}` | 200 OK<br/>404 Not Found<br/>500 Internal Server Error     |
