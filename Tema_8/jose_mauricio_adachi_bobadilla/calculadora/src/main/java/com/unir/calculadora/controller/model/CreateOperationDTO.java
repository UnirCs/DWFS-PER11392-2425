package com.unir.calculadora.controller.model;

import lombok.Data;

@Data
public class CreateOperationDTO {
    private String type;
    private Double operator1;
    private Double operator2;
}
