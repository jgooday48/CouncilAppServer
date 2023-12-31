# CouncilAppServer

## About
This is the repo for the backend of a council website


## Instructions for installation
- Clone this repo
- Run `npm i` in the console
- Run `touch .env` in the console
- Copy and paste DB_URL=postgres://username:password@localhost:port/, PORT=3000 and BCRYPT_SALT_ROUNDS= into the .env file
- Replace username, password and port with your credentials and add a number to the bcrypt salt rounds
- Open docker
- Run `docker pull postgres` in the console to install the postgres image (or check that it is installed)
- Run `docker compose up -d` to run the container in the background
- Run `npm run setup-db` to seed the database
- Run `npm run dev` to start up the server
- Once the server is running, see the [client side repo](https://github.com/jgooday48/CouncilAppClient) 
## Technologies
- JavaScript
- Express.js
