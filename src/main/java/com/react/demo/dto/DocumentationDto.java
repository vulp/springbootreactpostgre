package com.react.demo.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DocumentationDto {

    @Size(max = 1000)
    private String content;
}
