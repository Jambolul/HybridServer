# AniVault

- This application is made inspired from "Anilist". The idea is that you can share which animes you have watched or plan to watch, you can rate them and so on. You can also like other \* peoples posts and comment on them if you want to share some thoughts about it.

## Link to the application

- [AniVault](http://10.120.32.74/)

## Backend/Api

- [auth-api](https://10.120.32.74/auth-api/api/v1)
- [upload-api](https://10.120.32.74/upload-api/api/v1)
- [media-api](http://10.120.32.74/media-api/graphql)
- [graphql](http://10.120.32.74/media-api/)

## apidoc

- [auth-api](https://10.120.32.74/auth-api/)
- [upload-api](https://10.120.32.74/upload-api/)
- [graphql](https://github.com/Jambolul/HybridServer/blob/main/hybrid-graphql/graphql.md)

## Functionalities

- Login, logout, registering.
- Look at your own profile data.
- You can upload items, with a image, title and description.
- View the list of everyones posts, see what people posted and how they rated it and some other information.
- View everyones posts and delete your own posts.
- Like your own and others posts, comment on them, rate and assign status tags on your own posts.

## Ideas that are a work in progress

- Make the visuals look even better.
- Add the possibility to edit your own user information.
- Make it possible to edit your posts.
- Create nicer modal popups instead of alerts.
- Possibility to add people to friendslist maybe.

## Bugs that i so far know of

- If the page is refreshed for example in the profile page, you get a "Not Found" page.

- ![picture of the database](image.png)

```sql
-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS MediaSharingApp;
CREATE DATABASE MediaSharingApp;
USE MediaSharingApp;

-- Create the tables

CREATE TABLE UserLevels (
    level_id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(50) NOT NULL
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_level_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(level_id)
);

CREATE TABLE MediaItems (
    media_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    filesize INT NOT NULL,
    media_type VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    rating_value INT NOT NULL CHECK (rating_value BETWEEN 1 AND 10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL
);

CREATE TABLE MediaItemTags (
    media_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (media_id, tag_id),
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
);

-- Add the Status table
CREATE TABLE Status (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL
);

-- Add the linking table MediaItemStatus
CREATE TABLE MediaItemStatus (
    media_id INT NOT NULL,
    status_id INT NOT NULL,
    PRIMARY KEY (media_id, status_id),
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (status_id) REFERENCES Status(status_id)
);
```

## Screenshots

![picture of the homepage](image-1.png)
![profile page](image-2.png)
![upload page](image-3.png)
![viewpage part1](image-4.png)
![viewpage part2](image-5.png)
