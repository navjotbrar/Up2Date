package com.architecture.uptodate.Controller;

import com.architecture.uptodate.DTO.PostsDTO;
import com.architecture.uptodate.DTO.UserDTO;
import com.architecture.uptodate.Entity.Posts;
import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Repository.PostsRepository;
import com.architecture.uptodate.Service.PostsService;
import com.architecture.uptodate.Service.PostsServiceImpl;
import com.architecture.uptodate.Service.UserServiceImpl;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
//Controller for uploading and deleting posts
@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class PostsController {

    //The repository of posts
    @Autowired
    private PostsRepository postsRepository;

    //The service that handles the logic of post
    @Autowired
    private PostsServiceImpl postsService;

    //Adds posts to the repository
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/post/add", consumes = "application/json", produces = "application/json")
    @ResponseBody
    public ResponseEntity<String> addPost(@RequestBody String arg) throws UnsupportedEncodingException {
        try {
            postsService.addPost(arg);
            return new ResponseEntity<String>("response from server", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<String>("could not add post", HttpStatus.FORBIDDEN);
        }
    }

    //Shows a preview of the link that the user inputted
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/post/getJustPreview", consumes = "application/json", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Object> getJustPreview(@RequestBody String arg) throws UnsupportedEncodingException {
        try {
            JSONObject entity = postsService.getJustPreview(arg);
            return new ResponseEntity<Object>(entity, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<Object>("could not get preview", HttpStatus.FORBIDDEN);
        }
    }

    //Fetches all posts
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/posts/fetch")
    @ResponseBody
    public ResponseEntity<Object> getAll() {
        try {
            List<JSONObject> entities = postsService.getAll();
            return new ResponseEntity<Object>(entities, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<Object>("could not retrieve", HttpStatus.FORBIDDEN);
        }
    }

    //Deletes selected post
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/post/{postid}")
    @ResponseBody
    public ResponseEntity deletePost(@PathVariable(name="postid", required=true) int postid) {
        try{
            postsService.deletePost(postid);
            // Attempt to delete comment using pub sub
            return new ResponseEntity<String>("post deleted!", HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<String>("Post could not be deleted. Error in service", HttpStatus.FORBIDDEN);
        }
    }

}
