package com.unir.calculadora.controller;

import com.unir.calculadora.controller.model.CreateOperationDTO;
import com.unir.calculadora.data.model.OperationEntity;
import com.unir.calculadora.service.IOperationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operations")
@RequiredArgsConstructor
public class CalculadoraController {

    private final IOperationService service;

    @PostMapping
    public ResponseEntity<OperationEntity> createOperation(@RequestBody CreateOperationDTO dto) {
        OperationEntity result = service.performOperation(dto);
        return ResponseEntity.status(201).body(result);
    }

    @GetMapping
    public ResponseEntity<List<OperationEntity>> getAllOperations() {
        List<OperationEntity> operations = service.getAllOperations();
        return ResponseEntity.ok(operations);
    }
}
