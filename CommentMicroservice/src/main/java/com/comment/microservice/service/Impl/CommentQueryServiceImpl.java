package com.comment.microservice.service.Impl;

import com.comment.microservice.service.CommentQueryService;
import org.axonframework.eventsourcing.eventstore.EventStore;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentQueryServiceImpl implements CommentQueryService {
    private final EventStore eventStore;

    public CommentQueryServiceImpl(EventStore eventStore) {
        this.eventStore = eventStore;
    }


    public List<Object> listCommentsForPost(int postId){
        return null;
    }


}
