#!/bin/bash

cd `dirname $0`/..

if [[ -f "$1" ]]; then
  echo "Using given '$1' as .env"
  cp "$1" .env
fi

if [[ ! -f .env ]]; then
  echo "Missing .env file, provide one as argument"
  exit 1
fi

. .env

if [[ "${NPM_TOKEN}" == "" ]]; then
  echo "Missing NPM_TOKEN for nexus.inuits.io. Use scripts/npm-token.sh to generate the .env file"
  exit 1
fi

docker build -t  verzekeringen.frontend:local --target production-stage --build-arg NPM_TOKEN=${NPM_TOKEN} -f docker/Dockerfile ./
