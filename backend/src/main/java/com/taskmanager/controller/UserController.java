package com.taskmanager.controller;

import com.taskmanager.dto.AuthenticationRequest;
import com.taskmanager.dto.RegisterRequest;
import com.taskmanager.dto.UserDTO;
import com.taskmanager.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@Slf4j
@Validated
public class UserController {
    private final UserService userService;

    @PostMapping("/sign-in")
    public ResponseEntity<UserDTO> login(@RequestBody @Valid AuthenticationRequest request) {
        log.info("Attempting to log in user: {}", request.username());
        UserDTO user = userService.login(request);
        log.info("User {} logged in successfully", request.username());
        return ResponseEntity.ok(user);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<UserDTO> register(@RequestBody @Valid RegisterRequest request) {
        log.info("Registering new user with username: {}", request.username());
        UserDTO createdUser = userService.register(request);
        log.info("User {} registered successfully", request.username());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}
