package com.unir.calculadora.service;

import com.unir.calculadora.controller.model.CreateOperationDTO;
import com.unir.calculadora.data.JpaOperationRepository;
import com.unir.calculadora.data.model.OperationEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OperationService implements IOperationService {

    private final JpaOperationRepository repository;

    @Override
    public OperationEntity performOperation(CreateOperationDTO dto) {
        double result = switch (dto.getType().toLowerCase()) {
            case "sum" -> dto.getOperator1() + dto.getOperator2();
            case "sub" -> dto.getOperator1() - dto.getOperator2();
            case "mul" -> dto.getOperator1() * dto.getOperator2();
            case "div" -> dto.getOperator2() != 0 ? dto.getOperator1() / dto.getOperator2() : 0.0;
            default -> throw new IllegalArgumentException("Invalid operation type");
        };

        OperationEntity entity = OperationEntity.builder()
                .type(dto.getType().toLowerCase())
                .operator1(dto.getOperator1())
                .operator2(dto.getOperator2())
                .result(result)
                .build();

        return repository.save(entity);
    }

    @Override
    public List<OperationEntity> getAllOperations() {
        return repository.findAll();
    }
}
