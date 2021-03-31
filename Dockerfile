FROM node:alpine 
RUN mkdir -p /usr/src
WORKDIR /usr/src
ENV API_KEY=${arg_API_KEY}
ENV API_ENDPOINT=${arg_API_ENDPOINT}

COPY . /usr/src
RUN yarn install --pure-lockfile
RUN yarn run build
EXPOSE 80
EXPOSE 443
CMD yarn run start