package com.taskmanager.controller;

import com.taskmanager.dto.TaskCriteria;
import com.taskmanager.dto.TaskDTO;
import com.taskmanager.enumration.Priority;
import com.taskmanager.enumration.Status;
import com.taskmanager.service.TaskService;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@Slf4j
@Validated
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<Page<TaskDTO>> getAllTasks(
            @RequestParam(defaultValue = "1") @Min(1) Integer page,
            @RequestParam(defaultValue = "10") @Min(1) Integer size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Priority priority
    ) {
        log.info("Get all tasks - Page: {}, Size: {}, Sort By: {}, Sort Direction: {}, Keyword: {}, Status: {}, Priority: {}",
                page, size, sortBy, sortDirection, keyword, status, priority);

        TaskCriteria taskCriteria = TaskCriteria.builder()
                .page(page)
                .size(size)
                .sortBy(sortBy)
                .sortDirection(sortDirection)
                .keyword(keyword)
                .status(status)
                .priority(priority)
                .build();

        Page<TaskDTO> tasks = taskService.getAllTasks(taskCriteria);

        log.info("Fetched {} tasks", tasks.getTotalElements());
        return ResponseEntity.ok(tasks);
    }


    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable @NotNull UUID id) {
        log.info("Get task by ID: {}", id);

        TaskDTO task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody @Validated TaskDTO taskDTO) {
        log.info("Creating new task: {}", taskDTO);

        TaskDTO createdTask = taskService.createTask(taskDTO);
        return ResponseEntity.status(201).body(createdTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable @NotNull UUID id) {
        log.info("Deleting task with ID: {}", id);

        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable @NotNull UUID id, @RequestBody @Validated TaskDTO taskDTO) {
        log.info("Updating task with ID: {} - New Details: {}", id, taskDTO);

        TaskDTO updatedTask = taskService.updateTask(id, taskDTO);
        return ResponseEntity.ok(updatedTask);
    }

}
