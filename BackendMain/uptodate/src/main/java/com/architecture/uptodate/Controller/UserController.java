package com.architecture.uptodate.Controller;

import com.architecture.uptodate.Entity.Comment;
import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JmsTemplate template;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/login/{username}/{password}")
    @ResponseBody
    public ResponseEntity<User> loginUser(@PathVariable(name="username", required=true) String username,
                                    @PathVariable(name="password", required=true) String password) {

        Optional<User> myUser = userRepository.findByUsername(username);


//        String queueName = "commentQueue";
//        Comment myComment = new Comment();
//        String tradeString = null;
//        try {
//            tradeString = new ObjectMapper().writeValueAsString(myComment);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        template.convertAndSend(queueName, tradeString);

        return new ResponseEntity<User>(new User("shamin","rahman","1234","5678"),HttpStatus.OK);
    }



}
