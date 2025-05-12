package com.react.demo.dto;

import jakarta.validation.constraints.Size;

public record UserRecord(@Size(max = 50) String givenName, @Size(max = 50) String familyName) {
}
