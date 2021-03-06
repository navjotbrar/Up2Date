package com.architecture.uptodate.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * Entity used for posts
 */
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

    @Column(name = "createdate")
    private Date createDate;

    @Column(name= "author")
    private String author;

    @Column(name= "link")
    private String link;

    @Column(name= "articledescription")
    private String articleDescription;

    @Column(name= "imageurl")
    private String imageURL;

    @Column(name = "articletitle")
    private String articleTitle;

    public Posts(){}

    public Posts(String title, String link, String body, String username, Date currentDate, String articleTitle, String imageURL, String articleDescription){
        this.createDate = currentDate;
        this.author = username;
        this.title = title;
        this.body = body;
        this.link = link;
        this.articleDescription = articleDescription;
        this.imageURL = imageURL;
        this.articleTitle = articleTitle;
    }

    public int getPostId() {
        return postId;
    }

    public String getAuthor() {
        return author;
    }

    public String getLink() {
        return link;
    }

    public String getImageURL() {
        return imageURL;
    }

    public String getTitle() {
        return title;
    }

    public String getArticleTitle() {
        return articleTitle;
    }

    public String getBody() {
        return body;
    }

    public String getArticleDescription() {
        return articleDescription;
    }

    public Date getCreateDate() {
        return createDate;
    }
}
