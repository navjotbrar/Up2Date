ALTER TABLE posts
    ADD COLUMN articledescription VARCHAR(81) NULL AFTER link,
    ADD COLUMN imageurl VARCHAR(2000) NULL AFTER articledescription,
    ADD COLUMN articletitle VARCHAR(1000) NULL AFTER imageurl;