package com.taskmanager.repository.spec;

import com.taskmanager.dto.TaskCriteria;
import com.taskmanager.entity.Task;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class TaskSpecification {

    private TaskSpecification() {
        throw new IllegalStateException("Utility class");
    }

    public static Specification<Task> withCriteria(TaskCriteria criteria) {
        return (root, query, cb) -> {
            Predicate predicate = cb.conjunction();

            if (criteria.getKeyword() != null && !criteria.getKeyword().isBlank()) {
                String keyword = "%" + criteria.getKeyword().toLowerCase() + "%";
                predicate = cb.and(predicate, cb.or(
                        cb.like(cb.lower(root.get("title")), keyword),
                        cb.like(cb.lower(root.get("description")), keyword)
                ));
            }

            if (criteria.getStatus() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("status"), criteria.getStatus()));
            }

            if (criteria.getPriority() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("priority"), criteria.getPriority()));
            }

            return predicate;
        };
    }
}
