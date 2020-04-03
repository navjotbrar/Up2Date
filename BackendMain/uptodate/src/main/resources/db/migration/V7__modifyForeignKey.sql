# Connor Britton did the flyaway database dseign and implementations for all our entities
ALTER TABLE posts
    ADD CONSTRAINT user
        FOREIGN KEY (author)
            REFERENCES user (username)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION;
