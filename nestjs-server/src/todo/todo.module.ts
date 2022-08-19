import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SubtodoController } from "./controllers/subtodo.controller";
import { TodoController } from "./controllers/todo.controller";
import { Subtodo, SubtodoSchema } from "./models/subtodo.schema";
import { Todo, TodoSchema } from "./models/todo.schema";
import { TodoService } from './services/todo.service';


@Module({
    imports: [
        MongooseModule.forFeature([{name: Todo.name, schema: TodoSchema}, {name: Subtodo.name, schema: SubtodoSchema}]),
    ],
    controllers: [
        TodoController,
        SubtodoController,
    ],
    providers: [
        TodoService
    ]
})
export class TodoModule {}