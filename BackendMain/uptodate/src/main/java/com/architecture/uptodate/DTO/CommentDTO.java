package com.architecture.uptodate.DTO;

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

    public CommentDTO(int commentId, String content,int postId){
        this.commentId=commentId;
        this.content=content;
        this.postId=postId;


        this.createdDate = new Date();
        this.lastModifiedByDate = new Date();
    }

    public CommentDTO(int commentId,int parentCommentId,String content,int postId){
        this.commentId=commentId;
        this.content=content;
        this.postId=postId;
        this.parentCommentId=parentCommentId;
        this.createdDate = new Date();
        this.lastModifiedByDate = new Date();
    }

    public CommentDTO(int commentId, int parentCommentId ,String content,int postId, Date createdDate, Date lastModifiedByDate){
        this.commentId=commentId;
        this.content=content;
        this.postId=postId;

        this.createdDate = new Date();
        this.lastModifiedByDate = new Date();

    }



}
