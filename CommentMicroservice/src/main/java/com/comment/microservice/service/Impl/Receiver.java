package com.comment.microservice.service.Impl;

import com.comment.microservice.DTO.CommentDTO;
import com.comment.microservice.entity.Comment;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class Receiver {

    private final String insertCommentQueue="insertCommentQueue";

    private final String deleteCommentQueue="deleteCommentQueue";

    private final String deleteCommentsForAuthorQueue ="deleteCommentsForAuthorQueue";

    private final String deleteCommentsForPostQueue ="deleteCommentsForPostQueue";

    @Autowired
    CommentCommandServiceImpl commentCommandService;

    // Listener used to recieve comments
    @JmsListener(destination = insertCommentQueue, containerFactory = "myFactory")
    public void receiveComment(String commentDtoString) throws JSONException, IOException {
        CommentDTO commentImpl = new ObjectMapper().readValue(commentDtoString, CommentDTO.class);
        commentCommandService.createComment(commentImpl);
    }


    @JmsListener(destination = deleteCommentQueue, containerFactory = "myFactory")
    public void deleteComment(int commentId) throws JSONException, IOException {
        System.out.println("Value of the comment ID I would like to delete is" + commentId);
        commentCommandService.deleteComment(commentId);
    }

    @JmsListener(destination = deleteCommentsForAuthorQueue, containerFactory = "myFactory")
    public void deleteCommentForAuthor(String author) throws JSONException, IOException {
        System.out.println("Value of the author I would like to delete comments for is" + author);
        commentCommandService.deleteCommentsForAuthor(author);
    }

    @JmsListener(destination = deleteCommentsForPostQueue, containerFactory = "myFactory")
    public void deleteCommentForPost(int postId) throws JSONException, IOException {
        System.out.println("Value of the post id I would like to delete comments for is" + postId);
        commentCommandService.deleteCommentsForPost(postId);
    }
}
