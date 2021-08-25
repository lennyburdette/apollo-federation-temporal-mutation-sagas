FROM node:14
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH "$PATH:/root/.cargo/bin"

WORKDIR /web

COPY package.json yarn.lock ./
RUN yarn install

COPY src src/
RUN yarn build:server

COPY schema.graphql ./

USER node
CMD yarn start:server
