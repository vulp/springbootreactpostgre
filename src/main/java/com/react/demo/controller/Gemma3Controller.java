package com.react.demo.controller;

import com.react.demo.service.Gemma3Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/ai")
public class Gemma3Controller {
    private static final Logger logger = LoggerFactory.getLogger(Gemma3Controller.class);

    private final Gemma3Service gemma3Service;

    @Autowired
    public Gemma3Controller(Gemma3Service gemma3Service) {
        this.gemma3Service = gemma3Service;
    }

    @PostMapping("/ask")
    public ResponseEntity<String> askAi(@RequestBody String question) {
        logger.info("Users ai question {}", question);
        if (!question.isEmpty() && question.trim().length() < 255) {
            String response = gemma3Service.generateResponse(question);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
