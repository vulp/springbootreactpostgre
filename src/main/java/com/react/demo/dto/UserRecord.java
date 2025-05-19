package com.react.demo.dto;

import jakarta.validation.constraints.Size;

public record UserRecord(
        @Size(max = 50) String givenName,
        @Size(max = 50) String familyName,
        @Size(max = 50) String phone,
        @Size(max = 50) String hsl,
        @Size(max = 50) String colorMode
) {
}
