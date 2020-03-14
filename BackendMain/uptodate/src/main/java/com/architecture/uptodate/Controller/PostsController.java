package com.architecture.uptodate.Controller;

import com.architecture.uptodate.Entity.Posts;
import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Repository.PostsRepository;
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

@Controller
public class PostsController {

    @Autowired
    private PostsRepository postsRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/post/add", consumes = "application/json", produces = "application/json")
    @ResponseBody
    public ResponseEntity<String> addPost(@RequestBody String arg) throws UnsupportedEncodingException {

        ClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        RestTemplate restTemplate = new RestTemplate(requestFactory);

        JsonParser springParser = JsonParserFactory.getJsonParser();
        Map<String, Object> map = springParser.parseMap(arg);

        String[] jsonArgs = new String[4];
        int i = 0;
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            jsonArgs[i] = (String)entry.getValue();
            i++;
        }

        java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());

        String articleLink = URLEncoder.encode(jsonArgs[1], "UTF-8");

        final String uri = "http://localhost:5000//urlInfo" + "/" + articleLink;
        Map<String, Object> articleMap = springParser.parseMap(restTemplate.getForObject(uri, String.class));

        String[] articleArgs = new String[3];
        i = 0;
        for (Map.Entry<String, Object> entry : articleMap.entrySet()) {
            articleArgs[i] = (String)entry.getValue();
            i++;
        }

        Posts newPost = new Posts(jsonArgs[0], jsonArgs[1], jsonArgs[2], jsonArgs[3], sqlDate, articleArgs[0], articleArgs[1], articleArgs[2]);
        postsRepository.save(newPost);

        System.out.println("after adding new post");

        return new ResponseEntity<String>("response from server", HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/posts/fetch")
    @ResponseBody
    public ResponseEntity<Object> getAll() {

        Iterable<Posts> entityList = postsRepository.findAll();
        List<JSONObject> entities = new ArrayList<JSONObject>();

        for (Posts n : entityList) {
            JSONObject entity = new JSONObject();
            entity.put("postid", n.getPostId());
            entity.put("title", n.getTitle());
            entity.put("body", n.getBody());
            entity.put("author", n.getAuthor());
            entity.put("desc", n.getArticleDescription());
            entity.put("imageurl", n.getImageURL());
            entity.put("articleTitle", n.getArticleTitle());
            entity.put("createDate",n.getCreateDate());
            entities.add(entity);
        }

        return new ResponseEntity<Object>(entities, HttpStatus.OK);
    }

}
