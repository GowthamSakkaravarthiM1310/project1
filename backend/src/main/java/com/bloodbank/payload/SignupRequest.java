package com.bloodbank.payload;

import com.bloodbank.entity.Role;
import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
    private String bloodGroup;
    private String contactNumber;
    private String address;
    private String city;
}
