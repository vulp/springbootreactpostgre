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
import java.util.List;

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
        //.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1l))
        // .andExpect(MockMvcResultMatchers.jsonPath("$.jsonData").value(""));
    }

    @Test
    @WithMockUser(username = "hyperadmin")
    public void givenNewChart_whencreateChart_thenReturnCreated() throws Exception {

        ChartDto chartDto = new ChartDto("[\n" +
                "        { \"date\": \"2025-03-20\", \"saves\": 15 },\n" +
                "        { \"date\": \"2025-03-21\", \"saves\": 22 },\n" +
                "        { \"date\": \"2025-03-22\", \"saves\": 18 },\n" +
                "        { \"date\": \"2025-03-23\", \"saves\": 25 },\n" +
                "        { \"date\": \"2025-03-24\", \"saves\": 30 }\n" +
                "    ]");

        ObjectMapper objectMapper = new ObjectMapper();
        String chartDtoJson = objectMapper.writeValueAsString(chartDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/charts/new").contentType(MediaType.APPLICATION_JSON)
                        .content(chartDtoJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1l))
                .andExpect(MockMvcResultMatchers.jsonPath("$.jsonData").value(chartDto.jsonData()))
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

        mockMvc.perform(MockMvcRequestBuilders.get("/api/charts/"))
                .andExpect(MockMvcResultMatchers.status().isOk()).andDo(print());
              //  .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1l));
        //.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1l))
        // .andExpect(MockMvcResultMatchers.jsonPath("$.jsonData").value(""));
    }
}
