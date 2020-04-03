package com.comment.microservice.service;

import com.comment.microservice.DTO.CommentDTO;

import java.util.concurrent.CompletableFuture;

// Interface for the comment services
public interface CommentCommandService {

    /**
     * Used for creating comments using axon for the event store as well as the associated event handler
     * @param commentDTO The object recieved from the main microservice. If it contains an ID it is a new comment, else it is an edit action
     * @return
     */
    CompletableFuture<String> createComment(CommentDTO commentDTO);

    /**
     * Used for deleting a singular comment using axon for the event store as well as the associated event handler
     * @param commentId Commentid of what to delete. Needed at is the aggregate
     */
    void deleteComment(int commentId);

    /**
     * Used for deleting all comments associated by an author
     * @param author
     */
    void deleteCommentsForAuthor(String author);

    /**
     * Used for deleting all comments for an associated post
     * @param postId
     */
    void deleteCommentsForPost(int postId);
}
