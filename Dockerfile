FROM node:boron

COPY ./ /slack-invitation

WORKDIR /slack-invitation

RUN npm i --production \
  && npm build

EXPOSE 3000

CMD ["npm", "start"]
