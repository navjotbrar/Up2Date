package com.architecture.uptodate.Controller;

import com.architecture.uptodate.Entity.Posts;
import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Repository.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Controller
public class PostsController {

    @Autowired
    private PostsRepository postsRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/post/add", consumes = "application/json", produces = "application/json")
    @ResponseBody
    public ResponseEntity<String> addPost(@RequestBody String arg) {

        JsonParser springParser = JsonParserFactory.getJsonParser();
        Map<String, Object> map = springParser.parseMap(arg);

        String[] jsonArgs = new String[4];

        int i = 0;
        for (Map.Entry<String, Object> entry : map.entrySet()) {
//            System.out.println(entry.getKey() + " = " + entry.getValue());
            jsonArgs[i] = (String)entry.getValue();
            i++;
        }

        java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());

        Posts newPost = new Posts(jsonArgs[0], jsonArgs[2], jsonArgs[1], jsonArgs[3], sqlDate);
        postsRepository.save(newPost);

        System.out.println("after adding new post");

        return new ResponseEntity<String>("response from server", HttpStatus.OK);
    }
}
