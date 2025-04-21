package com.react.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.react.demo.dto.ChartDto;
import com.react.demo.model.Chart;
import com.react.demo.service.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
public class ChartControllerTest {

    @Autowired
    MockMvc mockMvc;
    @MockitoBean
    private JwtService jwtService;

    @Test
    @WithMockUser(username = "hyperadmin")
    public void givenNoData_whenGetChart_thenReturnOk() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/charts/{id}", 1l))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @WithMockUser(username = "hyperadmin")
    public void givenNewChart_whencreateChart_thenReturnCreated() throws Exception {

        List<Map<String, Object>> jsonDataList = new ArrayList<>();
        Map<String, Object> dataPoint1 = new HashMap<>();
        dataPoint1.put("date", "2025-03-20");
        dataPoint1.put("saves", 15);
        jsonDataList.add(dataPoint1);

        Map<String, Object> dataPoint2 = new HashMap<>();
        dataPoint2.put("date", "2025-03-21");
        dataPoint2.put("saves", 22);
        jsonDataList.add(dataPoint2);

        Map<String, Object> dataPoint3 = new HashMap<>();
        dataPoint3.put("date", "2025-03-22");
        dataPoint3.put("saves", 18);
        jsonDataList.add(dataPoint3);

        Map<String, Object> dataPoint4 = new HashMap<>();
        dataPoint4.put("date", "2025-03-23");
        dataPoint4.put("saves", 25);
        jsonDataList.add(dataPoint4);

        Map<String, Object> dataPoint5 = new HashMap<>();
        dataPoint5.put("date", "2025-03-24");
        dataPoint5.put("saves", 30);
        jsonDataList.add(dataPoint5);

        ChartDto chartDto = new ChartDto(1l,jsonDataList);

        ObjectMapper objectMapper = new ObjectMapper();
        String chartDtoJson = objectMapper.writeValueAsString(chartDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/charts/new").contentType(MediaType.APPLICATION_JSON)
                        .content(chartDtoJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1l))
                .andExpect(MockMvcResultMatchers.jsonPath("$.jsonData").isString())
                .andDo(print());
    }

    @Test
    @WithMockUser(username = "hyperadmin")
    public void givenData_whenGetCharts_thenReturnListOfCharts() throws Exception {
        List<Chart> charts = new ArrayList<>();
        Chart chart = new Chart();
        chart.setId(1l);
        chart.setJsonData("[\n" +
                "        { \"date\": \"2025-03-20\", \"saves\": 15 },\n" +
                "        { \"date\": \"2025-03-21\", \"saves\": 22 },\n" +
                "        { \"date\": \"2025-03-22\", \"saves\": 18 },\n" +
                "        { \"date\": \"2025-03-23\", \"saves\": 25 },\n" +
                "        { \"date\": \"2025-03-24\", \"saves\": 30 }\n" +
                "    ]");
        charts.add(chart);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/charts/list"))
                .andExpect(MockMvcResultMatchers.status().isOk()).andDo(print());
    }

    @Test
    @WithMockUser(username = "hyperadmin")
    public void givenChart_whenUpdateChart_thenReturnUpdatedChart() throws Exception {

        List<Map<String, Object>> jsonDataList = new ArrayList<>();
        Map<String, Object> dataPoint1 = new HashMap<>();
        dataPoint1.put("date", "2025-03-20");
        dataPoint1.put("saves", 15);
        jsonDataList.add(dataPoint1);

        Map<String, Object> dataPoint2 = new HashMap<>();
        dataPoint2.put("date", "2025-03-21");
        dataPoint2.put("saves", 22);
        jsonDataList.add(dataPoint2);

        ChartDto chartDto = new ChartDto(1l, jsonDataList);
        ObjectMapper objectMapper = new ObjectMapper();
        String chartDtoJson = objectMapper.writeValueAsString(chartDto);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/charts/update").contentType(MediaType.APPLICATION_JSON)
                        .content(chartDtoJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1l));

    }

}
