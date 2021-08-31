FROM node:8-alpine

WORKDIR /app

ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install 
RUN npm build 
COPY . /app
# LND Node configuration 

EXPOSE 3000 
EXPOSE 50051
EXPOSE 8080

ENV port=3000
ENV apmLogging=true
ENV apmServiceName="Testing Tool"
# TODO remove on commit 
ENV apmSecretToken=""
ENV apmURL=""


CMD ["npm", "run", "start:prod"]