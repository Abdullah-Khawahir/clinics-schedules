# Stage 1: Build the Angular app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the Angular app for production
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy built files from Stage 1
COPY --from=build /app/dist/clinics-schedules-frontend /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 4200

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
