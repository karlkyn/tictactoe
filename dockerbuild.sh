#!/bin/bash

set -exo pipefail

echo "Cleaning..."
rm -rf ./dist

echo "Building app"
rm -rf node_modules && npm i
bower install
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo "Building docker image"
docker build -t aevarisak/tictactoe .

echo "Pushing docker image"
docker push aevarisak/tictactoe

echo "Done"
