package com.architecture.uptodate.Service;

import com.architecture.uptodate.DTO.PostsDTO;

import com.architecture.uptodate.Entity.Posts;
import com.architecture.uptodate.Repository.PostsRepository;

import org.springframework.beans.factory.annotation.Autowired;


public class PostsImpl {
    @Autowired
    private PostsRepository postsRepository;


    public PostsDTO returnSearchResults(String search){
        return new PostsDTO();
    }

}
