FROM node:14-alpine

WORKDIR /web

COPY package.json yarn.lock ./
RUN yarn install

COPY schema.graphql ./
COPY src src/

USER node
CMD node src/index.js
