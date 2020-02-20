package com.architecture.uptodate.Controller;

import com.architecture.uptodate.Entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    @GetMapping("/user/login/{username}/{password}")
    @ResponseBody
    public User loginUser(@PathVariable(name="username", required=true) String username,
                         @PathVariable(name="password", required=true) String password) {
        return new User(username,password);
    }



}
