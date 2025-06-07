package com.unir.calculadora.controller.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateOperationDTO {

    @NotBlank(message = "El tipo de operación es obligatorio")
    @Schema(
            description = "Tipo de operación. Valores posibles: sum, sub, mul, div, pot, rai",
            example = "pot",
            required = true
    )
    private String type;

    @NotNull(message = "El primer operador es obligatorio")
    @Schema(
            description = "Primer número sobre el que se aplicará la operación",
            example = "25.0",
            required = true
    )
    private Double operator1;

    @NotNull(message = "El segundo operador es obligatorio")
    @Schema(
            description = "Segundo número que se utilizará en la operación",
            example = "5.0",
            required = true
    )
    private Double operator2;
}
