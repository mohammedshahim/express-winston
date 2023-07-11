# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci --only=production

# Copy the application code to the working directory
COPY . .

# Rename .env.production to .env
RUN mv .env.production .env

# Expose port 4000 for the application
EXPOSE 4000

# Set the environment variable to use .env file
ENV NODE_ENV=production
ENV DOTENV_CONFIG_PATH=.env

# Start the Node.js application
CMD ["node", "server.js"]
