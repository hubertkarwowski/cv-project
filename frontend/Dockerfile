FROM node:25-alpine3.22

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN chown -R node:node /app

USER node

EXPOSE 5173

CMD ["npm", "run", "docker:dev"]