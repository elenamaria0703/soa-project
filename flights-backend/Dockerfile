FROM node:16

WORKDIR /app


COPY package*.json ./

RUN npm install -g npm@9.4.2

RUN npm install -g @nestjs/cli

RUN npm install

COPY . .

EXPOSE 5050
CMD [ "npm", "start" ]