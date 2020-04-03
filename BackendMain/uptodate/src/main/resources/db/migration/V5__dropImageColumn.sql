# Connor Britton did the flyaway database dseign and implementations for all our entitiess
ALTER TABLE posts
DROP FOREIGN KEY posts_ibfk_2;
ALTER TABLE posts
DROP INDEX `imageir`;
;

DROP TABLE image;
ALTER TABLE posts DROP COLUMN imageir;