
import { createSelector } from '@ngrx/store';
import { Todo } from '../models/todo.model'

export interface TodoState {
    Loading: boolean;
    Loaded: boolean;
    TodoList: Todo[];
}

export const initializeState = (): TodoState => {
    return ({
        TodoList: [],
        Loading: false,
        Loaded: true,
    })
}

export const selectTodoList = (states: {todos: TodoState}) => { 
    return states.todos.TodoList 
};

export const getTodoById = (id: string) => createSelector(
    selectTodoList,
    (todos) => todos.find(todo => todo._id === id)
)

