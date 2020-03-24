package com.comment.microservice.service.Commands;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
// Command for creating a comment, utilized by Axon

public class CreateCommentCommand extends BaseCommand<Integer> {

    public int parentCommentId;

    public String content;

    public int postId;

    public Date createdDate;

    public Date lastModifiedByDate;

    public String status;

    public CreateCommentCommand(int id, int parentCommentId, String content, Date createdDate, Date lastModifiedByDate, String status){
        super(Integer.valueOf(id));
        this.parentCommentId= parentCommentId;
        this.content= content;
        this.createdDate = createdDate;
        this. lastModifiedByDate = lastModifiedByDate;
        this.status =status;
    }


}
