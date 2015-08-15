#!/bin/bash
# update server bash script

# get the current running version/tag
RUNNING_TAG=`cat running_tag.txt`
PREFIX="dev"
NODE_ENV="development"

echo "removed old source code"
rm -rf generator

echo "pulling new version of generator source code"
git clone ssh://git@repo.advisory.com:7999/ccui/generator.git

#get in generator and write latest tag  
cd generator
git describe --abbrev=0 --tag > ../latest_tag.txt
LATEST_TAG=`cat ../latest_tag.txt`

# prepare docker iamges builder file in the deployment directory
cp -r ../docker-compose-gen.yml docker-compose.yml

if [ "$LATEST_TAG" == "$RUNNING_TAG" ]
then 
  # if the new tag is the same as the current running tag, then it stops updating and report as an error.
  echo "warning, the tags are same, did you miss a new tag for update?"
  echo "did not update"
  exit 1
else
  echo "updating new server"
  # writing current node deploy environmet and running_tag, which is same as lastest tag, into system environment configuration file: .env
  echo -e "RUNNING_TAG=$LATEST_TAG-$PREFIX\nNODE_ENV=$NODE_ENV" > .env

  # here start node server using compose again.
  docker-compose -p $LATEST_TAG$PREFIX up -d &&

  # scale it to n servers
  docker-compose -p $LATEST_TAG$PREFIX scale gen=3 &&

  #stop the old servers by scaling it down to zero.
  docker-compose -p $RUNNING_TAG$PREFIX scale gen=0 &&
  echo $LATEST_TAG > ../running_tag.txt
fi

