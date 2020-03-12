package com.architecture.uptodate.DTO;


import com.architecture.uptodate.Entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.util.UUID;

@Getter @Setter

public class UserDTO {
    private String first_name;

    private String last_name;

    private String username;

    private String email;

    private String password;

    public UserDTO(){

    }

    public UserDTO(User user){
        this.first_name = user.getFirstName();
        this.last_name = user.getLastName();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
    }

    public String getEmail() {
        return email;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

}
