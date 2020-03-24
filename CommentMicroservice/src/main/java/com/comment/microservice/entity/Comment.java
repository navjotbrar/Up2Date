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
    @Column(name = "commentId")
    private int commentId;

    private int parentCommentId;

    private String content;

    private int postId;

    private Date createdDate;

    private Date lastModifiedByDate;
}
