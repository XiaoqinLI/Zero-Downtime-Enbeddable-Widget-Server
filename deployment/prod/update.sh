#!/bin/bash
# update server bash script
# For full inline comments, please check the update.sh in dev directory.

RUNNING_TAG=`cat running_tag.txt`
PREFIX="prod"
NODE_ENV="production"

echo "removed old source code"
rm -rf generator

echo "pulling new version of generator source code"
git clone ssh://git@repo.advisory.com:7999/ccui/generator.git

# write latest tag
cd generator
git describe --abbrev=0 --tag > ../latest_tag.txt
LATEST_TAG=`cat ../latest_tag.txt`

cp -r ../docker-compose-gen.yml docker-compose.yml

if [ "$LATEST_TAG" == "$RUNNING_TAG" ]
then 
  echo "warning, the tags are same, did you miss a new tag for update?"
  echo "did not update"
  exit 1
else
  echo "updating new server"
  # here start node server
  echo -e "RUNNING_TAG=$LATEST_TAG-$PREFIX\nNODE_ENV=$NODE_ENV" > .env
  docker-compose -p $LATEST_TAG$PREFIX up -d &&
  # scale it to n servers
  docker-compose -p $LATEST_TAG$PREFIX scale gen=3 &&

  #stop the old servers
  docker-compose -p $RUNNING_TAG$PREFIX scale gen=0 &&
  echo $LATEST_TAG > ../running_tag.txt
fi