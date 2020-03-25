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


    public CreateCommentCommand(int id, int parentCommentId, int postId,String content, Date createdDate, Date lastModifiedByDate){
        super(Integer.valueOf(id));
        this.parentCommentId= parentCommentId;
        this.postId=postId;
        this.content= content;
        this.createdDate = createdDate;
        this. lastModifiedByDate = lastModifiedByDate;
    }


}
