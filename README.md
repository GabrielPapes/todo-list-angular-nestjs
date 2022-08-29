# todo-list-angular-nestjs
Todo list made with Angular frontend and NestJS backend 

## To do
- [] Fix wrong behavior with mat-tree reseting on render.

Enter in both angular-view directory and nestjs-server and run:
```
    npm install
    ng serve # If Angular
    npm start # if NestJS
```

[Docker](https://docs.docker.com/get-started/overview/) and [docker-compose](https://docs.docker.com/compose/) are also avaliable. To run:
```
    docker-compose up
```

OBS: If you have an instance of mongo already running, comment its service on docker-compose.yml file. It'll fail if not or if you don't change its env settings. 

