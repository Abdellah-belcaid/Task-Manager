package com.taskmanager.service;


import com.taskmanager.dto.AuthenticationRequest;
import com.taskmanager.dto.RegisterRequest;
import com.taskmanager.dto.UserDTO;
import com.taskmanager.entity.User;

public interface UserService {

    User getCurrentUser();

    UserDTO login(AuthenticationRequest request);

    void register(RegisterRequest request);

}