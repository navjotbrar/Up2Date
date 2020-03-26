package com.architecture.uptodate.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter @Setter
public class CommentDTO {

    @JsonProperty("commentId")
    private int commentId;

    @JsonProperty("parentCommentId")
    private int parentCommentId;

    @JsonProperty("content")
    private String content;

    @JsonProperty("postId")
    private int postId;

    @JsonProperty("createdDate")
    private Date createdDate;

    @JsonProperty("lastModifiedByDate")
    private Date lastModifiedByDate;

    @JsonProperty
    private String author;

    public CommentDTO(){

    }

    public CommentDTO(int commentId,int parentCommentId,String content,int postId, String author){
        this.commentId=commentId;
        this.content=content;
        this.postId=postId;
        this.parentCommentId=parentCommentId;
        this.createdDate = new Date();
        this.lastModifiedByDate = new Date();
        this.author = author;
    }

    public CommentDTO(int parentCommentId,String content,int postId, String author){
        this.content=content;
        this.postId=postId;
        this.parentCommentId=parentCommentId;
        this.createdDate = new Date();
        this.lastModifiedByDate = new Date();
        this.author = author;
    }

    public CommentDTO(int commentId, int parentCommentId,String content,int postId,Date createdDate, Date lastModifiedByDate, String author){
        this.commentId=commentId;
        this.content=content;
        this.postId=postId;
        this.parentCommentId=parentCommentId;
        this.createdDate = createdDate;
        this.lastModifiedByDate = lastModifiedByDate;
        this.author = author;
    }
    public CommentDTO(int commentId,String content,int postId,Date createdDate, Date lastModifiedByDate, String author){
        this.commentId=commentId;
        this.content=content;
        this.postId=postId;
        this.createdDate = createdDate;
        this.lastModifiedByDate = lastModifiedByDate;
        this.author = author;
    }




}
