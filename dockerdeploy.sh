#!/bin/bash

set -exo pipefail

#export PATH=$PATH:/usr/local/bin

#echo "Connecting to deploy server"
#ssh -o StrictHostKeyChecking=no -t -t root@178.62.64.70'
#bash -s;
docker kill tictactoe
docker rm `docker ps -a -q`
docker pull aevarisak/tictactoe
docker run --name tictactoe -p 80:8080 -d -e "NODE_ENV=production" aevarisak/tictactoe
#echo "Done"
