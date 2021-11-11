### Development stage
FROM  node:current-alpine3.14 as development-stage
RUN apk add --no-cache git

WORKDIR /app
ENTRYPOINT ["/entrypoint.sh"]

COPY docker/entrypoint*.sh /
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
