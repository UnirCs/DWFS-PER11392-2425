package com.sergi.calculator.Data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.sergi.calculator.Data.model.CalculatorOperation;

public interface OperationJpaRepository extends JpaRepository<CalculatorOperation, Long>, JpaSpecificationExecutor<CalculatorOperation>{
	
	//Extendemos la interfaz JpaRepository, esto nos va a dar pie a poder interfacear con bases de datos a traves de Spring Data
	// - El tipo de la clase es la representacion del elemento que representa la base de datos (CalculatorOperation)
	// - El ID de la tabla de la base de datos es de tipo Long
	
	List<CalculatorOperation> findByOperation(String operation);
	//Spring traduce a una query de base de datos a traves de Hibernate, con una translación de metodo a objeto de base de datos
	//Para usar una consulta nativa user @Query --> definir la query de SQL

}
