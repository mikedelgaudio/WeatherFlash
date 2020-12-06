FROM node:alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src
ENV API_KEY=1c73167c3c3a9989f2e2e5afef2f6473
ENV API_ENDPOINT=https://localhost/api

COPY . /usr/src

RUN yarn install --pure-lockfile
RUN yarn run build
EXPOSE 3000
CMD yarn run start 