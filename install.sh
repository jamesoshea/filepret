#!/bin/sh

mkdir build
docker-compose up -d
docker-compose stop webserver
mkdir dhparam
sudo openssl dhparam -out /home/${UBUNTU_USERNAME}/filepret/dhparam/dhparam-2048.pem 2048
docker-compose up -d --force-recreate --no-deps webserver
