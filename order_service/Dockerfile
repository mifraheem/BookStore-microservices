FROM node:22-slim

RUN apt-get update && apt-get install -y python3 make g++ sqlite3 libsqlite3-dev

# Creating app working directory
WORKDIR /app

# Copying package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start"]
