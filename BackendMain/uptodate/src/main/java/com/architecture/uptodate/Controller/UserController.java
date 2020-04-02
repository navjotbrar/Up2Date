package com.architecture.uptodate.Controller;

import com.architecture.uptodate.DTO.UserDTO;
import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Repository.UserRepository;
import com.architecture.uptodate.Service.UserService;
import com.architecture.uptodate.Service.UserServiceImpl;
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


            Optional<User> userQuery = userRepository.findByUsernameAndPassword(username, password);

            if(userQuery.isPresent()){
                return new ResponseEntity<User>(userQuery.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<User>(null,null, HttpStatus.OK);
            }


    //        return new ResponseEntity<User>(new User("shamin","rahman","1234","5678"),HttpStatus.OK);

        }


   // @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/user/addnewuser", consumes = "application/json", produces = "application/json")
    public  ResponseEntity<UserDTO> addnewuser(@RequestBody UserDTO userDTO) {
        UserDTO toReturn = userService.signup(userDTO);
        System.out.println(toReturn.getFirst_name() + '/' + toReturn.getLast_name());
        return new ResponseEntity<UserDTO>(toReturn, HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(value = "/user/deleteuser", consumes ="application/json")
    public ResponseEntity deleteUser(@RequestBody UserDTO userDTO) {
            userService.deleteUser(userDTO);



            return new ResponseEntity<String>("Comment Service is currently down", HttpStatus.FORBIDDEN);
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
