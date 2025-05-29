package com.react.demo.dto;

import jakarta.validation.constraints.Size;

public record DocumentationRecord(@Size(max = 3500) String content, @Size(max = 255) String identifier) {}
