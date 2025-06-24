package com.taskmanager.service;


import com.taskmanager.dto.AuthenticationRequest;
import com.taskmanager.dto.RegisterRequest;
import com.taskmanager.dto.UserDTO;

public interface UserService {

    UserDTO login(AuthenticationRequest request);

    void register(RegisterRequest request);

}