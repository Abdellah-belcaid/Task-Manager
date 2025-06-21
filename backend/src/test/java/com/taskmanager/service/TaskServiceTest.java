package com.taskmanager.service;

import com.taskmanager.dto.TaskCriteria;
import com.taskmanager.dto.TaskDTO;
import com.taskmanager.entity.Task;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.service.impl.TaskServiceImpl;
import com.taskmanager.util.TaskTestHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    private List<Task> mockTasks;
    private TaskCriteria taskCriteria;

    @BeforeEach
    void setUp() {
        mockTasks = TaskTestHelper.getAllTasks();

        taskCriteria = TaskCriteria.builder()
                .page(1)
                .size(10)
                .sortBy("createdAt")
                .sortDirection("asc")
                .build();
    }

    @Test
    @DisplayName("Should return paginated TaskDTOs when getAllTasks is called")
    void should_returnTaskDTOs_when_getAllTasks() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.ASC, "createdAt"));
        Page<Task> taskPage = new PageImpl<>(mockTasks, pageRequest, mockTasks.size());

        when(taskRepository.findAll(pageRequest)).thenReturn(taskPage);

        Page<TaskDTO> result = taskService.getAllTasks(taskCriteria);

        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(mockTasks.size());
        assertThat(result.getContent().getFirst().getTitle()).isEqualTo(mockTasks.getFirst().getTitle());
        assertThat(result.getContent().getFirst().getDescription()).isEqualTo(mockTasks.getFirst().getDescription());
        assertThat(result.getContent().getFirst().getCreatedAt()).isEqualTo(mockTasks.getFirst().getCreatedAt());
        assertThat(result.getTotalElements()).isEqualTo(mockTasks.size());
    }
}
