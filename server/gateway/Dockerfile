
FROM node:22-alpine

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY  Gateway/package*.json ./gateway/

WORKDIR /app/gateway

RUN npm install

WORKDIR /app

COPY Gateway ./gateway

COPY shared ./shared

WORKDIR /app/gateway

EXPOSE 8000

CMD [ "npm" , "start"  ]
