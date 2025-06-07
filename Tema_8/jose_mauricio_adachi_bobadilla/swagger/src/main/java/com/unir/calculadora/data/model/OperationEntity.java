package com.unir.calculadora.data.model;

import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "operations")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Entidad que representa una operación matemática realizada")
public class OperationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único de la operación", example = "1")
    private Long id;

    @Schema(description = "Tipo de operación realizada", example = "pot")
    private String type;

    @Schema(description = "Primer número usado", example = "10.5")
    private Double operator1;

    @Schema(description = "Segundo número usado", example = "2.0")
    private Double operator2;

    @Schema(description = "Resultado de la operación", example = "110.25")
    private Double result;
}
