# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /usr/src/client

# install app dependencies
COPY ./build ./build
COPY ./.env ./

RUN npm install
RUN npm install -g serve

EXPOSE 3000

# start app
CMD serve -s build
