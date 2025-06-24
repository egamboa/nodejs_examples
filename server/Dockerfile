# Dockerfile
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose port
EXPOSE 4000

# Run dev server
CMD ["npm", "run", "dev"]
