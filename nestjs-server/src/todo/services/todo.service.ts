import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubTodoDTO } from '../dto/subtodo.dto';
import { TodoDTO } from '../dto/todo.dto';
import { Subtodo, SubTodoDocument } from '../models/subtodo.schema';
import { Todo, TodoDocument } from '../models/todo.schema';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name)
        private todoModel: Model<TodoDocument>,
        
        @InjectModel(Subtodo.name)
        private subtodoModel: Model<SubTodoDocument>

    ) {}

    create(todoDTO: TodoDTO): Promise<Todo> {
        const todo = new this.todoModel(todoDTO);
        return todo.save();
    }

    async update(id, todoDTO: TodoDTO): Promise<Todo> {
        const todo = await this.todoModel.findById(id);
        return todo.update(todoDTO);
    }

    async delete(id): Promise<Todo> {
        const todo = await this.todoModel.findById(id);
        return todo.delete();
    }

    findAll(): Promise<Todo[]> {
        return this.todoModel.find().populate('subtodos').exec();
    }

    async findById(id): Promise<Todo> {
        const todo = await this.todoModel.findById(id).populate('subtodos');
        return todo;
    }

    createSubtodo(subtodoDTO: SubTodoDTO): Promise<Subtodo> {
        const subtodo = new this.subtodoModel(subtodoDTO);
        return subtodo.save();
    }

    async deleteSubtodo(id): Promise<Subtodo> {
        const subtodo = await this.subtodoModel.findById(id);
        return subtodo.delete();
    }

    async updateSubtodo(id, subtodoDTO: SubTodoDTO): Promise<Subtodo> {
        const todo = await this.subtodoModel.findById(id);
        return todo.update(subtodoDTO);
    }


}
