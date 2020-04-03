package com.comment.microservice.Controller;

import com.comment.microservice.DTO.CommentDTO;
import com.comment.microservice.entity.Comment;
import com.comment.microservice.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

// Controller for accessing REST API for comment microservice. Used to retrieving comments for a post
@Controller
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @GetMapping("/comment/posts/{postId}")
    public ResponseEntity<List<CommentDTO>>fetchCommentsForPosts(@PathVariable(name="postId") int postId) {

        List<Comment> comments = commentRepository.findCommentsByPostId(postId);
        List<CommentDTO> commentDTOS = new ArrayList<>();
        for(Comment comment: comments){
            commentDTOS.add(EntityToDto(comment));
        }
        return new ResponseEntity<>(commentDTOS, HttpStatus.OK);
    }

    private CommentDTO EntityToDto(Comment comment){
        if(comment.getParentCommentId()==null){
            return new CommentDTO(comment.getCommentId()
                    ,comment.getContent(),comment.getPostId(),comment.getCreatedDate(),comment.getLastModifiedByDate(),comment.getAuthor());
        } else{
            return new CommentDTO(comment.getCommentId(),comment.getParentCommentId()
                    ,comment.getContent(),comment.getPostId(),comment.getCreatedDate(),comment.getLastModifiedByDate(),comment.getAuthor());
        }
    }

}
