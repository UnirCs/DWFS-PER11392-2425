package com.sergi.calculator.Controller;


import java.util.Collections;
import java.util.List;
import java.util.Map;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sergi.calculator.Data.model.*;
import com.sergi.calculator.Controller.model.*;
import com.sergi.calculator.Service.*;


import lombok.*;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Tag(name = "Calculator Controller", description = "Microservice in charge of exposing CRUD operations on a calculator, the operations are stored in a DB")
public class CalculatorController {
	
	//Definimos una interfaz genérica, que no tiene ninguna implementación.
	//La implementación la dará un Bean que se creará
	//Spring mira a la clase que haya implementado la interfaz como servicio y la usa
	private final CalculatorService service;
	
	@Autowired
	public CalculatorController( CalculatorService service) {
		this.service = service;
	}
	
	
	@GetMapping("/operations")
	@Operation(operationId = "Obtener operaciones de la calculadora",
			description = "Operacion de lectura",
			summary = "Se devuelve una lista de todas las operaciones en memoria de la base de datos"
			)
	@ApiResponse(
			responseCode = "200",
			content = @Content(mediaType = "application/json", schema = @Schema(implementation = CalculatorOperation.class)),
			description = "OK")
	public ResponseEntity<List<CalculatorOperation>> getOperations(
			 @RequestHeader Map<String, String> headers,
			 @Parameter(name = "Operacion matematica", description = "Tipo de operacion realizada")
			 @RequestParam(required = false) String operation){
		
		log.info("headers: {}", headers);
		List<CalculatorOperation> operations = service.getOperations(operation);
		
		if(operations != null) {
			return ResponseEntity.ok(operations);
		}
		else {
			return ResponseEntity.ok(Collections.emptyList());
		}
		
	}
	
	@GetMapping("/operations/{operationId}")
	@Operation(
			operationId = "Obtener una operacion especifica",
			description = "Operacion de lectura",
			summary = "Se devuelve una operacion a partir de su identificador"
			)
	@ApiResponse(responseCode = "200",
	content = @Content(mediaType = "application/json", schema = @Schema(implementation = CalculatorOperation.class)),
	description = "OK")
	@ApiResponse(responseCode = "404",
	content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)),
	description = "No encontrado")
	public ResponseEntity<CalculatorOperation> getOperation(@PathVariable String operationId){
        log.info("Request received for product {}", operationId);
        CalculatorOperation operation = service.getOperation(operationId);

        if (operation != null) {
            return ResponseEntity.ok(operation);
        } else {
            return ResponseEntity.notFound().build();
        }
	}
	
	@PostMapping("/operations")
	@Operation(	operationId = "Crear una nueva operacion",
				description = "Operacion de escritura",
				summary = "Se crea una operacion a partir de los datos de entrada. Los valores de operacion son: suma, resta, multiplicacion, division, raiz, potencia",
				requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
						required = true,
						content = @Content(mediaType = "application/json", schema = @Schema(allowableValues = {"suma", "resta", "multiplicacion", "division", "raiz", "potencia"}, implementation = CreateOperationRequest.class)))
	)
	@ApiResponse(responseCode = "201",
	content = @Content(mediaType = "application/json", schema = @Schema(implementation = CalculatorOperation.class)),
	description = "Creacion de una nueva operación")
	@ApiResponse(responseCode = "400",
	content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)),
	description = "Peticion errónea en forma")
	//Enviamos un cuerpo en la peticion, este body esta asociado a un objeto, se hace bind entre el json y el objeto a traves de esta declaracion
	public ResponseEntity<CalculatorOperation> createOperation(@RequestBody CreateOperationRequest request){
		
		CalculatorOperation createdOperation = service.createOperation(request);
		
		if(createdOperation != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(createdOperation);
		}
		else {
			return ResponseEntity.badRequest().build();
		}		
	}

}

