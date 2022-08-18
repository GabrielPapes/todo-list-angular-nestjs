import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, Observable, Subject, takeUntil } from 'rxjs';
import ActionWithPayload from 'src/app/models/actionWithPayload.model';
import { Todo } from 'src/app/models/todo.model';
import { CREATE_TODO } from 'src/app/states/todo.action';
import { TodoState } from 'src/app/states/todo.state';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  id = null;
  title = new FormControl('', Validators.required);
  description = new FormControl('');
  status = new FormControl('todo',  Validators.required)
  

  constructor(
    public dialogRef: MatDialogRef<TodoFormComponent>,
    private store: Store<TodoState>,
    private actions: Actions,
  ) {
    this.actions
      .pipe(
        ofType(CREATE_TODO),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.dialogRef.close();
      })
  }

  ngOnInit(): void {

    // if(this.id) {
    //   // this.todoService.getTodo(this.id)
    //   //   .pipe(first(val => val !== null))
    //   //   .subscribe(todo => {
    //   //     this.title.setValue(todo.title);
    //   //     this.description.setValue(todo.description);
    //   //   })
    // }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  changeStatus(status: string) {
    this.status.setValue(status);
  }

  onSubmit(): void {
    const todo: Todo = {
      title: this.title.value!,
      description: this.description.value!,
      status: this.status.value!,
      creationDate: new Date(),
    }

    const todoAction: ActionWithPayload<Todo> = {
      type: CREATE_TODO,
      payload: todo
    }

    this.store.dispatch(todoAction)
    

    // this.todoService.createTodo(todo)
    //   .subscribe((resp) => {
    //     console.log(resp)
    //     this.todoService.notify("todo created")
    //     this.dialogRef.close();
    //   })
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
