#!/bin/bash

set -exo pipefail

echo "Connecting to deploy server"
ssh -o StrictHostKeyChecking=no -t -t root@178.62.64.70'
docker kill tictactoe;
docker rm `docker ps -a -q`;
docker pull aevarisak/tictactoe;
docker run --name tictactoe -p 80:8080 -d -e "NODE_ENV=production" aevarisak/tictactoe;
'
echo "Done"
