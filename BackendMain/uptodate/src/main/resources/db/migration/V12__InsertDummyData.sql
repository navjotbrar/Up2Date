INSERT INTO up2date.`user`
(id, username, password, first_name, last_name, email)
VALUES('0a00723f-0a11-4e8e-a2a6-885960d4d059', 'qasim', 'pass', 'qasim', 'muhammad', 'fakemail@mail.com');

ALTER TABLE posts
    DROP FOREIGN KEY posts_ibfk_1;
