package com.taskmanager.dto;

import com.taskmanager.enumration.Priority;
import com.taskmanager.enumration.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@ToString
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {

    private UUID id;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Status is required")
    private Status status;

    @NotNull(message = "Priority is required")
    private Priority priority;

    private LocalDate dueDate;

    private boolean completed;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UserDTO user;
}
