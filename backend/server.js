const express = require('express')
const app = express()
const cors = require('cors')
const Users = require('./routes/user.routes');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8000
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');

const corsOptions = {
  origin: 'http://127.0.0.1:3000', // Replace with your frontend URL
  credentials: true,
};

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());
//dotenv helps to use file .env
dotenv.config();

//avoid cors error when a webpage makes a request to a different domains
app.use(cors(corsOptions));
// transform request data to json format
app.use(express.json())

// connect to mongoDB database
const mongoDbUrl = 'mongodb://127.0.0.1:27017/webmap'

mongoose
  .connect(mongoDbUrl)
  .then(() => console.log('MongoDB connected ... '))
  .catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Add middleware to handle routes related to data.
// get object from schema
app.use('/api/webmap/v1/users', Users)

// define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
