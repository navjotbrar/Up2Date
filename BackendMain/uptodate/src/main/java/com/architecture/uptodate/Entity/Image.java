package com.architecture.uptodate.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "image")
public class Image {

    @Id
    @Column(name = "imageid")
    private int imageId;

    @Column(name = "body")
    private String body;

    Image(String body){
        this.body= body;
    }

}
