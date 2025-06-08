package com.sergi.calculator.Service;

import com.sergi.calculator.Data.model.*;

import java.util.List;

import com.sergi.calculator.Controller.model.*;

public interface CalculatorService {
	
	CalculatorOperation createOperation(CreateOperationRequest request);
	
	List<CalculatorOperation> getOperations(String operationType);
	
	CalculatorOperation getOperation(String operationId);

}
