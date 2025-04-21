package com.react.demo.dto;

import java.util.List;
import java.util.Map;

public record ChartDto(Long id, List<Map<String, Object>> jsonData) {
}
