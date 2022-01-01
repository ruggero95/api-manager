FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app
COPY . .

# Expose 
EXPOSE 3000

# Run command 
CMD [ "npm", "start" ]
