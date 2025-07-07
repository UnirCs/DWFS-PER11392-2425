package com.unir.ms_calculadora.controller;

import com.unir.ms_calculadora.controller.model.CreateOperationRequest;
import com.unir.ms_calculadora.data.model.Operation;
import com.unir.ms_calculadora.service.OperationService;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/operations")
@Tag(name = "Operations Controller", description = "Operations to store operations")
public class OperationController {

    private final OperationService service;

    // GET /api/v1/operations
    @io.swagger.v3.oas.annotations.Operation(
            description = "Read operation",
            summary = "Returns the list of operations"
    )
    @ApiResponse(
            responseCode = "200",
            content = @Content(mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = Operation.class))),
            description = "Ok"
    )
    @GetMapping
    public ResponseEntity<List<Operation>> getOperations() {
        List<Operation> operations = service.getOperations();
        return ResponseEntity.ok(Objects.requireNonNullElse(operations, Collections.emptyList()));
    }

    // GET /api/v1/operations/{operationId}
    @io.swagger.v3.oas.annotations.Operation(
            operationId = "Operation identifier",
            description = "Read operation",
            summary = "Return the operation detail"
    )
    @ApiResponse(
            responseCode = "200",
            content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = Operation.class)),
            description = "Ok"
    )
    @ApiResponse(
            responseCode = "404",
            content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = ErrorResponse.class)),
            description = "Not found"
    )
    @GetMapping("/{operationId}")
    public ResponseEntity<Operation> getOperationById(@PathVariable String operationId) {
        Operation operation = service.getOperation(operationId);
        if (operation != null) {
            return ResponseEntity.ok(operation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /api/v1/operations
    @io.swagger.v3.oas.annotations.Operation(
            description = "Write operation",
            summary = "Return the created operation"
    )
    @ApiResponse(
            responseCode = "200",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Operation.class)),
            description = "Ok"
    )
    @ApiResponse(
            responseCode = "500",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ErrorResponse.class)),
            description = "Internal Server Error"
    )
    @PostMapping
    public ResponseEntity<Operation> addOperation(@Valid @RequestBody CreateOperationRequest request) {
        Operation createdOperation = service.createOperation(request);
        if (createdOperation != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdOperation);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
