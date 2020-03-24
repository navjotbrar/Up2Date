package com.comment.microservice.DTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter @Setter
public class CommentDTO {

    private int commentId;

    private int parentCommentId;

    private String content;

    private int postId;

    private Date createdDate;

    private Date lastModifiedByDate;
}