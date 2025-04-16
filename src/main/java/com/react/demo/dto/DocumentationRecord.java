package com.react.demo.dto;

import jakarta.validation.constraints.Size;

public record DocumentationRecord(@Size(max = 1000) String content, @Size(max = 255) String identifier) {}
