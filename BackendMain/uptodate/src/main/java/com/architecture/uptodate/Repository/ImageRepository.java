package com.architecture.uptodate.Repository;

import com.architecture.uptodate.Entity.Image;
import com.architecture.uptodate.Entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface ImageRepository extends CrudRepository<Image, Integer> {
    Optional<Image> findByImageId(int imageId);
}
