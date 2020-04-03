package com.architecture.uptodate.Controller;

import com.architecture.uptodate.Entity.Posts;
import com.architecture.uptodate.Repository.PostsRepository;
import com.architecture.uptodate.Service.PostsServiceImpl;
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

@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class PostsController {

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private PostsServiceImpl postsService;


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
            jsonArgs[i] = (String) entry.getValue();
            i++;
        }

        java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());

        String articleLink = URLEncoder.encode(jsonArgs[1], "UTF-8");

        final String uri = "http://localhost:5000//urlInfo" + "/" + articleLink;
        Map<String, Object> articleMap = springParser.parseMap(restTemplate.getForObject(uri, String.class));

        String[] articleArgs = new String[3];
        i = 0;
        for (Map.Entry<String, Object> entry : articleMap.entrySet()) {
            articleArgs[i] = (String) entry.getValue();
            i++;
        }

        Posts newPost = new Posts(jsonArgs[0], jsonArgs[1], jsonArgs[2], jsonArgs[3], sqlDate, articleArgs[0], articleArgs[1], articleArgs[2]);
        postsRepository.save(newPost);

        System.out.println("after adding new post");

        return new ResponseEntity<String>("response from server", HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/post/getJustPreview", consumes = "application/json", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Object> getJustPreview(@RequestBody String arg) throws UnsupportedEncodingException {

        JsonParser springParser = JsonParserFactory.getJsonParser();
        Map<String, Object> map = springParser.parseMap(arg);

        String link = "";
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            link = (String) entry.getValue();
        }

        ClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        RestTemplate restTemplate = new RestTemplate(requestFactory);
        String articleLink = URLEncoder.encode(link, "UTF-8");

        final String uri = "http://localhost:5000//urlInfo" + "/" + articleLink;
        Map<String, Object> articleMap = springParser.parseMap(restTemplate.getForObject(uri, String.class));

        String[] articleArgs = new String[3];
        int i = 0;
        for (Map.Entry<String, Object> entry : articleMap.entrySet()) {
            articleArgs[i] = (String) entry.getValue();
            i++;
        }

        JSONObject entity = new JSONObject();
        entity.put("articletitle", articleArgs[0]);
        entity.put("imageurl", articleArgs[1]);
        entity.put("articledesc", articleArgs[2]);

        System.out.println("at end of getJustPreview");
        return new ResponseEntity<Object>(entity, HttpStatus.OK);
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
            entity.put("createDate", n.getCreateDate());
            entity.put("link", n.getLink());
            entities.add(entity);
        }

        return new ResponseEntity<Object>(entities, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/post/{postid}")
    @ResponseBody
    public ResponseEntity deletePost(@PathVariable(name="postid", required=true) int postid) {

        System.out.println(" in delete: ");

        try{
            postsService.deletePost(postid);
            // Attempt to delete comment using pub sub
            return new ResponseEntity<String>("post deleted!", HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<String>("Post could not be deleted. Error in service", HttpStatus.FORBIDDEN);
        }
    }

}
