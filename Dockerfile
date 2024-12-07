FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production

ENV PORT=4200

EXPOSE $PORT

CMD ["sh", "-c", "node server.js"]
