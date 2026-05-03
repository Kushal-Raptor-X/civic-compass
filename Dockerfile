# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# We need the VITE_GEMINI_API_KEY available at build time
# Since Cloud Run source deploy doesn't pass env vars to the build stage easily, 
# we'll rely on the user having it in .env during the build, or we pass it.
# Actually, the best way for a static site is to build it locally first or pass build args.
# For simplicity, we'll copy the local .env if it exists.
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom nginx config for SPA routing and Port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run expects the container to listen on $PORT, typically 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
