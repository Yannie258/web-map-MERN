# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Ensure Vite is installed globally
RUN npm install -g vite

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite.js application
RUN npm run build

# Install a lightweight web server to serve the static files
RUN npm install -g serve

# Expose the port that the application will run on
EXPOSE 3000

# Command to serve the built application
CMD ["serve", "-s", "dist", "-l", "3000"]
