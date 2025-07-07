package com.unir.gateway.filter;

import com.unir.gateway.decorator.RequestDecoratorFactory;
import com.unir.gateway.model.GatewayRequest;
import com.unir.gateway.utils.RequestBodyExtractor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@Slf4j
public class RequestTranslationFilter implements GlobalFilter {

    private final RequestBodyExtractor requestBodyExtractor;
    private final RequestDecoratorFactory requestDecoratorFactory;

    @Override
    public Mono<Void> filter(
            ServerWebExchange exchange,
            GatewayFilterChain chain) {
        exchange.getResponse().setStatusCode(HttpStatus.BAD_REQUEST);
        if (exchange.getRequest().getHeaders().getContentType() == null || !exchange.getRequest().getMethod().equals(HttpMethod.POST)) {
            log.info("Request does not have a content type or is not a POST request");
            return exchange.getResponse().setComplete();
        } else {
            return DataBufferUtils.join(exchange.getRequest().getBody())
                    .flatMap(dataBuffer -> {
                        GatewayRequest request = requestBodyExtractor.getRequest(exchange, dataBuffer);
                        ServerHttpRequest mutatedRequest = requestDecoratorFactory.getDecorator(request);
                        exchange.getAttributes().put(ServerWebExchangeUtils.GATEWAY_REQUEST_URL_ATTR, mutatedRequest.getURI());
                        if(request.getQueryParams() != null) {
                            request.getQueryParams().clear();
                        }
                        log.info("Proxying request: {} {}", mutatedRequest.getMethod(), mutatedRequest.getURI());
                        return chain.filter(exchange.mutate().request(mutatedRequest).build());
                    });
        }
    }
}
