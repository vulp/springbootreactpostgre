package com.react.demo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class Gemma3Service {
    private static final Logger logger = LoggerFactory.getLogger(Gemma3Service.class);


    @Value("${ollama.api.url:http://localhost:11434/api/generate}")
    private String ollamaApiUrl;

    @Value("${ollama.model.name:gemma3:1b}")
    private String ollamaModelName;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;


    @Autowired
    public Gemma3Service(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public String generateResponse(String prompt) {
        ObjectNode requestBody = objectMapper.createObjectNode();
        requestBody.put("model", ollamaModelName);
        requestBody.put("prompt", prompt);
        requestBody.put("stream", false);

        StringBuilder fullResponse = new StringBuilder();

        try {
            String jsonResponse = restTemplate.postForObject(ollamaApiUrl, requestBody, String.class);
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            if (rootNode.has("response")) {
                fullResponse.append(rootNode.get("response").asText());
            }

        } catch (Exception e) {
            logger.error("Error: Could not get response from Ollama", e);
            return "Error: Could not get response ";
        }

        return fullResponse.toString();
    }
}
