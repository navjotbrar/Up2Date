package com.architecture.uptodate.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Getter @Setter
@Table(name = "posts")
public class Posts {

    @Id
    @Column(name = "postid")
    private int postId;

    @Column(name = "title")
    private String title;

    @Column(name = "body")
    private String body;

    @Column(name = "createDate")
    private Date createdate;

    @Column(name = "imageid")
    private int imageId;

    @Column(name= "author")
    private String author;

}
