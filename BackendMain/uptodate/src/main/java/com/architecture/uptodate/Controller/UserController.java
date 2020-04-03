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
    @DeleteMapping(value = "/user/deleteuser/{data}")
    public ResponseEntity deleteUser(@PathVariable(name="data", required=true) String username) {
            UserDTO userDTO = new UserDTO();
            userDTO.setUsername(username);
            try {
                userService.deleteUser(userDTO);
                return new ResponseEntity<String>("Successfully deleted user.", HttpStatus.OK);
            } catch (Exception e){
                e.printStackTrace();
                return new ResponseEntity<String>("Error deleting user, something went wrong.", HttpStatus.FORBIDDEN);

            }
        }





}
