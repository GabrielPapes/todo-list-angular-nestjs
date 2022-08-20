import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { SubTodoDTO } from '../dto/subtodo.dto';
import { Todo, TodoDocument } from '../models/todo.schema';

@Injectable()
export class SubtodoService {
    logger = new Logger(SubtodoService.name);

    constructor(
        @InjectModel(Todo.name)
        private todoModel: Model<TodoDocument>,
    ) {}

    async create(subtodoDTO: SubTodoDTO): Promise<Todo> {
        subtodoDTO._id = new mongoose.Types.ObjectId();
        const todo = await this.todoModel.findById(subtodoDTO.todoId);
        todo.subTodos = todo.subTodos ? [...todo.subTodos, subtodoDTO]  : [subtodoDTO]
        todo.markModified('subTodos');

        return todo.save();
    }

    async update(id, subtodoDTO: SubTodoDTO): Promise<Todo> {
        const todo = await this.todoModel.findById(subtodoDTO.todoId);
        todo.subTodos = todo.subTodos.map(subTodo => subTodo._id === id ? subtodoDTO: subTodo);
        todo.markModified('subTodos');

        return todo.save()
    }

    async delete(id, todoId): Promise<Todo> {
        this.logger.warn(id, todoId)

        const todo = await this.todoModel.findById(todoId);
        todo.subTodos = todo.subTodos.filter(subTodo => !subTodo._id.equals(id));
        
        todo.markModified('subTodos');

        return todo.save();
    }
}
