package com.sergi.calculator.Controller.model;

import java.util.List;



import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OperationDto {
	
	private String operation;
	private List<Double> numbers;

}
