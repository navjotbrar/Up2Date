package com.architecture.uptodate.Repository;

import com.architecture.uptodate.Entity.Comment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Integer> {
    List<Comment> getByPostId(int postId);

}
