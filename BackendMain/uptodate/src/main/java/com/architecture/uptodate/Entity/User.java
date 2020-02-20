package com.architecture.uptodate.Entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@Table
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String firstName;


    private String lastName;

    public User(String firstName, String lastName){
        this.firstName=firstName;
        this.lastName=lastName;
    }


}
