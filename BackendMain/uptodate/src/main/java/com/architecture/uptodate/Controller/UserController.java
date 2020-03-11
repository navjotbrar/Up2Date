package com.architecture.uptodate.Controller;

import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
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


        Optional<User> userQuery = userRepository.findByUsernameAndPassword(username, password);

        if(userQuery.isPresent()){
            return new ResponseEntity<User>(userQuery.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<User>(null,null, HttpStatus.OK);
        }

//        return new ResponseEntity<User>(new User("shamin","rahman","1234","5678"),HttpStatus.OK);
    }



}
