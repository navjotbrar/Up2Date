package com.comment.microservice.Controller;

import com.comment.microservice.DTO.CommentDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@Controller
public class CommentController {

    @GetMapping("/comment/post/{postId}")
    public ResponseEntity<List<CommentDTO>>fetchCommentsForPost(@PathVariable(name="postId", required=true) int postId) {

        //commentService.recieveComments(postId);

        // Attempt to get all comments using pub sub
        return new ResponseEntity<List<CommentDTO>>(new ArrayList<CommentDTO>(), HttpStatus.OK);

    }
}
