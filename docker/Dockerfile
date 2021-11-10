### Development stage
FROM  node:14.18.1-alpine as development-stage
RUN apk add --no-cache git

WORKDIR /app
ENTRYPOINT ["/entrypoint.sh"]

COPY docker/entrypoint*.sh /
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
