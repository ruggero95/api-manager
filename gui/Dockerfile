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
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh ./
# Make the entrypoint executable
RUN chmod +x ./entrypoint.sh
# Expose ports 
EXPOSE 80
# Run entrypoint
ENTRYPOINT [ "./entrypoint.sh" ]
