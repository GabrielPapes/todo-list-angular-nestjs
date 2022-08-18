
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