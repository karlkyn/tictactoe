#!/bin/bash

set -exo pipefail

echo "Connecting to deploy server"
ssh -t -t root@178.62.64.70

echo "Stopping Docker"
docker kill $(docker ps -q)

echo "Deleting old containers"
docker rm `docker ps -a -q`

echo "Pulling Docker repository"
docker pull aevarisak/tictactoe

echo "Running Docker image"
docker run -p 80:8080 -d -e "NODE_ENV=production" aevarisak/tictactoe

echo "Done"
