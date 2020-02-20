package com.architecture.uptodate.Entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Getter @Setter
@Table(name = "users")
public class User {

    @Id
    private UUID id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String userName;

    @Column
    private String email;

    @Column
    private String password;


    public User(String firstName, String lastName){
        this.firstName=firstName;
        this.lastName=lastName;
        this.id= UUID.randomUUID();
    }


}
