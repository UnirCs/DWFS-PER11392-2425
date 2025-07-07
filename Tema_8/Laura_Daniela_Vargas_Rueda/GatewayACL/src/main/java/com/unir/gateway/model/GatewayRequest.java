package com.unir.gateway.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.server.ServerWebExchange;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GatewayRequest {

    private HttpMethod targetMethod;

    private LinkedMultiValueMap<String, String> queryParams;

    private Object body;

    @JsonIgnore
    private ServerWebExchange exchange;

    @JsonIgnore
    private HttpHeaders headers;
}