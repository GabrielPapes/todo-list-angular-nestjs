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

    if (todoDTO.parentId) {
      const todo = await this.todoModel.findById(todoDTO.parentId);
      const saved = await newTodo.save();

      const id = new mongoose.Types.ObjectId(saved._id);

      todo.children = [...todo.children, id];
      todo.markModified('children');
      await todo.save();

      return saved;
    } else {
      return newTodo.save();
    }
  }

  async update(id, todoDTO: TodoDTO): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    return todo.update(todoDTO);
  }

  async delete(id): Promise<Todo[]> {
    const todo = await this.todoModel.findById(id);

    const deepSearchTodo = async (todo: Todo) => {
      let idList = todo?.children ? [...todo.children] : [];

      for (const child of todo?.children) {
        const childTodo = await this.todoModel.findById(child);
        idList = [...idList, ...(await deepSearchTodo(childTodo))];
      }

      return idList;
    };

    const ids = [todo._id, ...(await deepSearchTodo(todo))];

    // Removes itself from parent list. I believe this can be improved further.
    const parentTodo = await this.todoModel.findById(todo.parentId);
    parentTodo.children = parentTodo.children.filter(child => !child.equals(todo._id));
    parentTodo.markModified('children');
    await parentTodo.save();
    this.logger.log("Removed children ID from Parent: ", todo._id);

    return this.todoModel.find({ _id: { $in: ids } }).deleteMany();
  }

  findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findById(id): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    return todo;
  }
}
