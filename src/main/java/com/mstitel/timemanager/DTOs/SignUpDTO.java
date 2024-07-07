package com.mstitel.timemanager.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignUpDTO {


    @Size(min = 3, max = 20 )
    @NotBlank
    private String username;

    @Size(min= 8, max = 50 )
    @NotBlank
    private String email;

    @Size(min = 6, max = 30 )
    @NotBlank
    private String password;

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
