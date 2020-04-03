package com.architecture.uptodate.Service;

import com.architecture.uptodate.DTO.CommentDTO;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

// Service used to handle the comment service
public interface CommentService {

    /**
     * Sending comments to comment microservice using pub-sub
     * @param commentDTO The comment object recieved from the front facting website
     */
    void sendComment(CommentDTO commentDTO);

    /**
     * Deleting comments by using the comment microservice using pub-sub
     * @param commentId The comment id for the comment needed to delete
     */
    void deleteComment(int commentId);

    /**
     * Delete comments for an author. Used when deleting an account and want all their comments deleted
     * @param author the author associated with a comment
     */
    void deleteCommentForAuthor(String author);

    /**
     * Deleting all comments for a post using the postId
     * @param postId the id of the post used to get all comments on them
     */
    void deleteCommentForPost(int postId);
}
