package com.architecture.uptodate.Service;

import com.architecture.uptodate.DTO.CommentDTO;
import com.architecture.uptodate.Repository.PostsRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentImpl implements CommentService{

    private final String sendCommentQueue= "insertCommentQueue";

    private final String fetchCommentQueue="fetchCommentQueue";


    @Autowired
    private JmsTemplate template;

    @Autowired
    private PostsRepository postsRepository;

    @Override
    public void sendComment(CommentDTO commentDTO){
        //Check if post is in DB, need to ensure all the comments we send acc make sense!

        // Test for now
        CommentDTO testDTO = new CommentDTO(0,"hi",3);
        String message = null;
        try {
            message = new ObjectMapper().writeValueAsString(testDTO);
            template.convertAndSend(sendCommentQueue, message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }


    @Override
    public List<CommentDTO> recieveComments(int postId){
        // Send the message to the queue about what comments I need and from what post;

        template.convertAndSend(fetchCommentQueue,postId);

        return new ArrayList<CommentDTO>();
    }


}
