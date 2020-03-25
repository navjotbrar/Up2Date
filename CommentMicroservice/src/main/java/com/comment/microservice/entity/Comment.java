package com.comment.microservice.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
@Table(name="comment")
public class Comment {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "commentid")
    private Integer commentId;

    @Column(name = "parentcommentid")
    private Integer parentCommentId;

    @Column(name="content")
    private String content;

    @Column(name = "postid")
    private int postId;

    @Column(name = "createddate")
    private Date createdDate;

    @Column(name = "lastmodifiedbydate")
    private Date lastModifiedByDate;

    public Comment(){

    }

    public Comment(int commentId, int parentCommentId, String content, int postId, Date createdDate, Date lastModifiedByDate){
        this.commentId = Integer.valueOf(commentId);
        this.parentCommentId= Integer.valueOf(parentCommentId);
        this.content= content;
        this.postId = postId;
        this.createdDate= createdDate;
        this.lastModifiedByDate = lastModifiedByDate;
    }
    public Comment(int parentCommentId, String content, int postId, Date createdDate, Date lastModifiedByDate){
        this.parentCommentId = Integer.valueOf(parentCommentId);
        this.content= content;
        this.postId = postId;
        this.createdDate= createdDate;
        this.lastModifiedByDate = lastModifiedByDate;
    }

}
