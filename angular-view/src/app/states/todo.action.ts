import { Action } from "@ngrx/store";
import ActionWithPayload from "../models/actionWithPayload.model";
import { SubTodo } from "../models/subtodo.model";
import { Todo } from "../models/todo.model";

export const GET_TODO = '[To Do] Get Todos';
export const GET_TODO_SUCCESS = '[To Do] Get Todos Success';
export const GET_TODO_ERROR = '[To Do] Get Todos Error';

export const UPDATE_TODO = '[To Do] Update Todos';
export const UPDATE_TODO_SUCCESS = '[To Do] Update Todos Success';
export const UPDATE_TODO_ERROR = '[To Do] Update Todos Error';

export const DELETE_TODO = '[To Do] Delete Todos';
export const DELETE_TODO_SUCCESS = '[To Do] Delete Todos Success';
export const DELETE_TODO_ERROR = '[To Do] Delete Todos Error';

export const CREATE_TODO = '[To Do] Create Todo';
export const CREATE_TODO_SUCCESS = '[To Do] Create Todo Success';
export const CREATE_TODO_ERROR = '[To Do] Create Todo Error';

//SUBTODOS

export const GET_SUBTODO = '[To Do] Get SubTodos';
export const GET_SUBTODO_SUCCESS = '[To Do] Get SubTodos Success';
export const GET_SUBTODO_ERROR = '[To Do] Get SubTodos Error';

export const UPDATE_SUBTODO = '[To Do] Update SubTodos';
export const UPDATE_SUBTODO_SUCCESS = '[To Do] Update SubTodos Success';
export const UPDATE_SUBTODO_ERROR = '[To Do] Update SubTodos Error';

export const DELETE_SUBTODO = '[To Do] Delete SubTodos';
export const DELETE_SUBTODO_SUCCESS = '[To Do] Delete SubTodos Success';
export const DELETE_SUBTODO_ERROR = '[To Do] Delete SubTodos Error';

export const CREATE_SUBTODO = '[To Do] Create SubTodo';
export const CREATE_SUBTODO_SUCCESS = '[To Do] Create SubTodo Success';
export const CREATE_SUBTODO_ERROR = '[To Do] Create SubTodo Error';



export class UpdateTodo implements Action {
    readonly type = UPDATE_TODO;
    payload: Todo

    constructor(payload: Todo) {
        this.payload = payload;
    }
}

export class DeleteTodo implements Action {
    readonly type = DELETE_TODO;
    payload: Todo

    constructor(payload: Todo) {
        this.payload = payload;
    }
}

export class GetTodo implements Action {
    readonly type = GET_TODO;

    constructor() { }
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

export class UpdateTodoSuccess implements ActionWithPayload<Todo> {
    readonly type = UPDATE_TODO_SUCCESS;
    payload: Todo;

    constructor(payload: Todo) {
        this.payload = payload;
    }
}

export class DeleteTodoSuccess implements Action {
    readonly type = DELETE_TODO_SUCCESS;
    payload: Todo

    constructor(payload: Todo) {
        this.payload = payload;
    }
}

// SUBTODOS

export class UpdateSubTodo implements Action {
    readonly type = UPDATE_SUBTODO;
    payload: SubTodo

    constructor(payload: SubTodo) {
        this.payload = payload;
    }
}

export class DeleteSubTodo implements Action {
    readonly type = DELETE_SUBTODO;
    payload: {
        subTodo: SubTodo,
        todoId: string
    };

    constructor(payload: {subTodo: SubTodo, todoId: string}) {
        this.payload = payload;
    }
}

export class GetSubTodo implements Action {
    readonly type = GET_SUBTODO;

    constructor() { }
}

export class CreateSubTodo implements ActionWithPayload<Todo> {
    readonly type = CREATE_SUBTODO;
    payload: Todo;

    constructor(payload: Todo) {
        this.payload = payload;
    }
}

export class GetSubTodoSuccess implements ActionWithPayload<SubTodo[]> {
    readonly type = GET_SUBTODO_SUCCESS;
    payload: SubTodo[];

    constructor(payload: SubTodo[]) {
        this.payload = payload;
    }
}

export class CreateSubTodoSuccess implements ActionWithPayload<SubTodo> {
    readonly type = CREATE_SUBTODO_SUCCESS;
    payload: SubTodo;

    constructor(payload: SubTodo) {
        this.payload = payload;
    }
}

export class UpdateSubTodoSuccess implements ActionWithPayload<Todo> {
    readonly type = UPDATE_SUBTODO_SUCCESS;
    payload: Todo;

    constructor(payload: Todo) {
        this.payload = payload;
    }
}

export class DeleteSubTodoSuccess implements Action {
    readonly type = DELETE_SUBTODO_SUCCESS;
    payload: Todo

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

export type All = GetTodo | CreateTodo | GetTodoSuccess | CreateTodoSuccess | GetSubTodo | CreateSubTodo | GetSubTodoSuccess | CreateSubTodoSuccess | DeleteTodo | DeleteTodoSuccess | DeleteSubTodo | DeleteSubTodoSuccess | TodoError;
