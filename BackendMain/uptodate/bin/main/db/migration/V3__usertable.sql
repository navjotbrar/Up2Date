CREATE TABLE IF NOT EXISTS user (
    id varchar(36) NOT NULL,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) DEFAULT NULL,
    email varchar(50) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY UK_username (username)
)   ENGINE=InnoDB DEFAULT CHARSET=utf8;