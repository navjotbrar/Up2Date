package com.architecture.uptodate.Entity;


import com.architecture.uptodate.DTO.UserDTO;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Getter @Setter
@Table(name = "user")
public class User {


    //@Column(nullable = false, unique = true, updatable = false, columnDefinition="VARCHAR(36)")
    @Id
    @Column(name="id")
    @Type(type = "uuid-char")
    private UUID id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    public User(){

    }

    public User(String firstName, String lastName, String password, String username, String email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.username = username;
        this.email = email;
        this.id = UUID.randomUUID();
    }


    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    //    private User convertToEntity(UserDTO userDTO) throws ParseException {
//        User user = modelMapper.map(postDto, Post.class);
//
//        return user;
//    }

}
