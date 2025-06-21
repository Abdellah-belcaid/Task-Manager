package com.taskmanager.dto;

import com.taskmanager.enumration.Priority;
import com.taskmanager.enumration.Status;
import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskCriteria {
    @Min(1)
    private Integer page = 1;

    @Min(1)
    private Integer size = 10;

    private String sortBy = "createdAt";

    private String sortDirection = "asc";

    private String keyword;

    private Status status;

    private Priority priority;

}

