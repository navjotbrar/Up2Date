package com.comment.microservice.service.Impl;

import com.comment.microservice.DTO.CommentDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class Receiver {

    // The names we give JMS for the pub-sub queues. Must match between publisher and subscriber
    private final String insertCommentQueue="insertCommentQueue";

    private final String deleteCommentQueue="deleteCommentQueue";

    private final String deleteCommentsForAuthorQueue ="deleteCommentsForAuthorQueue";

    private final String deleteCommentsForPostQueue ="deleteCommentsForPostQueue";

    // Implementation of the comment servies needed
    @Autowired
    CommentCommandServiceImpl commentCommandService;

    // Listener used to recieve comments, handled both edit and new
    @JmsListener(destination = insertCommentQueue, containerFactory = "myFactory")
    public void receiveComment(String commentDtoString) throws JSONException, IOException {
        CommentDTO commentImpl = new ObjectMapper().readValue(commentDtoString, CommentDTO.class);
        commentCommandService.createComment(commentImpl);
    }


    // Listener used to handle deleting single comments
    @JmsListener(destination = deleteCommentQueue, containerFactory = "myFactory")
    public void deleteComment(int commentId) throws JSONException, IOException {
        System.out.println("Value of the comment ID I would like to delete is" + commentId);
        commentCommandService.deleteComment(commentId);
    }

    // Listener used to hande deleting comments for an author. Used when deleting an account
    @JmsListener(destination = deleteCommentsForAuthorQueue, containerFactory = "myFactory")
    public void deleteCommentForAuthor(String author) throws JSONException, IOException {
        System.out.println("Value of the author I would like to delete comments for is" + author);
        commentCommandService.deleteCommentsForAuthor(author);
    }

    // Listener used to hande deleting comments for a entire. Used when deleting an account or post
    @JmsListener(destination = deleteCommentsForPostQueue, containerFactory = "myFactory")
    public void deleteCommentForPost(int postId) throws JSONException, IOException {
        System.out.println("Value of the post id I would like to delete comments for is" + postId);
        commentCommandService.deleteCommentsForPost(postId);
    }
}
