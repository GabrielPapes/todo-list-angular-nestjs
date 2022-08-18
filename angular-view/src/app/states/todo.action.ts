import { Action } from "@ngrx/store";
import ActionWithPayload from "../models/actionWithPayload.model";
import { Todo } from "../models/todo.model";


const GET_TODO = '[To Do] Get Todo';
const GET_TODO_SUCCESS = '[To Do] Get Todo Success';
const GET_TODO_ERROR = '[To Do] Get Todo Error';

const CREATE_TODO =  '[To Do] Create Todo';
const CREATE_TODO_SUCCESS = '[To Do] Create Todo Success';
const CREATE_TODO_ERROR = '[To Do] Create Todo Error';

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

export class TodoError implements Action {
    readonly type: string;
    readonly message: string;

    constructor(type: string, message: string) {
        this.message = message;
        this.type = type;
    }
}

export type All = GetTodo | CreateTodo | GetTodoSuccess | CreateTodoSuccess | TodoError;
export {
    GET_TODO,
    GET_TODO_SUCCESS,
    GET_TODO_ERROR,

    CREATE_TODO,
    CREATE_TODO_SUCCESS,
    CREATE_TODO_ERROR
}