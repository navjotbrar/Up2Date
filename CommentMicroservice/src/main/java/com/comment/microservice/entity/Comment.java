package com.comment.microservice.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@Table(name="comment")
public class Comment {
    @Id
    @Column(name = "commentId")
    private int commentId;

    @Column(name="content")
    private String content;
}
