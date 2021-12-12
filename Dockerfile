FROM node:16-alpine AS prod

WORKDIR /usr/app

COPY package*.json ./

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN apk add --no-cache bash
RUN npm install -g npm@8.1.3
RUN npm install -g yarn --force
RUN yarn


COPY . .

EXPOSE 8080 465 80 5050 5000 3000 9229

CMD ["yarn","dev"]
