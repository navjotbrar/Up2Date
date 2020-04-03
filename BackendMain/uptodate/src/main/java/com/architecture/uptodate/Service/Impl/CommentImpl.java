package com.architecture.uptodate.Service.Impl;

import com.architecture.uptodate.DTO.CommentDTO;
import com.architecture.uptodate.Repository.PostsRepository;
import com.architecture.uptodate.Service.CommentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;


@Service
public class CommentImpl implements CommentService {

    private final String sendCommentQueue= "insertCommentQueue";

    private final String fetchCommentQueue="fetchCommentQueue";

    private final String deleteCommentQueue="deleteCommentQueue";

    private final String deleteCommentsForAuthorQueue="deleteCommentsForAuthorQueue";

    private final String deleteCommentsForPostQueue="deleteCommentsForPostQueue";




    @Autowired
    private JmsTemplate template;

    @Autowired
    private PostsRepository postsRepository;

    @Override
    public void sendComment(CommentDTO commentDTO){
        //Check if post is in DB, need to ensure all the comments we send acc make sense!

        String message = null;
        try {
            message = new ObjectMapper().writeValueAsString(commentDTO);
            template.convertAndSend(sendCommentQueue, message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteCommentForPost(int postId){
        template.convertAndSend(deleteCommentsForPostQueue, postId);

    }


    @Override
    public void deleteComment(int commentId){
            template.convertAndSend(deleteCommentQueue, commentId);
    }

    @Override
    public void deleteCommentForAuthor(String author){
        template.convertAndSend(deleteCommentsForAuthorQueue, author);
    }


}
