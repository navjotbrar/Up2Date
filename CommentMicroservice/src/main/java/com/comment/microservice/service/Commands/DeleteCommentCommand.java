package com.comment.microservice.service.Commands;

public class DeleteCommentCommand extends BaseCommand<Integer> {

    public DeleteCommentCommand(int id){
        super(id);
    }
}
