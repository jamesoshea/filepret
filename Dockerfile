FROM node:10.16.0-alpine

RUN mkdir frontend
COPY frontend/package.json frontend/package.json
COPY frontend/package-lock.json frontend/package-lock.json
COPY frontend/public frontend/public
COPY frontend/src frontend/src
WORKDIR /frontend
RUN npm ci
RUN npm run build
WORKDIR /
COPY server.js /
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

EXPOSE 8000

CMD node server.js