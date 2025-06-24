package com.taskmanager.service.impl;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.taskmanager.dto.TaskCriteria;
import com.taskmanager.dto.TaskDTO;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;
import com.taskmanager.exception.TaskNotFoundException;
import com.taskmanager.mapper.TaskMapper;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.spec.TaskSpecification;
import com.taskmanager.service.TaskService;
import com.taskmanager.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserService userService;

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

        Specification<Task> spec = TaskSpecification.withCriteria(taskCriteria)
                .and((root, query, cb)
                        -> cb.equal(root.get("user"), userService.getCurrentUser()));

        return taskRepository.findAll(spec, pageRequest)
                .map(TaskMapper::toDto);
    }

    @Override
    public TaskDTO getTaskById(UUID id) {
        log.info("Fetching task by ID: {}", id);
        User currentUser = userService.getCurrentUser();

        Task task = taskRepository.findById(id)
                .filter(t -> t.getUser().getId().equals(currentUser.getId()))
                .orElseThrow(() -> new TaskNotFoundException("Task not found with ID: " + id));

        return TaskMapper.toDto(task);
    }

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        log.info("Creating a new task with details: {}", taskDTO);

        var taskEntity = TaskMapper.toEntity(taskDTO);
        taskEntity.setUser(userService.getCurrentUser());
        var savedTask = taskRepository.save(taskEntity);

        return TaskMapper.toDto(savedTask);
    }

    @Override
    public void deleteTask(UUID id) {

        log.info("Deleting task with ID: {}", id);

        User currentUser = userService.getCurrentUser();

        boolean exists = taskRepository.existsByTaskIdAndUserId(id, currentUser.getId());

        if (!exists) {
            log.warn("Attempted to delete a task that does not exist or does not belong to the current user: {}", id);
            throw new TaskNotFoundException("Task not found with ID: " + id);
        }
        taskRepository.deleteById(id);
        log.info("Task with ID: {} deleted successfully", id);
    }

    @Override
    public TaskDTO updateTask(UUID id, TaskDTO taskDTO) {

        log.info("Updating task with ID: {} with details: {}", id, taskDTO);

        User currentUser = userService.getCurrentUser();

        boolean exists = taskRepository.existsByTaskIdAndUserId(id, currentUser.getId());
        if (!exists) {
            log.warn("Attempted to update a task that does not exist or does not belong to the current user: {}", id);
            throw new TaskNotFoundException("Task not found with ID: " + id);
        }

        var taskEntity = TaskMapper.toEntity(taskDTO);
        taskEntity.setId(id);
        taskEntity.setUser(currentUser);

        var updatedTask = taskRepository.save(taskEntity);
        return TaskMapper.toDto(updatedTask);
    }

}
