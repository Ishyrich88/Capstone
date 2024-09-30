package com.wealthsync.backend.security;

public class JwtResponse {
    private final String jwtToken;

    // Constructor
    public JwtResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    // Getter for the JWT token
    public String getJwtToken() {
        return jwtToken;
    }

    @Override
    public String toString() {
        return "JwtResponse{" +
                "jwtToken='" + jwtToken + '\'' +
                '}';
    }
}

