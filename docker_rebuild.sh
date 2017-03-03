#!/usr/bin/env bash

#setup your config.js BEFORE call this script!

docker stop janusbot #stop the running container
docker rm janusbot #delete the old container
docker rmi janusbot #delete the old image

#build a docker image with the current folder && create a container out of it && start the container
docker build -t janusbot . && docker run -tid --name janusbot --restart=always janusbot && docker start janusbot
