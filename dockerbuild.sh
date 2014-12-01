#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
npm install
bower install
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t aevarisak/tictactoe .

echo "Done"
