package com.comment.microservice.service.Commands;

// Class used for comment delete command
public class DeleteCommentCommand extends BaseCommand<Integer> {

    public DeleteCommentCommand(int id){
        super(id);
    }
}
