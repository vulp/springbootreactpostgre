package com.react.demo.controller;

import com.react.demo.dto.DocumentationRecord;
import com.react.demo.model.Documentation;
import com.react.demo.repository.DocumentationRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documentation")
public class DocumentationController {

    private final DocumentationRepository documentationRepository;

    @Autowired
    public DocumentationController(DocumentationRepository documentationRepository) {
        this.documentationRepository = documentationRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Documentation> getDocumentation(@PathVariable Long id) {
        Documentation documentation = documentationRepository.findById(id).orElse(null);
        return new ResponseEntity<>(documentation, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Documentation>> getDocumentationList() {
        List<Documentation> documentationList = documentationRepository.findAll();
        return new ResponseEntity<>(documentationList, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveDocumentation(@RequestBody @Valid DocumentationRecord documentationRecord) {
        Documentation documentation = new Documentation();
        documentation.setContent(documentationRecord.content());
        documentation.setIdentifier(documentationRecord.identifier());
        documentationRepository.save(documentation);
        return new ResponseEntity<>(Map.of("message", "Documentation saved successfully"), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteDocumentation(@PathVariable Long id) {
        documentationRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
