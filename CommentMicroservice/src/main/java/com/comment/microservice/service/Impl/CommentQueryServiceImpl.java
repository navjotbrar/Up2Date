package com.comment.microservice.service.Impl;

import com.comment.microservice.service.CommentQueryService;
import org.axonframework.commandhandling.model.AggregateMember;
import org.axonframework.eventsourcing.eventstore.EventStore;

import java.util.List;

public class CommentQueryServiceImpl implements CommentQueryService {
    private final EventStore eventStore;

    public CommentQueryServiceImpl(EventStore eventStore) {
        this.eventStore = eventStore;
    }


    public List<Object> listCommentsForPost(int postId){


        return null;

    }


}
