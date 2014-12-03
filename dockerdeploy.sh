#!/bin/bash

set -exo pipefail

echo "Connecting to deploy server"
ssh -t -t root@178.62.64.70 bash -c "'
docker kill $(docker ps -q);
docker rm `docker ps -a -q`;
docker pull aevarisak/tictactoe;
docker run -p 80:8080 -d -e "NODE_ENV=production" aevarisak/tictactoe;
'"
echo "Done"
