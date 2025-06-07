package com.unir.calculadora.data;

import com.unir.calculadora.data.model.OperationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaOperationRepository extends JpaRepository<OperationEntity, Long> {
    // Si quisieramos agregar operaciones personalizadas. Aquí implementaríamos los métodos.
}
