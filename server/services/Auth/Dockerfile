
FROM node:22-alpine

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY  ./services/Auth/package*.json ./services/Auth/

WORKDIR /app/services/Auth

RUN npm install

WORKDIR /app

COPY ./services/Auth ./services/Auth/

COPY shared ./shared

WORKDIR /app/services/Auth

EXPOSE 8001

CMD [ "npm" , "start"  ]