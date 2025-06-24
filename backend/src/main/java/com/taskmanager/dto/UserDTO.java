package com.taskmanager.dto;

import com.taskmanager.enumration.Role;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private UUID id;
    private String name;
    private String email;
    private String username;
    private Role role;
    private boolean enabled;
    private String token;
    private LocalDateTime createTime;
    private LocalDateTime updatedAt;
}
