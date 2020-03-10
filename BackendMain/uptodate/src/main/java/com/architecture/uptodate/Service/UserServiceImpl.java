package com.architecture.uptodate.Service;

import com.architecture.uptodate.DTO.UserDTO;
import com.architecture.uptodate.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO signup(UserDTO userDto){
        return new UserDTO();

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

}
