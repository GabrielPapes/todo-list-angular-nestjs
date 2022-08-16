import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoDTO } from '../dto/todo.dto';
import { Todo, TodoDocument } from '../models/todo.schema';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name)
        private todoModel: Model<TodoDocument>

    ) {}

    create(todoDTO: TodoDTO): Promise<Todo> {
        const todo = new this.todoModel(todoDTO);
        return todo.save();
    }

    async update(id, todoDTO: TodoDTO): Promise<Todo> {
        const todo = await this.todoModel.findById(id)
        return todo.update(todoDTO);
    }

    async delete(id): Promise<Todo> {
        const todo = await this.todoModel.findById(id)
        return todo.delete();
    }

    findAll(): Promise<Todo[]> {
        return this.todoModel.find().exec();
    }

    async findById(id): Promise<Todo> {
        const todo = await this.todoModel.findById(id)
        return todo;
    }

}
