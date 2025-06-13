package com.unir.gateway.decorator;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unir.gateway.model.GatewayRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.reactive.ServerHttpRequestDecorator;
import org.springframework.stereotype.Component;

/**
 * This class is responsible for creating decorators for the GatewayRequest object.
 * It uses the ObjectMapper to convert the raw request body into a GatewayRequest object.
 * Depending on the HTTP method of the request, it creates a different decorator.
 */
@Component
@RequiredArgsConstructor
public class RequestDecoratorFactory {

    private final ObjectMapper objectMapper;


    /**
     * Creates a universal decorator for the GatewayRequest, compatible with any HTTP method.
     * If the method is not valid, IllegalArgumentException will be thrown by valueOf.
     *
     * @param request the GatewayRequest object to decorate
     * @return a universal ServerHttpRequestDecorator
     */
    public ServerHttpRequestDecorator getDecorator(GatewayRequest request) {
        return new UniversalRequestDecorator(
            request,
            org.springframework.http.HttpMethod.valueOf(request.getTargetMethod().name().toUpperCase()),
            objectMapper
        );
    }
}
