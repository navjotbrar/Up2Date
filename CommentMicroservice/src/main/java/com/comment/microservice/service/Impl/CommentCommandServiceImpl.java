package com.comment.microservice.service.Impl;

import com.comment.microservice.DTO.CommentDTO;
import com.comment.microservice.service.Commands.CreateCommentCommand;
import com.comment.microservice.service.CommentCommandService;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class CommentCommandServiceImpl implements CommentCommandService {

    private final CommandGateway commandGateway;


    public CommentCommandServiceImpl(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @Override
    public CompletableFuture<String> createComment(CommentDTO commentDTO) {
        return commandGateway.send(new CreateCommentCommand(commentDTO.getCommentId(),commentDTO.getParentCommentId()
                ,commentDTO.getContent(),commentDTO.getCreatedDate(),commentDTO.getLastModifiedByDate(),"ACTIVE"));
    }
}
