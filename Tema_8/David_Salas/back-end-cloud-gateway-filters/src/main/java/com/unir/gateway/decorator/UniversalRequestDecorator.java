package com.unir.gateway.decorator;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unir.gateway.model.GatewayRequest;
import lombok.NonNull;
import lombok.SneakyThrows;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.server.reactive.ServerHttpRequestDecorator;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Flux;

import java.net.URI;

 /**
 * * Universal decorator for any HTTP method, with or without a body.
 */
public class UniversalRequestDecorator extends ServerHttpRequestDecorator {

    private final GatewayRequest gatewayRequest;
    private final HttpMethod method;
    private final ObjectMapper objectMapper;

    public UniversalRequestDecorator(GatewayRequest gatewayRequest, HttpMethod method, ObjectMapper objectMapper) {
        super(gatewayRequest.getExchange().getRequest());
        this.gatewayRequest = gatewayRequest;
        this.method = method;
        this.objectMapper = objectMapper;
    }

    @Override
    @NonNull
    public HttpMethod getMethod() {
        return method;
    }

    @Override
    @NonNull
    public URI getURI() {
        return UriComponentsBuilder
                .fromUri((URI) gatewayRequest.getExchange().getAttributes().get(ServerWebExchangeUtils.GATEWAY_REQUEST_URL_ATTR))
                .queryParams(gatewayRequest.getQueryParams())
                .build()
                .toUri();
    }

    @Override
    @NonNull
    public HttpHeaders getHeaders() {
        return gatewayRequest.getHeaders();
    }

    @Override
    @NonNull
    @SneakyThrows
    public Flux<DataBuffer> getBody() {
        if (method == HttpMethod.POST || method == HttpMethod.PUT || method == HttpMethod.PATCH) {
            DataBufferFactory bufferFactory = new DefaultDataBufferFactory();
            byte[] bodyData = objectMapper.writeValueAsBytes(gatewayRequest.getBody());
            DataBuffer buffer = bufferFactory.allocateBuffer(bodyData.length);
            buffer.write(bodyData);
            return Flux.just(buffer);
        }
        return Flux.empty();
    }
}

