package com.taskmanager.service;

import com.taskmanager.dto.TaskCriteria;
import com.taskmanager.dto.TaskDTO;
import org.springframework.data.domain.Page;

public interface TaskService {
    Page<TaskDTO> getAllTasks(TaskCriteria taskCriteria);
}
