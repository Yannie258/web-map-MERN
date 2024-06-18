require('dotenv').config(); // Load environment variables from .env
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// Function to download a file from a URL
const downloadFile = async (url, filePath) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`);
  }
  //can overwrite the old file with the new one
  const fileStream = fs.createWriteStream(filePath);
  return new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
};

// Function to read a file and return its content
const readFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Function to insert data into MongoDB
const insertIntoDatabase = async (data, collectionName) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('webmap');
    const collection = database.collection(collectionName);

    // Clear existing documents in collection
    await collection.deleteMany({});

    // Insert new data
    await collection.insertMany(data);

    console.log(`Data inserted successfully into ${collectionName}`);
  } catch (error) {
    console.error('Error inserting data into database:', error);
  } finally {
    await client.close();
  }
};

// Function to combine documents into one collection
const combineDocuments = async () => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('webmap');
    const categoriesCollection = database.collection('WEB_MAP_CATEGORIES');
    
    // Clear existing documents in CATEGORIES collection
    await categoriesCollection.deleteMany({});
    
    // Iterate over each dataset collection and combine documents into CATEGORIES
    const datasetCollections = ['SCHOOL_URL', 'KITA_URL', 'SOCIAL_SCHOOL_URL', 'TEEN_SCHOOL_URL'];
    for (const collectionName of datasetCollections) {
      const collection = database.collection(collectionName);
      const documents = await collection.find({}).toArray();
      await categoriesCollection.insertMany(documents);
      console.log(`Documents from ${collectionName} inserted into WEB_MAP_CATEGORIES`);
    }
    
    console.log('All documents combined into WEB_MAP_CATEGORIES collection');
  } catch (error) {
    console.error('Error combining documents:', error);
  } finally {
    await client.close();
  }
};

// Function to update database with files
//it will redownload datasets from sources and update changes accordingly
const updateDatabaseWithFiles = async () => {
  try {
    const urlToFileMap = {
      SCHOOL_URL: 'schulen.geojson',
      KITA_URL: 'kindertageseinrichtungen.geojson',
      SOCIAL_SCHOOL_URL: 'schulsozialarbeit.geojson',
      TEEN_SCHOOL_URL: 'jugendberufshilfen.geojson',
      // Add more mappings as needed
    };

    for (const envVar in urlToFileMap) {
      const url = process.env[envVar];
      if (!url) {
        console.error(`Environment variable ${envVar} not found.`);
        continue;
      }

      const filePath = path.join(__dirname, 'datasets', urlToFileMap[envVar]);
      await downloadFile(url, filePath);
      console.log(`File downloaded successfully for ${envVar}`);

      const fileContent = await readFile(filePath);
      const jsonData = JSON.parse(fileContent);

      await insertIntoDatabase(jsonData.features, envVar); // Assuming the data format is GeoJSON
    }

    // After inserting data into individual collections, combine into CATEGORIES
    await combineDocuments();
  } catch (error) {
    console.error('Error updating database with files:', error.message);
    throw error;
  }
};

// Example usage
updateDatabaseWithFiles();
