package com.sergi.calculator.Data.model;

import java.util.List;

import com.sergi.calculator.Data.utils.Consts;

import jakarta.persistence.*;
import lombok.*;

@Entity //Entidad de base de datos
@Table(name = "operations") //Tabla a la que pertenece esta objeto
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CalculatorOperation {
	
	@Id //Jakarta Persistence API (JPA) ID de la table
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = Consts.OPERATION) //Indicamos el nombre de la columna
	private String operation;
	
	@Column(name = Consts.NUMBERS) 
	private String numbers;
	
	@Column(name = Consts.RESULT) 
	private Double result;

}
