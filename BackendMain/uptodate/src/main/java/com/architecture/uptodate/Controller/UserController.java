package com.architecture.uptodate.Controller;

import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/login/{username}/{password}")
    @ResponseBody
    public ResponseEntity<User> loginUser(@PathVariable(name="username", required=true) String username,
                                    @PathVariable(name="password", required=true) String password) {

        Optional<User> myUser = userRepository.findByUsername(username);

        return new ResponseEntity<User>(new User("shamin","rahman","1234","5678"),HttpStatus.BAD_GATEWAY);
    }



}
