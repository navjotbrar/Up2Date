package com.comment.microservice.service.Impl;

import com.comment.microservice.DTO.CommentDTO;
import com.comment.microservice.entity.Comment;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class Receiver {

    private final String insertCommentQueue="insertCommentQueue";

    private final String fetchCommentQueue="fetchCommentQueue";

    // Listener used to recieve comments
    @JmsListener(destination = "insertCommentQueue", containerFactory = "myFactory")
    public void receiveComment(String commentDtoString) throws JSONException, IOException {
        CommentDTO commentImpl = new ObjectMapper().readValue(commentDtoString, CommentDTO.class);
        // Would save to a database?
    }


    @JmsListener(destination = "fetchCommentQueue", containerFactory = "myFactory")
    public void fetchCommentsFromPost(int postId) throws JSONException, IOException {
        System.out.println("Value of the post ID is" + postId);

    }




}
