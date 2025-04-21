package com.react.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.react.demo.dto.ChartDto;
import com.react.demo.model.Chart;
import com.react.demo.repository.ChartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/charts")
public class ChartController {

    private final ChartRepository chartRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public ChartController(ChartRepository chartRepository, ObjectMapper objectMapper) {
        this.chartRepository = chartRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chart> getChart(@PathVariable Long id) {
        Optional<Chart> chart = chartRepository.findById(id);
        return chart.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/list")
    public ResponseEntity<List<Chart>> getAllCharts() {
        List<Chart> charts = chartRepository.findAll();
        return new ResponseEntity<>(charts, HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Chart> createChart(@RequestBody ChartDto chartDto) throws JsonProcessingException {
        Chart chart = new Chart();
        String jsonData = objectMapper.writeValueAsString(chartDto.jsonData());
        chart.setJsonData(jsonData);
        chart = chartRepository.save(chart);
        return new ResponseEntity<>(chart, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Chart> updateChart(@RequestBody ChartDto chartDto) throws JsonProcessingException {
        String jsonDataString = objectMapper.writeValueAsString(chartDto.jsonData());

        Optional<Chart> updatedChart = chartRepository.findById(chartDto.id());
        if (updatedChart.isPresent()) {
            updatedChart.get().setJsonData(jsonDataString);
            chartRepository.save(updatedChart.get());
            return new ResponseEntity<>(updatedChart.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

}
