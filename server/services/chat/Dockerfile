
FROM node:22-alpine

WORKDIR /app

COPY  package*.json ./

RUN npm ci

COPY  ./services/Chat/package*.json ./services/Chat/

WORKDIR /app/services/Chat

RUN npm ci

WORKDIR /app

COPY ./services/Chat ./services/Chat/

COPY shared ./shared

WORKDIR /app/services/Chat

EXPOSE 8002

CMD [ "npm" , "start"  ]