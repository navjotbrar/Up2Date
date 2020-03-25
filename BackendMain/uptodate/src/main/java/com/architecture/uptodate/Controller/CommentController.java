package com.architecture.uptodate.Controller;

import com.architecture.uptodate.DTO.CommentDTO;
import com.architecture.uptodate.Entity.Comment;
import com.architecture.uptodate.Entity.CommentList;
import com.architecture.uptodate.Repository.CommentRepository;
import com.architecture.uptodate.Service.CommentImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Controller
public class CommentController {

    @Autowired
    CommentImpl commentService;

    @Autowired
    CommentRepository commentRepository;

    private final String getCommentsUrl="http://localhost:8081/comment/posts/";


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/comment/post/", consumes = "application/json", produces = "application/json")
    public ResponseEntity saveCommentOnPost(@RequestBody CommentDTO commentDTO) {

        try{
        commentService.sendComment(commentDTO);
        // Attempt to get all comments using pub sub
        return new ResponseEntity<List<CommentDTO>>(new ArrayList<CommentDTO>(), HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<String>("Comment Service is currently down", HttpStatus.FORBIDDEN);
        }

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/comment/post/{postId}")
    @ResponseBody
    public ResponseEntity fetchCommentsForPost(@PathVariable(name="postId", required=true) int postId) {
        ClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        RestTemplate restTemplate = new RestTemplate(requestFactory);

        final String uri= getCommentsUrl + postId;
        ResponseEntity<List<CommentDTO>> responseWanted = null;
        try{
            responseWanted = restTemplate.exchange(uri, HttpMethod.GET, null, new ParameterizedTypeReference<List<CommentDTO>>(){});
            return responseWanted;

        }catch (ResourceAccessException e){
            return new ResponseEntity<String>("Comment service is currently down", HttpStatus.OK);
        }
    }

}
