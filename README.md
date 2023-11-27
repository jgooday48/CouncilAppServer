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
- Run `docker compose up -d`
- Run `npm run setup-db`
- Run `npm run dev`
