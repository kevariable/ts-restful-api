FROM node:lts-alpine3.18 AS base

WORKDIR /app

RUN apk add yarn

COPY *.json .

RUN yarn install

COPY . .
