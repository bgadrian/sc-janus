FROM node:latest

RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app

WORKDIR /usr/src/app
RUN npm install

COPY . /usr/src/app

CMD [ "node", "./lib/index.js" ]