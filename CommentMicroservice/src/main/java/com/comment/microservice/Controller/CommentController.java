package com.comment.microservice.Controller;

import com.comment.microservice.DTO.CommentDTO;
import com.comment.microservice.entity.Comment;
import com.comment.microservice.service.CommentQueryService;
import com.comment.microservice.service.Impl.CommentCommandServiceImpl;
import com.comment.microservice.service.Impl.CommentQueryServiceImpl;
import com.comment.microservice.service.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@Controller
public class CommentController {

    @Autowired
    CommentCommandServiceImpl commentCommandService;

    @Autowired
    CommentQueryServiceImpl commentQueryService;

    @Autowired
    CommentRepository commentRepository;

    @GetMapping("/comment/post/{postId}")
    public ResponseEntity<List<CommentDTO>>fetchCommentsForPost(@PathVariable(name="postId", required=true) int postId) {

        //commentService.recieveComments(postId);


        commentCommandService.createComment(new CommentDTO(2,"hi",1));
        // Attempt to get all comments using pub sub
        return new ResponseEntity<List<CommentDTO>>(new ArrayList<CommentDTO>(), HttpStatus.OK);

    }

    @GetMapping("/comment/posts/{postId}")
    public ResponseEntity<List<CommentDTO>>fetchCommentsForPosts(@PathVariable(name="postId", required=true) int postId) {

        List<Comment> comments = commentRepository.findCommentsByPostId(postId);
        List<CommentDTO> commentDTOS = new ArrayList<>();
        for(Comment comment: comments){
            commentDTOS.add(EntityToDto(comment));
        }
        return new ResponseEntity<List<CommentDTO>>(commentDTOS, HttpStatus.OK);
    }

    private CommentDTO EntityToDto(Comment comment){
        if(comment.getParentCommentId()==0){
            return new CommentDTO(comment.getCommentId()
                    ,comment.getContent(),comment.getPostId(),comment.getCreatedDate(),comment.getLastModifiedByDate());
        } else{
            return new CommentDTO(comment.getCommentId(),comment.getParentCommentId()
                    ,comment.getContent(),comment.getPostId(),comment.getCreatedDate(),comment.getLastModifiedByDate());
        }
    }

}
