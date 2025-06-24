package com.taskmanager.repository;

import com.taskmanager.entity.User;
import com.taskmanager.enumration.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    User findByUsernameAndPassword(String username, String password);

    Optional<User> findByUsername(String username);

    @Modifying
    @Query("update User set role = :role where username = :username")
    void updateUserRole(@Param("username") String username, @Param("role") Role role);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User findByEmailIgnoreCase(String email);
}
