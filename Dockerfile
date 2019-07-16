FROM node:10.16.0-alpine

COPY public public
COPY src src
COPY package.json /
COPY package-lock.json /
RUN npm ci
RUN npm run build
COPY server.js /

EXPOSE 8000

CMD node server.js