package com.architecture.uptodate.Controller;

import com.architecture.uptodate.DTO.CommentDTO;
import com.architecture.uptodate.DTO.PostsDTO;
import com.architecture.uptodate.Entity.Comment;
import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Service.CommentImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Controller
public class CommentController {

    @Autowired
    CommentImpl commentService;


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/comment/post/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<List<CommentDTO>> saveCommentOnPost(@RequestBody CommentDTO commentDTO) {

        commentService.sendComment(commentDTO);
        // Attempt to get all comments using pub sub
        return new ResponseEntity<List<CommentDTO>>(new ArrayList<CommentDTO>(), HttpStatus.OK);

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/comment/post/{postId}")
    @ResponseBody
    public ResponseEntity<List<CommentDTO>> fetchCommentsForPost(@PathVariable(name="postId", required=true) int postId) {


        commentService.sendComment(null);
        //commentService.recieveComments(postId);
        // Attempt to get all comments using pub sub
        return new ResponseEntity<List<CommentDTO>>(new ArrayList<CommentDTO>(), HttpStatus.OK);

    }



}
