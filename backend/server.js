const express = require("express");
const app = express();
const cors = require("cors");
const Users = require("./routes/user.routes");
const Categories = require("./routes/map.routes");
const ThirdWebService = require("./routes/webservice_extern.routes");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");

dotenv.config();

const allowedOrigins = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  process.env.HOST_URL,
];
console.log("HOST_URL", process.env.HOST_URL);

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      console.log("CORS is OK", origin);
      callback(null, true);
    } else {
      console.log("CORS!!", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable preflight requests for all routes

//avoid cors error when a webpage makes a request to a different domains
// app.use(function (req, res, next) {
//   //website wish to connect
//   // res.setHeader("Access-Control-Allow-Origin", process.env.HOST_URL);
//   // //Request methods to allow
//   // res.setHeader(
//   //   "Access-Control-Allow-Methods",
//   //   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   // );
//   //Request headers to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   //Set to true if you need the website to include cookies in the requests sent
//   //to the API (e.g. in case you use sessions)
//   // res.setHeader("Access-Control-Allow-Credentials", true);
//   // Pass to next layer of middleware
//   next();
// });

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());
//dotenv helps to use file .env

// transform request data to json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongoDB database
// const mongoDbUrl = 'mongodb://127.0.0.1:27017/webmap'
const mongoDbUrl = process.env.MONGO_URI;

mongoose
  .connect(mongoDbUrl)
  .then(() => console.log("MongoDB connected ... "))
  .catch((err) => console.log(err));

app.use(
  session({
    secret: process.env.JWT_SECRETE_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoDbUrl }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // this cookie can be safe max. 1 day on browser
  })
);

//Add middleware to handle routes related to data.
// get object from schema
app.use("/api/webmap/v1", Users);
app.use("/api/webmap/v1", Categories);
app.use("/api/webmap/v1", ThirdWebService);

// define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
