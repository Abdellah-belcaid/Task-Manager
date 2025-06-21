package com.taskmanager.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.taskmanager.dto.TaskDTO;
import com.taskmanager.entity.Task;
import com.taskmanager.enumration.Priority;
import com.taskmanager.enumration.Status;
import com.taskmanager.mapper.TaskMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class TaskTestHelper {

    private TaskTestHelper() {
        throw new UnsupportedOperationException("Utility class");
    }

    private static final List<Task> TASKS = List.of(
            Task.builder()
                    .id(UUID.randomUUID())
                    .title("Complete math homework")
                    .description("Solve all exercises from chapter 5 in the math textbook.")
                    .status(Status.TODO)
                    .priority(Priority.HIGH)
                    .dueDate(LocalDate.of(2024, 10, 31))
                    .completed(false)
                    .createdAt(LocalDateTime.now().minusDays(10))
                    .build(),
            Task.builder()
                    .id(UUID.randomUUID())
                    .title("Prepare for science quiz")
                    .description("Review notes and practice questions for the upcoming science quiz.")
                    .status(Status.IN_PROGRESS)
                    .priority(Priority.MEDIUM)
                    .dueDate(LocalDate.of(2024, 11, 15))
                    .completed(false)
                    .createdAt(LocalDateTime.now().minusDays(5))
                    .build(),
            Task.builder()
                    .id(UUID.randomUUID())
                    .title("Submit history project")
                    .description("Complete and submit the history project on World War II.")
                    .status(Status.DONE)
                    .priority(Priority.HIGH)
                    .dueDate(LocalDate.of(2024, 10, 20))
                    .completed(true)
                    .createdAt(LocalDateTime.now().minusMonths(1))
                    .build(),
            Task.builder()
                    .id(UUID.randomUUID())
                    .title("Read assigned novel")
                    .description("Read chapters 1-5 of the assigned novel for literature class.")
                    .status(Status.TODO)
                    .priority(Priority.LOW)
                    .dueDate(null)
                    .completed(false)
                    .createdAt(LocalDateTime.now().minusDays(2))
                    .build(),
            Task.builder()
                    .id(UUID.randomUUID())
                    .title("Plan group study session")
                    .description("Coordinate with classmates to schedule a group study session for finals.")
                    .status(Status.TODO)
                    .priority(Priority.MEDIUM)
                    .dueDate(LocalDate.of(2024, 12, 15))
                    .completed(false)
                    .createdAt(LocalDateTime.now().minusDays(1))
                    .build()
    );

    public static List<Task> getAllTasks() {
        return TASKS.stream()
                .map(TaskTestHelper::copyOf)
                .toList();
    }

    public static Task getOneTask(int index) {
        return copyOf(TASKS.get(index));
    }

    public static TaskDTO getOneTaskDto(int index) {
        return TaskMapper.toDto(copyOf((TASKS.get(index))));
    }

    public static Task copyOf(Task task) {
        return Task.builder()
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

    public static String asJsonString(final Object obj) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            return mapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
