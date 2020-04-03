package com.comment.microservice.service.Events;

import com.comment.microservice.service.Commands.CreateCommentCommand;

import java.util.Date;

// Event used for creating comments, is called after the CreateCommentCommand per axon
public class CreateCommentEvent extends BaseEvent<Integer> {

    public int parentCommentId;

    public String content;

    public int postId;

    public Date createdDate;

    public Date lastModifiedByDate;

    public String author;


    public CreateCommentEvent(int id, int parentCommentId, String content, Date createdDate, Date lastModifiedByDates, String author){
        super(Integer.valueOf(id));
        this.parentCommentId= parentCommentId;
        this.content= content;
        this.createdDate = createdDate;
        this.lastModifiedByDate = lastModifiedByDates;
        this.author = author;
    }


    public CreateCommentEvent(CreateCommentCommand createCommentCommand) {
        super(createCommentCommand.id);
        this.parentCommentId= createCommentCommand.parentCommentId;
        this.postId=createCommentCommand.postId;
        this.content= createCommentCommand.content;
        this.createdDate = createCommentCommand.createdDate;
        this. lastModifiedByDate = createCommentCommand.lastModifiedByDate;
        this.author=createCommentCommand.author;
    }
}
