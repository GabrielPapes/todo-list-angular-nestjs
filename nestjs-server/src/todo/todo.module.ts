import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TodoController } from "./controllers/todo.controller";
import { Todo, TodoSchema } from "./models/todo.schema";
import { TodoService } from './services/todo.service';
import { SubtodoController } from './controllers/subtodo.controller';
import { SubtodoService } from './services/subtodo.service';


@Module({
    imports: [
        MongooseModule.forFeature([{name: Todo.name, schema: TodoSchema}]),
    ],
    controllers: [
        TodoController,
        SubtodoController,
    ],
    providers: [
        TodoService,
        SubtodoService
    ]
})
export class TodoModule {}