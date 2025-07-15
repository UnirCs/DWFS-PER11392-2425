package com.sergi.forum.subscriber.controller;

import com.sergi.forum.subscriber.model.DirectMessage;
import com.sergi.forum.subscriber.model.ForumMessage;
import com.sergi.forum.subscriber.service.SubscriberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class SubscriberController {

    @Autowired
    private final SubscriberService subscriberService;

    @Value("${forum.userId}")
    private String userId;

    /**
     * Envía un mensaje a un topic. Un topic es un canal de comunicación que puede tener varios suscriptores.
     *
     * @param topic - nombre del topic.
     * @param message - mensaje a enviar.
     * @return - respuesta de la petición.
     */
    @PostMapping(value="/api/topics/{topic}")
    public ResponseEntity<?> broadcastMessage(@PathVariable String topic, @RequestBody ForumMessage message){
        subscriberService.publishToTopic(topic, String.format("%s: %s", userId, message.getMessage()));
        return ResponseEntity.ok().build();
    }
}
