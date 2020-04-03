package com.comment.microservice.DTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

// The DTO for a comment transferred between main service and microservice
@Getter @Setter
public class CommentDTO {

    private int commentId;

    private int parentCommentId;

    private String content;

    private int postId;

    private Date createdDate;

    private Date lastModifiedByDate;

    private String author;

    public CommentDTO(int commentId,int parentCommentId,String content,int postId,String author){
        this.commentId=commentId;
        this.content=content;
        this.postId=postId;
        this.parentCommentId=parentCommentId;
        this.createdDate = new Date();
        this.lastModifiedByDate = new Date();
        this.author = author;
    }

    public CommentDTO(int parentCommentId,String content,int postId,String author){
        this.content=content;
        this.postId=postId;
        this.parentCommentId=parentCommentId;
        this.createdDate = new Date();
        this.lastModifiedByDate = new Date();
        this.author = author;
    }

    public CommentDTO(int commentId, int parentCommentId,String content,int postId,Date createdDate, Date lastModifiedByDate,String author){
        this.commentId=commentId;
        this.content=content;
        this.postId=postId;
        this.parentCommentId=parentCommentId;
        this.createdDate = createdDate;
        this.lastModifiedByDate = lastModifiedByDate;
        this.author = author;
    }
    public CommentDTO(int commentId,String content,int postId,Date createdDate, Date lastModifiedByDate,String author){
        this.commentId=commentId;
        this.content=content;
        this.postId=postId;
        this.createdDate = createdDate;
        this.lastModifiedByDate = lastModifiedByDate;
        this.author = author;
    }

    public CommentDTO(){}
}