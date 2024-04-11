FROM node:18-alpine AS base

WORKDIR /app

ENV NODE_ENV development

COPY package*.json ./

RUN yarn install --network-timeout 10000000

COPY . .

EXPOSE 3000

ENV PORT 3000

CMD [ "yarn", "run", "dev" ]