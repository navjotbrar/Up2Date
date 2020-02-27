package com.architecture.uptodate.Controller;

import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/login/{username}/{password}")
    @ResponseBody
    public User loginUser(@PathVariable(name="username", required=true) String username,
                         @PathVariable(name="password", required=true) String password) {

        Optional<User> myUser = userRepository.findByUsername(username);

        return null;
    }



}
