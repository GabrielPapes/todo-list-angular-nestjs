import { SubTodo } from "./subtodo.model";

export interface Todo {
    _id?: string;
    title: string;
    description: string;
    status?: string;
    creationDate: Date;
    subTodos?: SubTodo[];
}