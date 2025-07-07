package com.unir.ms_calculadora.controller.model;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateOperationRequest {
    private Long id;

    private String operationName;

    private List<Double> numbers;

    private Double result;

    private LocalDateTime timestamp = LocalDateTime.now();
}
