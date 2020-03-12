package com.architecture.uptodate.Service;

import com.architecture.uptodate.DTO.UserDTO;
import org.springframework.stereotype.Service;


public interface UserService {
    public UserDTO signup(UserDTO userDto);
    public UserDTO findbyEmail (String email);
    public UserDTO updateProfile(UserDTO userDTO);
    public UserDTO changePassword(UserDTO userDTO, String newPassword);
}
