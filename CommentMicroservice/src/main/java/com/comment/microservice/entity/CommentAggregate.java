package com.comment.microservice.entity;
//Class used by Axon for event sourcing

import com.comment.microservice.service.Commands.CreateCommentCommand;
import com.comment.microservice.service.Events.CreateCommentEvent;
import lombok.Getter;
import lombok.Setter;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.commandhandling.model.AggregateIdentifier;
import org.axonframework.commandhandling.model.AggregateLifecycle;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.spring.stereotype.Aggregate;

import java.util.Date;

@Aggregate
@Getter @Setter
public class CommentAggregate {

    @AggregateIdentifier
    private int commentId;

    private int parentCommentId;

    private String content;

    private int postId;

    private Date createdDate;

    private Date lastModifiedByDate;

    private String status;

    CommentAggregate (){

    }

    // Command and handler for creation of comments
    @CommandHandler
    protected void on(CreateCommentCommand createCommentCommand){
        AggregateLifecycle.apply(new CreateCommentEvent(createCommentCommand));
    }

    @EventSourcingHandler
    protected void on(CreateCommentEvent createCommentEvent){
        this.commentId = createCommentEvent.id;
        this.parentCommentId= createCommentEvent.parentCommentId;
        this.content= createCommentEvent.content;
        this.createdDate = createCommentEvent.createdDate;
        this. lastModifiedByDate = createCommentEvent.lastModifiedByDate;
        this.status = createCommentEvent.status;
    }


    // Editing a comment


    // Deleting a comment
    // TODO: If a parent is deleted, must delete all of the children as well!

}
