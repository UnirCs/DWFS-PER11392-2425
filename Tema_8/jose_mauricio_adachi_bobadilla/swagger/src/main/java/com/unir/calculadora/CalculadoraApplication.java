package com.unir.calculadora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.Contact;


@OpenAPIDefinition(
		info = @Info(
				title = "API Calculadora",
				version = "1.0",
				description = "Documentación de la API de operaciones matemáticas",
				contact = @Contact(name = "Mauricio Adachi", email = "josemauricio.adachi188@unir.net")
		)
)
@SpringBootApplication
public class CalculadoraApplication {
	public static void main(String[] args) {
		SpringApplication.run(CalculadoraApplication.class, args);
	}
}
