## Development stage
FROM  node:14-alpine as development-stage
RUN apk add --no-cache git

WORKDIR /app
ENTRYPOINT ["/entrypoint.sh"]

COPY docker/entrypoint*.sh /
COPY package*.json ./

RUN npm install

COPY . .

# EXPOSE 8080

# FROM  node:14-alpine as development-stage
# WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
# RUN npm ci --production && npm clean cache --force
# CMD ["node", "server.js"]