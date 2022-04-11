FROM node

WORKDIR /usr/src

COPY ./package*.json ./
COPY ./src ./src
COPY ./.env ./

RUN npm install

COPY ./prisma ./prisma

RUN npx prisma generate

EXPOSE 8080

CMD npx prisma migrate dev --preview-feature && npm run start
