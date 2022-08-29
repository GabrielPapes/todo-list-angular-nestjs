import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import ActionWithPayload from 'src/app/models/actionWithPayload.model';
import { Todo } from 'src/app/models/todo.model';
import { CREATE_TODO, CREATE_TODO_SUCCESS, DELETE_TODO, UPDATE_TODO, UPDATE_TODO_SUCCESS } from 'src/app/states/todo.action';
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
  parentId: string | null = null;
  title = new FormControl('', Validators.required);
  description = new FormControl('');

  toggleEdit = false;

  constructor(
    public dialogRef: MatDialogRef<TodoFormComponent>,
    private store: Store<TodoState>,
    private actions: Actions,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, parentId: string }
  ) {
    this.todoState$ = this.store;
    this.subscriptions = new Array<Subscription>();
    this.id = this.data.id;
    this.parentId = this.data.parentId;

    this.actions
      .pipe(
        ofType(UPDATE_TODO_SUCCESS),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.dialogRef.close();
      })

    this.actions
      .pipe(
        ofType(CREATE_TODO_SUCCESS),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.dialogRef.close();
      })
  }

  ngOnInit(): void {
    if (this.id) {
      this.subscription = this.todoState$
        .pipe(
          select((states: any) => (getTodoById(this.id!))(states)
          ))
        .subscribe((todo: Todo | undefined) => {
          if (todo) {
            this.title.setValue(todo!.title)
            this.description.setValue(todo!.description);
            this.parentId = todo.parentId!;
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSubmit(): void {
    const todo: Todo = {
      _id: this.id || undefined,
      title: this.title.value!,
      description: this.description.value!,
      creationDate: new Date(),
      parentId: this.parentId || undefined
    }

    const todoAction: ActionWithPayload<Todo> = {
      type: this.id ? UPDATE_TODO : CREATE_TODO,
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
