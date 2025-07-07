package com.unir.ms_calculadora.data;

import com.unir.ms_calculadora.data.model.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface OperationJpaRepository extends JpaRepository<Operation, Long>, JpaSpecificationExecutor<Operation> {

}
