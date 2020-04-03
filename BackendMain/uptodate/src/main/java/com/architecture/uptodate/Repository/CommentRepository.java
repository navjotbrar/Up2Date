package com.architecture.uptodate.Repository;

import com.architecture.uptodate.Entity.Comment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * The comment repository initially used for testing. not used anymore
 */
public interface CommentRepository extends CrudRepository<Comment, Integer> {
    List<Comment> getByPostId(int postId);

}
