FROM node:16.10.0 as build
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.18.0
COPY config/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]