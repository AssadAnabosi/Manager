FROM node:18.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --include-dev

COPY . .

RUN npm install --prefix client

RUN npm run build --prefix client

EXPOSE 5000

CMD [ "npm", "start" ]