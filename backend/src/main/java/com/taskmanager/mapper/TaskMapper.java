package com.taskmanager.mapper;

import com.taskmanager.dto.TaskDTO;
import com.taskmanager.entity.Task;

public class TaskMapper {

    private TaskMapper() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    public static TaskDTO toDto(Task task) {
        if (task == null) return null;

        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .completed(task.isCompleted())
                .createdAt(task.getCreatedAt())
                .build();
    }

    public static Task toEntity(TaskDTO dto) {
        if (dto == null) return null;

        return Task.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .status(dto.getStatus())
                .priority(dto.getPriority())
                .dueDate(dto.getDueDate())
                .completed(dto.isCompleted())
                .build();
    }
}
