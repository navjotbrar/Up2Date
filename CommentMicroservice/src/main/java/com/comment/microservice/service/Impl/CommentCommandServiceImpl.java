package com.comment.microservice.service.Impl;

import com.comment.microservice.DTO.CommentDTO;
import com.comment.microservice.entity.Comment;
import com.comment.microservice.service.Commands.CreateCommentCommand;
import com.comment.microservice.service.CommentCommandService;
import com.comment.microservice.service.repository.CommentRepository;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class CommentCommandServiceImpl implements CommentCommandService {

    @Autowired
    CommentRepository commentRepository;

    private final CommandGateway commandGateway;


    public CommentCommandServiceImpl(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @Override
    public CompletableFuture<String> createComment(CommentDTO commentDTO) {
        CompletableFuture<String> toReturn= null;

        if(commentDTO.getCommentId() == 0){
            Comment savedComment = commentRepository.save(DtoToEntity(commentDTO));

            toReturn = commandGateway.send(new CreateCommentCommand(savedComment.getCommentId(),savedComment.getParentCommentId(),savedComment.getPostId()
                    ,savedComment.getContent(),savedComment.getCreatedDate(),savedComment.getLastModifiedByDate()));
        } else{
            // Update comment- get from db, update and save, then send command
            //
            // toReturn = commandGateway.send(new UpdateCommentCommand());

        }

        return toReturn;
    }


    private Comment DtoToEntity(CommentDTO commentDTO){
        if(commentDTO.getParentCommentId()==0){
            return new Comment(commentDTO.getCommentId()
                    ,commentDTO.getContent(),commentDTO.getPostId(),commentDTO.getCreatedDate(),commentDTO.getLastModifiedByDate());
        } else{
            return new Comment(commentDTO.getCommentId(),commentDTO.getParentCommentId()
                    ,commentDTO.getContent(),commentDTO.getPostId(),commentDTO.getCreatedDate(),commentDTO.getLastModifiedByDate());
        }
    }

}
