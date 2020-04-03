package com.comment.microservice.service.Events;

import com.comment.microservice.service.Commands.EditCommentCommand;

import java.util.Date;

// Event used for editing comments, is called after the CreateCommentCommand per axon
public class EditCommentEvent extends BaseEvent<Integer>  {
    public String content;

    public Date lastModifiedByDate;

    public EditCommentEvent(EditCommentCommand editCommentCommand) {
        super(editCommentCommand.id);
        this.content= editCommentCommand.content;
        this. lastModifiedByDate = editCommentCommand.lastModifiedByDate;
    }
}
