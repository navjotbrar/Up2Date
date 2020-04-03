package com.comment.microservice.service;

import java.util.List;

// Unused query service as it was not needed. But it would be used to directly access the event store which isn't needed here
public interface CommentQueryService {

    public List<Object> listCommentsForPost(int postId);

}
