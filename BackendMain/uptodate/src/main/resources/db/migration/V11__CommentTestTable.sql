CREATE TABLE IF NOT EXISTS comments (
                    commentId int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    parentCommentId int(10),
                    content varchar(1000),
                    postId int(10) NOT NULL,
                    createdDate datetime NOT NULL,
                    lastModifiedByDate datetime NOT NULL,
                    FOREIGN KEY (postId) REFERENCES posts(postId)
)   ENGINE=InnoDB DEFAULT CHARSET=utf8;