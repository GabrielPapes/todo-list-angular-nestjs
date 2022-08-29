import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo.model';
import { CreateTodo, CreateTodoSuccess, CREATE_TODO, CREATE_TODO_ERROR, DeleteTodo, DeleteTodoSuccess, DELETE_TODO, DELETE_TODO_ERROR, GetTodoSuccess, GET_TODO, GET_TODO_ERROR, TodoError, UpdateTodo, UpdateTodoSuccess,UPDATE_TODO, UPDATE_TODO_ERROR } from '../states/todo.action';

const TODO_SERVICE = 'todo';
const SUBTODO_SERVICE = 'subtodo';

const NEST_BACKEND_TODO = `${environment.NEST_BACKEND_IP}:${environment.NEST_BACKEND_PORT}/${TODO_SERVICE}`;
const NEST_BACKEND_SUBTODO = `${environment.NEST_BACKEND_IP}:${environment.NEST_BACKEND_PORT}/${SUBTODO_SERVICE}`;

@Injectable()
export class TodoService {
  private replaySubject = new ReplaySubject();

  constructor(private httpClient: HttpClient, private action$: Actions) { }

  @Effect()
  getTodos: Observable<Action> = this.action$.pipe(
    ofType(GET_TODO),
    mergeMap(() =>
      this.httpClient.get<Todo[]>(NEST_BACKEND_TODO)
        .pipe(
          map((data) => {
            console.log('Http GET Call Success: '); //, data);
            return new GetTodoSuccess(data as Todo[]);
          }),
          catchError(err => {
            console.log('Http GET Call Error: ', err)
            return of(new TodoError(GET_TODO_ERROR, err.message))
          })
        )
    )
  );

  @Effect()
  createTodo: Observable<Action> = this.action$.pipe(
    ofType(CREATE_TODO),
    mergeMap((action: CreateTodo) =>
      this.httpClient.post(NEST_BACKEND_TODO, JSON.stringify(action.payload), {
        headers: { 'Content-type': 'application/json' }
      })
        .pipe(
          map(data => {
            console.log('Http POST Call Success: '); //, data)
            return new CreateTodoSuccess(data as Todo);
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
      this.httpClient.put(`${NEST_BACKEND_TODO}/${action.payload._id}`, action.payload, {
        headers: { 'Content-type': 'application/json' }
      })
        .pipe(
          map(data => {
            console.log('Http PUT Call Success: '); //, data)
            return new UpdateTodoSuccess(action.payload as Todo);
          }),
          catchError(err => {
            console.log('Http GET Call Error: ', err)
            return of(new TodoError(UPDATE_TODO_ERROR, err.message))
          })
        )
    )
  )

  @Effect()
  deleteTodo: Observable<Action> = this.action$.pipe(
    ofType(DELETE_TODO),
    mergeMap((action: DeleteTodo) =>
      this.httpClient.delete(`${NEST_BACKEND_TODO}/${action.payload._id}`)
      .pipe(
        map(data => {
          console.log('Http DELETE Call Success: '); //, data)
          return new DeleteTodoSuccess(action.payload);
        }),
        catchError(err => {
          console.log('Http GET Call Error: ', err)
          return of(new TodoError(DELETE_TODO_ERROR, err.message))
        })
      )
      )
  )

}
