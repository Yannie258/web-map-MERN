# Backend for MERN Stack Application

This is a basic web application built using the MERN stack (MongoDB, Express.js, React, and Node.js).

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm are installed.
- MongoDB is installed and running.
- git bash is installed 

## Tech
The backend of this application is built using the following technologies:
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database program that uses JSON-like documents with optional schemas.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`.
- **cors**: A middleware for enabling Cross-Origin Resource Sharing (CORS) with various options.
- **nodemon**: A utility that monitors for any changes in your source and automatically restarts your server (used in development).
- **axios**: a simple promise based HTTP client for the browser and node.js. .

## Installation for backend

Install the dependencies and devDependencies and start the server.
```sh
npm install
```
### Initialize database
```sh
nodemon initDatabase
```
### Make sure that you got MongoDB account and a database instance
### it should be better when you can install MongoDB Compass and ready to connect to your cluster
add your connectstring inside file .env add:
```sh
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.vkth2cd.mongodb.net/
```
### Run 
run server file with this script:
```sh
nodemon start
```
Server will in in port 5000
- ex: categories
```sh
127.0.0.1:5000/api/webmap/v1/categories/all
```
- ex: users
```sh
127.0.0.1:5000/api/webmap/v1/users/all
```

## License
- [Yen Nguyen](https://www.linkedin.com/in/yen-nguyen-521997207/)