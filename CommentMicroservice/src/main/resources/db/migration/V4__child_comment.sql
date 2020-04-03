# Connor Britton did the flyaway database dseign and implementations for all our entities
INSERT INTO comments.`comments`
(content, parentCommentId,postId, createdDate, lastModifiedByDate,author)
VALUES('Child Comment 1', 1 ,1, '2020-01-20', '2020-02-20','qasim');

INSERT INTO comments.`comments`
(content, parentCommentId,postId, createdDate, lastModifiedByDate,author)
VALUES('Child Comment 2', 1 ,1, '2020-01-20', '2020-02-20','qasim');