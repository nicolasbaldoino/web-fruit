FROM node:20-alpine

RUN apk add --no-cache \
    python3 \
    py3-pip \
    g++ \
    make

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
