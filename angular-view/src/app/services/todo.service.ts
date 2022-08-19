import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo.model';
import { CreateTodo, CreateTodoSuccess, CREATE_TODO, CREATE_TODO_ERROR, GetTodoSuccess, GET_TODO, GET_TODO_ERROR, TodoError } from '../states/todo.action';

const SERVICE = 'todo';
const NEST_BACKEND = `${environment.NEST_BACKEND_IP}:${environment.NEST_BACKEND_PORT}/${SERVICE}`;

@Injectable()
export class TodoService {
  private replaySubject = new ReplaySubject();

  constructor(private httpClient: HttpClient, private action$: Actions) {}

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
}
