FROM node:alpine

WORKDIR /usr/app

ENV PORT=8080 PORT_TLS=5050

COPY package*.json ./

RUN apk add --no-cache bash
RUN npm install -g npm@8.1.3
RUN npm install -g yarn --force
RUN yarn


COPY . .

EXPOSE 8080 465 80 5050 5000 3000

CMD ["yarn","dev"]
