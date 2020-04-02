package com.architecture.uptodate.Service;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.architecture.uptodate.DTO.UserDTO;
import com.architecture.uptodate.Entity.User;
import com.architecture.uptodate.Repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostsServiceImpl postsService;

    @Autowired
    private CommentService commentService;

    @Override
    public UserDTO signup(UserDTO userDto){
        User user = convertToEntity(userDto);
        Optional<User> userQuery = userRepository.findByUsername(userDto.getUsername());
        if(!userQuery.isPresent()){
            userRepository.save(user);
            System.out.println(user);
            return convertToDTO(user);
        }
        return convertToDTO(new User());
    }

    @Override
    public UserDTO findbyEmail (String email){
        return new UserDTO();

    }

    @Override
    public UserDTO updateProfile(UserDTO userDTO){
        return new UserDTO();

    }

    @Override
    public UserDTO changePassword(UserDTO userDTO, String newPassword){
        return new UserDTO();
    }

    @Override
    public void deleteUser(UserDTO userDTO){
        // Delete All their comments
        commentService.deleteCommentForAuthor(userDTO.getUsername());

        //Delete All their Posts
        postsService.deletePostsForUser(userDTO.getUsername());

        //Delete User
        userRepository.deleteById(userRepository.findByUsername(userDTO.getUsername()).get().getId());
    }



    private User convertToEntity(UserDTO userDTO){
        User user = new User(userDTO.getFirst_name(), userDTO.getLast_name(), userDTO.getPassword(), userDTO.getUsername(), userDTO.getEmail());
        return user;
    }

    private UserDTO convertToDTO(User user){
        ModelMapper modelMapper = new ModelMapper();
//        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
//        System.out.println(userDTO.getFirst_name() + '/' + userDTO.getLast_name());
        UserDTO userDTO = new UserDTO(user);
        return userDTO;
    }


}
