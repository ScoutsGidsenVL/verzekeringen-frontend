### Development stage
FROM node:lts-alpine as development-stage
WORKDIR /app
COPY inuits-vuejs-oidc-1.0.0.tgz package.json ./
RUN apk add --no-cache git
CMD npm install && npm run docker-dev
EXPOSE 8080
