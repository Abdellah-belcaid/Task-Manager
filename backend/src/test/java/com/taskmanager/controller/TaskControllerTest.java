package com.taskmanager.controller;

import com.taskmanager.dto.TaskCriteria;
import com.taskmanager.dto.TaskDTO;
import com.taskmanager.entity.Task;
import com.taskmanager.exception.GlobalExceptionHandler;
import com.taskmanager.exception.TaskNotFoundException;
import com.taskmanager.mapper.TaskMapper;
import com.taskmanager.service.TaskService;
import com.taskmanager.util.TaskTestHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class TaskControllerTest {

    private static final String BASE_URL = "/api/v1/tasks";
    private static final String GET_TASK_BY_ID_URL = BASE_URL + "/{id}";

    private static final int DEFAULT_PAGE = 1;
    private static final int DEFAULT_SIZE = 10;
    private static final String DEFAULT_SORT_BY = "createdAt";
    private static final String DEFAULT_SORT_DIRECTION = "asc";

    private MockMvc mockMvc;

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    private List<Task> mockTasks;
    private List<TaskDTO> mockTaskDTOs;
    private UUID taskId;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(taskController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
        taskId = UUID.randomUUID();
        mockTasks = TaskTestHelper.getAllTasks();
        mockTaskDTOs = mockTasks.stream()
                .map(TaskMapper::toDto)
                .toList();
    }

    @Test
    @DisplayName("Should return paginated tasks when valid params are provided")
    void should_returnPaginatedTasks_when_validRequest() throws Exception {
        Page<TaskDTO> pageResult = new PageImpl<>(mockTaskDTOs, PageRequest.of(0, DEFAULT_SIZE), mockTaskDTOs.size());

        when(taskService.getAllTasks(ArgumentMatchers.any(TaskCriteria.class)))
                .thenReturn(pageResult);

        mockMvc.perform(get(BASE_URL)
                        .param("page", String.valueOf(DEFAULT_PAGE))
                        .param("size", String.valueOf(DEFAULT_SIZE))
                        .param("sortBy", DEFAULT_SORT_BY)
                        .param("sortDirection", DEFAULT_SORT_DIRECTION))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(mockTaskDTOs.size()))
                .andExpect(jsonPath("$.content[0].title").value(mockTaskDTOs.getFirst().getTitle()))
                .andExpect(jsonPath("$.content[0].description").value(mockTaskDTOs.getFirst().getDescription()))
                .andExpect(jsonPath("$.content[0].status").value(mockTaskDTOs.getFirst().getStatus().toString()))
                .andExpect(jsonPath("$.content[0].priority").value(mockTaskDTOs.getFirst().getPriority().toString()));
    }

    @Test
    @DisplayName("Should return 400 Bad Request when invalid page number is provided")
    void should_returnBadRequest_when_invalidPageParam() throws Exception {
        mockMvc.perform(get(BASE_URL)
                        .param("page", "0")
                        .param("size", String.valueOf(DEFAULT_SIZE)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Should return 400 Bad Request when invalid size is provided")
    void should_returnBadRequest_when_invalidSizeParam() throws Exception {
        mockMvc.perform(get(BASE_URL)
                        .param("page", String.valueOf(DEFAULT_PAGE))
                        .param("size", "0"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Should return task when valid ID is provided")
    void should_returnTask_when_validId() throws Exception {

        TaskDTO mockTaskDTO = mockTaskDTOs.getFirst();
        when(taskService.getTaskById(taskId)).thenReturn(mockTaskDTO);

        mockMvc.perform(get(GET_TASK_BY_ID_URL, taskId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(mockTaskDTO.getTitle()))
                .andExpect(jsonPath("$.description").value(mockTaskDTO.getDescription()))
                .andExpect(jsonPath("$.status").value(mockTaskDTO.getStatus().toString()))
                .andExpect(jsonPath("$.priority").value(mockTaskDTO.getPriority().toString()));
    }

    @Test
    @DisplayName("Should return 404 Not Found when task ID does not exist")
    void should_returnNotFound_when_invalidId() throws Exception {
        when(taskService.getTaskById(taskId)).thenThrow(new TaskNotFoundException("Task not found with ID: " + taskId));

        mockMvc.perform(get(GET_TASK_BY_ID_URL, taskId))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$").value("Task not found with ID: " + taskId));
    }

}
