# ===== Stage 1: Build Angular =====
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy full source code
COPY . .

# Build Angular application for production
RUN npm run build --configuration=production

# ===== Stage 2: Serve with Nginx =====
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular files from builder stage
# For Angular 17+ with SSR/application builder, static files are inside /browser
COPY --from=builder /app/dist/demo_angular/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]