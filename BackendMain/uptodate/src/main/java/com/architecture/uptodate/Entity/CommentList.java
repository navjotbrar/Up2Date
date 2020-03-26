package com.architecture.uptodate.Entity;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CommentList {
    private List<Comment> comments;

    public CommentList(){
        comments = new ArrayList<>();
    }

}
