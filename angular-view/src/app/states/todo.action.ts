import { Action } from "@ngrx/store";
import ActionWithPayload from "../models/actionWithPayload.model";
import { Todo } from "../models/todo.model";

export const GET_SINGLE_TODO = '[To Do] Get Single Todo';
export const GET_SINGLE_TODO_SUCCESS = '[To Do] Get Single Todo Success';
export const GET_SINGLE_TODO_ERROR = '[To Do] Get Single Todo Error';

export const GET_TODO = '[To Do] Get Todos';
export const GET_TODO_SUCCESS = '[To Do] Get Todos Success';
export const GET_TODO_ERROR = '[To Do] Get Todos Error';

export const UPDATE_TODO = '[To Do] Update Todos';
export const UPDATE_TODO_SUCCESS = '[To Do] Update Todos Success';
export const UPDATE_TODO_ERROR = '[To Do] Update Todos Error';

export const DELETE_TODO = '[To Do] Delete Todos';
export const DELETE_TODO_SUCCESS = '[To Do] Delete Todos Success';
export const DELETE_TODO_ERROR = '[To Do] Delete Todos Error';

export const CREATE_TODO =  '[To Do] Create Todo';
export const CREATE_TODO_SUCCESS = '[To Do] Create Todo Success';
export const CREATE_TODO_ERROR = '[To Do] Create Todo Error';

export class GetSingleTodo implements Action {
    readonly type = GET_SINGLE_TODO;
    payload: string;

    constructor(payload: string) {
        this.payload = payload;
    }
}

export class UpdateTodo implements Action {
    readonly type = GET_SINGLE_TODO;
    payload: {
        id: string,
        todo: Todo,
    };

    constructor(payload: {id: string, todo: Todo}) {
        this.payload = payload;
    }
}

export class DeleteTodo implements Action {
    readonly type = GET_SINGLE_TODO;
    payload: string;

    constructor(payload: string) {
        this.payload = payload;
    }
}

export class GetTodo implements Action {
    readonly type = GET_TODO;

    constructor() {}
}

export class CreateTodo implements ActionWithPayload<Todo> {
    readonly type = CREATE_TODO;
    payload: Todo;

    constructor(payload: Todo) {
        this.payload = payload;
    }
}

export class GetTodoSuccess implements ActionWithPayload<Todo[]> {
    readonly type = GET_TODO_SUCCESS;
    payload: Todo[];

    constructor(payload: Todo[]) {
        this.payload = payload;
    }
}

export class CreateTodoSuccess implements ActionWithPayload<Todo> {
    readonly type = CREATE_TODO_SUCCESS;
    payload: Todo;

    constructor(payload: Todo) {
        this.payload = payload;
    }
}

export class GetSingleTodoSuccess implements ActionWithPayload<Todo> {
    readonly type = GET_SINGLE_TODO;
    payload: Todo;

    constructor(payload: Todo) {
        this.payload = payload;
    }
}

export class UpdateTodoSuccess implements ActionWithPayload<Todo> {
    readonly type = UPDATE_TODO_SUCCESS;
    payload: Todo;

    constructor(payload: Todo) {
        this.payload = payload;
    }
}

export class DeleteTodoSuccess implements Action {
    readonly type = DELETE_TODO_SUCCESS;

    constructor() {}
}

export class TodoError implements Action {
    readonly type: string;
    readonly message: string;

    constructor(type: string, message: string) {
        this.message = message;
        this.type = type;
    }
}

export type All = GetTodo | CreateTodo | GetTodoSuccess | CreateTodoSuccess | TodoError;
