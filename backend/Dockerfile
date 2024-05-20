# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your Node.js application listens on (e.g., 3000)
EXPOSE 5000

# Start the Node.js application
CMD ["npm", "start"]