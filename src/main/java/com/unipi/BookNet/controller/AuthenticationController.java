package com.unipi.BookNet.controller;

import com.unipi.BookNet.config.JwtService;
import com.unipi.BookNet.controller.secondaryClasses.AuthenticationRequest;
import com.unipi.BookNet.controller.secondaryClasses.AuthenticationResponse;
import com.unipi.BookNet.controller.secondaryClasses.RegisterRequest;
import com.unipi.BookNet.model.Book;
import com.unipi.BookNet.service.AuthenticationService;
import com.unipi.BookNet.service.UsersService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UsersService userService;
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;


    @PostMapping("/register")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }
    @Recover
    public ResponseEntity<Book> Recover(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/refresh-token")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authenticationService.refreshToken(request, response);
    }

    @PostMapping("/authenticate")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }



}