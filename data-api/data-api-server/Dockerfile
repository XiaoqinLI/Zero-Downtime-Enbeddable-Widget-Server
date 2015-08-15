FROM node:0.12.4

MAINTAINER Emmanuel (Manny) Narh <eanarh@gmail.com> ， Xiaoqin Vincent LI <daybreaklee@utexas.edu>

RUN mkdir /data-api

COPY ./data-api /data-api

WORKDIR /data-api

RUN npm install

CMD ["node", "index.js"]