DROP TABLE IF EXISTS share;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS marketplace_posts;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;


CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(200) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE share (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(100000) NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")

);

CREATE TABLE book (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    Author VARCHAR(50) NOT NULL,
    content VARCHAR(100000) NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE marketplace_posts (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    post_name VARCHAR(100) NOT NULL,
    conditions VARCHAR(200) NOT NULL,
    description VARCHAR(300),
    location VARCHAR(200) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

INSERT INTO user_account (email, password, name, surname, isAdmin)
VALUES
    ('user1@example.com', 'password123', 'John', 'Doe', FALSE),
    ('user2@example.com', 'securePass', 'Alice', 'Smith', FALSE),
    ('user3@example.com', 'mySecretPwd', 'Bob', 'Johnson', FALSE);

INSERT INTO marketplace_posts (post_name, user_id, conditions, description, location, price)
VALUES
    ('Table for Sale', 1, 'Excellent condition', 'Solid wood dining table', '123 Oak Street, Florin', 350.00),
    ('Bike for Sale', 2, 'Like new', 'Mountain bike, 21 gears', '456 Maple Avenue, Florin', 250.50),
    ('Part-time Job: Tutoring', 3, 'Flexible hours', 'Math and Science tutoring services', '789 Pine Street, Florin', 30.00);

INSERT INTO book (user_id, author, title, content)
VALUES
    (1, 'password123', 'John', 'Doe'),
    (2, 'securePass', 'Alice', 'Smith'),
    (3, 'mySecretPwd', 'Bob', 'Johnson');
