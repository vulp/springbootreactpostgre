package com.react.demo.controller;

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


    @Autowired
    public ChartController(ChartRepository chartRepository) {
        this.chartRepository = chartRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chart> getChart(@PathVariable Long id) {
        Optional<Chart> chart = chartRepository.findById(id);
        return chart.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/")
    public ResponseEntity<List<Chart>> getAllCharts() {
        List<Chart> charts = chartRepository.findAll();
        return new ResponseEntity<>(charts, HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Chart> createChart(@RequestBody ChartDto chartDto) {
        Chart chart = new Chart();
        chart.setJsonData(chartDto.jsonData());
        chartRepository.save(chart);
        return new ResponseEntity<>(chart, HttpStatus.CREATED);
    }

}
