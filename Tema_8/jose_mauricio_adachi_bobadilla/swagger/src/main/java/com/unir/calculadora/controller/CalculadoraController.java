package com.unir.calculadora.controller;

import com.unir.calculadora.controller.model.CreateOperationDTO;
import com.unir.calculadora.data.model.OperationEntity;
import com.unir.calculadora.service.IOperationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/calculadora")
@RequiredArgsConstructor
public class CalculadoraController {

    private final IOperationService service;

    @Operation(summary = "Realizar una operación matemática")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Operación realizada correctamente"),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida (por ejemplo, división por cero o raíz inválida)"),
            @ApiResponse(responseCode = "422", description = "Tipo de operación no soportado")
    })
    @PostMapping
    public ResponseEntity<OperationEntity> createOperation(@Valid @RequestBody CreateOperationDTO dto) {
        OperationEntity result = service.performOperation(dto);
        return ResponseEntity.status(201).body(result);
    }

    @Operation(summary = "Obtener todas las operaciones")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operaciones obtenidas exitosamente")
    })
    @GetMapping
    public ResponseEntity<List<OperationEntity>> getAllOperations() {
        List<OperationEntity> operations = service.getAllOperations();
        return ResponseEntity.ok(operations);
    }

    @Operation(summary = "Obtener operación por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operación encontrada"),
            @ApiResponse(responseCode = "404", description = "Operación no encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<OperationEntity> getOperationById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getOperationById(id));
    }
}
