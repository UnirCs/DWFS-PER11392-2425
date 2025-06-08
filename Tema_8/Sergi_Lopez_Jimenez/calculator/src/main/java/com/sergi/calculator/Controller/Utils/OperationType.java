package com.sergi.calculator.Controller.Utils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum OperationType {
	
    SUMA("suma"),
    RESTA("resta"),
    MULTIPLICACION("multiplicacion"),
    DIVISION("division"),
    RAIZ("raiz"),
    POTENCIA("potencia");
	
	private final String value;
	
	private OperationType(String value) {
		this.value = value;
	}
	
	@JsonValue
	public String getValue() {
		return this.value;
	}
	
    @JsonCreator
    public static OperationType fromValue(String value) {
        for (OperationType op : OperationType.values()) {
            if (op.value.equalsIgnoreCase(value)) {
                return op;
            }
        }
        throw new IllegalArgumentException("Invalid operation: " + value);
    }

}
