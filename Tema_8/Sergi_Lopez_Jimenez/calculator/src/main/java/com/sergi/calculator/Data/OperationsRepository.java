package com.sergi.calculator.Data;

import java.util.LinkedList;
import java.util.List;


import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sergi.calculator.Data.model.CalculatorOperation;
import com.sergi.calculator.Data.utils.SearchCriteria;
import com.sergi.calculator.Data.utils.SearchStatement;
import com.sergi.calculator.Data.utils.SearchOperation;

import com.sergi.calculator.Data.utils.Consts;


@Repository
public class OperationsRepository {
	
	private OperationJpaRepository repository;
	
	@Autowired
	public OperationsRepository ( OperationJpaRepository repository) {
		
		this.repository = repository;
		
	}
	
	public List<CalculatorOperation> getOperations(){
		return repository.findAll();
		}
	
	public CalculatorOperation getById(Long id) {
		return repository.findById(id).orElse(null);
	}
	
	public CalculatorOperation save (CalculatorOperation operation) {
		return repository.save(operation);
	}
	
	public List<CalculatorOperation> search(String operation){
		SearchCriteria<CalculatorOperation> spec = new SearchCriteria<>();
		
		//This can be added dynamically depending on the requests that I need to serve
        if (StringUtils.isNotBlank(operation)) {
            spec.add(new SearchStatement(Consts.OPERATION, operation, SearchOperation.MATCH));
        }

        return repository.findAll(spec);
		}

}
