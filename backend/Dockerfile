# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon dotenv node-fetch fs path mongodb

# Copy app files.
COPY . .

# Expose the port the app runs on.
EXPOSE 5000

# Run the database initialization and start the server using nodemon.
CMD ["sh", "-c", "npm run initDatabase && npm run serve"]
