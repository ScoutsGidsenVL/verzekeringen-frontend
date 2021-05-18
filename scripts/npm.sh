#!/usr/bin/env bash command=$@

if [ -z "$command" ]
then
    echo "No command parameter given"
    exit 1
fi

docker exec -it verzekeringen.frontend npm $command
