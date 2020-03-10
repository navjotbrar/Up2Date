package com.architecture.uptodate.Controller;

import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
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

//        Optional<User> myUser = userRepository.findByUsername(username);

//        final String uri = "http://localhost:5000//urlInfo" +"/" + "https:%2F/%2F/www.bbc.com/sport/football/51673076";

        // Create the request.
//        ClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
//        RestTemplate restTemplate = new RestTemplate(requestFactory);
//
//
//
//
//        // Execute the request.
//
//        System.out.println(restTemplate.getForEntity(uri, ByteArrayResource.class));


//        RestTemplate restTemplate = new RestTemplate();
//        String result = restTemplate.getForObject(uri, String.class);


        return new ResponseEntity<User>(new User("shamin","rahman","1234","5678"),HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/checkIfExists/{username}")
    @ResponseBody
    public ResponseEntity<User> checkIfExists(@PathVariable(name="username", required = true) String username){

        return new ResponseEntity<User>(new User("shamin","rahman","1234","5678"),HttpStatus.OK);
    }



}
