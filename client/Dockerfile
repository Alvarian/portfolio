# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /usr/src/client

# install app dependencies
COPY ./public ./public
COPY ./src ./src
COPY ./package.json ./

RUN npm install 
RUN npm install -g serve

EXPOSE 3000

RUN npm run build
# start app
CMD serve -s build
