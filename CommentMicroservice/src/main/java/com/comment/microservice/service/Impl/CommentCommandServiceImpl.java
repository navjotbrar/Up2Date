package com.comment.microservice.service.Impl;

import com.comment.microservice.DTO.CommentDTO;
import com.comment.microservice.entity.Comment;
import com.comment.microservice.service.Commands.CreateCommentCommand;
import com.comment.microservice.service.Commands.EditCommentCommand;
import com.comment.microservice.service.CommentCommandService;
import com.comment.microservice.service.repository.CommentRepository;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class CommentCommandServiceImpl implements CommentCommandService {

    @Autowired
    CommentRepository commentRepository;

    private final CommandGateway commandGateway;


    public CommentCommandServiceImpl(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    // This is the event sourcing event handler. We cant to actually save to the repository first as we need to get the specific commentID
    // This is then sent to the event store using the Axon API
    @Override
    public CompletableFuture<String> createComment(CommentDTO commentDTO) {
        CompletableFuture<String> toReturn= null;

        // If DTO has no commentID, means it is brand new
        if(commentDTO.getCommentId() == 0){
            Comment savedComment = commentRepository.save(DtoToEntity(commentDTO));

            toReturn = commandGateway.send(new CreateCommentCommand(savedComment.getCommentId(),savedComment.getParentCommentId(),savedComment.getPostId()
                    ,savedComment.getContent(),savedComment.getCreatedDate(),savedComment.getLastModifiedByDate(),commentDTO.getAuthor()));
        } else{

            // Dto has CommentId, we update comment- get from db, update and save, then send command
            Comment commentToUpdate = commentRepository.findByCommentId(commentDTO.getCommentId()).get();
            commentToUpdate.setContent(commentDTO.getContent());
            commentToUpdate.setLastModifiedByDate(new Date());
            commentRepository.save(commentToUpdate);
             toReturn = commandGateway.send(new EditCommentCommand(commentToUpdate.getCommentId(),commentToUpdate.getContent(),commentToUpdate.getLastModifiedByDate()));

        }

        return toReturn;
    }


    private Comment DtoToEntity(CommentDTO commentDTO){
        if(commentDTO.getParentCommentId()==0){
            return new Comment(commentDTO.getCommentId()
                    ,commentDTO.getContent(),commentDTO.getPostId(),commentDTO.getCreatedDate(),commentDTO.getLastModifiedByDate(),commentDTO.getAuthor());
        } else{
            return new Comment(commentDTO.getCommentId(),commentDTO.getParentCommentId()
                    ,commentDTO.getContent(),commentDTO.getPostId(),commentDTO.getCreatedDate(),commentDTO.getLastModifiedByDate(),commentDTO.getAuthor());
        }
    }

}
