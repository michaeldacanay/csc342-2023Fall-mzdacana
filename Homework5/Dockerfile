FROM node:lts

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose the port that your Express app will run on
EXPOSE 80

# Start your Express app
CMD ["node", "server.js"]
