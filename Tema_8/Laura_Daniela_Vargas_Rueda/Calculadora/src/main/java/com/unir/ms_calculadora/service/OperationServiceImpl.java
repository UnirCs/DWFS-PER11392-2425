package com.unir.ms_calculadora.service;

import com.unir.ms_calculadora.controller.model.CreateOperationRequest;
import com.unir.ms_calculadora.data.OperationRepository;
import com.unir.ms_calculadora.data.model.Operation;
import com.unir.ms_calculadora.data.utils.Const;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@Slf4j
public class OperationServiceImpl implements OperationService {

    @Autowired
    private OperationRepository repository;

    @Override
    public List<Operation> getOperations() {
        List<Operation> operations = repository.getOperations();
        return operations.isEmpty() ? null: operations;
    }

    @Override
    public Operation getOperation(String operationId) {
        return repository.getById(Long.valueOf(operationId));
    }

    @Override
    public Operation createOperation(CreateOperationRequest request) {
        if (request == null || !StringUtils.hasLength(request.getOperationName().trim())
                || request.getNumbers().isEmpty()) {
            throw new IllegalArgumentException("Debe enviar todos los datos requeridos");
        } else {
            Double result = getResult(request.getOperationName().trim(), request.getNumbers());
            Operation operation = Operation.builder().operationName(request.getOperationName())
                    .numbers(request.getNumbers()).result(result).build();
            return repository.save(operation);
        }
    }

    public Double getResult(String operationName, List<Double> numbers) {
        if (numbers.size() > 2 && !operationName.equals(Const.SUM)
                && !operationName.equals(Const.SUBSTRACT)) {
            throw new IllegalArgumentException("Solo se aceptan dos numeros");
        } else if(operationName.equals(Const.SUM) || operationName.equals(Const.SUBSTRACT)) {
            return operationName.equals(Const.SUM) ? numbers.stream().reduce(0.0, Double::sum)
                    : numbers.stream().reduce(0.0, (a, b) -> a - b);
        } else if (numbers.size() > 1 && operationName.equals(Const.SQRT)) {
            throw new IllegalArgumentException("Solo se acepta un numero");
        }
        return switch (operationName) {
            case Const.MULTIPLY -> numbers.get(0) * numbers.get(1);
            case Const.DIVIDE -> numbers.get(0) / numbers.get(1);
            case Const.SQRT -> Math.sqrt (numbers.getFirst());
            case Const.POW -> Math.pow(numbers.get(0), numbers.get(1));
            default -> throw new IllegalArgumentException("La operacion ingresada no es valida");
        };
    }
}
