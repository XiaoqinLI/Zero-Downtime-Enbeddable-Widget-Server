#!/bin/bash
# My example bash script

docker stop dataapiserver
docker rm dataapiserver

git clone -b development ssh://git@repo.advisory.com:7999/ccui/data-api.git

docker build -t daybreakee/data-api-server .
docker run -e "mongoose_url=ATXCMALAPP-D04.devid.local:27017/internDatabase" --name dataapiserver -d -p 3000:1337 daybreakee/data-api-server

rm -rf data-api