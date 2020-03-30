package com.architecture.uptodate.Repository;

import com.architecture.uptodate.Entity.Posts;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface PostsRepository extends CrudRepository<Posts,UUID>{

    Optional<Posts> findByAuthor(String author);

    @Override
    Posts save(Posts entity);

    @Override
    Iterable<Posts> findAll();
}
