#!/bin/bash
# Start QA deployment
# For full inline comments, please check the run.sh in dev directory.

PREFIX="qa"
VIRTUALHOST="qa_gen"
PORT="90"
NODE_ENV="development"

# delete previously cloned directories
rm -rf generator nginx && 
git clone ssh://git@repo.advisory.com:7999/ccui/generator.git

# write latest tag
cd generator
git describe --abbrev=0 --tag > ../latest_tag.txt
LATEST_TAG=`cat ../latest_tag.txt` && cd ..

# prepare nginx template file and generator docker iamges builder file in the deployment directory
cp -r ./docker-compose-gen.yml ./generator/docker-compose.yml
cp -r ../shared/nginx ./

echo -e "RUNNING_TAG=$LATEST_TAG-$PREFIX\nNODE_ENV=$NODE_ENV" > ./generator/.env
echo '{{$currentHost := "'$VIRTUALHOST'"}} {{$hostPort := "'$PORT'"}}'|cat - ./nginx/nginx.tmpl > out && mv out ./nginx/nginx.tmpl

# compose will fire up nginx and docker-gen nginx configuration generator
docker-compose -p $PREFIX up -d &&

# here start node server
cd ./generator
docker-compose -p $LATEST_TAG$PREFIX up -d &&

# scale it to n servers
docker-compose -p $LATEST_TAG$PREFIX scale gen=3 &&

# LATEST_TAG is now RUNNING_TAG
echo $LATEST_TAG > ../running_tag.txt