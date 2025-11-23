FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Ensure public assets are included (VERY IMPORTANT)
COPY public ./public

# Build React app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
