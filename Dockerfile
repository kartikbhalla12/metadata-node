# Use Node.js 18 LTS as the base image
FROM --platform=linux/amd64 node:18-alpine


# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application source and .env file
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD [ "node", "app.js" ] 