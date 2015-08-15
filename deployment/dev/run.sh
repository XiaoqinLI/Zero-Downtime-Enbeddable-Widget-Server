#!/bin/bash
# start dev environment deploy

PREFIX="dev"
# specifying virtual home name for docker-gen watchman
VIRTUALHOST="dev_gen"    
PORT="88"
NODE_ENV="development"

# delete previously cloned directories and nginx configuration files if there is any. 
rm -rf generator nginx &&
git clone ssh://git@repo.advisory.com:7999/ccui/generator.git

# get the lastest tag from generator repo and write it to latest_tag.txt file
cd generator
git describe --abbrev=0 --tag > ../latest_tag.txt
LATEST_TAG=`cat ../latest_tag.txt` && cd ..

# prepare nginx template file and generator docker iamges builder file in the deployment directory
cp -r ./docker-compose-gen.yml ./generator/docker-compose.yml
cp -r ../shared/nginx ./

# writing current node deploy environmet and running_tag, which is same as lastest tag, into system environment configuration file: .env
echo -e "RUNNING_TAG=$LATEST_TAG-$PREFIX\nNODE_ENV=$NODE_ENV" > ./generator/.env
# writing virtual host name and host port number into nginx.tmpl as the first line for nginx configuration and update
echo '{{$currentHost := "'$VIRTUALHOST'"}} {{$hostPort := "'$PORT'"}}'|cat - ./nginx/nginx.tmpl > out && mv out ./nginx/nginx.tmpl

# docker compose will fire up nginx and docker-gen nginx configuration file-generator images and running them in containers respectively. 
docker-compose -p $PREFIX up -d &&

# here start node server using compose again.
cd ./generator
docker-compose -p $LATEST_TAG$PREFIX up -d &&

# scale it to n servers
docker-compose -p $LATEST_TAG$PREFIX scale gen=3 &&

# LATEST_TAG is now RUNNING_TAG, so writing it down into running_tag for future update.
echo $LATEST_TAG > ../running_tag.txt