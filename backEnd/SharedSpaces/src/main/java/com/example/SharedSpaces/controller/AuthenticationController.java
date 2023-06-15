package com.example.SharedSpaces.controller;

import com.example.SharedSpaces.auth.RequestResponse.AuthenticationRequest;
import com.example.SharedSpaces.auth.RequestResponse.AuthenticationResponse;
import com.example.SharedSpaces.auth.AuthenticationService;
import com.example.SharedSpaces.auth.RequestResponse.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService service;

    @Autowired
    public AuthenticationController(AuthenticationService service) {
        this.service = service;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }


     @PostMapping("/refresh-token")
     public AuthenticationResponse refreshToken(
     HttpServletRequest request,
     HttpServletResponse response
     ) throws IOException {
     service.refreshToken(request, response);
     }

}
