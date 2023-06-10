FROM node:slim

ENV NODE_ENV development

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3000
