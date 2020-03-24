package com.comment.microservice.service;

import java.util.List;

public interface CommentQueryService {

    public List<Object> listCommentsForPost(int postId);

}
