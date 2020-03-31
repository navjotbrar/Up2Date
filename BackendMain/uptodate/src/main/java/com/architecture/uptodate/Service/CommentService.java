package com.architecture.uptodate.Service;

import com.architecture.uptodate.DTO.CommentDTO;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface CommentService {

     void sendComment(CommentDTO commentDTO);

     List<CommentDTO> recieveComments(int postId);


    void deleteComment(int commentId);
}
