package com.comment.microservice.service.Commands;

import java.util.Date;

// Command used for editing a comment command
public class EditCommentCommand extends BaseCommand<Integer>{
    public String content;

    public Date lastModifiedByDate;

    public EditCommentCommand(int commentId, String newContent, Date lastModifiedByDate){
        super(commentId);
        this.content=newContent;
        this.lastModifiedByDate=lastModifiedByDate;
    }
}
