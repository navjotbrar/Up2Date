package com.comment.microservice.service;

        import com.comment.microservice.DTO.CommentDTO;

        import java.util.concurrent.CompletableFuture;

public interface CommentCommandService {
    public CompletableFuture<String> createComment(CommentDTO commentDTO);


    void deleteComment(int commentId);

    void deleteCommentsForAuthor(String author);

    void deleteCommentsForPost(int postId);
}
