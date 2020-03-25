package com.comment.microservice.commandmodels;
//Class used by Axon for event sourcing

import com.comment.microservice.service.Commands.CreateCommentCommand;
import com.comment.microservice.service.Commands.DeleteCommentCommand;
import com.comment.microservice.service.Commands.EditCommentCommand;
import com.comment.microservice.service.Events.CreateCommentEvent;
import com.comment.microservice.service.Events.DeleteCommentEvent;
import com.comment.microservice.service.Events.EditCommentEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;

import java.util.Date;

@Aggregate
public class CommentAggregate {

    @AggregateIdentifier
    private Integer commentId;

    private int parentCommentId;

    private String content;

    private int postId;

    private Date createdDate;

    private Date lastModifiedByDate;

    private String status;

    // Command and handler for creation of comments
    @CommandHandler
    public CommentAggregate(CreateCommentCommand createCommentCommand){
        AggregateLifecycle.apply(new CreateCommentEvent(createCommentCommand));
    }

    @EventSourcingHandler
    public void on(CreateCommentEvent createCommentEvent){
        this.commentId = Integer.valueOf(createCommentEvent.id);
        this.parentCommentId= Integer.valueOf(createCommentEvent.parentCommentId);
        this.postId=createCommentEvent.postId;
        this.content= createCommentEvent.content;
        this.createdDate = createCommentEvent.createdDate;
        this.lastModifiedByDate = createCommentEvent.lastModifiedByDate;
        this.status="ACTIVE";

    }

    // Command and handler for updating comment
    @CommandHandler
    public void handle(EditCommentCommand editCommentCommand){
        AggregateLifecycle.apply(new EditCommentEvent(editCommentCommand));
    }

    @EventSourcingHandler
    public void on(EditCommentEvent editCommentEvent){
        this.content=editCommentEvent.content;
        this.lastModifiedByDate=editCommentEvent.lastModifiedByDate;
        this.status="EDITED";
    }

    // Command and handler for deleting comment
    @CommandHandler
    public void handle(DeleteCommentCommand deleteCommentCommand){
        AggregateLifecycle.apply(new DeleteCommentEvent(deleteCommentCommand));
    }

    @EventSourcingHandler
    public void on(DeleteCommentEvent deleteCommentEvent){
        this.status="DELETED";
    }


    protected CommentAggregate (){

    }

    // Deleting a comment
    // TODO: If a parent is deleted, must delete all of the children as well!

}
