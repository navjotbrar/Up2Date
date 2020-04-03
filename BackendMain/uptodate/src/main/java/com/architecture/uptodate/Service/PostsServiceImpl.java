package com.architecture.uptodate.Service;

import com.architecture.uptodate.DTO.PostsDTO;
import com.architecture.uptodate.Entity.Posts;
import com.architecture.uptodate.Repository.PostsRepository;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

//Implementation of the Post Service
@Service
public class PostsServiceImpl implements PostsService{

    //Repository of all posts
    @Autowired
    PostsRepository postsRepository;

    //Comments for posts
    @Autowired
    CommentService commentService;

    //Returning search results
    public PostsDTO returnSearchResults(String search){
        return null;
    }

    //Deletes all posts for a user
    @Override
    public void deletePostsForUser(String author){
        //Delete all comments on these posts

        List<Posts> posts = postsRepository.findPostsByAuthor(author);
        for(Posts post: posts){

            commentService.deleteCommentForPost(post.getPostId());
            postsRepository.delete(post);

        }
    }

    //Deleting Post by ID
    @Override
    public void deletePost(int postId){
        postsRepository.deleteById(postId);
    }

    //Adding a post
    @Override
    public void addPost(String arg) throws UnsupportedEncodingException {
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
    }

    //Getting preview for a post
    @Override
    public JSONObject getJustPreview(String arg) throws UnsupportedEncodingException {
        ClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        RestTemplate restTemplate = new RestTemplate(requestFactory);

        JsonParser springParser = JsonParserFactory.getJsonParser();
        Map<String, Object> map = springParser.parseMap(arg);

        String link = "";
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            link = (String) entry.getValue();
        }

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

        return entity;
    }

    //Gets all posts
    @Override
    public List<JSONObject> getAll(){
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

        return entities;
    }
}
