package com.taskmanager.entity;

import com.taskmanager.enumration.Priority;
import com.taskmanager.enumration.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull(message = "Status is required")
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull(message = "Priority is required")
    private Priority priority;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "is_completed", nullable = false)
    private boolean completed = false;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

}
