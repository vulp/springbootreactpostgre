package com.react.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/documentation")
public class DocumentationController {

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveDocumentation(@RequestBody Map<String, String> payload) {
        String content = payload.get("content");

        // TODO save to db
        return new ResponseEntity<>(Map.of("message", "Documentation saved successfully"), HttpStatus.OK);
    }
}
