package com.architecture.uptodate.Controller;

import com.architecture.uptodate.Entity.Image;
import com.architecture.uptodate.Repository.ImageRepository;
import com.architecture.uptodate.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Controller
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

}
