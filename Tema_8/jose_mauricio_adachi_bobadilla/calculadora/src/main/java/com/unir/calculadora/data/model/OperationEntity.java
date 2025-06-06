package com.unir.calculadora.data.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "operations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OperationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private Double operator1;
    private Double operator2;
    private Double result;
}
