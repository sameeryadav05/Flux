
FROM node:22-alpine

WORKDIR /app

COPY  package*.json ./

RUN npm ci

COPY  ./services/Agent/package*.json ./services/Agent/

WORKDIR /app/services/Agent

RUN npm ci

WORKDIR /app

COPY ./services/Agent ./services/Agent/

COPY shared ./shared

WORKDIR /app/services/Agent

EXPOSE 8003

CMD [ "npm" , "start"  ]
