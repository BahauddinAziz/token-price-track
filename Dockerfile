FROM node:18-alpine

WORKDIR /usr/src/hyperhire_assignment

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]