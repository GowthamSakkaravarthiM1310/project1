package com.bloodbank.payload;

import com.bloodbank.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String role;
    private Long id;
    private String name;

    public JwtAuthResponse(String accessToken, Role role, Long id, String name) {
        this.accessToken = accessToken;
        this.role = role.name(); // Convert enum to string for API response
        this.id = id;
        this.name = name;
    }
}
