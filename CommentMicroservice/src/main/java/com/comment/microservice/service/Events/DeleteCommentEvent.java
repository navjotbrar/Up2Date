package com.comment.microservice.service.Events;

import com.comment.microservice.service.Commands.DeleteCommentCommand;

public class DeleteCommentEvent extends BaseEvent<Integer> {

    public DeleteCommentEvent(DeleteCommentCommand deleteCommentCommand){
        super(deleteCommentCommand.id);
    }
}
