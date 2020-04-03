package com.architecture.uptodate.Service;

import com.architecture.uptodate.DTO.UserDTO;
import org.springframework.stereotype.Service;

// Service for users
public interface UserService {
    /**
     * Used for signing up a user
     * @param userDto Object representing the user we want to register
     * @return
     */
    UserDTO signup(UserDTO userDto);

    /**
     * Used for chaging a users password
     * @param userDTO Object representing the user we want to register
     * @param newPassword The new password for the user
     * @return
     */
    UserDTO changePassword(UserDTO userDTO, String newPassword);

    /**
     * Used for deleting a user
     * @param userDTO The user we would like to delete
     */
    void deleteUser(UserDTO userDTO);
}
