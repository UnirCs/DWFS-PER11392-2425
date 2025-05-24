package com.example.ejercicio07.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/calculator") // Este prefijo solo aplica a los métodos debajo de él
public class CalculatorController {

    // Nuevo método para la raíz de la aplicación (o un mensaje de bienvenida)
    // Nota: Esto solo aplica a /api/calculator/. Si quieres para la raíz del servidor (localhost:8080/)
    // deberías crear otro controlador o quitar el @RequestMapping de este.
    @GetMapping("/")
    public String welcomeMessage() {
        return "Bienvenido a la API de Calculadora. Usa /sumar, /restar, /multiplicar, /dividir.";
    }

    // Si quieres que el mensaje de bienvenida esté en http://localhost:8080/
    // Podrías crear una nueva clase HomeController.java:
    /*
    @RestController
    public class HomeController {
        @GetMapping("/")
        public String home() {
            return "Bienvenido a la API de Ejercicio07. Accede a /api/calculator/ para las operaciones.";
        }
    }
    */


    /**
     * Realiza la suma de dos números decimales.
     * Ejemplo de uso: GET /api/calculator/sumar?num1=10.5&num2=5.3
     * @param num1 El primer número decimal.
     * @param num2 El segundo número decimal.
     * @return El resultado de la suma.
     */
    @GetMapping("/sumar")
    public double sumar(@RequestParam double num1, @RequestParam double num2) {
        return num1 + num2;
    }

    /**
     * Realiza la resta de dos números decimales.
     * Ejemplo de uso: GET /api/calculator/restar?num1=10.5&num2=5.3
     * @param num1 El primer número decimal.
     * @param num2 El segundo número decimal.
     * @return El resultado de la resta.
     */
    @GetMapping("/restar")
    public double restar(@RequestParam double num1, @RequestParam double num2) {
        return num1 - num2;
    }

    /**
     * Realiza la multiplicación de dos números decimales.
     * Ejemplo de uso: GET /api/calculator/multiplicar?num1=10.5&num2=5.3
     * @param num1 El primer número decimal.
     * @param num2 El segundo número decimal.
     * @return El resultado de la multiplicación.
     */
    @GetMapping("/multiplicar")
    public double multiplicar(@RequestParam double num1, @RequestParam double num2) {
        return num1 * num2;
    }

    /**
     * Realiza la división de dos números decimales.
     * Lanza una excepción si el divisor es cero.
     * Ejemplo de uso: GET /api/calculator/dividir?num1=10.5&num2=5.3
     * @param num1 El numerador.
     * @param num2 El denominador.
     * @return El resultado de la división.
     * @throws IllegalArgumentException Si el denominador es cero.
     */
    @GetMapping("/dividir")
    public double dividir(@RequestParam double num1, @RequestParam double num2) {
        if (num2 == 0) {
            throw new IllegalArgumentException("No se puede dividir por cero.");
        }
        return num1 / num2;
    }
}
