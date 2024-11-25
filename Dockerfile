FROM node:20-alpine

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    g++ \
    make \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
