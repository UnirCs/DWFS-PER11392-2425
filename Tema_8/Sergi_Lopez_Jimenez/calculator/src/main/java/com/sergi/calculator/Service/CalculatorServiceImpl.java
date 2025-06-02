package com.sergi.calculator.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sergi.calculator.Controller.model.CreateOperationRequest;
import com.sergi.calculator.Data.OperationsRepository;
import com.sergi.calculator.Data.model.CalculatorOperation;
import org.springframework.util.StringUtils;

import lombok.extern.slf4j.Slf4j;

import com.sergi.calculator.config.*;
import org.springframework.util.*;

import com.sergi.calculator.Controller.Utils.Consts;
import java.lang.Math;


@Service
@Slf4j
public class CalculatorServiceImpl implements CalculatorService {
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private OperationsRepository repository;
	

	@Override
	public CalculatorOperation createOperation(CreateOperationRequest request) {
		//Check if the request is inside 
		if ( request != null && StringUtils.hasLength(request.getOperation().trim()) && Consts.OPERACIONES.contains(request.getOperation().trim()) && request.getNumbers().size() >= 2) {
			Double result = null;
			
			switch(request.getOperation().trim()) {
			
			case Consts.SUMA: 
				result = request.getNumbers().stream().reduce(0.0,(a,b) -> a+b);
				break;
			case Consts.RESTA: 
				result = request.getNumbers().stream().reduce(0.0,(a,b) -> a-b);
				break;
			case Consts.MULTIPLICACION:
				result = (request.getNumbers().size() == 2)? request.getNumbers().getFirst()*request.getNumbers().getLast() : null;
				break;
			case Consts.DIVISION: 
				result = (request.getNumbers().size() == 2)? request.getNumbers().getFirst()/request.getNumbers().getLast(): null;
				break;
			case Consts.RAIZ: 
				result = (request.getNumbers().size() == 2)?  Math.pow(request.getNumbers().getFirst(), 1.0/request.getNumbers().getLast()) : null;
				break;
			case Consts.POTENCIA: 
				result = (request.getNumbers().size() == 2)? Math.pow(request.getNumbers().getFirst(), request.getNumbers().getLast()) : null;
				break;
			default:
				break;
			}
			
			if(result != null) {			
				CalculatorOperation operation = CalculatorOperation.builder().operation(request.getOperation()).numbers(request.getNumbers().toString()).result(result).build();
				return repository.save(operation);
			}
			
		}
		return null;

		
	}

	@Override
	public CalculatorOperation getOperation(String operationId) {
		return repository.getById(Long.valueOf(operationId));
	}

	@Override
	public List<CalculatorOperation> getOperations(String operationType) {
		
		if(StringUtils.hasLength(operationType)) {
			return repository.search(operationType);
		}
		
		List<CalculatorOperation> operations = repository.getOperations();
		return operations.isEmpty()? null : operations;
	}

}
