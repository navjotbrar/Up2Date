package com.comment.microservice.repository;

import com.comment.microservice.entity.Comment;
import org.springframework.data.repository.CrudRepository;
import java.util.List;
import java.util.Optional;

// Repository used for storing comments in a Database per service. Used alongside Axon event sourcing and is apart of the
// event handling for adding, deleting and editing comments
public interface CommentRepository extends CrudRepository<Comment, Integer> {
    List<Comment> findCommentsByPostId(int postId);

    Optional<Comment> findByCommentId(int commentId);

    List<Comment> findCommentsByAuthor(String author);

}
