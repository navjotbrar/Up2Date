ALTER TABLE posts
DROP FOREIGN KEY posts_ibfk_2;
ALTER TABLE posts
DROP INDEX `imageir`;
;

DROP TABLE image;
ALTER TABLE posts DROP COLUMN imageir;