import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo.model';
import { CreateTodo, CreateTodoSuccess, CREATE_TODO, CREATE_TODO_ERROR, DeleteTodo, DeleteTodoSuccess, DELETE_TODO, DELETE_TODO_ERROR, GetSingleTodo, GetSingleTodoSuccess, GetTodoSuccess, GET_SINGLE_TODO, GET_SINGLE_TODO_ERROR, GET_TODO, GET_TODO_ERROR, TodoError, UpdateTodo, UPDATE_TODO, UPDATE_TODO_ERROR } from '../states/todo.action';

const SERVICE = 'todo';
const NEST_BACKEND = `${environment.NEST_BACKEND_IP}:${environment.NEST_BACKEND_PORT}/${SERVICE}`;

@Injectable()
export class TodoService {
  private replaySubject = new ReplaySubject();

  constructor(private httpClient: HttpClient, private action$: Actions) {}

  @Effect()
  getSingleTodo: Observable<Action> = this.action$.pipe(
    ofType(GET_SINGLE_TODO),
    mergeMap((action: GetSingleTodo) =>
      this.httpClient.get<Todo>(`${NEST_BACKEND}/${action.payload}`)
        .pipe(
          map((data) => {
            console.log('Http GET Call Success: '); //, data);
            return new GetSingleTodoSuccess(data as Todo);
          }),
          catchError(err => {
            console.log('Http GET Call rrror: ', err)
            return of(new TodoError(GET_SINGLE_TODO_ERROR, err.message))
          })
        )
    )
  )

  @Effect()
  getTodos: Observable<Action> = this.action$.pipe(
    ofType(GET_TODO),
    mergeMap(() =>
      this.httpClient.get<Todo[]>(NEST_BACKEND)
        .pipe(
          map((data) => {
            console.log('Http GET Call Success: '); //, data);
            return new GetTodoSuccess(data as Todo[]);
          }),
          catchError(err => {
            console.log('Http GET Call rrror: ', err)
            return of(new TodoError(GET_TODO_ERROR, err.message))
          })
      )
    )
  );

  @Effect()
  createTodo: Observable<Action> = this.action$.pipe(
    ofType(CREATE_TODO),
    mergeMap((action: CreateTodo) => 
      this.httpClient.post(NEST_BACKEND, JSON.stringify(action.payload), {
        headers: { 'Content-type': 'application/json' }
      })
      .pipe(
        map(data => {
          console.log('Http POST Call Success: '); //, data)
          return new CreateTodoSuccess(action.payload as Todo);
        }),
        catchError(err => {
          console.log('Http POST Call Error: ', err);
          return of(new TodoError(CREATE_TODO_ERROR, err.message));
        })
      )
      
      )
  )

  @Effect()
  updateTodo: Observable<Action> = this.action$.pipe(
    ofType(UPDATE_TODO),
    mergeMap((action: UpdateTodo) =>
      this.httpClient.put(`${NEST_BACKEND}/${action.payload.id}`, action.payload.todo, {
        headers: { 'Content-type': 'application/json' }
      })
      .pipe(
        map(data => {
          console.log('Http PUT Call Success: '); //, data)
          return new CreateTodoSuccess(action.payload.todo as Todo);
        }),
        catchError(err => {
          console.log('Http GET Call rrror: ', err)
          return of(new TodoError(UPDATE_TODO_ERROR, err.message))
        })
      )
      )
  )

  @Effect()
  deleteTodo: Observable<Action> = this.action$.pipe(
    ofType(DELETE_TODO),
    mergeMap((action: DeleteTodo) => 
      this.httpClient.delete(`${NEST_BACKEND}/${action.payload}`)
      .pipe(
        map(data => {
          console.log('Http DELETE Call Success: '); //, data)
          return new DeleteTodoSuccess();
        }),
        catchError(err => {
          console.log('Http GET Call rrror: ', err)
          return of(new TodoError(DELETE_TODO_ERROR, err.message))
        })
      )
      )
  )
}
