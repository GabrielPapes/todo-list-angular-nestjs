import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import ActionWithPayload from 'src/app/models/actionWithPayload.model';
import { Todo } from 'src/app/models/todo.model';
import { DELETE_TODO, UPDATE_TODO } from 'src/app/states/todo.action';
import { getTodoById, TodoState } from 'src/app/states/todo.state';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  todoState$: Observable<TodoState>;

  private subscriptions: Array<Subscription>;
  set subscription(s: Subscription) {
    this.subscriptions.push(s);
  }

  id: string | null = null;
  title = new FormControl('', Validators.required);
  description = new FormControl('');
  status = new FormControl('todo',  Validators.required)
  
  toggleEdit = false;

  constructor(
    public dialogRef: MatDialogRef<TodoFormComponent>,
    private store: Store<TodoState>,
    private actions: Actions,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}
  ) {
      this.todoState$ = this.store;
      this.subscriptions = new Array<Subscription>();
      this.id = this.data.id;

      this.actions
        .pipe(
          ofType(UPDATE_TODO),
          takeUntil(this.destroy$)
        )
        .subscribe((data) => {
          this.toggleEdit = false;
        })
  }

  ngOnInit(): void {

    if(this.id) {
      //const getSingleTodoAction = new GetSingleTodo(this.id);
      this.subscription = this.todoState$
        .pipe(
          select((states: any) => (getTodoById(this.id!))(states)
          ))
        .subscribe((todo: Todo | undefined) => {
          if(todo) {
            this.title.setValue(todo!.title)
            this.description.setValue(todo!.description);
            this.status.setValue(todo!.status || 'todo');
          }
        })
    
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  changeStatus(status: string) {
    this.status.setValue(status);
  }

  getStatus() {
    const statusText = (status: string) => {
      return {
        'todo': 'Para Fazer',
        'progress': 'Em Progresso',
        'done': 'Concluído'
      }[status]
    }

    return statusText(this.status.value!);
  }

  onSubmit(): void {
    const todo: Todo = {
      _id: this.id!,
      title: this.title.value!,
      description: this.description.value!,
      status: this.status.value!,
      creationDate: new Date(),
    }

    const todoAction: ActionWithPayload<Todo> = {
      type: UPDATE_TODO,
      payload: todo
    }

    this.store.dispatch(todoAction)
  }

  onDelete(): void {
    this.dialogRef.close();

    const todo: Todo = {
      _id: this.id!,
      title: this.title.value!,
      description: this.description.value!,
      status: this.status.value!,
      creationDate: new Date(),
    }

    const todoAction: ActionWithPayload<Todo> = {
      type: DELETE_TODO,
      payload: todo
    }

    this.store.dispatch(todoAction)
  }

  onCancel(): void {
    this.toggleEdit = false;
  }

}
