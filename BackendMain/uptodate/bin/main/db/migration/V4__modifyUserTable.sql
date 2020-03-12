CREATE TABLE IF NOT EXISTS image (
    imageid int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    body varchar(1000) NOT NULL
)   ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS posts (
    postid int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(100) NOT NULL,
    body varchar(1000) NOT NULL,
    createdate datetime NOT NULL,
    imageir int(10) DEFAULT NULL,
    author VARCHAR(36) NOT NULL,
    FOREIGN KEY (author) REFERENCES user(id),
    FOREIGN KEY (imageir) REFERENCES  image(imageid)
)   ENGINE=InnoDB DEFAULT CHARSET=utf8;