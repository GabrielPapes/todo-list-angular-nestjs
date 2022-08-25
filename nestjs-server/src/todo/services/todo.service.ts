import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TodoDTO } from '../dto/todo.dto';
import { Todo, TodoDocument } from '../models/todo.schema';

@Injectable()
export class TodoService {
    logger = new Logger(TodoService.name);

    constructor(
        @InjectModel(Todo.name)
        private todoModel: Model<TodoDocument>,
    ) {}

    async create(todoDTO: TodoDTO): Promise<Todo> {
        const newTodo = new this.todoModel(todoDTO);

        if(todoDTO.parentId) {
            const todo = await this.todoModel.findById(todoDTO.parentId);
            const saved = await newTodo.save();
            
            const id = new mongoose.Types.ObjectId(saved._id);

            todo.children = [...todo.children, id]
            todo.markModified('children');
            await todo.save();
            
            return saved;
        } else {
            return newTodo.save()
        }
    }

    async update(id, todoDTO: TodoDTO): Promise<Todo> {
        const todo = await this.todoModel.findById(id);
        return todo.update(todoDTO);
    }

    async delete(id): Promise<Todo[]> {
        const todo = await this.todoModel.findById(id);

        //TODO still not working. 
        const deepSearch = (todo: Todo) => {
            let idList = [todo._id];
            if(todo?.children.length > 0) {
                todo?.children.forEach(async childId => idList.push(...deepSearch(await this.todoModel.findById(childId))));
            } 
            return idList;
        }

        const ids = deepSearch(todo);
        this.logger.log(ids);

        return this.todoModel.find({_id: { $in: ids }}).deleteMany();
    }

    findAll(): Promise<Todo[]> {
        return this.todoModel.find().exec();
    }

    async findById(id): Promise<Todo> {
        const todo = await this.todoModel.findById(id);
        return todo;
    }

}
