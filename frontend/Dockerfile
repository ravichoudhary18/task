# ---------- Stage 1: Build ----------
FROM node:20-alpine AS build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# Copy all source code
COPY . .

# Build the frontend
RUN pnpm build

# ---------- Stage 2: Production ----------
FROM nginx:alpine

# Copy build output to nginx html
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
