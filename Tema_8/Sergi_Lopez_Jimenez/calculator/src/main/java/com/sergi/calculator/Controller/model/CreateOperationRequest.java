package com.sergi.calculator.Controller.model;

import java.util.List;
import com.sergi.calculator.Controller.Utils.OperationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

public class CreateOperationRequest {
	
	private String operation;
	private List<Double> numbers;

}
