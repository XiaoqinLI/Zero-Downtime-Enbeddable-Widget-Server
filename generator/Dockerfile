FROM node:0.12.4

MAINTAINER Emmanuel (Manny) Narh <narhe@advisory.com> ， Xiaoqin Vincent LI <daybreaklee@utexas.edu>

RUN mkdir /generator

COPY ./ /generator

WORKDIR /generator

RUN npm install

ENV RUNNING_TAG=2.0.0

CMD ["node", "app.js"]