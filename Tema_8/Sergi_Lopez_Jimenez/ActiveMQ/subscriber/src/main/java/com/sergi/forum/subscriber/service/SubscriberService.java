package com.sergi.forum.subscriber.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubscriberService {

    private final JmsTemplate queuJmsTemplate;
    private final JmsTemplate topicJmsTemplate;


    /**
     * Escucha los mensajes que llegan a un queue.
     * @param message - mensaje recibido.
     */
    @JmsListener( destination = "tema1", containerFactory = "jmsFactoryTopic")
    public void listenTema1(String message){
        log.info("Se ha recibido un mensaje al tema1: " + message);
    }
    /**
     * Escucha los mensajes que llegan a un queue.
     * @param message - mensaje recibido.
     */
    @JmsListener( destination = "tema2", containerFactory = "jmsFactoryTopic") 
    public void listenTema2(String message){
        log.info("Se ha recibido un mensaje al tema2: " + message);
    }
        /**
     * Escucha los mensajes que llegan a un queue.
     * @param message - mensaje recibido.
     */
    @JmsListener( destination = "tema3", containerFactory = "jmsFactoryTopic")
    public void listenTema3(String message){
        log.info("Se ha recibido un mensaje al tema3: " + message);
    }
            /**
     * Escucha los mensajes que llegan a un queue.
     * @param message - mensaje recibido.
     */
    @JmsListener( destination = "tema4", containerFactory = "jmsFactoryTopic")
    public void listenTema4(String message){
        log.info("Se ha recibido un mensaje al tema4: " + message);
    }

    /**
     * Escucha los mensajes que llegan a un queue.
     * @param message - mensaje recibido.
     */
    @JmsListener( destination = "${forum.userId}", containerFactory = "jmsFactoryQueue")
    public void listenDirectMessage(String message) {
        log.info("Se ha recibido un mensaje privado: " + message);
    }

    /**
     * Publica un mensaje en un topic.
     * @param topic - nombre del topic.
     * @param message - mensaje a enviar.
     */
    public void publishToTopic(String topic, String message){
        topicJmsTemplate.convertAndSend(topic, message);
    }



}
