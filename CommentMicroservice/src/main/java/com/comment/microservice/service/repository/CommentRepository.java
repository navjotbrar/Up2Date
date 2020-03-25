package com.comment.microservice.service.repository;

import com.comment.microservice.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,Integer> {
    List<Comment> findCommentsByPostId(int postId);

    Optional<Comment> findByCommentId(int commentId);

}
