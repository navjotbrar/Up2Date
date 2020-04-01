package com.architecture.uptodate.DTO;

import com.architecture.uptodate.Entity.Posts;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PostsDTO {

        @JsonProperty("postid")
        private int postId;

        @JsonProperty("title")
        private String title;

        @JsonProperty("body")
        private String body;

        @JsonProperty("createdate")
        private Date createDate;

        @JsonProperty("author")
        private String author;

        @JsonProperty("link")
        private String link;

        @JsonProperty("articledescription")
        private String articleDescription;

        @JsonProperty("imageurl")
        private String imageURL;

        @JsonProperty("articletitle")
        private String articleTitle;



        public PostsDTO(String title, String link, String body, String username, Date currentDate, String articleTitle, String imageURL, String articleDescription){
        this.createDate = currentDate;
        this.author = username;
        this.title = title;
        this.body = body;
        this.link = link;
        this.articleDescription = articleDescription;
        this.imageURL = imageURL;
        this.articleTitle = articleTitle;
    }
        public PostsDTO(Posts post){
        this.createDate = post.getCreateDate();
        this.author = post.getAuthor();
        this.title = post.getTitle();
        this.body = post.getBody();
        this.link = post.getLink();
        this.articleDescription = post.getArticleDescription();
        this.imageURL = post.getImageURL();
        this.articleTitle = post.getArticleTitle();
    }

    public PostsDTO() {

    }
}

