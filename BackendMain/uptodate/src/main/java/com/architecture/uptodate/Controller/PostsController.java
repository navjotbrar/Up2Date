package com.architecture.uptodate.Controller;

import com.architecture.uptodate.Entity.Posts;
import com.architecture.uptodate.Repository.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Controller
public class PostsController {

    @Autowired
    private PostsRepository postsRepository;

}
