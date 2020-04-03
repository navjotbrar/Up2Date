package com.architecture.uptodate.Repository;

import com.architecture.uptodate.Entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

/**
 * DAO used for users
 */
public interface UserRepository extends CrudRepository<User,UUID> {

    Optional<User> findByUsername(String username);
    Optional<User> findByUsernameAndPassword(String username, String password);
}
