import { Todo } from "./todo.model";

export interface ListTodo {
    name: string;
    cards: Todo[];
    status?: 'todo' | 'progress' | 'done'
}