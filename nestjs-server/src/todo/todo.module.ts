import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TodoController } from "./controllers/todo.controller";
import { Todo, TodoSchema } from "./models/todo.schema";
import { TodoService } from './services/todo.service';


@Module({
    imports: [
        MongooseModule.forFeature([{name: Todo.name, schema: TodoSchema}]),
    ],
    controllers: [
        TodoController,
    ],
    providers: [
        TodoService,
    ]
})
export class TodoModule {}