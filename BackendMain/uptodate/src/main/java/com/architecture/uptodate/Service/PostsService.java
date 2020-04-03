package com.architecture.uptodate.Service;
import com.architecture.uptodate.DTO.PostsDTO;
import net.minidev.json.JSONObject;
import org.springframework.http.ResponseEntity;

import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Interface for creating and deleting posts on the Up2Date website
 */
public interface PostsService {
    /**
     * Function to return search results
     * @param search what you are searching for
     * @return Data Transfer Object
     */
    public PostsDTO returnSearchResults(String search);

    /**
     * User deleting all posts
     * @param author author of post
     */
    void deletePostsForUser(String author);

    /**
     * Deleting a specific post
     * @param postId ID of post
     */
    void deletePost(int postId);

    /**
     * Function for adding posts
     * @param arg String for post to be added
     * @throws UnsupportedEncodingException
     */
    void addPost(String arg) throws UnsupportedEncodingException;

    /**
     * Preview of post before adding
     * @param arg String for post to be added
     * @return Entity for post
     * @throws UnsupportedEncodingException
     */
    JSONObject getJustPreview(String arg) throws UnsupportedEncodingException;

    /**
     * Get all posts
     * @return List of all posts
     */
    List<JSONObject> getAll();
}
