# Build environment
FROM node:lts as build
# Create app directory
WORKDIR /usr/src/app
# Set environments
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# Install app dependencies
COPY package*.json ./
RUN npm install --no-dev
# Copy app
COPY . .
# Build
RUN npm run build

# Production environment
FROM nginx:alpine
# Create app directory
WORKDIR /usr/src/app
# Copy app
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# Expose ports 
EXPOSE 80
