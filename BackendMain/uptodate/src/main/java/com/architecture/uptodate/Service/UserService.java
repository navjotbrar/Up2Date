package com.architecture.uptodate.Service;

import com.architecture.uptodate.DTO.UserDTO;

public interface UserService {
    UserDTO signup(UserDTO userDto);
    UserDTO findbyEmail (String email);
    UserDTO updateProfile(UserDTO userDTO);
    UserDTO changePassword(UserDTO userDTO, String newPassword);
}
