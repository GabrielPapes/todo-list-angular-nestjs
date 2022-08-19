FROM node:16.10.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

ENV TZ="America/Sao_Paulo"

RUN npm run build
CMD ["sh", "-c", "npm run start:prod"]