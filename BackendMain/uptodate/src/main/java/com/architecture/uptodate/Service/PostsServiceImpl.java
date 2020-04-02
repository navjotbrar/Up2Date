package com.architecture.uptodate.Service;

import com.architecture.uptodate.DTO.PostsDTO;
import com.architecture.uptodate.Entity.Posts;
import com.architecture.uptodate.Repository.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostsServiceImpl implements PostsService{

    @Autowired
    PostsRepository postsRepository;

    @Autowired
    CommentService commentService;

    public PostsDTO returnSearchResults(String search){
        return null;
    }

    @Override
    public void deletePostsForUser(String author){
        //Delete all comments on these posts

        List<Posts> posts = postsRepository.findPostsByAuthor(author);
        for(Posts post: posts){

            commentService.deleteCommentForPost(post.getPostId());
            postsRepository.delete(post);

        }
    }

    @Override
    public void deletePost(int postId){
        postsRepository.deleteById(postId);
    }


}
