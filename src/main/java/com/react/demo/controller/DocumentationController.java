package com.react.demo.controller;

import com.react.demo.dto.DocumentationRecord;
import com.react.demo.model.Documentation;
import com.react.demo.repository.DocumentationRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/documentation")
public class DocumentationController {

    private final DocumentationRepository documentationRepository;

    @Autowired
    public DocumentationController(DocumentationRepository documentationRepository) {
        this.documentationRepository = documentationRepository;
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveDocumentation(@RequestBody @Valid DocumentationRecord documentationRecord) {
        Documentation documentation = new Documentation();
        documentation.setContent(documentationRecord.content());
        documentationRepository.save(documentation);
        return new ResponseEntity<>(Map.of("message", "Documentation saved successfully"), HttpStatus.OK);
    }
}
