FROM node:alpine

USER node

RUN mkdir -p /home/node/dsf-interlup
WORKDIR /home/node/dsf-interlup

COPY --chown=node:node . .
RUN npm install

CMD ['npm', 'start']