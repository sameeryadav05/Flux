
FROM node:22-alpine

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY  ./services/Agent/package*.json ./services/Agent/

WORKDIR /app/services/Agent

RUN npm install

WORKDIR /app

COPY ./services/Agent ./services/Agent/

COPY shared ./shared

WORKDIR /app/services/Agent

EXPOSE 8003

CMD [ "npm" , "start"  ]
