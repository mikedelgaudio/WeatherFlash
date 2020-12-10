FROM node:alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src
ENV API_KEY=YOUR_API_KEY
ENV API_ENDPOINT=http://localhost/api

COPY . /usr/src

RUN yarn install --pure-lockfile
RUN yarn run build
EXPOSE 80
EXPOSE 443
CMD yarn run start 