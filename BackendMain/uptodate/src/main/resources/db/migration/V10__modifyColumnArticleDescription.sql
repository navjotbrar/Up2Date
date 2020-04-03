# Connor Britton did the flyaway database dseign and implementations for all our entitiess
ALTER TABLE posts
    CHANGE COLUMN articledescription articledescription VARCHAR(2000) NULL DEFAULT NULL ;