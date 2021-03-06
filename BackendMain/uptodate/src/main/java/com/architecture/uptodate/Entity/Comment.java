package com.architecture.uptodate.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * Testing entity for comments when we weren't using a microservice initally
 */
@Entity
@Getter @Setter
@Table(name="comments")
public class Comment {

    @Id
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

    @Column(name ="author")
    private String author;

}
