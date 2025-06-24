package com.taskmanager.mapper;

import com.taskmanager.dto.RegisterRequest;
import com.taskmanager.dto.UserDTO;
import com.taskmanager.entity.User;
import com.taskmanager.enumration.Role;

public class UserMapper {

    private UserMapper() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    public static UserDTO toDto(User user) {
        if (user == null) return null;

        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getRole())
                .createTime(user.getCreateTime())
                .updatedAt(user.getUpdatedAt())
                .enabled(user.isEnabled())
                .token(user.getToken())
                .build();
    }

    public static User toEntity(UserDTO dto) {
        if (dto == null) return null;

        return User.builder()
                .id(dto.getId())
                .name(dto.getName())
                .email(dto.getEmail())
                .username(dto.getUsername())
                .role(dto.getRole())
                .enabled(dto.isEnabled())
                .build();
    }

    public static User toEntity(RegisterRequest request) {
        if (request == null) return null;

        return User.builder()
                .name(request.name())
                .email(request.email())
                .username(request.username())
                .password(request.password())
                .role(Role.USER)
                .enabled(true)
                .build();
    }
}
