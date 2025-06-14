package com.unir.calculadora.service;

import com.unir.calculadora.controller.model.CreateOperationDTO;
import com.unir.calculadora.data.model.OperationEntity;

import java.util.List;

public interface IOperationService {

    OperationEntity performOperation(CreateOperationDTO dto);

    List<OperationEntity> getAllOperations();

    OperationEntity getOperationById(Long id);
}
