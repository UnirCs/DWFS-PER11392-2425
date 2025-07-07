package com.unir.ms_calculadora.data.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.deser.std.FromStringDeserializer;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "operations")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Operation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La operacion es obligatoria")
    @Column(name = "operation", nullable = false, length = 20)
    private String operationName;

    @NotBlank(message = "El listado de numeros es obligatorio")
    @Column(nullable = false)
    @JsonSerialize(using = ToStringSerializer.class)
    @JsonDeserialize(using = FromStringDeserializer.class)
    private List<Double> numbers;

    private Double result;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}
