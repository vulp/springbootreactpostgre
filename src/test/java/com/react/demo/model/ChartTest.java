package com.react.demo.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class ChartTest {

    @Test
    public void createChart() {
        Chart chart = new Chart();
        assertNotNull(chart);
    }

    @Test
    public void givenNoId_whenSetId_thenSetIdToChart() {
        Chart chart = new Chart();
        chart.setId(1l);
        assertEquals(1l, chart.getId());
    }

    @Test
    public void givenNoData_whenSetData_thenSetDataToChart() {
        Chart chart = new Chart();
        String data = "test";
        chart.setJsonData(data);
        assertEquals(data, chart.getJsonData());

        data = "[\n" +
                "        { \"date\": \"2025-03-20\", \"saves\": 15 },\n" +
                "        { \"date\": \"2025-03-21\", \"saves\": 22 },\n" +
                "        { \"date\": \"2025-03-22\", \"saves\": 18 },\n" +
                "        { \"date\": \"2025-03-23\", \"saves\": 25 },\n" +
                "        { \"date\": \"2025-03-24\", \"saves\": 30 }\n" +
                "    ]";
        chart.setJsonData(data);
        assertEquals(data, chart.getJsonData());
    }
}
