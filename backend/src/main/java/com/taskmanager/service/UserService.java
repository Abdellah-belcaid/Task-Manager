package com.taskmanager.service;


import com.taskmanager.dto.AuthenticationRequest;
import com.taskmanager.dto.RegisterRequest;
import com.taskmanager.dto.UserDTO;
import com.taskmanager.entity.User;

public interface UserService {

    UserDTO login(AuthenticationRequest request);

    UserDTO register(RegisterRequest request);

}