package com.architecture.uptodate.Controller;

import com.architecture.uptodate.DTO.UserDTO;
import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Repository.UserRepository;
import com.architecture.uptodate.Service.UserService;
import com.architecture.uptodate.Service.UserServiceImpl;
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



@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@Controller
public class UserController {

        @Autowired
        private UserServiceImpl userService;

        @Autowired
        private UserRepository userRepository;

       // @CrossOrigin(origins = "http://localhost:3000")
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


        return new ResponseEntity<User>(new User("shamin","rahman","1234","5678","henlo"),HttpStatus.OK);
    }


   // @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/user/addnewuser", consumes = "application/json", produces = "application/json")
    public  ResponseEntity<UserDTO> addnewuser(@RequestBody UserDTO userDTO) {
        UserDTO toReturn = userService.signup(userDTO);
        System.out.println(toReturn.getFirst_name() + '/' + toReturn.getLast_name());
        return new ResponseEntity<UserDTO>(toReturn, HttpStatus.OK);
    }

//    @ResponseBody
//    public ResponseEntity<User> addUser(@PathVariable(name="username", required=true) String username,
//                                        @PathVariable(name="password", required=true) String password,
//                                        @PathVariable(name="first_name", required=true) String first_name,
//                                        @PathVariable(name="last_name", required=true) String last_name,
//                                        @PathVariable(name="email", required=true) String email){
//
////        return new ResponseEntity<User>(new User("shamin","rahman","1234","5678"),HttpStatus.OK);
//        System.out.println(username + '/' + password  + '/' + first_name  + '/' +
//                last_name  + '/' + email);
//        Optional<User> userQuery = userRepository.findByUsername(username);
//
//        if(userQuery.isPresent()){
//            return new ResponseEntity<User>(null,null, HttpStatus.OK);
//        }
//        else {
//            User newUser = new User(first_name, last_name, password, username, email);
//            userRepository.save(newUser);
//            System.out.println(newUser);
//            return new ResponseEntity<User>(newUser, HttpStatus.OK);
//        }
//    }



}
