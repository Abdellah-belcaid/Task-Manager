package com.taskmanager.service.impl;

import com.taskmanager.dto.AuthenticationRequest;
import com.taskmanager.dto.RegisterRequest;
import com.taskmanager.dto.UserDTO;
import com.taskmanager.entity.User;
import com.taskmanager.enumration.Role;
import com.taskmanager.exception.EmailAlreadyExistsException;
import com.taskmanager.exception.UserNotFoundException;
import com.taskmanager.exception.UsernameAlreadyExistsException;
import com.taskmanager.mapper.UserMapper;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.security.JwtService;
import com.taskmanager.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("Username {} not found in SecurityContext", username);
                    return new RuntimeException("User not found: " + username);
                });
    }

    @Override
    public UserDTO login(AuthenticationRequest request) {
        log.info("Authenticating user with username: {}", request.username());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new UserNotFoundException(request.username()));

        String jwtToken = jwtService.generateToken(user);
        user.setToken(jwtToken);

        log.info("Login successful. JWT token generated for user: {}", user.getUsername());
        return UserMapper.toDto(user);
    }

    @Override
    public void register(RegisterRequest request) {
        log.info("Registering new user with email: {}", request.email());

        if (userRepository.existsByEmail(request.email())) {
            log.warn("Email already exists: {}", request.email());
            throw new EmailAlreadyExistsException(request.email());
        }

        if (userRepository.existsByUsername(request.username())) {
            log.warn("Username already exists: {}", request.username());
            throw new UsernameAlreadyExistsException(request.username());
        }

        User user = UserMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setEnabled(true);
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);
        log.info("User registered successfully: {}", savedUser.getUsername());
    }
}
