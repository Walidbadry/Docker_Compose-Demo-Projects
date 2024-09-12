# Use an official Node image to build the Angular app
FROM node:14 as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use nginx as the web server for Angular
FROM nginx:alpine
COPY --from=build /app/dist/angular-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80
