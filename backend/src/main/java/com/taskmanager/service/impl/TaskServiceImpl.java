package com.taskmanager.service.impl;

import com.taskmanager.dto.TaskCriteria;
import com.taskmanager.dto.TaskDTO;
import com.taskmanager.mapper.TaskMapper;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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

        return taskRepository.findAll(pageRequest)
                .map(TaskMapper::toDto);
    }

}
