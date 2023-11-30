
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
    author VARCHAR(50) NOT NULL,
    content VARCHAR(100000) NOT NULL,
    link VARCHAR(200),
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
    ('Acoustic Guitar', 1, 'Like new', 'Beautiful 6-string acoustic guitar in excellent condition. Comes with a sturdy case for easy transportation.', '123 Oak Street, Florin', 180.00),
    ('Canon DSLR Camera', 2, 'Excellent condition', 'High-quality 18MP DSLR camera with lens kit. Perfect for photography enthusiasts and professionals.', '456 Maple Avenue, Florin', 420.00),
    ('Smartwatch', 3, 'Slightly used', 'Fitness tracker smartwatch in good working order. Monitors health and activity levels for an active lifestyle.', '789 Pine Street, Florin', 90.00),
    ('Mountain Bike', 1, 'Good condition', 'Reliable 24-speed mountain bike suitable for various terrains. Ideal for outdoor adventures and cycling enthusiasts.', '321 Elm Street, Florin', 250.00),
    ('Coffee Maker', 2, 'Used', 'Convenient programmable drip coffee machine. Perfect for brewing your favorite coffee blends at home.', '567 Birch Road, Florin', 40.00);


INSERT INTO book (user_id, author, title, content, link)
VALUES
    (1, 'John Steinbeck', 'Of Mice and Men', 
    'During the Great Depression in California, two migrant field workers -
    George Milton, an intelligent but uneducated man, and Lennie Small, a bulky,
    strong but mentally disabled man - are on their way from Soledad to another
    part of the state. They hope to one day attain the dream of settling down on
    their own piece of land. Lennies part of the dream is merely to care for and
    pet rabbits on the farm, as he loves touching soft animals, although he always
    accidentally kills them by petting them too hard. This dream is one of Lennies
    favorite stories, which George constantly retells.', 
    './assets/images/book1.jpg'),
    (2, 'Louis Sacher', 'Holes', 'Stanley Yelnats IV is wrongfully convicted of
    theft and as a consequence is sent to Camp Green Lake, a juvenile
    corrections facility.',
    './assets/images/book2.png');
