import { Action } from "@ngrx/store";
import ActionWithPayload from "../models/actionWithPayload.model";
import { Todo } from "../models/todo.model";
import { CREATE_TODO, CREATE_TODO_SUCCESS, DELETE_TODO, DELETE_TODO_SUCCESS, GET_TODO, GET_TODO_ERROR, GET_TODO_SUCCESS, UPDATE_TODO, UPDATE_TODO_SUCCESS } from "./todo.action";
import { initializeState, TodoState } from "./todo.state";

const initialState = initializeState();

export function todoReducer(state: TodoState = initialState, action: Action) {
    switch (action.type) {
        case GET_TODO:
            return ({
                ...state,
                Loaded: false,
                Loading: true,

            });

        case CREATE_TODO:
            return ({
                ...state,
                Loading: true,
                Loaded: false,

            })

        case UPDATE_TODO:
            return ({
                ...state,
                Loaded: false,
                Loading: true,

            });

        case DELETE_TODO:
            return ({
                ...state,
                Loaded: false,
                Loading: true,

            });

        case GET_TODO_SUCCESS:
            return ({
                ...state,
                TodoList: state.TodoList.concat((action as ActionWithPayload<Todo[]>).payload),
                Loading: false,
                Loaded: true,

            })

        case CREATE_TODO_SUCCESS:
            return ({
                ...state,
                TodoList: [...state.TodoList, (action as ActionWithPayload<Todo>).payload],
                Loading: false,
                Loaded: true,

            })

        case UPDATE_TODO_SUCCESS:
            return ({
                ...state,
                TodoList: [...state.TodoList.map(todo => todo._id === (action as ActionWithPayload<Todo>).payload._id ? (action as ActionWithPayload<Todo>).payload : todo)],
                Loading: false,
                Loaded: true,

            })

        case DELETE_TODO_SUCCESS:
            return ({
                ...state,
                TodoList: [...state.TodoList.filter(todo => todo._id !== (action as ActionWithPayload<Todo>).payload._id)],
                Loading: false,
                Loaded: true,

            })

        case GET_TODO_ERROR:
            return ({
                ...state,
                Loading: false,
                Loaded: false,

            });

        default:
            return state;
    }
}