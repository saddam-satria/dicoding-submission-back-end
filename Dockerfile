FROM node:14.17-alpine

WORKDIR /dicoding-submission

COPY package.json ./

RUN npm install

COPY . ./

CMD [ "npm", "start" ]

