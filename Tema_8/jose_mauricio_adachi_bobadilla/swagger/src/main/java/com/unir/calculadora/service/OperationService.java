package com.unir.calculadora.service;

import com.unir.calculadora.controller.model.CreateOperationDTO;
import com.unir.calculadora.data.JpaOperationRepository;
import com.unir.calculadora.data.model.OperationEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OperationService implements IOperationService {

    private final JpaOperationRepository repository;

    @Override
    public OperationEntity performOperation(CreateOperationDTO dto) {
        double result;

        switch (dto.getType().toLowerCase()) {
            case "sum":
                result = dto.getOperator1() + dto.getOperator2();
                break;
            case "sub":
                result = dto.getOperator1() - dto.getOperator2();
                break;
            case "mul":
                result = dto.getOperator1() * dto.getOperator2();
                break;
            case "div":
                if (dto.getOperator2() == 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "División por cero");
                }
                result = dto.getOperator1() / dto.getOperator2();
                break;
            case "rai":
                if (dto.getOperator2() == 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede calcular raíz con exponente cero");
                }
                if (dto.getOperator1() < 0 && dto.getOperator2() % 2 == 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede calcular raíz par de un número negativo");
                }
                result = Math.pow(dto.getOperator1(), 1.0 / dto.getOperator2());
                break;
            case "pot":
                result = Math.pow(dto.getOperator1(), dto.getOperator2());
                break;
            default:
                throw new IllegalArgumentException("Tipo de operación no válido");
        }

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

    @Override
    public OperationEntity getOperationById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Operación no encontrada"));
    }
}
