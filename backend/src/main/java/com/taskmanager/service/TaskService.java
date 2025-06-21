package com.taskmanager.service;

import com.taskmanager.dto.TaskCriteria;
import com.taskmanager.dto.TaskDTO;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface TaskService {
    Page<TaskDTO> getAllTasks(TaskCriteria taskCriteria);

    TaskDTO getTaskById(@NotNull UUID id);

    TaskDTO createTask(TaskDTO taskDTO);

    void deleteTask(@NotNull UUID id);

    TaskDTO updateTask(@NotNull UUID id, TaskDTO taskDTO);
}
