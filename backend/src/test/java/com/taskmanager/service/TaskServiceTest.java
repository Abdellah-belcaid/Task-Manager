package com.taskmanager.service;

import com.taskmanager.dto.TaskCriteria;
import com.taskmanager.dto.TaskDTO;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;
import com.taskmanager.enumration.Priority;
import com.taskmanager.enumration.Status;
import com.taskmanager.exception.TaskNotFoundException;
import com.taskmanager.mapper.TaskMapper;
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
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.taskmanager.util.TaskTestHelper.getOneTaskDto;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private TaskServiceImpl taskService;

    private List<Task> mockTasks;
    private TaskCriteria taskCriteria;
    private UUID taskId;
    private UUID userId;
    private User mockCurrentUser;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        mockCurrentUser = User.builder().id(userId).build();
        mockTasks = TaskTestHelper.getAllTasks();
        taskId = UUID.randomUUID();
        taskCriteria = TaskCriteria.builder()
                .page(1)
                .size(10)
                .sortBy("createdAt")
                .sortDirection("asc")
                .keyword(null)
                .status(null)
                .priority(null)
                .build();
    }

    @Test
    @DisplayName("Should return paginated TaskDTOs when getAllTasks is called")
    void should_returnTaskDTOs_when_getAllTasks() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.ASC, "createdAt"));
        Page<Task> taskPage = new PageImpl<>(mockTasks, pageRequest, mockTasks.size());

        when(taskRepository.findAll(any(Specification.class), eq(pageRequest))).thenReturn(taskPage);

        Page<TaskDTO> result = taskService.getAllTasks(taskCriteria);

        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(mockTasks.size());
        assertThat(result.getContent().getFirst().getTitle()).isEqualTo(mockTasks.getFirst().getTitle());
        assertThat(result.getContent().getFirst().getDescription()).isEqualTo(mockTasks.getFirst().getDescription());
        assertThat(result.getContent().getFirst().getCreatedAt()).isEqualTo(mockTasks.getFirst().getCreatedAt());
        assertThat(result.getTotalElements()).isEqualTo(mockTasks.size());
    }

    @Test
    @DisplayName("Should return filtered TaskDTOs when keyword is provided")
    void should_returnFilteredTaskDTOs_when_keywordProvided() {

        taskCriteria.setKeyword("Complete math homework");
        PageRequest pageRequest = PageRequest.of(
                taskCriteria.getPage() - 1,
                taskCriteria.getSize(),
                Sort.by(Sort.Direction.ASC, taskCriteria.getSortBy())
        );

        List<Task> filtered = mockTasks.stream()
                .filter(task -> task.getTitle().contains("Complete math homework") || task.getDescription().contains("Complete math homework"))
                .toList();

        Page<Task> taskPage = new PageImpl<>(filtered, pageRequest, filtered.size());

        when(taskRepository.findAll(any(Specification.class), eq(pageRequest))).thenReturn(taskPage);


        Page<TaskDTO> result = taskService.getAllTasks(taskCriteria);


        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(filtered.size());
    }

    @Test
    @DisplayName("Should return filtered TaskDTOs when status and priority are provided")
    void should_returnFilteredTaskDTOs_when_statusAndPriorityProvided() {
        taskCriteria.setStatus(Status.TODO);
        taskCriteria.setPriority(Priority.HIGH);

        PageRequest pageRequest = PageRequest.of(
                taskCriteria.getPage() - 1,
                taskCriteria.getSize(),
                Sort.by(Sort.Direction.ASC, taskCriteria.getSortBy())
        );

        List<Task> filtered = mockTasks.stream()
                .filter(task -> task.getStatus() == taskCriteria.getStatus() && task.getPriority() == taskCriteria.getPriority())
                .toList();

        Page<Task> taskPage = new PageImpl<>(filtered, pageRequest, filtered.size());

        when(taskRepository.findAll(any(Specification.class), eq(pageRequest))).thenReturn(taskPage);

        Page<TaskDTO> result = taskService.getAllTasks(taskCriteria);

        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(filtered.size());
        assertThat(result.getContent().getFirst().getStatus()).isEqualTo(taskCriteria.getStatus());
        assertThat(result.getContent().getFirst().getPriority()).isEqualTo(taskCriteria.getPriority());
    }


    @Test
    @DisplayName("Should return TaskDTO when getTaskById is called with a valid ID")
    void should_returnTaskDTO_when_getTaskById_withValidId() {
        Task mockTask = mockTasks.getFirst();
        mockTask.setId(taskId);
        mockTask.setUser(mockCurrentUser);

        when(userService.getCurrentUser()).thenReturn(mockCurrentUser);
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(mockTask));

        TaskDTO result = taskService.getTaskById(taskId);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(mockTask.getId());
        assertThat(result.getTitle()).isEqualTo(mockTask.getTitle());
        assertThat(result.getDescription()).isEqualTo(mockTask.getDescription());
        assertThat(result.getCreatedAt()).isEqualTo(mockTask.getCreatedAt());
    }

    @Test
    @DisplayName("Should throw TaskNotFoundException when getTaskById is called with an invalid ID")
    void should_throwTaskNotFoundException_when_getTaskById_withInvalidId() {
        UUID invalidTaskId = UUID.randomUUID();

        when(taskRepository.findById(invalidTaskId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> taskService.getTaskById(invalidTaskId))
                .isInstanceOf(TaskNotFoundException.class)
                .hasMessageContaining("Task not found with ID: " + invalidTaskId);
    }


    @Test
    @DisplayName("Should create and return TaskDTO when createTask is called with valid TaskDTO")
    void should_createAndReturnTaskDTO_when_createTask_withValidTaskDTO() {
        TaskDTO taskDTO = getOneTaskDto(0);
        Task taskEntity = TaskMapper.toEntity(taskDTO);

        when(taskRepository.save(any(Task.class))).thenReturn(taskEntity);

        TaskDTO result = taskService.createTask(taskDTO);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(taskEntity.getId());
        assertThat(result.getTitle()).isEqualTo(taskEntity.getTitle());
        assertThat(result.getDescription()).isEqualTo(taskEntity.getDescription());
        assertThat(result.getCreatedAt()).isEqualTo(taskEntity.getCreatedAt());
    }


    @Test
    @DisplayName("Should delete task when deleteTask is called with a valid ID")
    void should_deleteTask_when_deleteTask_withValidId() {
        Task mockTask = mockTasks.getFirst();
        mockTask.setId(taskId);
        mockTask.setUser(mockCurrentUser);

        when(userService.getCurrentUser()).thenReturn(mockCurrentUser);
        when(taskRepository.existsByTaskIdAndUserId(taskId, userId)).thenReturn(true);

        taskService.deleteTask(taskId);

        assertThat(taskRepository.existsByTaskIdAndUserId(taskId, userId)).isTrue();
    }

    @Test
    @DisplayName("Should throw TaskNotFoundException when deleteTask is called with an invalid ID")
    void should_throwTaskNotFoundException_when_deleteTask_withInvalidId() {
        UUID invalidTaskId = UUID.randomUUID();

        when(userService.getCurrentUser()).thenReturn(mockCurrentUser);
        when(taskRepository.existsByTaskIdAndUserId(invalidTaskId, userId)).thenReturn(false);

        assertThatThrownBy(() -> taskService.deleteTask(invalidTaskId))
                .isInstanceOf(TaskNotFoundException.class)
                .hasMessageContaining("Task not found with ID: " + invalidTaskId);
    }


    @Test
    @DisplayName("Should update and return TaskDTO when updateTask is called with valid ID and TaskDTO")
    void should_updateAndReturnTaskDTO_when_updateTask_withValidIdAndTaskDTO() {
        TaskDTO taskDTO = getOneTaskDto(0);
        Task taskEntity = TaskMapper.toEntity(taskDTO);
        taskEntity.setId(taskId);

        when(userService.getCurrentUser()).thenReturn(User.builder().id(userId).build());
        when(taskRepository.existsByTaskIdAndUserId(taskId, userId)).thenReturn(true);
        when(taskRepository.save(any(Task.class))).thenReturn(taskEntity);

        TaskDTO result = taskService.updateTask(taskId, taskDTO);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(taskEntity.getId());
        assertThat(result.getTitle()).isEqualTo(taskEntity.getTitle());
        assertThat(result.getDescription()).isEqualTo(taskEntity.getDescription());
        assertThat(result.getCreatedAt()).isEqualTo(taskEntity.getCreatedAt());
    }

    @Test
    @DisplayName("Should throw TaskNotFoundException when updateTask is called with an invalid ID")
    void should_throwTaskNotFoundException_when_updateTask_withInvalidId() {
        UUID invalidTaskId = UUID.randomUUID();
        TaskDTO taskDTO = getOneTaskDto(0);

        when(userService.getCurrentUser()).thenReturn(mockCurrentUser);
        when(taskRepository.existsByTaskIdAndUserId(invalidTaskId, userId)).thenReturn(false);

        assertThatThrownBy(() -> taskService.updateTask(invalidTaskId, taskDTO))
                .isInstanceOf(TaskNotFoundException.class)
                .hasMessageContaining("Task not found with ID: " + invalidTaskId);
    }


}
