package com.unir.ms_calculadora.service;

import com.unir.ms_calculadora.controller.model.CreateOperationRequest;
import com.unir.ms_calculadora.data.model.Operation;

import java.util.List;

public interface OperationService {

    List<Operation> getOperations();

    Operation getOperation(String operationId);

    Operation createOperation(CreateOperationRequest request);
}
