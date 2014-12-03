#!/bin/bash

sudo docker kill tictactoe
sudo docker rm `docker ps -a -q`
sudo docker pull aevarisak/tictactoe
sudo docker run --name tictactoe -p 80:8080 -d -e "NODE_ENV=production" aevarisak/tictactoe
echo "Done"
