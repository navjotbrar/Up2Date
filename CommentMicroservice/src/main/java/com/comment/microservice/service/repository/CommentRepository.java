package com.comment.microservice.service.repository;

import com.comment.microservice.entity.Comment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends CrudRepository<Comment, Integer> {
    List<Comment> findCommentsByPostId(int postId);

    Optional<Comment> findByCommentId(int commentId);

    List<Comment> findCommentsByAuthor(String author);

}
