package com.architecture.uptodate.Service;
import com.architecture.uptodate.DTO.PostsDTO;

public interface PostsService {
    public PostsDTO returnSearchResults(String search);

    void deletePostsForUser(String author);

    void deletePost(int postId);
}
