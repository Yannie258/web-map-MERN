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

### Install the dependencies 
- open git bash inside backend directory and run
```sh
npm install 
```

### Set environment variable

- Create file .env and add your connectstring inside:
```sh
touch .env
```
-  Add variables to file .env 
```sh
HOST_URL=http://127.0.0.1:3000
PORT=5000

MONGO_URI=

SCHOOL_URL=
KITA_URL=
SOCIAL_SCHOOL_URL=
TEEN_SCHOOL_URL=

JWT_SECRETE_KEY=

```

* When use MongoDB Cloud:
```sh
MONGO_URI=mongodb+srv://<username>:<password>@<hostname>/webmap
```

* When use MongoDB Compass
```sh
MONGO_URI=mongodb://127.0.0.1:27017/webmap
```
> Note: `/webmap` is the default database name 
- This string is different based on your connection method to cluster

* Setup variables for category urls: 
- Add more variables to initiate Database from datasets [Open Data Chemnitz Portal](https://portal-chemnitz.opendata.arcgis.com/)
- This app serves for 4 categories:
 a. [schools (Grundschule, Oberschule, Förderschule, Gymnasium, Berufsbildende Schule, …)](https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::schulen/about) - [Example here](https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson)
b. [kindergarden (Kindertageseinrichtungen)](https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::kindertageseinrichtungen/about) - [Example here](https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson)
c. [social child projects (Schulsozialarbeit)](https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::schulsozialarbeit/about) - [Example here](https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulsozialarbeit_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson)
d. [social teenager projects ( Jugendberufshilfe)](https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::jugendberufshilfen/about) - [Example here](https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Jugendberufshilfen_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson)

>Note: 
*Data can be changed by administrator of the portal anytime 
*[ArcGIS API](https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson) services provide Geojson format, you can custom query to get the necessary attributes, I would like keep all in default for easy testing
```sh
SCHOOL_URL=<API_resoure_for_SCHOOL>
KITA_URL=<API_resoure_for_KITA>
SOCIAL_SCHOOL_URL=<API_resoure_for_SOCIAL_SCHOOL>
TEEN_SCHOOL_URL=<API_resoure_for_TEEN_SCHOOL>
```

* Set environment variable for server
```sh
JWT_SECRETE_KEY=<YOUR_OWN_SECRETE_KEY>
PORT=5000
HOST_URL=http://127.0.0.1:3000
```
>Note: JWT Key can be anything just you know

## Initialize database
- Make sure that you got MongoDB account and install Mongo Compass or use Mongo Atlas Clouds
- Your MongoDB should be already connected to your cluster

### Run initiate Database
This code will create a collection WEB_MAP_CATEGORIES for all categories, which contains all documents of them
```sh
npm run initDatabase
```
### Run 
run server file with this script:
```sh
npm run serve
```
Server will run in port 5000
- ex: categories endpoint
```sh
127.0.0.1:5000/api/webmap/v1/categories/all
```
- ex: users endpoint
```sh
127.0.0.1:5000/api/webmap/v1/users/all
```

## License
- [Yen Nguyen](https://www.linkedin.com/in/yen-nguyen-521997207/)
- Git Repo: https://github.com/Yannie258/web-map-MERN