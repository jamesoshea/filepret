FROM node:10.16.0-alpine

COPY package.json /
COPY package-lock.json /
RUN npm ci
COPY public public
COPY src src
RUN npm run build
COPY server server

EXPOSE 8000

CMD node server