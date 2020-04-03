# Connor Britton did the flyaway database dseign and implementations for all our entities
ALTER TABLE posts
    ADD COLUMN link VARCHAR(2000) NULL AFTER author;
