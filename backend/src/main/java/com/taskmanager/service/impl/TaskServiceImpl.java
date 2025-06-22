package com.taskmanager.service.impl;

import com.taskmanager.dto.TaskCriteria;
import com.taskmanager.dto.TaskDTO;
import com.taskmanager.entity.Task;
import com.taskmanager.exception.TaskNotFoundException;
import com.taskmanager.mapper.TaskMapper;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.spec.TaskSpecification;
import com.taskmanager.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public Page<TaskDTO> getAllTasks(TaskCriteria taskCriteria) {
        log.info("Fetching tasks with criteria: {}", taskCriteria);

        Sort.Direction direction = taskCriteria.getSortDirection().equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        PageRequest pageRequest = PageRequest.of(
                taskCriteria.getPage() - 1,
                taskCriteria.getSize(),
                Sort.by(direction, taskCriteria.getSortBy())
        );

        Specification<Task> spec = TaskSpecification.withCriteria(taskCriteria);

        return taskRepository.findAll(spec, pageRequest)
                .map(TaskMapper::toDto);
    }

    @Override
    public TaskDTO getTaskById(UUID id) {
        log.info("Fetching task by ID: {}", id);
        return taskRepository.findById(id)
                .map(TaskMapper::toDto)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with ID: " + id));
    }

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        log.info("Creating a new task with details: {}", taskDTO);

        var taskEntity = TaskMapper.toEntity(taskDTO);
        var savedTask = taskRepository.save(taskEntity);

        return TaskMapper.toDto(savedTask);
    }

    @Override
    public void deleteTask(UUID id) {

        log.info("Deleting task with ID: {}", id);
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException("Task not found with ID: " + id);
        }
        taskRepository.deleteById(id);
        log.info("Task with ID: {} deleted successfully", id);
    }

    @Override
    public TaskDTO updateTask(UUID id, TaskDTO taskDTO) {

        log.info("Updating task with ID: {} with details: {}", id, taskDTO);

        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException("Task not found with ID: " + id);
        }

        var taskEntity = TaskMapper.toEntity(taskDTO);
        taskEntity.setId(id);

        var updatedTask = taskRepository.save(taskEntity);
        return TaskMapper.toDto(updatedTask);
    }

}
