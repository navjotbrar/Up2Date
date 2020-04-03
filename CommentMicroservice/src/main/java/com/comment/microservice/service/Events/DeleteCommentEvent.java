package com.comment.microservice.service.Events;

import com.comment.microservice.service.Commands.DeleteCommentCommand;

// Event used for deleting comments, is called after the CreateCommentCommand per axon
public class DeleteCommentEvent extends BaseEvent<Integer> {

    public DeleteCommentEvent(DeleteCommentCommand deleteCommentCommand){
        super(deleteCommentCommand.id);
    }
}
