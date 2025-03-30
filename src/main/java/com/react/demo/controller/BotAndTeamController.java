package com.react.demo.controller;

import com.react.demo.model.Documentation;
import com.react.demo.repository.DocumentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class BotAndTeamController {

    private final DocumentationRepository documentationRepository;

    @Autowired
    public BotAndTeamController(DocumentationRepository documentationRepository) {
        this.documentationRepository = documentationRepository;
    }

    @PostMapping("/api/bot/receive-message")
    public ResponseEntity<String> receiveMessageFromBot(@RequestBody Map<String, String> payload) {
        String message = payload.get("text");
        String userId = payload.get("userId"); // You might want to send user info as well

        //TODO example create documentation sent by the bot, could be used something like send Teams meeting summary to documentation
        if (message != null) {
            System.out.println("Received message from bot (User: " + userId + "): " + message);
            // Here you can process the message, save it to the database, etc.
            return new ResponseEntity<>("Message received successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid payload", HttpStatus.BAD_REQUEST);
        }
    }
}
