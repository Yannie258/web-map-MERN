import dotenv from "dotenv"; // Load environment variables
import fetch from "node-fetch";
import { existsSync, mkdirSync, createWriteStream, readFile as _readFile } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { MongoClient, ServerApiVersion } from "mongodb";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Manually specify `.env` path (Go up one directory from current file) because this file is not direct from root
dotenv.config({ path: resolve(__dirname, "../.env") });
const MONGODB_CLOUD_URL = process.env.MONGODB_CLOUD;

if (!MONGODB_CLOUD_URL) {
  console.error(" Error: MONGODB_CLOUD is not set in .env");
  process.exit(1);
}

// MongoDB Connection Function
const connectToDatabase = async () => {
  try {
    const client = new MongoClient(MONGODB_CLOUD_URL, {
      serverApi: ServerApiVersion.v1,
      connectTimeoutMS: 10000,
      tls: true,
    });

    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");
    return client;
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

// Download a file from a URL
const downloadFile = async (url, filePath) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to download file: ${response.statusText}`);

    // Ensure directory exists
    const dirname = join(__dirname, "datasets");
    if (!existsSync(dirname)) {
      mkdirSync(dirname, { recursive: true });
    }

    // Overwrite the old file with the new one
    const fileStream = createWriteStream(filePath);
    return new Promise((resolve, reject) => {
      response.body.pipe(fileStream);
      response.body.on("error", reject);
      fileStream.on("finish", resolve);
    });
  } catch (error) {
    console.error(` Error downloading file from ${url}:`, error.message);
    throw error;
  }
};

// Read a file and return its content
const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    _readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

// Insert data into MongoDB
const insertIntoDatabase = async (client, data, collectionName, name) => {
  try {
    const database = client.db("web-map");
    const collection = database.collection(collectionName);

    // Clear existing documents
    await collection.deleteMany({});

    // Add name property to each document
    const updatedData = data.map((doc) => ({ ...doc, name }));

    // Insert new data
    await collection.insertMany(updatedData);
    console.log(`Data inserted successfully into ${collectionName}`);
  } catch (error) {
    console.error("Error inserting data into database:", error);
  }
};

// Combine documents into one collection
const combineDocuments = async (client) => {
  try {
    const database = client.db("web-map");
    const categoriesCollection = database.collection("WEB_MAP_CATEGORIES");

    // Clear existing documents
    await categoriesCollection.deleteMany({});

    // Merge documents from different collections
    const datasetCollections = ["SCHOOL_URL", "KITA_URL", "SOCIAL_SCHOOL_URL", "TEEN_SCHOOL_URL"];
    for (const collectionName of datasetCollections) {
      const collection = database.collection(collectionName);
      const documents = await collection.find({}).toArray();
      if (documents.length > 0) {
        await categoriesCollection.insertMany(documents);
        console.log(`Data from ${collectionName} added to WEB_MAP_CATEGORIES`);
      } else {
        console.warn(`No data found in ${collectionName}`);
      }
    }

    console.log("All documents combined into WEB_MAP_CATEGORIES collection.");
  } catch (error) {
    console.error("Error combining documents:", error);
  }
};

// Update database with files
const updateDatabaseWithFiles = async () => {
  const client = await connectToDatabase();

  try {
    const urlToFileMap = {
      SCHOOL_URL: "schulen.geojson",
      KITA_URL: "kindertageseinrichtungen.geojson",
      SOCIAL_SCHOOL_URL: "schulsozialarbeit.geojson",
      TEEN_SCHOOL_URL: "jugendberufshilfen.geojson",
    };

    const envVarToNameMap = {
      SCHOOL_URL: "School",
      KITA_URL: "Kindergarten",
      SOCIAL_SCHOOL_URL: "Social Child Projects",
      TEEN_SCHOOL_URL: "Social Teenager Projects",
    };

    for (const envVar in urlToFileMap) {
      const url = process.env[envVar];
      if (!url) {
        console.error(`⚠️ Skipping ${envVar} - No environment variable found.`);
        continue;
      }

      const filePath = join(__dirname, "datasets", urlToFileMap[envVar]);
      await downloadFile(url, filePath);
      console.log(` File downloaded successfully for ${envVar}`);

      const fileContent = await readFile(filePath);
      const jsonData = JSON.parse(fileContent);

      const name = envVarToNameMap[envVar]; // Get the corresponding name
      await insertIntoDatabase(client, jsonData.features, envVar, name);
    }

    // Combine collections into a single category collection
    await combineDocuments(client);
  } catch (error) {
    console.error("Error updating database with files:", error.message);
  } finally {
    await client.close();
  }
};

// Run the update function
updateDatabaseWithFiles().catch((err) => {
  console.error("Fatal error:", err);
});
